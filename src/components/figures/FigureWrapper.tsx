import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Brain, ChevronRight, Maximize2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FigureWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
  mathBasis?: string;
  isHypothetical?: boolean;
}

export const FigureWrapper: React.FC<FigureWrapperProps> = ({
  id,
  title,
  subtitle = "Hypothetical",
  caption,
  children,
  className,
  mathBasis,
  isHypothetical = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <figure
      id={id}
      className={cn(
        "relative my-12 p-1 bg-white rounded-2xl transition-all duration-500",
        isHypothetical && "border-2 border-dashed border-gold-400/50 shadow-[0_0_20px_rgba(240,184,0,0.05)]",
        className
      )}
    >
      {/* Hypothesis Label */}
      {isHypothetical && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1 bg-gold-400/10 backdrop-blur-md border border-gold-400/30 rounded-full text-gold-700 text-[10px] font-bold tracking-widest uppercase">
          <Brain className="w-3 h-3" />
          Hypothesis
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-0">
        <h3 className="text-2xl font-serif text-navy-900 leading-tight">
          Figure {id.replace('fig-', '')} — {title}
          {subtitle && <span className="text-sm italic text-navy-400 ml-2">({subtitle})</span>}
        </h3>
      </div>

      {/* Main Content Area */}
      <div className="relative min-h-[400px] w-full bg-cream-50/50 rounded-xl overflow-hidden mt-4 group">
        {children}
        
        {/* Hover Overlay for Conjecture Explanation */}
        <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/5 transition-colors pointer-events-none" />
        
        {/* Math Basis Toggle */}
        {mathBasis && (
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-cream-200 rounded-lg text-navy-700 text-xs font-medium hover:bg-white hover:shadow-lg transition-all"
            >
              <Info className="w-4 h-4 text-gold-500" />
              Mathematical Basis
            </button>
          </div>
        )}
      </div>

      {/* Math Basis Content */}
      <AnimatePresence>
        {isExpanded && mathBasis && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-cream-50 border-t border-cream-200"
          >
            <div className="p-6 text-sm text-navy-800 leading-relaxed">
              <div className="flex items-center gap-2 mb-3 text-gold-700 font-bold uppercase tracking-tighter text-[10px]">
                <ChevronRight className="w-3 h-3" />
                Proven Foundation
              </div>
              <div className="prose prose-sm prose-navy max-w-none">
                {mathBasis}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Caption */}
      <figcaption className="p-6 pt-4 text-[12.5px] text-navy-500 font-light italic leading-relaxed border-t border-cream-100">
        {caption}
        {isHypothetical && <span className="ml-2 not-italic font-bold text-gold-600">🧠 Hypothetical visualization</span>}
      </figcaption>
    </figure>
  );
};
