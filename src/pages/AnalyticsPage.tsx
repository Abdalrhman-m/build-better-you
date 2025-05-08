
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ProgressRing from '@/components/analytics/ProgressRing';
import StreakCalendar from '@/components/analytics/StreakCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for demonstration
const sampleCompletedDates = [
  '2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05',
  '2023-05-08', '2023-05-09', '2023-05-10', '2023-05-11', '2023-05-12',
  '2023-05-15', '2023-05-16', '2023-05-17', '2023-05-18', '2023-05-19',
  '2023-05-22', '2023-05-23', '2023-05-24', '2023-05-25', '2023-05-26',
  new Date().toISOString().split('T')[0] // Today
];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const AnalyticsPage = () => {
  // Set current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthYear = `${monthNames[currentMonth]} ${currentYear}`;
  
  // Calculate streak percentages for demo
  const weeklyPercentage = 85;
  const monthlyPercentage = 72;
  const yearlyPercentage = 65;
  
  // Calculate habit category distribution for demo
  const categoryCounts = {
    health: 3,
    productivity: 2,
    mindfulness: 1,
    learning: 2,
    social: 1
  };
  
  const totalHabits = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Analytics</h1>
        <p className="text-muted-foreground">
          Track your progress and see your habit building journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            <ProgressRing progress={weeklyPercentage} size={120} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            <ProgressRing progress={monthlyPercentage} size={120} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Yearly Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            <ProgressRing progress={yearlyPercentage} size={120} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Habit Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{category}</span>
                    <span>{Math.round((count / totalHabits) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${(count / totalHabits) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <StreakCalendar
          monthYear={monthYear}
          completedDates={sampleCompletedDates}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Habit Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Drink 8 glasses of water</h3>
                    <p className="text-sm text-muted-foreground">Completed 6/7 days</p>
                  </div>
                  <ProgressRing progress={85} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Read for 30 minutes</h3>
                    <p className="text-sm text-muted-foreground">Completed 5/7 days</p>
                  </div>
                  <ProgressRing progress={71} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Meditate for 10 minutes</h3>
                    <p className="text-sm text-muted-foreground">Completed 4/7 days</p>
                  </div>
                  <ProgressRing progress={57} size={60} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Drink 8 glasses of water</h3>
                    <p className="text-sm text-muted-foreground">Completed 25/30 days</p>
                  </div>
                  <ProgressRing progress={83} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Read for 30 minutes</h3>
                    <p className="text-sm text-muted-foreground">Completed 20/30 days</p>
                  </div>
                  <ProgressRing progress={67} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Meditate for 10 minutes</h3>
                    <p className="text-sm text-muted-foreground">Completed 15/30 days</p>
                  </div>
                  <ProgressRing progress={50} size={60} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Drink 8 glasses of water</h3>
                    <p className="text-sm text-muted-foreground">Completed 250/365 days</p>
                  </div>
                  <ProgressRing progress={68} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Read for 30 minutes</h3>
                    <p className="text-sm text-muted-foreground">Completed 200/365 days</p>
                  </div>
                  <ProgressRing progress={55} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Meditate for 10 minutes</h3>
                    <p className="text-sm text-muted-foreground">Completed 180/365 days</p>
                  </div>
                  <ProgressRing progress={49} size={60} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AnalyticsPage;
