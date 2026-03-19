import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className, delay = 0 }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={cn("py-16 md:py-24 border-b border-cream-300 last:border-0", className)}
    >
      {title && (
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl text-navy-800 mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: delay + 0.3 }}
              className="text-gold-700 font-serif italic text-xl md:text-2xl"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.4 }}
            className="h-0.5 bg-gold-400 mt-6"
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none prose-navy">
        {children}
      </div>
    </motion.section>
  );
};

interface CalloutProps {
  type: 'key' | 'def' | 'critique';
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({ type, label, children, className }) => {
  const typeClasses = {
    key: 'callout-key',
    def: 'callout-def',
    critique: 'callout-critique',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("callout", typeClasses[type], className)}
    >
      <span className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-80">
        {label}
      </span>
      <div className="text-lg leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};
