import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Play, RefreshCw } from 'lucide-react';

export const QuantumCircuitAnalogy: React.FC = () => {
  const [theta, setTheta] = useState(Math.PI / 4);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [outcomes, setOutcomes] = useState<number[]>([]);

  const runMeasurement = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      const probPlus = (1 + Math.cos(theta)) / 2;
      const outcome = Math.random() < probPlus ? 1 : -1;
      setOutcomes(prev => [outcome, ...prev].slice(0, 10));
      setIsMeasuring(false);
    }, 1000);
  };

  return (
    <FigureWrapper
      id="fig-5-7"
      title="Hypothesis 2: Quantum Circuit Analogy"
      subtitle="X-Basis Measurement"
      caption="The fold operator can be viewed as the RHC analog of quantum measurement in the X‑basis. The expectation value ⟨σₓ⟩ = cos θ matches ℱ(e^(iθ))."
      mathBasis="In quantum information theory, a measurement in the X-basis is equivalent to applying a Hadamard gate and then measuring in the Z-basis. The expectation value of the Pauli X operator is ⟨σₓ⟩ = cos θ. This matches the fold value ℱ(e^(iθ)) = cos θ."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        {/* Top: Quantum Circuit */}
        <div className="flex-1 bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative">
          <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Quantum Circuit</div>
          
          <div className="flex items-center justify-center gap-12 flex-1">
            {/* Qubit State */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-gold-400 flex items-center justify-center bg-gold-400/10">
                <MathComp formula="| \psi \rangle" />
              </div>
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">State Preparation</div>
            </div>

            <ArrowRight className="w-6 h-6 text-cream-300" />

            {/* Hadamard Gate */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-navy-900 text-gold-400 flex items-center justify-center rounded-lg font-bold text-2xl shadow-lg">
                H
              </div>
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Hadamard Gate</div>
            </div>

            <ArrowRight className="w-6 h-6 text-cream-300" />

            {/* Measurement */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-navy-900 flex items-center justify-center bg-navy-900/5 relative overflow-hidden">
                <motion.div 
                  className="absolute bottom-0 left-0 w-full bg-gold-400/20"
                  animate={{ height: `${(1 + Math.cos(theta)) * 50}%` }}
                />
                <Activity className="w-8 h-8 text-navy-900" />
              </div>
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Measurement</div>
            </div>

            <ArrowRight className="w-6 h-6 text-cream-300" />

            {/* Outcome */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-cream-100 border border-cream-200 flex items-center justify-center rounded-lg font-bold text-2xl text-navy-900">
                <AnimatePresence mode="wait">
                  {isMeasuring ? (
                    <motion.div key="measuring" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <RefreshCw className="w-6 h-6 text-gold-500" />
                    </motion.div>
                  ) : (
                    <motion.div key="outcome" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      {outcomes[0] || '?'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Outcome</div>
            </div>
          </div>

          <div className="mt-8 text-center bg-cream-50 p-4 rounded-xl border border-cream-100">
            <MathComp formula="\langle \sigma_x \rangle = \cos \theta = \mathcal{F}(e^{i\theta})" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col gap-2 min-w-[200px]">
            <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">
              Angle θ <span>{(theta * 180 / Math.PI).toFixed(1)}°</span>
            </label>
            <input 
              type="range" min="0" max={Math.PI} step="0.01" value={theta} onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <button 
            onClick={runMeasurement}
            disabled={isMeasuring}
            className="flex items-center gap-2 px-8 py-3 bg-navy-900 text-gold-400 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-navy-800 transition-all disabled:opacity-50 shadow-lg"
          >
            <Play className="w-4 h-4" />
            Run Measurement
          </button>
        </div>

        {/* History */}
        <div className="flex justify-center gap-2">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - i * 0.1, x: 0 }}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-md font-bold text-xs",
                o === 1 ? "bg-gold-400 text-navy-900" : "bg-navy-900 text-gold-400"
              )}
            >
              {o > 0 ? '+1' : '-1'}
            </motion.div>
          ))}
        </div>
      </div>
    </FigureWrapper>
  );
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="w-8 h-[2px] bg-current" />
      <div className="w-2 h-2 border-t-2 border-r-2 border-current rotate-45 -ml-1" />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
