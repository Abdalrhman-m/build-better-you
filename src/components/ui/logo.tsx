
import React from 'react';
import { Heart, Target } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          <Heart className="absolute inset-0 text-red-500 animate-pulse" fill="currentColor" />
          <Target className="absolute inset-0 text-blue-500 scale-75" />
        </div>
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          Medovate
        </span>
      )}
    </div>
  );
};
