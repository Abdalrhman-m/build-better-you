
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StreakCalendarProps {
  monthYear: string; // e.g., "May 2023"
  completedDates: string[]; // e.g., ["2023-05-01", "2023-05-02"]
  currentMonth: number; // 0-11 (Jan-Dec)
  currentYear: number;
}

const StreakCalendar = ({ monthYear, completedDates, currentMonth, currentYear }: StreakCalendarProps) => {
  // Get days in month and first day of month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Create array of day numbers
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Create array for empty spaces at the beginning (to align with weekdays)
  const emptySpaces = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  // Combine arrays
  const allDays = [...emptySpaces, ...days];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{monthYear}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Weekday headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={`header-${i}`} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {allDays.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} />;
            }
            
            // Format date string to match completedDates format (YYYY-MM-DD)
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isCompleted = completedDates.includes(dateStr);
            
            // Check if this is the current day
            const isToday = (
              currentYear === new Date().getFullYear() &&
              currentMonth === new Date().getMonth() &&
              day === new Date().getDate()
            );
            
            return (
              <div
                key={`day-${i}`}
                className={`
                  flex items-center justify-center rounded-full aspect-square text-sm
                  ${isCompleted ? 'bg-habit-green text-white' : 'hover:bg-muted'}
                  ${isToday && !isCompleted ? 'ring-1 ring-primary' : ''}
                  transition-colors
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
