
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import HabitList from '@/components/habits/HabitList';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AddHabitDialog from '@/components/habits/AddHabitDialog';
import { useHabits } from '@/hooks/use-habits';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    habits,
    getHabitsByCategory,
    isLoading,
    createHabit,
    completeHabit,
    totalHabits,
    completedToday,
    currentStreak
  } = useHabits();
  
  const handleAddHabit = ({ name, description, category }: { name: string, description: string, category: string }) => {
    createHabit({ name, description, category });
    setIsDialogOpen(false);
  };
  
  // Filter habits by category for tabs
  const healthHabits = getHabitsByCategory('health');
  const productivityHabits = getHabitsByCategory('productivity');
  const mindfulnessHabits = getHabitsByCategory('mindfulness');
  const learningHabits = getHabitsByCategory('learning');
  const socialHabits = getHabitsByCategory('social');
  const otherHabits = habits.filter(h => !['health', 'productivity', 'mindfulness', 'learning', 'social'].includes(h.category));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <DashboardHeader
        totalHabits={totalHabits}
        completedToday={completedToday}
        currentStreak={currentStreak}
        onAddHabit={() => setIsDialogOpen(true)}
      />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 overflow-auto">
          <TabsTrigger value="all">All Habits ({habits.length})</TabsTrigger>
          {healthHabits.length > 0 && <TabsTrigger value="health">Health ({healthHabits.length})</TabsTrigger>}
          {productivityHabits.length > 0 && <TabsTrigger value="productivity">Productivity ({productivityHabits.length})</TabsTrigger>}
          {mindfulnessHabits.length > 0 && <TabsTrigger value="mindfulness">Mindfulness ({mindfulnessHabits.length})</TabsTrigger>}
          {learningHabits.length > 0 && <TabsTrigger value="learning">Learning ({learningHabits.length})</TabsTrigger>}
          {socialHabits.length > 0 && <TabsTrigger value="social">Social ({socialHabits.length})</TabsTrigger>}
          {otherHabits.length > 0 && <TabsTrigger value="other">Other ({otherHabits.length})</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="all">
          <HabitList habits={habits} onCompleteHabit={completeHabit} />
        </TabsContent>
        <TabsContent value="health">
          <HabitList habits={healthHabits} onCompleteHabit={completeHabit} />
        </TabsContent>
        <TabsContent value="productivity">
          <HabitList habits={productivityHabits} onCompleteHabit={completeHabit} />
        </TabsContent>
        <TabsContent value="mindfulness">
          <HabitList habits={mindfulnessHabits} onCompleteHabit={completeHabit} />
        </TabsContent>
        <TabsContent value="learning">
          <HabitList habits={learningHabits} onCompleteHabit={completeHabit} />
        </TabsContent>
        <TabsContent value="social">
          <HabitList habits={socialHabits} onCompleteHabit={completeHabit} />
        </TabsContent>
        <TabsContent value="other">
          <HabitList habits={otherHabits} onCompleteHabit={completeHabit} />
        </TabsContent>
      </Tabs>
      
      <AddHabitDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddHabit={handleAddHabit}
      />
    </MainLayout>
  );
};

export default DashboardPage;
