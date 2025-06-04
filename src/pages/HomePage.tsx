
import React from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Calendar, Award, Sparkles, Heart, Star } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue-50 via-background to-pastel-pink-50">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-pastel-yellow-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-pastel-pink-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-pastel-blue-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-pastel-yellow-100 rounded-full opacity-25 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <Logo size="lg" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="border-pastel-blue-300 text-pastel-blue-700 hover:bg-pastel-blue-50"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-pastel-yellow-400 animate-pulse" />
              <Logo size="lg" className="scale-150" />
              <Heart className="absolute -bottom-4 -right-4 h-8 w-8 text-pastel-pink-400 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pastel-blue-500 via-pastel-pink-400 to-pastel-yellow-500 bg-clip-text text-transparent">
              Medovate
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Transform your life one habit at a time. Track, analyze, and 
            <span className="bg-gradient-to-r from-pastel-blue-600 to-pastel-pink-500 bg-clip-text text-transparent font-semibold"> meditate </span>
            on your progress with beautiful analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-pastel-blue-400 to-pastel-pink-400 hover:from-pastel-blue-500 hover:to-pastel-pink-500 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/analytics')}
              className="px-8 py-4 text-lg border-pastel-yellow-300 text-pastel-yellow-700 hover:bg-pastel-yellow-50"
            >
              View Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-gradient-to-br from-pastel-blue-50 to-pastel-blue-100 backdrop-blur-sm rounded-2xl p-6 border border-pastel-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="bg-pastel-blue-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-pastel-blue-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-pastel-blue-800">Goal Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Set meaningful habits and track your daily progress with intuitive visual feedback.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pastel-pink-50 to-pastel-pink-100 backdrop-blur-sm rounded-2xl p-6 border border-pastel-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="bg-pastel-pink-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-pastel-pink-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-pastel-pink-800">Smart Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Visualize your progress with beautiful charts and detailed performance insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pastel-yellow-50 to-pastel-yellow-100 backdrop-blur-sm rounded-2xl p-6 border border-pastel-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="bg-pastel-yellow-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Calendar className="h-6 w-6 text-pastel-yellow-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-pastel-yellow-800">Streak Calendar</h3>
              <p className="text-muted-foreground text-sm">
                Maintain momentum with visual streak tracking and completion calendars.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pastel-blue-50 via-pastel-pink-50 to-pastel-yellow-50 backdrop-blur-sm rounded-2xl p-6 border border-pastel-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-pastel-pink-200 to-pastel-yellow-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Award className="h-6 w-6 text-pastel-pink-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-pastel-pink-800">Achievement System</h3>
              <p className="text-muted-foreground text-sm">
                Celebrate milestones and build lasting habits with our motivation system.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-pastel-blue-200 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Made by Medo with <Heart className="h-4 w-4 text-pastel-pink-400" />
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Abdalrhman-m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-pastel-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdalrhman-mohammed-697146211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-pastel-pink-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/0ii_am/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-pastel-yellow-600 transition-colors"
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
