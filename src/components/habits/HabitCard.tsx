
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar, Crown } from 'lucide-react';
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
      health: 'border-l-pink-300 bg-gradient-to-br from-pink-50 via-white to-pink-50/50',
      productivity: 'border-l-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-50/50',
      mindfulness: 'border-l-yellow-300 bg-gradient-to-br from-yellow-50 via-white to-yellow-50/50',
      learning: 'border-l-pink-200 bg-gradient-to-br from-pink-25 via-yellow-25 to-blue-25',
      social: 'border-l-blue-200 bg-gradient-to-br from-blue-50 via-white to-pink-50/30',
    };
    return colors[category as keyof typeof colors] || 'border-l-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-50/50';
  };
  
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden transition-all duration-500 border-l-4 hover:shadow-2xl border border-gray-100",
      getCategoryColor(habit.category),
      isCompletedForDate 
        ? "bg-gradient-to-br from-yellow-50/80 via-pink-50/50 to-blue-50/80 border-l-yellow-400 shadow-xl backdrop-blur-sm" 
        : "hover:scale-[1.01] hover:border-l-4 shadow-lg backdrop-blur-sm"
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-xl text-gray-800 tracking-tight">{habit.name}</h3>
            {isCompletedForDate && (
              <div className="bg-gradient-to-r from-yellow-200/80 to-pink-200/80 px-4 py-1.5 rounded-full border border-yellow-300/50 shadow-sm backdrop-blur-sm">
                <Check className="h-4 w-4 text-yellow-700" />
              </div>
            )}
            {isHistoricalDate && (
              <div className="bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200/50 backdrop-blur-sm">
                <Calendar className="h-3 w-3 text-blue-600" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{habit.description}</p>
          
          {isHistoricalDate && (
            <p className="text-xs text-blue-600 mb-3 font-medium bg-blue-50/50 px-3 py-1 rounded-full inline-block">
              📅 {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          )}
          
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              {habit.completedDates.length} completions
            </span>
            <span className="capitalize bg-white/70 px-3 py-1.5 rounded-full border border-gray-200/50 text-gray-600 font-medium backdrop-blur-sm">
              {habit.category}
            </span>
          </div>
        </div>
        
        {habit.streak > 0 && (
          <div className="flex items-center bg-gradient-to-r from-yellow-100/80 to-pink-100/80 px-4 py-2.5 rounded-full border border-yellow-200/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm">
            <Crown className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-700">{habit.streak}</span>
            <Flame className="h-3 w-3 text-pink-500 ml-2" />
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
            const isSelected = selectedDate === dateStr;
            
            return (
              <div 
                key={i} 
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 border",
                  isCompleted 
                    ? "bg-gradient-to-br from-yellow-300 to-pink-300 scale-110 shadow-sm border-yellow-400/50" 
                    : isToday 
                      ? "bg-blue-200/70 ring-2 ring-blue-300/50 border-blue-300/50" 
                      : "bg-gray-100 border-gray-200",
                  isSelected && "ring-2 ring-pink-300/50 scale-125"
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
            "transition-all duration-300 font-medium shadow-md hover:shadow-lg",
            isCompletedForDate 
              ? "border border-yellow-300/50 text-yellow-700 hover:bg-yellow-50/50 bg-white/80 backdrop-blur-sm" 
              : "bg-gradient-to-r from-blue-300/80 via-pink-300/80 to-yellow-300/80 hover:from-blue-400/90 hover:via-pink-400/90 hover:to-yellow-400/90 text-white hover:scale-105 border-none backdrop-blur-sm"
          )}
          onClick={() => onComplete(habit.id, selectedDate || undefined)}
          disabled={false}
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            {isCompletedForDate 
              ? (isHistoricalDate ? "Completed" : "Done Today") 
              : (isHistoricalDate ? "Mark Complete" : "Complete")
            }
            {!isCompletedForDate && <Star className="h-3 w-3" />}
          </div>
        </Button>
      </div>
      
      {isCompletedForDate && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-200/20 via-pink-200/10 to-transparent rounded-bl-full">
          <Star className="absolute top-3 right-3 h-4 w-4 text-yellow-400" />
        </div>
      )}
      
      {/* Subtle decorative accent */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent"></div>
    </Card>
  );
};

export default HabitCard;
