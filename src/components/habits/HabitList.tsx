
import React from 'react';
import HabitCard from './HabitCard';
import { Habit } from '@/types/habit';

interface HabitListProps {
  habits: Habit[];
  onCompleteHabit: (id: string) => void;
}

const HabitList = ({ habits, onCompleteHabit }: HabitListProps) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No habits to display. Create your first habit to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          onComplete={onCompleteHabit} 
        />
      ))}
    </div>
  );
};

export default HabitList;
