import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import HabitList from '@/components/habits/HabitList';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AddHabitDialog from '@/components/habits/AddHabitDialog';
import StreakCalendar from '@/components/analytics/StreakCalendar';
import { useHabits } from '@/hooks/use-habits';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };
  
  // Filter habits by category for tabs
  const healthHabits = getHabitsByCategory('health');
  const productivityHabits = getHabitsByCategory('productivity');
  const mindfulnessHabits = getHabitsByCategory('mindfulness');
  const learningHabits = getHabitsByCategory('learning');
  const socialHabits = getHabitsByCategory('social');
  const otherHabits = habits.filter(h => !['health', 'productivity', 'mindfulness', 'learning', 'social'].includes(h.category));

  // Get current date info for calendar
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Get all completed dates from all habits
  const allCompletedDates = habits.reduce((acc, habit) => {
    habit.completedDates.forEach(date => {
      if (!acc.includes(date)) {
        acc.push(date);
      }
    });
    return acc;
  }, [] as string[]);

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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <StreakCalendar
            monthYear={monthYear}
            completedDates={allCompletedDates}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onDateSelect={handleDateSelect}
            habits={habits}
          />
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 overflow-auto bg-gradient-to-r from-pastel-pink-100 to-pastel-blue-100 border-2 border-pastel-pink-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-pastel-yellow-200 data-[state=active]:text-pastel-yellow-800">All Habits ({habits.length})</TabsTrigger>
              {healthHabits.length > 0 && <TabsTrigger value="health" className="data-[state=active]:bg-pastel-pink-200 data-[state=active]:text-pastel-pink-800">Health ({healthHabits.length})</TabsTrigger>}
              {productivityHabits.length > 0 && <TabsTrigger value="productivity" className="data-[state=active]:bg-pastel-blue-200 data-[state=active]:text-pastel-blue-800">Productivity ({productivityHabits.length})</TabsTrigger>}
              {mindfulnessHabits.length > 0 && <TabsTrigger value="mindfulness" className="data-[state=active]:bg-pastel-yellow-200 data-[state=active]:text-pastel-yellow-800">Mindfulness ({mindfulnessHabits.length})</TabsTrigger>}
              {learningHabits.length > 0 && <TabsTrigger value="learning" className="data-[state=active]:bg-pastel-pink-200 data-[state=active]:text-pastel-pink-800">Learning ({learningHabits.length})</TabsTrigger>}
              {socialHabits.length > 0 && <TabsTrigger value="social" className="data-[state=active]:bg-pastel-blue-200 data-[state=active]:text-pastel-blue-800">Social ({socialHabits.length})</TabsTrigger>}
              {otherHabits.length > 0 && <TabsTrigger value="other" className="data-[state=active]:bg-pastel-yellow-200 data-[state=active]:text-pastel-yellow-800">Other ({otherHabits.length})</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="all">
              <HabitList habits={habits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="health">
              <HabitList habits={healthHabits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="productivity">
              <HabitList habits={productivityHabits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="mindfulness">
              <HabitList habits={mindfulnessHabits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="learning">
              <HabitList habits={learningHabits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="social">
              <HabitList habits={socialHabits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="other">
              <HabitList habits={otherHabits} onCompleteHabit={completeHabit} selectedDate={selectedDate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <AddHabitDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddHabit={handleAddHabit}
      />
    </MainLayout>
  );
};

export default DashboardPage;
