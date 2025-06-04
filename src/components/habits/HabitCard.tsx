
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar, Heart, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string) => void;
}

const HabitCard = ({ habit, onComplete }: HabitCardProps) => {
  const isCompletedToday = habit.completedDates.includes(new Date().toISOString().split('T')[0]);
  
  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'border-l-pink-400 bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50 shadow-pink-200',
      productivity: 'border-l-baby-blue-400 bg-gradient-to-br from-baby-blue-100 via-baby-blue-50 to-pink-50 shadow-baby-blue-200',
      mindfulness: 'border-l-yellow-400 bg-gradient-to-br from-yellow-100 via-yellow-50 to-baby-blue-50 shadow-yellow-200',
      learning: 'border-l-pink-300 bg-gradient-to-br from-pink-50 via-yellow-50 to-baby-blue-50 shadow-pink-200',
      social: 'border-l-baby-blue-300 bg-gradient-to-br from-baby-blue-50 via-pink-50 to-yellow-50 shadow-baby-blue-200',
    };
    return colors[category as keyof typeof colors] || 'border-l-baby-blue-400 bg-gradient-to-br from-baby-blue-100 via-baby-blue-50 to-pink-50 shadow-baby-blue-200';
  };
  
  return (
    <Card className={cn(
      "p-8 relative overflow-hidden transition-all duration-500 border-l-8 hover:shadow-2xl transform hover:scale-105 rounded-3xl",
      getCategoryColor(habit.category),
      isCompletedToday ? "bg-gradient-to-br from-yellow-100 via-pink-100 to-baby-blue-100 border-l-yellow-400 animate-pulse" : "hover:rotate-1"
    )}>
      {/* Floating decorative elements */}
      <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-30 floating-element"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-baby-blue-300 to-yellow-300 rounded-full opacity-40 floating-element" style={{ animationDelay: '1s' }}></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-2xl text-gray-800">{habit.name}</h3>
            {isCompletedToday && (
              <div className="bg-gradient-to-r from-yellow-300 to-yellow-200 px-3 py-2 rounded-full border-2 border-yellow-400 shadow-lg transform animate-bounce">
                <Check className="h-4 w-4 text-yellow-800 animate-check-mark" />
              </div>
            )}
          </div>
          <p className="text-base text-gray-700 mb-4 font-medium">{habit.description}</p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full border border-baby-blue-300 shadow-sm">
              <Calendar className="h-4 w-4 text-baby-blue-600" />
              <span className="text-baby-blue-700">{habit.completedDates.length} completions</span>
            </span>
            <span className="capitalize bg-gradient-to-r from-pink-200 to-yellow-200 px-4 py-2 rounded-full border-2 border-pink-300 text-pink-700 font-bold shadow-sm transform hover:scale-105 transition-transform duration-300">
              {habit.category} ✨
            </span>
          </div>
        </div>
        
        {habit.streak > 0 && (
          <div className="flex items-center bg-gradient-to-r from-yellow-200 via-pink-200 to-baby-blue-200 px-4 py-3 rounded-full border-3 border-yellow-400 shadow-xl transform hover:scale-110 transition-all duration-300 hover:rotate-3">
            <Flame className="h-5 w-5 text-yellow-600 mr-2 animate-pulse" />
            <span className="text-lg font-bold text-yellow-700">{habit.streak}</span>
            <Sparkles className="h-4 w-4 text-pink-500 ml-1 sparkle" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
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
                  "w-5 h-5 rounded-full transition-all duration-300 shadow-lg transform hover:scale-125",
                  isCompleted 
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-300 scale-125 animate-pulse shadow-yellow-300" 
                    : isToday 
                      ? "bg-gradient-to-r from-baby-blue-300 to-baby-blue-200 ring-3 ring-baby-blue-400 animate-bounce" 
                      : "bg-gradient-to-r from-pink-200 to-pink-100 hover:from-pink-300 hover:to-pink-200"
                )} 
                title={dateStr}
              />
            );
          })}
        </div>
        
        <Button
          variant={isCompletedToday ? "outline" : "default"}
          size="lg"
          className={cn(
            "transition-all duration-300 rounded-full px-6 py-3 font-bold text-lg shadow-xl transform hover:scale-110",
            isCompletedToday 
              ? "border-3 border-yellow-400 text-yellow-700 hover:bg-yellow-100 bg-white/90 hover:shadow-2xl" 
              : "bg-gradient-to-r from-pink-400 via-yellow-400 to-baby-blue-400 hover:from-pink-500 hover:via-yellow-500 hover:to-baby-blue-500 text-white shadow-2xl hover:shadow-pink-300 playful-button"
          )}
          onClick={() => onComplete(habit.id)}
          disabled={isCompletedToday}
        >
          <Check className={cn("h-5 w-5 mr-2", isCompletedToday && "animate-bounce")} />
          {isCompletedToday ? "Completed! 🎉" : "Complete 🚀"}
          {!isCompletedToday && <Zap className="h-4 w-4 ml-2 animate-pulse" />}
        </Button>
      </div>
      
      {isCompletedToday && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-300/40 via-pink-300/30 to-transparent rounded-bl-full">
          <Star className="absolute top-3 right-3 h-6 w-6 text-yellow-500 sparkle" />
          <Heart className="absolute top-8 right-8 h-4 w-4 text-pink-500 sparkle" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
    </Card>
  );
};

export default HabitCard;
