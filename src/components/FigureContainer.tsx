import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FigureContainerProps {
  id: string;
  title: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export const FigureContainer: React.FC<FigureContainerProps> = ({
  id,
  title,
  caption,
  children,
  className,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <figure
      id={id}
      className={cn(
        'my-12 p-8 rounded-2xl border transition-all duration-500',
        isDark 
          ? 'bg-navy-800 border-navy-700 text-cream-50' 
          : 'bg-cream-50 border-cream-200 text-navy-800',
        className
      )}
    >
      <div className="mb-6">
        <h4 className={cn(
          'font-serif text-2xl md:text-3xl font-semibold mb-2',
          isDark ? 'text-gold-400' : 'text-navy-800'
        )}>
          {title}
        </h4>
        <div className={cn(
          'h-1 w-24 rounded-full',
          isDark ? 'bg-gold-400' : 'bg-navy-800'
        )} />
      </div>

      <div className="relative overflow-hidden rounded-xl bg-opacity-50 min-h-[400px]">
        {children}
      </div>

      <figcaption className={cn(
        'mt-6 font-sans text-sm italic leading-relaxed opacity-80',
        isDark ? 'text-cream-100' : 'text-navy-600'
      )}>
        {caption}
      </figcaption>
    </figure>
  );
};
