
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import ProgressRing from '@/components/analytics/ProgressRing';
import StreakCalendar from '@/components/analytics/StreakCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHabits } from '@/hooks/use-habits';
import { useAnalytics } from '@/hooks/use-analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const AnalyticsPage = () => {
  const { habits, totalHabits, completedToday, currentStreak, isLoading: habitsLoading } = useHabits();
  const { analytics, isLoading: analyticsLoading } = useAnalytics();
  
  // Set current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthYear = `${monthNames[currentMonth]} ${currentYear}`;
  
  // Calculate completion percentage
  const completionPercentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  
  // Calculate category distribution
  const categoryCounts = habits.reduce((acc, habit) => {
    acc[habit.category] = (acc[habit.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get all completed dates from habits
  const allCompletedDates = habits.flatMap(habit => habit.completedDates);
  
  // Calculate weekly and monthly percentages
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const weeklyCompletions = allCompletedDates.filter(date => {
    const completionDate = new Date(date);
    return completionDate >= oneWeekAgo;
  }).length;
  
  const monthlyCompletions = allCompletedDates.filter(date => {
    const completionDate = new Date(date);
    return completionDate >= oneMonthAgo;
  }).length;
  
  const weeklyPercentage = habits.length > 0 ? Math.round((weeklyCompletions / (habits.length * 7)) * 100) : 0;
  const monthlyPercentage = habits.length > 0 ? Math.round((monthlyCompletions / (habits.length * 30)) * 100) : 0;

  if (habitsLoading || analyticsLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your progress and see your habit building journey
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Habits</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalHabits}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed Today</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{completedToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Current Streak</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{currentStreak}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Completion Rate</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{completionPercentage}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
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
            <CardTitle className="text-xl">Today's Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            <ProgressRing progress={completionPercentage} size={120} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Habit Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {Object.keys(categoryCounts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <span>{Math.round((count / totalHabits) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-500" 
                        style={{ width: `${(count / totalHabits) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No habits yet. Create your first habit to see analytics!
              </p>
            )}
          </CardContent>
        </Card>
        
        <StreakCalendar
          monthYear={monthYear}
          completedDates={allCompletedDates}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Habit Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {habits.length > 0 ? (
            <Tabs defaultValue="individual">
              <TabsList className="mb-4">
                <TabsTrigger value="individual">Individual Habits</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="individual">
                <div className="space-y-4">
                  {habits.slice(0, 5).map((habit) => {
                    const completionRate = habit.completedDates.length > 0 
                      ? Math.round((habit.completedDates.length / 30) * 100) 
                      : 0;
                    
                    return (
                      <div key={habit.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h3 className="font-medium">{habit.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Completed {habit.completedDates.length} times | Streak: {habit.streak} days
                          </p>
                        </div>
                        <ProgressRing progress={completionRate} size={60} />
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="overview">
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-2">{completionPercentage}%</h3>
                  <p className="text-muted-foreground">Overall completion rate today</p>
                  <div className="mt-4 grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{weeklyPercentage}%</p>
                      <p className="text-xs text-muted-foreground">This Week</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{monthlyPercentage}%</p>
                      <p className="text-xs text-muted-foreground">This Month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{currentStreak}</p>
                      <p className="text-xs text-muted-foreground">Max Streak</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No habits yet. Create your first habit to see performance analytics!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AnalyticsPage;
