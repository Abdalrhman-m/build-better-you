
import React from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Calendar, Award, Sparkles, Heart, Star, Zap, Rainbow } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-baby-blue-100 relative overflow-hidden">
      {/* Enhanced floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-300 to-yellow-200 rounded-full opacity-70 floating-element shadow-xl"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-300 to-pink-200 rounded-full opacity-80 floating-element shadow-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/3 w-12 h-12 bg-gradient-to-r from-baby-blue-300 to-baby-blue-200 rounded-full opacity-90 floating-element shadow-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full opacity-60 floating-element shadow-xl" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-gradient-to-r from-pink-400 to-baby-blue-300 rounded-full opacity-85 floating-element shadow-xl" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-60 left-1/2 w-14 h-14 bg-gradient-to-r from-baby-blue-300 to-yellow-300 rounded-full opacity-75 floating-element shadow-xl" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Logo size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-100 hover:border-pink-400 transform hover:scale-105 transition-all duration-300 rounded-full px-6 shadow-lg"
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
            <div className="relative transform hover:scale-110 transition-transform duration-500">
              <Sparkles className="absolute -top-6 -left-6 h-10 w-10 text-yellow-400 sparkle" />
              <Rainbow className="absolute -top-2 -right-8 h-8 w-8 text-pink-400 sparkle" style={{ animationDelay: '0.5s' }} />
              <Logo size="lg" className="scale-150" />
              <Heart className="absolute -bottom-6 -right-6 h-10 w-10 text-pink-400 sparkle" style={{ animationDelay: '1s' }} />
              <Zap className="absolute -bottom-2 -left-8 h-8 w-8 text-baby-blue-400 sparkle" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-bounce-gentle">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-baby-blue-400 bg-clip-text text-transparent animate-rainbow">
              Medovate
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-8 leading-relaxed font-medium">
            Transform your life one habit at a time! Track, analyze, and 
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent font-bold animate-pulse"> meditate </span>
            on your progress with beautiful, colorful analytics! 🌈✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="playful-button text-white px-10 py-6 text-xl shadow-2xl rounded-full font-bold transform hover:scale-110 transition-all duration-300"
            >
              Start Your Magical Journey! 🚀
              <ArrowRight className="ml-3 h-6 w-6 animate-bounce" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/analytics')}
              className="px-10 py-6 text-xl border-3 border-yellow-400 text-yellow-600 hover:bg-yellow-100 hover:border-yellow-500 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-lg"
            >
              View Demo 🎨
            </Button>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-gradient-to-br from-baby-blue-100 to-baby-blue-200 backdrop-blur-sm rounded-3xl p-8 border-3 border-baby-blue-300 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform hover:-rotate-2">
              <div className="bg-gradient-to-r from-baby-blue-300 to-baby-blue-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-baby-blue-800">Goal Tracking 🎯</h3>
              <p className="text-baby-blue-700 font-medium">
                Set magical habits and track your daily progress with super fun visual feedback! ⭐
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-pink-200 backdrop-blur-sm rounded-3xl p-8 border-3 border-pink-300 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform hover:rotate-2">
              <div className="bg-gradient-to-r from-pink-300 to-pink-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-pink-800">Smart Analytics 📊</h3>
              <p className="text-pink-700 font-medium">
                See your amazing progress with colorful charts and detailed insights! 🌈
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 backdrop-blur-sm rounded-3xl p-8 border-3 border-yellow-300 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform hover:-rotate-2">
              <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-yellow-800">Streak Calendar 📅</h3>
              <p className="text-yellow-700 font-medium">
                Keep your momentum going with super cool streak tracking! 🔥
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-baby-blue-100 backdrop-blur-sm rounded-3xl p-8 border-3 border-pink-300 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform hover:rotate-2">
              <div className="bg-gradient-to-r from-pink-300 via-yellow-300 to-baby-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-pink-800">Achievement System 🏆</h3>
              <p className="text-pink-700 font-medium">
                Celebrate your wins and build amazing habits with our fun motivation system! 🎉
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t-3 border-gradient-to-r from-yellow-300 via-pink-300 to-baby-blue-300 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <Logo size="sm" />
            </div>
            <span className="text-sm font-medium flex items-center gap-2">
              Made by Medo with <Heart className="h-5 w-5 text-pink-400 animate-pulse" /> and lots of ✨
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Abdalrhman-m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-baby-blue-600 hover:text-baby-blue-800 transition-colors transform hover:scale-110 duration-300"
            >
              GitHub 💻
            </a>
            <a
              href="https://www.linkedin.com/in/abdalrhman-mohammed-697146211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-pink-600 hover:text-pink-800 transition-colors transform hover:scale-110 duration-300"
            >
              LinkedIn 💼
            </a>
            <a
              href="https://www.instagram.com/0ii_am/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-yellow-600 hover:text-yellow-800 transition-colors transform hover:scale-110 duration-300"
            >
              Instagram 📸
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
