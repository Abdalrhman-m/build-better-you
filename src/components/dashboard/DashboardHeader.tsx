
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProgressRing from '../analytics/ProgressRing';

interface DashboardHeaderProps {
  totalHabits: number;
  completedToday: number;
  currentStreak: number;
  onAddHabit: () => void;
}

const DashboardHeader = ({ 
  totalHabits, 
  completedToday, 
  currentStreak, 
  onAddHabit 
}: DashboardHeaderProps) => {
  const completionPercentage = totalHabits === 0 
    ? 0 
    : Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">My Habits</h1>
        <p className="text-muted-foreground">
          Track your progress and build consistency
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <ProgressRing progress={completionPercentage} size={80} className="mb-2">
              <div className="text-center">
                <div className="text-xl font-bold">{completedToday}/{totalHabits}</div>
                <div className="text-xs text-muted-foreground">Today</div>
              </div>
            </ProgressRing>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day streak</div>
          </div>
        </div>
        
        <Button onClick={onAddHabit}>
          <Plus className="h-4 w-4 mr-1" />
          Add Habit
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
