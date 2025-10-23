'use client';

import { HeartPulse, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
}

export default function Logo({ className = '', showText = true, variant = 'default' }: LogoProps) {
  const colorClasses = {
    default: 'text-primary-600',
    white: 'text-white',
    dark: 'text-gray-900'
  };

  const textColorClasses = {
    default: 'text-gray-900',
    white: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* HeartPulse icon representing mental health and wellbeing */}
        <HeartPulse className={`h-8 w-8 ${colorClasses[variant]} stroke-[2.5]`} />
        <Sparkles className={`h-3 w-3 ${colorClasses[variant]} absolute -top-1 -right-1 fill-current`} />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl font-bold font-display ${textColorClasses[variant]}`}>
            MentalFit
          </span>
          <span className={`text-xs font-medium ${variant === 'white' ? 'text-gray-200' : 'text-gray-500'} -mt-1`}>
            Tu bienestar importa
          </span>
        </div>
      )}
    </div>
  );
}