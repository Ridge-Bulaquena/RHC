import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Circle, Star, ChevronRight } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

const objectives = [
  {
    id: 'obj-1',
    title: 'Discrete Foundation',
    description: 'Establish a discrete arithmetic basis for spacetime using integer pairs (a,b) and the Euclidean algorithm.',
    chapter: 'Chapter 2',
    status: 'completed',
    icon: <Circle size={20} className="text-gold-400" />,
    color: 'bg-gold-400/10',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'obj-2',
    title: 'Geometric Embedding',
    description: 'Map discrete structures to the complex plane and derive the Fisher information metric.',
    chapter: 'Chapter 3',
    status: 'completed',
    icon: <Circle size={20} className="text-gold-400" />,
    color: 'bg-navy-900/5',
    borderColor: 'border-navy-900/10',
  },
  {
    id: 'obj-3',
    title: 'Physical Unification',
    description: 'Reconstruct General Relativity and Quantum Mechanics from information-geometric principles.',
    chapter: 'Chapter 4',
    status: 'in-progress',
    icon: <Star size={20} className="text-gold-400" />,
    color: 'bg-gold-400/5',
    borderColor: 'border-gold-400/20',
  },
  {
    id: 'obj-4',
    title: 'Falsifiable Predictions',
    description: 'Derive 18 specific, testable predictions for cosmological and particle physics observables.',
    chapter: 'Chapter 5',
    status: 'pending',
    icon: <Circle size={20} className="text-navy-400" />,
    color: 'bg-navy-900/5',
    borderColor: 'border-navy-900/10',
  },
];

export const ObjectivesRoadmap: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <FigureContainer
      id="fig-1-9"
      title="Figure 1.9 — RHC Objectives Roadmap"
      caption="The strategic roadmap of the Recursive Harmonic Codex, detailing the progression from discrete foundations to physical unification."
      variant="light"
    >
      <div className="flex flex-col md:flex-row gap-8 min-h-[400px]">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {objectives.map((obj, idx) => (
            <motion.button
              key={obj.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
                activeIndex === idx 
                  ? 'border-gold-400 bg-gold-400/10 shadow-lg' 
                  : 'border-cream-200 bg-white hover:border-gold-400/30'
              }`}
              whileHover={{ x: 5 }}
            >
              <div className={`p-2 rounded-full ${activeIndex === idx ? 'bg-gold-400 text-navy-900' : 'bg-cream-100 text-navy-400'}`}>
                {obj.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest leading-none mb-1">{obj.chapter}</span>
                <span className="font-serif font-bold text-navy-800 text-sm">{obj.title}</span>
              </div>
              <ChevronRight size={16} className={`ml-auto transition-transform ${activeIndex === idx ? 'rotate-90' : ''}`} />
            </motion.button>
          ))}
        </div>

        {/* Detailed Content Display */}
        <div className="w-full md:w-2/3 bg-navy-800 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-900/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gold-400/20 rounded-2xl border border-gold-400/30">
                  {objectives[activeIndex].icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">{objectives[activeIndex].chapter}</span>
                  <h3 className="text-3xl font-serif font-bold text-cream-50">{objectives[activeIndex].title}</h3>
                </div>
              </div>

              <p className="text-lg text-cream-50/80 leading-relaxed mb-8 font-light italic">
                "{objectives[activeIndex].description}"
              </p>

              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gold-400/60 uppercase tracking-widest">Status</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    objectives[activeIndex].status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    objectives[activeIndex].status === 'in-progress' ? 'bg-gold-400/20 text-gold-400' :
                    'bg-navy-400/20 text-navy-400'
                  }`}>
                    {objectives[activeIndex].status}
                  </span>
                </div>
                <ArrowRight className="text-gold-400/40" size={24} />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gold-400/60 uppercase tracking-widest">Next Milestone</span>
                  <span className="text-xs text-cream-50 font-medium">
                    {activeIndex < objectives.length - 1 ? objectives[activeIndex + 1].title : 'Final Synthesis'}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            {objectives.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-500 ${activeIndex === idx ? 'w-8 bg-gold-400' : 'w-2 bg-gold-400/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </FigureContainer>
  );
};
