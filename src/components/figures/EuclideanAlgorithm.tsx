import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw, Play, Pause } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

interface Step {
  a: number;
  b: number;
  q: number;
  r: number;
  angle: number;
}

const generateSteps = (a: number, b: number): Step[] => {
  const steps: Step[] = [];
  let currA = a;
  let currB = b;

  while (currB > 0) {
    const q = Math.floor(currA / currB);
    const r = currA % currB;
    const angle = Math.atan(currB / currA) * (180 / Math.PI);
    steps.push({ a: currA, b: currB, q, r, angle });
    currA = currB;
    currB = r;
  }
  return steps;
};

export const EuclideanAlgorithm: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const steps = generateSteps(55, 34);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const currentStep = steps[stepIndex];

  return (
    <FigureContainer
      id="fig-1-2"
      title="Figure 1.2 — The Euclidean Algorithm Visualized"
      caption="The Euclidean algorithm for (55,34). Each step reduces the pair while preserving the GCD. The sequence of angles θ_k encodes the continued fraction expansion."
      variant="dark"
    >
      <div className="relative h-full grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
        
        {/* Left Panel: Rectangle Decomposition */}
        <div className="flex flex-col items-center justify-center bg-navy-900/50 rounded-2xl p-6 border border-gold-400/10">
          <h5 className="text-sm font-mono text-gold-400 mb-6 uppercase tracking-widest">Rectangle Decomposition</h5>
          <div className="relative w-full aspect-square max-w-[200px] border border-gold-400/30">
            <motion.div 
              className="absolute inset-0 bg-gold-400/10"
              initial={false}
              animate={{ width: `${(currentStep.b / 55) * 100}%`, height: `${(currentStep.a / 55) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-400 font-mono text-xs">
              {currentStep.a} × {currentStep.b}
            </div>
          </div>
          <p className="mt-6 text-xs text-cream-200 text-center font-light leading-relaxed">
            Step {stepIndex + 1}: Reducing {currentStep.a} by {currentStep.b}
          </p>
        </div>

        {/* Middle Panel: Equation Display */}
        <div className="flex flex-col items-center justify-center bg-navy-900/50 rounded-2xl p-6 border border-gold-400/10">
          <h5 className="text-sm font-mono text-gold-400 mb-6 uppercase tracking-widest">Iterative Reduction</h5>
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-serif text-cream-50 mb-4">
                <span className="text-gold-400">{currentStep.a}</span> = 
                <span className="text-gold-300"> {currentStep.q}</span> · 
                <span className="text-gold-400"> {currentStep.b}</span> + 
                <span className="text-cream-50"> {currentStep.r}</span>
              </div>
              <div className="text-xs font-mono text-gold-400/60 uppercase tracking-widest">
                a = q · b + r
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Panel: Angle Diagram */}
        <div className="flex flex-col items-center justify-center bg-navy-900/50 rounded-2xl p-6 border border-gold-400/10">
          <h5 className="text-sm font-mono text-gold-400 mb-6 uppercase tracking-widest">Angular Transformation</h5>
          <div className="relative w-full aspect-square max-w-[200px] flex items-end justify-start">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <motion.path
                d={`M 0 100 L 100 100 L 100 ${100 - (currentStep.b / currentStep.a) * 100} Z`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gold-400"
                initial={false}
                animate={{ d: `M 0 100 L 100 100 L 100 ${100 - (currentStep.b / currentStep.a) * 100} Z` }}
                transition={{ duration: 0.8 }}
              />
              <motion.circle
                cx="0" cy="100" r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="1 1"
                className="text-gold-400/50"
              />
            </svg>
            <div className="absolute bottom-2 left-8 text-gold-400 font-mono text-xs">
              θ = {currentStep.angle.toFixed(2)}°
            </div>
          </div>
          <p className="mt-6 text-xs text-cream-200 text-center font-light leading-relaxed">
            The angle θ encodes the ratio b/a
          </p>
        </div>

        {/* Controls */}
        <div className="lg:col-span-3 flex items-center justify-center gap-6 mt-4">
          <button 
            onClick={() => setStepIndex((prev) => (prev - 1 + steps.length) % steps.length)}
            className="p-2 rounded-full bg-gold-400/10 hover:bg-gold-400/20 text-gold-400 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-gold-400 text-navy-800 flex items-center justify-center hover:bg-gold-300 transition-colors shadow-lg"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={() => setStepIndex((prev) => (prev + 1) % steps.length)}
            className="p-2 rounded-full bg-gold-400/10 hover:bg-gold-400/20 text-gold-400 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <button 
            onClick={() => { setStepIndex(0); setIsPlaying(false); }}
            className="p-2 rounded-full bg-gold-400/10 hover:bg-gold-400/20 text-gold-400 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="lg:col-span-3 flex justify-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setStepIndex(idx); setIsPlaying(false); }}
              className={`h-1 rounded-full transition-all duration-300 ${
                stepIndex === idx ? 'w-8 bg-gold-400' : 'w-2 bg-gold-400/20 hover:bg-gold-400/40'
              }`}
            />
          ))}
        </div>
      </div>
    </FigureContainer>
  );
};
