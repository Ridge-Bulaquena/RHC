import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Shield, Globe, ChevronRight } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

const contributions = [
  {
    id: 'cont-1',
    title: 'Discrete-to-Continuous Mapping',
    description: 'A novel mapping from integer pairs (a,b) to the complex plane, providing a discrete origin for the Fisher metric.',
    impact: 'High: Bridges number theory and geometry.',
    icon: <Sparkles size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'cont-2',
    title: 'Universal Consilience',
    description: 'Demonstrates that the same recursive algorithms govern both prime distribution and gravitational field equations.',
    impact: 'Extreme: Unifies seemingly disparate physical domains.',
    icon: <Zap size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'cont-3',
    title: 'Falsifiable Predictions',
    description: 'Derives 18 specific, testable predictions for cosmological observables, including dark matter and dark energy.',
    impact: 'High: Provides a path to experimental verification.',
    icon: <Shield size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'cont-4',
    title: 'Information-Geometric Spacetime',
    description: 'Reconstructs spacetime as an emergent property of information-geometric distinguishability.',
    impact: 'Extreme: Redefines the nature of space and time.',
    icon: <Globe size={24} className="text-gold-400" />,
    color: 'bg-navy-800',
    borderColor: 'border-gold-400/30',
  },
];

export const ContributionsCards: React.FC = () => {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  return (
    <FigureContainer
      id="fig-1-10"
      title="Figure 1.10 — Contributions Summary Cards"
      caption="Key contributions of the Recursive Harmonic Codex. Click each card to flip and see the impact summary."
      variant="dark"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {contributions.map((cont) => (
          <div 
            key={cont.id} 
            className="relative h-[320px] w-full perspective-1000 cursor-pointer"
            onClick={() => setFlippedId(flippedId === cont.id ? null : cont.id)}
          >
            <motion.div
              className="w-full h-full transition-all duration-700 preserve-3d"
              animate={{ rotateY: flippedId === cont.id ? 180 : 0 }}
            >
              {/* Front Side */}
              <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 ${cont.borderColor} ${cont.color} p-8 flex flex-col items-center justify-center text-center shadow-xl`}>
                <div className="p-4 bg-gold-400/10 rounded-full mb-6">
                  {cont.icon}
                </div>
                <h3 className="font-serif font-bold text-cream-50 text-lg leading-tight mb-4">
                  {cont.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-gold-400/60 font-mono text-[10px] uppercase tracking-widest">
                  <span>Click to flip</span>
                  <ChevronRight size={12} />
                </div>
              </div>

              {/* Back Side */}
              <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 border-gold-400 bg-gold-400 p-8 flex flex-col items-center justify-center text-center rotate-y-180 shadow-xl`}>
                <p className="text-navy-900 font-serif font-medium text-sm leading-relaxed mb-6 italic">
                  "{cont.description}"
                </p>
                <div className="w-full h-px bg-navy-900/20 mb-6" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-navy-900/60 uppercase tracking-widest">Impact</span>
                  <span className="text-navy-900 font-bold text-xs uppercase tracking-wider">
                    {cont.impact}
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
