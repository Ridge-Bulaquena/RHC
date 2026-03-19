import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react';

const FoldProcessVisual: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Initial Manifold',
      description: 'The probability space is represented as a continuous manifold of distributions.',
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div 
            className="w-48 h-48 border-2 border-blue-500/50 rounded-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-blue-300 font-mono text-[10px] uppercase tracking-widest">
              Full Space
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: 'Symmetry Identification',
      description: 'The fold operator identifies the mirror symmetry across the uniform distribution (θ = π/2).',
      visual: (
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="w-48 h-48 border-2 border-blue-500/30 rounded-full relative">
            <motion.div 
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
            />
            <div className="absolute inset-0 flex justify-between items-center px-8 text-blue-300 font-mono text-[10px] uppercase tracking-widest">
              <span>A</span>
              <span>B</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'The Fold Transformation',
      description: 'Region B is folded onto Region A, projecting the manifold onto its symmetric half.',
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <motion.div 
              className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
            <motion.div 
              className="absolute inset-0 bg-purple-500/20 border-2 border-purple-500 rounded-full"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Bhattacharyya Overlap',
      description: 'The resulting overlap between the original and folded states determines the information distance.',
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div 
            className="w-48 h-48 bg-emerald-500/30 border-2 border-emerald-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-emerald-200 font-mono block mb-1">Overlap ρ</span>
              <div className="text-3xl font-mono text-white">cos(Δθ)</div>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Layers className="text-blue-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          The Information-Theoretic "Fold" Process
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          A procedural decomposition of the fold operator $\Phi$, showing how 
          symmetry and projection are used to calculate information distances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visual Area */}
        <div className="relative aspect-square bg-navy-950/50 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full"
            >
              {steps[step].visual}
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>Step {step + 1} of {steps.length}</span>
          </div>
        </div>

        {/* Content and Controls */}
        <div className="space-y-8">
          <div className="min-h-[160px]">
            <motion.h4 
              key={`title-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-serif italic text-white mb-4"
            >
              {steps[step].title}
            </motion.h4>
            <motion.p 
              key={`desc-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 leading-relaxed"
            >
              {steps[step].description}
            </motion.p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`p-4 rounded-full border transition-all ${step === 0 ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextStep}
              disabled={step === steps.length - 1}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full border transition-all ${step === steps.length - 1 ? 'opacity-20 cursor-not-allowed' : 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500'}`}
            >
              <span className="font-mono uppercase tracking-widest text-xs">Next Phase</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.10: Procedural Decomposition of the Fold Operator.
      </div>
    </div>
  );
};

export default FoldProcessVisual;
