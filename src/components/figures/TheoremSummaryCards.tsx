import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Shield, Globe, ChevronRight, BookOpen, Target, Cpu } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

const theorems = [
  {
    id: 'thm-3-1',
    title: 'Theorem 3.1: GCD as Geometric Construct',
    description: 'The GCD of (a,b) is the scale factor relating the actual triangle to its primitive form.',
    formula: 'd = |z| / √(p² + q²)',
    icon: <Target size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'thm-3-2',
    title: 'Theorem 3.2: Angle Complementarity',
    description: 'Each step of the Euclidean algorithm reduces the problem to a smaller angle in a precise algebraic way.',
    formula: 'tan θ₁ = 1 / (q + tan θ₂)',
    icon: <Zap size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'thm-3-4',
    title: 'Theorem 3.4: Fold as Inner Product',
    description: 'The fold operator applied to normalized vectors extracts the cosine of the angle between them.',
    formula: 'F(u/v) = cos(θ₁ - θ₂)',
    icon: <Shield size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'thm-3-6',
    title: 'Theorem 3.6: Fold and Chebyshev',
    description: 'The fold operator links to Chebyshev polynomials, connecting arithmetic to approximation theory.',
    formula: 'F(xⁿ) = Tₙ(cos θ)',
    icon: <Cpu size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
];

export const TheoremSummaryCards: React.FC = () => {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  return (
    <FigureContainer
      id="fig-3-10"
      title="Figure 3.10 — Summary of Core Theorems"
      caption="The core results of Chapter 3 establish the bridge between arithmetic and geometry. Click each card to see the fundamental identity."
      variant="dark"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {theorems.map((thm) => (
          <div 
            key={thm.id} 
            className="relative h-[320px] w-full perspective-1000 cursor-pointer"
            onClick={() => setFlippedId(flippedId === thm.id ? null : thm.id)}
          >
            <motion.div
              className="w-full h-full transition-all duration-700 preserve-3d"
              animate={{ rotateY: flippedId === thm.id ? 180 : 0 }}
            >
              {/* Front Side */}
              <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 ${thm.borderColor} ${thm.color} p-8 flex flex-col items-center justify-center text-center shadow-xl`}>
                <div className="p-4 bg-gold-400/10 rounded-full mb-6">
                  {thm.icon}
                </div>
                <h3 className="font-serif font-bold text-cream-50 text-lg leading-tight mb-4">
                  {thm.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-gold-400/60 font-mono text-[10px] uppercase tracking-widest">
                  <span>Click to flip</span>
                  <ChevronRight size={12} />
                </div>
              </div>

              {/* Back Side */}
              <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 border-gold-400 bg-gold-400 p-8 flex flex-col items-center justify-center text-center rotate-y-180 shadow-xl`}>
                <p className="text-navy-900 font-serif font-medium text-sm leading-relaxed mb-6 italic">
                  "{thm.description}"
                </p>
                <div className="w-full h-px bg-navy-900/20 mb-6" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-navy-900/60 uppercase tracking-widest">Fundamental Identity</span>
                  <span className="text-navy-900 font-bold text-xs uppercase tracking-wider">
                    {thm.formula}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </FigureContainer>
  );
};
