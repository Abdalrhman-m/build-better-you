
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar, Heart } from 'lucide-react';
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
      health: 'border-l-pastel-pink-400 bg-gradient-to-r from-pastel-pink-50 to-pastel-pink-100',
      productivity: 'border-l-pastel-blue-400 bg-gradient-to-r from-pastel-blue-50 to-pastel-blue-100',
      mindfulness: 'border-l-pastel-yellow-400 bg-gradient-to-r from-pastel-yellow-50 to-pastel-yellow-100',
      learning: 'border-l-pastel-pink-300 bg-gradient-to-r from-pastel-pink-50 via-pastel-yellow-50 to-pastel-blue-50',
      social: 'border-l-pastel-blue-300 bg-gradient-to-r from-pastel-blue-50 to-pastel-pink-50',
    };
    return colors[category as keyof typeof colors] || 'border-l-pastel-blue-400 bg-gradient-to-r from-pastel-blue-50 to-pastel-blue-100';
  };
  
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden transition-all duration-300 border-l-4 hover:shadow-lg",
      getCategoryColor(habit.category),
      isCompletedToday ? "opacity-95 bg-gradient-to-r from-pastel-yellow-50 via-pastel-pink-50 to-pastel-blue-50" : "hover:scale-[1.02]"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-gray-800">{habit.name}</h3>
            {isCompletedToday && (
              <div className="bg-pastel-yellow-200 px-2 py-1 rounded-full border border-pastel-yellow-300">
                <Check className="h-3 w-3 text-pastel-yellow-700 animate-check-mark" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {habit.completedDates.length} completions
            </span>
            <span className="capitalize bg-white/70 px-2 py-1 rounded-full border border-pastel-blue-200 text-pastel-blue-700">
              {habit.category}
            </span>
          </div>
        </div>
        
        {habit.streak > 0 && (
          <div className="flex items-center bg-gradient-to-r from-pastel-yellow-100 to-pastel-pink-100 px-3 py-2 rounded-full border border-pastel-yellow-300 shadow-sm">
            <Flame className="h-4 w-4 text-pastel-yellow-600 mr-1" />
            <span className="text-sm font-bold text-pastel-yellow-700">{habit.streak}</span>
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
            
            return (
              <div 
                key={i} 
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200",
                  isCompleted 
                    ? "bg-pastel-yellow-400 scale-110 shadow-sm" 
                    : isToday 
                      ? "bg-pastel-blue-200 ring-2 ring-pastel-blue-400" 
                      : "bg-pastel-pink-100"
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
              ? "border-pastel-yellow-400 text-pastel-yellow-700 hover:bg-pastel-yellow-50 bg-white/70" 
              : "bg-gradient-to-r from-pastel-blue-400 to-pastel-pink-400 hover:from-pastel-blue-500 hover:to-pastel-pink-500 text-white shadow-md hover:shadow-lg"
          )}
          onClick={() => onComplete(habit.id)}
          disabled={isCompletedToday}
        >
          <Check className={cn("h-4 w-4 mr-1", isCompletedToday && "animate-bounce")} />
          {isCompletedToday ? "Completed" : "Complete"}
        </Button>
      </div>
      
      {isCompletedToday && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-pastel-yellow-300/30 to-transparent rounded-bl-full">
          <Star className="absolute top-2 right-2 h-4 w-4 text-pastel-yellow-500 animate-pulse" />
        </div>
      )}
    </Card>
  );
};

export default HabitCard;
