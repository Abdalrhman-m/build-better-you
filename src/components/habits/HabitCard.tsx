
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/types/habit';
import AICoachModal from '@/components/ai/AICoachModal';
import { useAICoach } from '@/hooks/use-ai-coach';
import { useToast } from '@/hooks/use-toast';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string) => void;
}

const HabitCard = ({ habit, onComplete }: HabitCardProps) => {
  const [showAIModal, setShowAIModal] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);
  const { getAIAdvice } = useAICoach();
  const { toast } = useToast();
  
  const isCompletedToday = habit.completedDates.includes(new Date().toISOString().split('T')[0]);
  
  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'border-l-pink-400 bg-gradient-to-r from-pink-50 to-pink-100',
      productivity: 'border-l-blue-400 bg-gradient-to-r from-blue-50 to-blue-100', 
      mindfulness: 'border-l-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100',
      learning: 'border-l-purple-400 bg-gradient-to-r from-purple-50 to-purple-100',
      social: 'border-l-green-400 bg-gradient-to-r from-green-50 to-green-100',
    };
    return colors[category as keyof typeof colors] || 'border-l-blue-400 bg-gradient-to-r from-blue-50 to-blue-100';
  };

  const handleQuickMotivation = async () => {
    setQuickLoading(true);
    const advice = await getAIAdvice('motivation', {
      habitName: habit.name,
      habitDescription: habit.description
    });
    
    if (advice) {
      toast({
        title: "💫 Your AI Coach Says:",
        description: advice,
        duration: 6000,
      });
    }
    setQuickLoading(false);
  };

  const handleCelebration = async () => {
    if (habit.streak > 0) {
      const advice = await getAIAdvice('celebration', {
        habitName: habit.name,
        context: `${habit.streak} day streak, ${habit.completedDates.length} total completions`
      });
      
      if (advice) {
        toast({
          title: "🎉 Celebration Time!",
          description: advice,
          duration: 8000,
        });
      }
    }
  };
  
  return (
    <>
      <Card className={cn(
        "p-6 relative overflow-hidden transition-all duration-300 border-l-4 hover:shadow-lg",
        getCategoryColor(habit.category),
        isCompletedToday ? "opacity-95 bg-gradient-to-r from-yellow-50 via-pink-50 to-blue-50" : "hover:scale-[1.02]"
      )}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-gray-800">{habit.name}</h3>
              {isCompletedToday && (
                <div className="bg-yellow-200 px-2 py-1 rounded-full border border-yellow-300">
                  <Check className="h-3 w-3 text-yellow-700 animate-check-mark" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {habit.completedDates.length} completions
              </span>
              <span className="capitalize bg-white/70 px-2 py-1 rounded-full border border-blue-200 text-blue-700">
                {habit.category}
              </span>
            </div>
          </div>
          
          {habit.streak > 0 && (
            <div 
              className="flex items-center bg-gradient-to-r from-yellow-100 to-pink-100 px-3 py-2 rounded-full border border-yellow-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
              onClick={handleCelebration}
              title="Click to celebrate your streak!"
            >
              <Flame className="h-4 w-4 text-yellow-600 mr-1" />
              <span className="text-sm font-bold text-yellow-700">{habit.streak}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const dateStr = date.toISOString().split('T')[0];
              const isCompleted = habit.completedDates.includes(dateStr);
              const isToday = i === 6;
              
              return (
                <div 
                  key={i} 
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    isCompleted 
                      ? "bg-yellow-400 scale-110 shadow-sm" 
                      : isToday 
                        ? "bg-blue-200 ring-2 ring-blue-400" 
                        : "bg-pink-100"
                  )} 
                  title={dateStr}
                />
              );
            })}
          </div>
          
          <Button
            variant={isCompletedToday ? "outline" : "default"}
            size="sm"
            className={cn(
              "transition-all duration-200",
              isCompletedToday 
                ? "border-yellow-400 text-yellow-700 hover:bg-yellow-50 bg-white/70" 
                : "bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white shadow-md hover:shadow-lg"
            )}
            onClick={() => onComplete(habit.id)}
            disabled={isCompletedToday}
          >
            <Check className={cn("h-4 w-4 mr-1", isCompletedToday && "animate-bounce")} />
            {isCompletedToday ? "Completed" : "Complete"}
          </Button>
        </div>

        {/* AI Coach Section */}
        <div className="flex gap-2 pt-3 border-t border-purple-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickMotivation}
            disabled={quickLoading}
            className="flex-1 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
          >
            {quickLoading ? (
              <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin mr-1" />
            ) : (
              <Heart className="h-3 w-3 mr-1" />
            )}
            Quick Boost
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAIModal(true)}
            className="flex-1 bg-gradient-to-r from-blue-50 to-yellow-50 border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-100 hover:to-yellow-100 transition-all duration-200"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            AI Coach
          </Button>
        </div>
        
        {isCompletedToday && (
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-300/30 to-transparent rounded-bl-full">
            <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        )}
      </Card>

      <AICoachModal
        open={showAIModal}
        onOpenChange={setShowAIModal}
        habitName={habit.name}
        habitDescription={habit.description}
      />
    </>
  );
};

export default HabitCard;
