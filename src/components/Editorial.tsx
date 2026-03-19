import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Quote, BookOpen } from 'lucide-react';

export const PullQuote: React.FC<{ children: React.ReactNode; author?: string }> = ({ children, author }) => (
  <div className="my-12 border-l-4 border-gold-400 pl-8 py-4">
    <Quote className="text-gold-400 mb-4 opacity-50" size={32} />
    <blockquote className="text-3xl font-serif font-bold text-navy-800 leading-tight italic mb-4">
      {children}
    </blockquote>
    {author && <cite className="text-sm font-mono text-gold-600 uppercase tracking-widest">— {author}</cite>}
  </div>
);

export const GlossaryTerm: React.FC<{ term: string; definition: string; children: React.ReactNode }> = ({ term, definition, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="border-b border-dotted border-gold-400 hover:text-gold-600 transition-colors cursor-help"
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-navy-800 text-cream-50 rounded-xl shadow-2xl z-50 border border-gold-400/30 block"
          >
            <span className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-gold-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">{term}</span>
            </span>
            <span className="text-xs leading-relaxed opacity-80 block">{definition}</span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-navy-800" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export const Citation: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-[10px] font-mono text-gold-600 hover:text-gold-800 transition-colors align-top ml-0.5"
      >
        [{id}]
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-2 w-80 p-6 bg-white border border-cream-200 rounded-xl shadow-2xl z-50 block"
          >
            <span className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-gold-600" />
              <span className="text-xs font-bold text-navy-800">Reference [{id}]</span>
            </span>
            <span className="text-sm text-navy-600 leading-relaxed italic block">
              {children}
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 text-navy-400 hover:text-navy-800"
            >
              ×
            </button>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
