import React from 'react';
import { motion } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { AlertTriangle, Zap, HelpCircle, ArrowRight } from 'lucide-react';

export const InterpretiveFramework: React.FC = () => {
  return (
    <FigureWrapper
      id="fig-5-1"
      title="Interpretive Framework: Epistemological Stance"
      subtitle="Cautious Exploration"
      caption="The RHC extends from rigorous mathematics into speculative physical interpretation. This chapter explores analogies that generate testable predictions."
      mathBasis="The transition from Chapter 4 (Information Geometry) to Chapter 5 (Physics) is a transition from proven mathematical correspondences (Fisher metric, GCD-radius theorem) to interpretative hypotheses about the nature of reality."
    >
      <div className="relative w-full h-full flex items-center justify-center bg-navy-900 p-8 overflow-hidden">
        {/* Background Particles (Speculative Mist) */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold-400 rounded-full blur-sm"
              initial={{ 
                x: Math.random() * 1000, 
                y: Math.random() * 600,
                opacity: 0.2
              }}
              animate={{ 
                x: [null, Math.random() * 1000],
                y: [null, Math.random() * 600],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">
          {/* Left Side: Solid Foundations */}
          <motion.div 
            className="flex-1 p-8 bg-white/5 backdrop-blur-xl border border-gold-400/20 rounded-2xl text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gold-400 rounded-sm shadow-[0_0_10px_rgba(240,184,0,0.3)]" />
                ))}
              </div>
            </div>
            <h4 className="text-gold-400 font-serif text-xl mb-2">Rigorous Mathematics</h4>
            <p className="text-cream-200 text-xs leading-relaxed opacity-70">
              Chapters 2–4: GCD–radius, Fold properties, Fisher metric.
              <br />
              <span className="font-bold text-gold-500/80 uppercase tracking-widest mt-2 block">Proven Foundation</span>
            </p>
          </motion.div>

          {/* The Bridge */}
          <div className="relative flex flex-col items-center">
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-gold-400 to-transparent relative"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-gold-500" />
                <span className="text-[8px] font-bold text-gold-500 uppercase tracking-widest">Analogy</span>
              </div>
            </motion.div>
            <ArrowRight className="w-6 h-6 text-gold-400 mt-2" />
          </div>

          {/* Right Side: Speculative Interpretation */}
          <motion.div 
            className="flex-1 p-8 bg-gold-400/5 backdrop-blur-sm border-2 border-dashed border-gold-400/30 rounded-2xl text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Misty Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/40 to-transparent pointer-events-none" />
            
            <div className="mb-6 flex justify-center relative z-10">
              <HelpCircle className="w-12 h-12 text-gold-400/50 animate-pulse" />
            </div>
            <h4 className="text-cream-50 font-serif text-xl mb-2 relative z-10">Speculative Interpretation</h4>
            <p className="text-cream-200 text-xs leading-relaxed opacity-70 relative z-10">
              Chapter 5: State Space, Measurement, Emergent Spacetime.
              <br />
              <span className="font-bold text-gold-400/80 uppercase tracking-widest mt-2 block italic">Conjectural Hypotheses</span>
            </p>
          </motion.div>

          {/* Far Right: The Light */}
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-24 h-24 rounded-full bg-gold-400/20 blur-2xl absolute"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Zap className="w-8 h-8 text-gold-400 mb-2" />
              <div className="text-gold-400 font-bold text-2xl tracking-tighter">18</div>
              <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest">Predictions</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 text-[10px] font-bold uppercase tracking-widest text-cream-400/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gold-400 rounded-sm" /> Solid: Proven
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-dashed border-gold-400 rounded-sm" /> Dashed: Conjectural
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
