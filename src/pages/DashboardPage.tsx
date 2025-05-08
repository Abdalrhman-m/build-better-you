
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import HabitList from '@/components/habits/HabitList';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AddHabitDialog from '@/components/habits/AddHabitDialog';
import { useToast } from '@/hooks/use-toast';
import { Habit } from '@/types/habit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample initial habits
const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    streak: 5,
    category: 'health',
    completedDates: [
      '2023-05-04', '2023-05-05', '2023-05-06', '2023-05-07', '2023-05-08',
      // Get today's date in YYYY-MM-DD format
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    id: '2',
    name: 'Read for 30 minutes',
    description: 'Read non-fiction books to learn new things',
    streak: 3,
    category: 'learning',
    completedDates: [
      '2023-05-06', '2023-05-07', '2023-05-08',
    ],
  },
  {
    id: '3',
    name: 'Meditate for 10 minutes',
    description: 'Practice mindfulness to reduce stress',
    streak: 0,
    category: 'mindfulness',
    completedDates: [],
  },
];

const DashboardPage = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleAddHabit = ({ name, description, category }: { name: string, description: string, category: string }) => {
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name,
      description,
      streak: 0,
      category,
      completedDates: [],
    };
    
    setHabits([...habits, newHabit]);
  };
  
  const handleCompleteHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isAlreadyCompleted = habit.completedDates.includes(today);
        
        if (isAlreadyCompleted) return habit;
        
        // Check if yesterday was completed to increment streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayFormatted = yesterday.toISOString().split('T')[0];
        
        const isYesterdayCompleted = habit.completedDates.includes(yesterdayFormatted);
        const newStreak = isYesterdayCompleted ? habit.streak + 1 : 1;
        
        toast({
          title: "Habit completed!",
          description: `You've completed "${habit.name}" today.`,
        });
        
        return {
          ...habit,
          completedDates: [...habit.completedDates, today],
          streak: newStreak,
        };
      }
      return habit;
    }));
  };
  
  // Filter habits by category for tabs
  const healthHabits = habits.filter(h => h.category === 'health');
  const productivityHabits = habits.filter(h => h.category === 'productivity');
  const mindfulnessHabits = habits.filter(h => h.category === 'mindfulness');
  const learningHabits = habits.filter(h => h.category === 'learning');
  const socialHabits = habits.filter(h => h.category === 'social');
  const otherHabits = habits.filter(h => !['health', 'productivity', 'mindfulness', 'learning', 'social'].includes(h.category));
  
  // Calculate metrics
  const totalHabits = habits.length;
  const completedToday = habits.filter(
    h => h.completedDates.includes(new Date().toISOString().split('T')[0])
  ).length;
  
  // Get the highest streak
  const currentStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
  
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
          <TabsTrigger value="all">All Habits</TabsTrigger>
          {healthHabits.length > 0 && <TabsTrigger value="health">Health</TabsTrigger>}
          {productivityHabits.length > 0 && <TabsTrigger value="productivity">Productivity</TabsTrigger>}
          {mindfulnessHabits.length > 0 && <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>}
          {learningHabits.length > 0 && <TabsTrigger value="learning">Learning</TabsTrigger>}
          {socialHabits.length > 0 && <TabsTrigger value="social">Social</TabsTrigger>}
          {otherHabits.length > 0 && <TabsTrigger value="other">Other</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="all">
          <HabitList habits={habits} onCompleteHabit={handleCompleteHabit} />
        </TabsContent>
        <TabsContent value="health">
          <HabitList habits={healthHabits} onCompleteHabit={handleCompleteHabit} />
        </TabsContent>
        <TabsContent value="productivity">
          <HabitList habits={productivityHabits} onCompleteHabit={handleCompleteHabit} />
        </TabsContent>
        <TabsContent value="mindfulness">
          <HabitList habits={mindfulnessHabits} onCompleteHabit={handleCompleteHabit} />
        </TabsContent>
        <TabsContent value="learning">
          <HabitList habits={learningHabits} onCompleteHabit={handleCompleteHabit} />
        </TabsContent>
        <TabsContent value="social">
          <HabitList habits={socialHabits} onCompleteHabit={handleCompleteHabit} />
        </TabsContent>
        <TabsContent value="other">
          <HabitList habits={otherHabits} onCompleteHabit={handleCompleteHabit} />
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
