
// Helper function to calculate streak from completion dates
export const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  // Sort dates in descending order (most recent first)
  const sortedDates = completedDates
    .map(date => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  // Check if there's a completion for today or yesterday
  const mostRecentCompletion = sortedDates[0];
  mostRecentCompletion.setHours(0, 0, 0, 0);
  
  // If most recent completion is more than 1 day ago, streak is 0
  const daysDiff = Math.floor((today.getTime() - mostRecentCompletion.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 1) return 0;
  
  // Start checking from today or yesterday
  if (daysDiff === 1) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  // Count consecutive days going backwards
  for (const completionDate of sortedDates) {
    completionDate.setHours(0, 0, 0, 0);
    
    if (completionDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};
