
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import ProgressRing from '../analytics/ProgressRing';
import AICoachModal from '@/components/ai/AICoachModal';

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
  const [showAICoach, setShowAICoach] = useState(false);
  
  const completionPercentage = totalHabits === 0 
    ? 0 
    : Math.round((completedToday / totalHabits) * 100);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Habits
          </h1>
          <p className="text-muted-foreground">
            Track your progress and build consistency with AI guidance
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
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAICoach(true)}
              variant="outline"
              className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              AI Coach
            </Button>
            
            <Button onClick={onAddHabit}>
              <Plus className="h-4 w-4 mr-1" />
              Add Habit
            </Button>
          </div>
        </div>
      </div>

      <AICoachModal
        open={showAICoach}
        onOpenChange={setShowAICoach}
        initialType="brainstorming"
      />
    </>
  );
};

export default DashboardHeader;
