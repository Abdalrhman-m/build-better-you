
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar } from 'lucide-react';
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
      health: 'border-l-green-500 bg-green-50 dark:bg-green-950',
      productivity: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950',
      mindfulness: 'border-l-purple-500 bg-purple-50 dark:bg-purple-950',
      learning: 'border-l-orange-500 bg-orange-50 dark:bg-orange-950',
      social: 'border-l-pink-500 bg-pink-50 dark:bg-pink-950',
    };
    return colors[category as keyof typeof colors] || 'border-l-gray-500 bg-gray-50 dark:bg-gray-950';
  };
  
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden transition-all duration-300 border-l-4 hover:shadow-lg",
      getCategoryColor(habit.category),
      isCompletedToday ? "opacity-90 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950" : "hover:scale-[1.02]"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{habit.name}</h3>
            {isCompletedToday && (
              <div className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {habit.completedDates.length} completions
            </span>
            <span className="capitalize bg-white dark:bg-gray-800 px-2 py-1 rounded-full border">
              {habit.category}
            </span>
          </div>
        </div>
        
        {habit.streak > 0 && (
          <div className="flex items-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 px-3 py-2 rounded-full border border-orange-200 dark:border-orange-800">
            <Flame className="h-4 w-4 text-orange-500 mr-1" />
            <span className="text-sm font-bold text-orange-700 dark:text-orange-300">{habit.streak}</span>
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
                    ? "bg-green-500 scale-110" 
                    : isToday 
                      ? "bg-blue-200 dark:bg-blue-800 ring-2 ring-blue-400" 
                      : "bg-gray-200 dark:bg-gray-700"
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
              ? "border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950" 
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          )}
          onClick={() => onComplete(habit.id)}
          disabled={isCompletedToday}
        >
          <Check className={cn("h-4 w-4 mr-1", isCompletedToday && "animate-bounce")} />
          {isCompletedToday ? "Completed" : "Complete"}
        </Button>
      </div>
      
      {isCompletedToday && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-400/20 to-transparent rounded-bl-full" />
      )}
    </Card>
  );
};

export default HabitCard;
