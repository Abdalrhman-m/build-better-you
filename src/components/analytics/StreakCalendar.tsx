
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Crown } from 'lucide-react';
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
    <Card className="overflow-hidden border border-gray-200 bg-gradient-to-br from-white via-pink-50/20 to-blue-50/20 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
      <CardHeader className="pb-4 bg-gradient-to-r from-pink-50/50 via-white to-blue-50/50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3 tracking-tight">
            <Calendar className="h-5 w-5 text-pink-500" />
            {monthYear}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-yellow-500" />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 font-medium">
          Select past dates to mark habits complete
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-7 gap-2 text-center mb-6">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={`header-${i}`} className="text-xs font-semibold text-gray-600 py-3 bg-gray-50/50 rounded-lg border border-gray-100">
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
                  "relative flex items-center justify-center rounded-xl aspect-square text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 border backdrop-blur-sm",
                  {
                    // Today styling
                    "bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-700 shadow-md ring-2 ring-yellow-300/50 border-yellow-200": isToday && !isCompleted,
                    "bg-gradient-to-br from-yellow-200 to-pink-200 text-gray-800 shadow-lg ring-2 ring-yellow-400/50 border-yellow-300": isToday && isCompleted,
                    
                    // Past days styling
                    "bg-blue-50/70 text-blue-600 hover:bg-blue-100/70 cursor-pointer border-blue-100 hover:border-blue-200": isPast && !isCompleted,
                    "bg-gradient-to-br from-pink-100 to-yellow-100 text-gray-700 shadow-md hover:shadow-lg cursor-pointer border-pink-200 hover:border-pink-300": isPast && isCompleted,
                    
                    // Future days styling
                    "bg-gray-50/50 text-gray-300 cursor-not-allowed border-gray-100": isFuture,
                    
                    // Selected styling
                    "ring-2 ring-pink-300/70 scale-105 shadow-lg": isSelected,
                  }
                )}
                title={isFuture ? "Future date" : `${dateStr} - Click to toggle habits`}
              >
                <span className="relative z-10 font-semibold">{day}</span>
                
                {/* Completion indicator */}
                {habitsCompletedCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-300 to-pink-300 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white shadow-sm backdrop-blur-sm">
                    {habitsCompletedCount}
                  </div>
                )}
                
                {/* Subtle completion overlay */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 to-pink-200/10 rounded-xl" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Elegant Legend */}
        <div className="grid grid-cols-2 gap-3 mt-6 text-xs">
          <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50/50 to-yellow-50/50 p-3 rounded-xl border border-pink-100/50 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-200 to-yellow-200 border border-pink-300/50"></div>
            <span className="text-gray-600 font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200/50"></div>
            <span className="text-gray-600 font-medium">Available</span>
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50/50 via-pink-50/30 to-blue-50/50 rounded-xl border border-pink-100/50 backdrop-blur-sm shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              📅 Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-xs text-gray-600">
              Mark your habits as complete for this date
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
