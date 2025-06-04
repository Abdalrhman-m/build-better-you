
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string, date?: string) => void;
  selectedDate?: string | null;
}

const HabitCard = ({ habit, onComplete, selectedDate }: HabitCardProps) => {
  const today = new Date().toISOString().split('T')[0];
  const targetDate = selectedDate || today;
  const isCompletedForDate = habit.completedDates.includes(targetDate);
  const isCompletedToday = habit.completedDates.includes(today);
  const isHistoricalDate = selectedDate && selectedDate !== today;
  
  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'border-l-pastel-pink-400 bg-gradient-to-br from-pastel-pink-50 via-white to-pastel-pink-100',
      productivity: 'border-l-pastel-blue-400 bg-gradient-to-br from-pastel-blue-50 via-white to-pastel-blue-100',
      mindfulness: 'border-l-pastel-yellow-400 bg-gradient-to-br from-pastel-yellow-50 via-white to-pastel-yellow-100',
      learning: 'border-l-pastel-pink-300 bg-gradient-to-br from-pastel-pink-50 via-pastel-yellow-50 to-pastel-blue-50',
      social: 'border-l-pastel-blue-300 bg-gradient-to-br from-pastel-blue-50 via-white to-pastel-pink-50',
    };
    return colors[category as keyof typeof colors] || 'border-l-pastel-blue-400 bg-gradient-to-br from-pastel-blue-50 via-white to-pastel-blue-100';
  };
  
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden transition-all duration-300 border-l-4 hover:shadow-xl border-2",
      getCategoryColor(habit.category),
      isCompletedForDate 
        ? "opacity-95 bg-gradient-to-br from-pastel-yellow-100 via-pastel-pink-100 to-pastel-blue-100 border-pastel-yellow-300 shadow-lg" 
        : "hover:scale-[1.02] border-pastel-pink-200 shadow-md hover:border-pastel-pink-300"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-gray-800">{habit.name}</h3>
            {isCompletedForDate && (
              <div className="bg-gradient-to-r from-pastel-yellow-300 to-pastel-pink-300 px-3 py-1 rounded-full border-2 border-pastel-yellow-400 shadow-sm">
                <Check className="h-4 w-4 text-white animate-bounce" />
              </div>
            )}
            {isHistoricalDate && (
              <div className="bg-pastel-blue-200 px-2 py-1 rounded-full border border-pastel-blue-300">
                <Calendar className="h-3 w-3 text-pastel-blue-700" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{habit.description}</p>
          
          {isHistoricalDate && (
            <p className="text-xs text-pastel-blue-600 mb-2 font-medium">
              📅 Viewing: {new Date(selectedDate).toLocaleDateString()}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {habit.completedDates.length} completions
            </span>
            <span className="capitalize bg-white/80 px-3 py-1 rounded-full border border-pastel-blue-200 text-pastel-blue-700 font-medium">
              {habit.category}
            </span>
          </div>
        </div>
        
        {habit.streak > 0 && (
          <div className="flex items-center bg-gradient-to-r from-pastel-yellow-200 to-pastel-pink-200 px-3 py-2 rounded-full border-2 border-pastel-yellow-300 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
            <Flame className="h-4 w-4 text-pastel-yellow-600 mr-1 animate-pulse" />
            <span className="text-sm font-bold text-pastel-yellow-700">{habit.streak}</span>
            <Sparkles className="h-3 w-3 text-pastel-pink-600 ml-1" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const dateStr = date.toISOString().split('T')[0];
            const isCompleted = habit.completedDates.includes(dateStr);
            const isToday = i === 6;
            const isSelected = selectedDate === dateStr;
            
            return (
              <div 
                key={i} 
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-200 border-2",
                  isCompleted 
                    ? "bg-gradient-to-br from-pastel-yellow-400 to-pastel-pink-400 scale-110 shadow-md border-pastel-yellow-500" 
                    : isToday 
                      ? "bg-pastel-blue-200 ring-2 ring-pastel-blue-400 border-pastel-blue-300" 
                      : "bg-pastel-pink-100 border-pastel-pink-200",
                  isSelected && "ring-4 ring-pastel-pink-400 ring-opacity-40 scale-125"
                )} 
                title={dateStr}
              />
            );
          })}
        </div>
        
        <Button
          variant={isCompletedForDate ? "outline" : "default"}
          size="sm"
          className={cn(
            "transition-all duration-200 font-semibold",
            isCompletedForDate 
              ? "border-2 border-pastel-yellow-400 text-pastel-yellow-700 hover:bg-pastel-yellow-50 bg-white/80 shadow-md" 
              : "bg-gradient-to-r from-pastel-blue-400 via-pastel-pink-400 to-pastel-yellow-400 hover:from-pastel-blue-500 hover:via-pastel-pink-500 hover:to-pastel-yellow-500 text-white shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white/50"
          )}
          onClick={() => onComplete(habit.id, selectedDate || undefined)}
          disabled={false}
        >
          <div className="flex items-center gap-1">
            <Check className={cn("h-4 w-4", isCompletedForDate && "animate-spin")} />
            {isCompletedForDate 
              ? (isHistoricalDate ? "Completed ✨" : "Done Today!") 
              : (isHistoricalDate ? "Mark Complete" : "Complete")
            }
            {!isCompletedForDate && <Star className="h-3 w-3 animate-pulse" />}
          </div>
        </Button>
      </div>
      
      {isCompletedForDate && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pastel-yellow-400/30 via-pastel-pink-400/20 to-transparent rounded-bl-full">
          <Star className="absolute top-3 right-3 h-5 w-5 text-pastel-yellow-500 animate-pulse" />
          <Heart className="absolute top-6 right-6 h-3 w-3 text-pastel-pink-500 animate-pulse" />
        </div>
      )}
      
      {/* Playful decorative elements */}
      <div className="absolute bottom-2 left-2 opacity-20">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-pastel-pink-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-pastel-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-pastel-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </Card>
  );
};

export default HabitCard;
