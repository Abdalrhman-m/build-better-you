
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string) => void;
}

const HabitCard = ({ habit, onComplete }: HabitCardProps) => {
  const isCompletedToday = habit.completedDates.includes(new Date().toISOString().split('T')[0]);
  
  return (
    <Card className={cn(
      "p-4 relative overflow-hidden transition-all duration-300 border-l-4",
      isCompletedToday ? "border-l-habit-green opacity-80" : "border-l-gray-300 hover:border-l-primary"
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-lg">{habit.name}</h3>
          <p className="text-sm text-muted-foreground">{habit.description}</p>
        </div>
        {habit.streak > 0 && (
          <div className="flex items-center bg-muted px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-habit-orange mr-1" />
            <span className="text-xs font-medium">{habit.streak}</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => {
            // This would show the last 5 days of history
            const date = new Date();
            date.setDate(date.getDate() - (4 - i));
            const dateStr = date.toISOString().split('T')[0];
            const isCompleted = habit.completedDates.includes(dateStr);
            const isFuture = i === 4; // Last dot represents today
            
            return (
              <div 
                key={i} 
                className={cn(
                  "streak-dot",
                  isCompleted ? "streak-dot-completed" : 
                  isFuture ? "streak-dot-future" : "streak-dot-missed"
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
            isCompletedToday && "border-green-500 text-green-500"
          )}
          onClick={() => onComplete(habit.id)}
          disabled={isCompletedToday}
        >
          <Check className={cn("h-4 w-4 mr-1", isCompletedToday && "animate-check-mark")} />
          {isCompletedToday ? "Completed" : "Complete"}
        </Button>
      </div>
    </Card>
  );
};

export default HabitCard;
