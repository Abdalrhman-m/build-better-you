
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  monthYear: string;
  completedDates: string[];
  currentMonth: number;
  currentYear: number;
  onDateSelect?: (date: string) => void;
  habits?: Array<{ id: string; name: string; completedDates: string[] }>;
}

const StreakCalendar = ({ 
  monthYear, 
  completedDates, 
  currentMonth, 
  currentYear,
  onDateSelect,
  habits = []
}: StreakCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Get days in month and first day of month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Create array of day numbers
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Create array for empty spaces at the beginning
  const emptySpaces = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  // Combine arrays
  const allDays = [...emptySpaces, ...days];
  
  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Only allow selection of past dates and today
    if (dateStr <= today) {
      setSelectedDate(selectedDate === dateStr ? null : dateStr);
      if (onDateSelect) {
        onDateSelect(dateStr);
      }
    }
  };
  
  return (
    <Card className="overflow-hidden border-2 border-pastel-pink-200 bg-gradient-to-br from-pastel-yellow-50 via-white to-pastel-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-pastel-pink-100 to-pastel-yellow-100 border-b border-pastel-pink-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-pastel-pink-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-pastel-pink-600" />
            {monthYear}
          </CardTitle>
          <div className="flex gap-1">
            <Star className="h-4 w-4 text-pastel-yellow-500 animate-pulse" />
            <Heart className="h-4 w-4 text-pastel-pink-500 animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-pastel-pink-600 mt-1">
          ✨ Click on past days to mark habits complete! ✨
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={`header-${i}`} className="text-xs font-bold text-pastel-blue-600 py-2 bg-pastel-blue-100 rounded-full">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {allDays.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} />;
            }
            
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isCompleted = completedDates.includes(dateStr);
            const today = new Date().toISOString().split('T')[0];
            const isToday = dateStr === today;
            const isPast = dateStr < today;
            const isFuture = dateStr > today;
            const isSelected = selectedDate === dateStr;
            
            // Count habits completed on this date
            const habitsCompletedCount = habits.filter(habit => 
              habit.completedDates.includes(dateStr)
            ).length;
            
            return (
              <button
                key={`day-${i}`}
                onClick={() => handleDateClick(day)}
                disabled={isFuture}
                className={cn(
                  "relative flex items-center justify-center rounded-full aspect-square text-sm font-medium transition-all duration-200 hover:scale-110 active:scale-95",
                  {
                    // Today styling
                    "bg-gradient-to-br from-pastel-yellow-300 to-pastel-pink-300 text-white shadow-md ring-2 ring-pastel-yellow-400 animate-pulse": isToday && !isCompleted,
                    "bg-gradient-to-br from-pastel-yellow-400 to-pastel-pink-400 text-white shadow-lg ring-2 ring-pastel-yellow-500": isToday && isCompleted,
                    
                    // Past days styling
                    "bg-pastel-blue-100 text-pastel-blue-600 hover:bg-pastel-blue-200 cursor-pointer": isPast && !isCompleted,
                    "bg-gradient-to-br from-pastel-pink-300 to-pastel-yellow-300 text-white shadow-md hover:shadow-lg cursor-pointer": isPast && isCompleted,
                    
                    // Future days styling
                    "bg-gray-50 text-gray-300 cursor-not-allowed": isFuture,
                    
                    // Selected styling
                    "ring-4 ring-pastel-pink-400 ring-opacity-50 scale-110": isSelected,
                  }
                )}
                title={isFuture ? "Future date" : `${dateStr} - Click to toggle habits`}
              >
                <span className="relative z-10">{day}</span>
                
                {/* Completion indicator */}
                {habitsCompletedCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-pastel-yellow-400 text-pastel-yellow-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                    {habitsCompletedCount}
                  </div>
                )}
                
                {/* Special effects for streaks */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-pastel-yellow-400/20 to-pastel-pink-400/20 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <div className="flex items-center gap-2 bg-pastel-pink-50 p-2 rounded-lg border border-pastel-pink-200">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pastel-pink-300 to-pastel-yellow-300"></div>
            <span className="text-pastel-pink-700 font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-2 bg-pastel-blue-50 p-2 rounded-lg border border-pastel-blue-200">
            <div className="w-3 h-3 rounded-full bg-pastel-blue-200"></div>
            <span className="text-pastel-blue-700 font-medium">Available</span>
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-4 p-3 bg-gradient-to-r from-pastel-yellow-100 to-pastel-pink-100 rounded-lg border-2 border-pastel-pink-200 animate-fade-in">
            <p className="text-sm font-medium text-pastel-pink-700 mb-2">
              📅 Selected: {new Date(selectedDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-pastel-pink-600">
              Click on your habits to mark them complete for this day! 🌟
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
