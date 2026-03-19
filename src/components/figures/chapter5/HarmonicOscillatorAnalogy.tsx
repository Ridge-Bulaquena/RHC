import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Layers } from 'lucide-react';

export const HarmonicOscillatorAnalogy: React.FC = () => {
  const [n, setN] = useState(2);
  const [ratio, setRatio] = useState(1.5);
  const [isAnimating, setIsAnimating] = useState(false);

  // Quantum Harmonic Oscillator Wavefunction (Simplified Hermite-Gaussian)
  const renderWavefunction = (n: number) => {
    const points = [];
    for (let x = -3; x <= 3; x += 0.1) {
      // Very simplified Hermite-Gaussian for visualization
      let y = Math.exp(-x * x / 2);
      if (n === 1) y *= x;
      if (n === 2) y *= (2 * x * x - 1);
      if (n === 3) y *= (x * (2 * x * x - 3));
      points.push({ x, y: y * 20 });
    }
    return points;
  };

  const qhoPoints = renderWavefunction(n);

  return (
    <FigureWrapper
      id="fig-5-3"
      title="Hypothesis 1: Harmonic Oscillator Analogy"
      subtitle="Discrete vs. Continuous"
      caption="Analogy: Just as a harmonic oscillator has discrete quantum number n and continuous frequency ω, the RHC has discrete pair (a,b) and continuous angle θ."
      mathBasis="The energy levels of a quantum harmonic oscillator are E_n = ℏω(n + ½), where n is a discrete integer and ω is a continuous parameter. Similarly, the RHC state space is defined by discrete integers (a,b) and a continuous parameter θ = arctan(b/a)."
    >
      <div className="w-full h-full bg-navy-900 p-8 flex flex-col md:flex-row gap-8 overflow-hidden relative">
        {/* Left Panel: QHO */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-gold-400/20 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-gold-400 font-serif text-lg">Quantum Harmonic Oscillator</h4>
            <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Discrete n, Continuous ω</div>
          </div>

          <div className="flex-1 relative flex items-center justify-center min-h-[200px]">
            {/* Parabolic Potential */}
            <svg viewBox="-50 -50 100 100" className="absolute inset-0 w-full h-full opacity-20">
              <path d="M -40 -40 Q 0 40 40 -40" fill="none" stroke="white" strokeWidth="0.5" />
            </svg>

            {/* Energy Levels */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {[0, 1, 2, 3].map((level) => (
                <motion.div
                  key={level}
                  className={cn(
                    "w-32 h-[1px] transition-all duration-500",
                    level === n ? "bg-gold-400 shadow-[0_0_10px_rgba(240,184,0,0.8)]" : "bg-white/20"
                  )}
                  initial={false}
                  animate={{ scaleX: level === n ? 1.2 : 1 }}
                />
              ))}
            </div>

            {/* Wavefunction */}
            <svg viewBox="-30 -30 60 60" className="relative z-10 w-full h-full">
              <motion.path
                key={n}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d={`M ${qhoPoints.map(p => `${p.x * 10},${-p.y}`).join(' L ')}`}
                fill="none"
                stroke="#F0B800"
                strokeWidth="1.5"
                className="drop-shadow-[0_0_5px_rgba(240,184,0,0.5)]"
              />
            </svg>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-cream-400 uppercase tracking-widest flex justify-between">
                Quantum Number n <span>{n}</span>
              </label>
              <input 
                type="range" min="0" max="3" value={n} onChange={(e) => setN(parseInt(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>
            <div className="text-center bg-white/5 p-2 rounded-lg">
              <MathComp formula="E_n = \hbar\omega(n + \frac{1}{2})" />
            </div>
          </div>
        </div>

        {/* Center Connector */}
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center"
          >
            <Zap className="w-4 h-4 text-gold-400" />
          </motion.div>
          <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
          <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest vertical-rl rotate-180">Analogy</div>
        </div>

        {/* Right Panel: RHC */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-gold-400/20 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-gold-400 font-serif text-lg">RHC State Space</h4>
            <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Discrete (a,b), Continuous θ</div>
          </div>

          <div className="flex-1 relative flex items-center justify-center min-h-[200px]">
            {/* Lattice */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-10 p-4">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full" />
              ))}
            </div>

            {/* Ray */}
            <svg viewBox="-50 -50 100 100" className="relative z-10 w-full h-full">
              <line x1="0" y1="0" x2={40} y2={-40 * ratio} stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
              <motion.circle
                cx={30}
                cy={-30 * ratio}
                r="3"
                fill="#F0B800"
                initial={false}
                animate={{ cx: 20 + n * 5, cy: -(20 + n * 5) * ratio }}
                className="drop-shadow-[0_0_8px_rgba(240,184,0,0.8)]"
              />
              <text x="35" y="-35" fill="white" fontSize="4" opacity="0.5">z = a + ib</text>
            </svg>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-cream-400 uppercase tracking-widest flex justify-between">
                Ratio b/a <span>{ratio.toFixed(2)}</span>
              </label>
              <input 
                type="range" min="0.1" max="2" step="0.1" value={ratio} onChange={(e) => setRatio(parseFloat(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>
            <div className="text-center bg-white/5 p-2 rounded-lg">
              <MathComp formula="\theta = \arctan(b/a)" />
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <AnimatePresence>
          {isAnimating && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '20%', y: '50%', opacity: 0 }}
                  animate={{ x: '80%', y: '50%', opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  className="absolute w-1 h-1 bg-gold-400 rounded-full"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gold-400 text-navy-900 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold-300 transition-all shadow-lg"
        >
          {isAnimating ? 'Stop Analogy' : 'Animate Analogy'}
        </button>
      </div>
    </FigureWrapper>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
