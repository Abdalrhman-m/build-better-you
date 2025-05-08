
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="py-12">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-habit-purple bg-clip-text text-transparent">
            Build Better Habits, <br />One Day at a Time
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Track your habits, build streaks, and achieve your goals with our powerful habit tracking platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth?signup=true">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">Try Demo</Link>
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M9 12h6"></path><path d="M12 9v6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Habits</h3>
              <p className="text-muted-foreground">
                Easily create and customize habits that align with your goals.
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-habit-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-habit-blue"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Streaks</h3>
              <p className="text-muted-foreground">
                Build momentum with daily streaks and stay consistent.
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-habit-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-habit-purple"><path d="M3 3v18h18"></path><path d="m3 15 5-5 4 4 8-8"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">View Analytics</h3>
              <p className="text-muted-foreground">
                Gain insights with detailed analytics on your habit progress.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-muted py-12 px-6 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Build Better Habits?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of others who are transforming their lives through consistent habit building.
          </p>
          <Button size="lg" asChild>
            <Link to="/auth?signup=true">Get Started for Free</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
