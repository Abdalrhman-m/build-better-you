
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Flame, Calendar, Crown, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/types/habit';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string, date?: string) => void;
  onUncomplete: (id: string, date?: string) => void;
  onDelete: (id: string) => void;
  selectedDate?: string | null;
}

const HabitCard = ({ habit, onComplete, onUncomplete, onDelete, selectedDate }: HabitCardProps) => {
  const today = new Date().toISOString().split('T')[0];
  const targetDate = selectedDate || today;
  const isCompletedForDate = habit.completedDates.includes(targetDate);
  const isCompletedToday = habit.completedDates.includes(today);
  const isHistoricalDate = selectedDate && selectedDate !== today;
  
  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'border-l-rose-300 bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30',
      productivity: 'border-l-blue-300 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30',
      mindfulness: 'border-l-amber-300 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/30',
      learning: 'border-l-rose-300 bg-gradient-to-br from-rose-50/40 via-amber-50/20 to-blue-50/30',
      social: 'border-l-blue-300 bg-gradient-to-br from-blue-50/60 via-white to-rose-50/20',
    };
    return colors[category as keyof typeof colors] || 'border-l-blue-300 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30';
  };
  
  const handleToggleComplete = () => {
    if (isCompletedForDate) {
      onUncomplete(habit.id, selectedDate || undefined);
    } else {
      onComplete(habit.id, selectedDate || undefined);
    }
  };
  
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden transition-all duration-300 border-l-4 hover:shadow-lg border border-gray-100/80 backdrop-blur-sm",
      getCategoryColor(habit.category),
      isCompletedForDate 
        ? "bg-gradient-to-br from-amber-50/70 via-rose-50/40 to-blue-50/60 border-l-amber-400 shadow-md" 
        : "hover:scale-[1.01] hover:border-l-4 shadow-sm"
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-xl text-gray-800 tracking-tight leading-tight">{habit.name}</h3>
            {isCompletedForDate && (
              <div className="bg-gradient-to-r from-amber-100/90 to-rose-100/90 px-3 py-1.5 rounded-full border border-amber-200/60 shadow-sm backdrop-blur-sm">
                <Check className="h-4 w-4 text-amber-700" />
              </div>
            )}
            {isHistoricalDate && (
              <div className="bg-blue-50/90 px-3 py-1 rounded-full border border-blue-200/60 backdrop-blur-sm">
                <Calendar className="h-3 w-3 text-blue-600" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed font-light">{habit.description}</p>
          
          {isHistoricalDate && (
            <p className="text-xs text-blue-600 mb-3 font-medium bg-blue-50/60 px-3 py-1 rounded-full inline-block border border-blue-100">
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
            <span className="capitalize bg-white/80 px-3 py-1.5 rounded-full border border-gray-200/60 text-gray-600 font-medium backdrop-blur-sm">
              {habit.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {habit.streak > 0 && (
            <div className="flex items-center bg-gradient-to-r from-amber-100/90 to-rose-100/90 px-4 py-2 rounded-full border border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm">
              <Crown className="h-4 w-4 text-amber-600 mr-2" />
              <span className="text-sm font-semibold text-amber-700">{habit.streak}</span>
              <Flame className="h-3 w-3 text-rose-500 ml-2" />
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => onDelete(habit.id)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Habit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                    ? "bg-gradient-to-br from-amber-300 to-rose-300 scale-110 shadow-sm border-amber-400/60" 
                    : isToday 
                      ? "bg-blue-200/80 ring-2 ring-blue-300/60 border-blue-300/60" 
                      : "bg-gray-100 border-gray-200",
                  isSelected && "ring-2 ring-rose-300/60 scale-125"
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
            "transition-all duration-300 font-medium shadow-sm hover:shadow-md",
            isCompletedForDate 
              ? "border border-amber-300/60 text-amber-700 hover:bg-amber-50/60 bg-white/90 backdrop-blur-sm" 
              : "bg-gradient-to-r from-blue-400/90 via-rose-400/90 to-amber-400/90 hover:from-blue-500 hover:via-rose-500 hover:to-amber-500 text-white hover:scale-105 border-none backdrop-blur-sm"
          )}
          onClick={handleToggleComplete}
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            {isCompletedForDate 
              ? (isHistoricalDate ? "Unmark" : "Unmark") 
              : (isHistoricalDate ? "Mark Complete" : "Complete")
            }
            {!isCompletedForDate && <Star className="h-3 w-3" />}
          </div>
        </Button>
      </div>
      
      {isCompletedForDate && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-200/20 via-rose-200/10 to-transparent rounded-bl-full">
          <Star className="absolute top-3 right-3 h-4 w-4 text-amber-400" />
        </div>
      )}
      
      {/* Elegant decorative accent */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-rose-200/40 to-transparent"></div>
    </Card>
  );
};

export default HabitCard;
