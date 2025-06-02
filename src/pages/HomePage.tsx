
import React from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Calendar, Award, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo size="lg" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-500 animate-pulse" />
              <Logo size="lg" className="scale-150" />
              <Sparkles className="absolute -bottom-4 -right-4 h-8 w-8 text-yellow-500 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              Medovate
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Transform your life one habit at a time. Track, analyze, and 
            <span className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent font-semibold"> meditate </span>
            on your progress with beautiful analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 text-white px-8 py-4 text-lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/analytics')}
              className="px-8 py-4 text-lg"
            >
              View Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Goal Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Set meaningful habits and track your daily progress with intuitive visual feedback.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Visualize your progress with beautiful charts and detailed performance insights.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Streak Calendar</h3>
              <p className="text-muted-foreground text-sm">
                Maintain momentum with visual streak tracking and completion calendars.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Achievement System</h3>
              <p className="text-muted-foreground text-sm">
                Celebrate milestones and build lasting habits with our motivation system.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="text-sm text-muted-foreground">
              Made by Medo with 🩵
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Abdalrhman-m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdalrhman-mohammed-697146211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/0ii_am/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
