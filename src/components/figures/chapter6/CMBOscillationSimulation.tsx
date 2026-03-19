import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Play, RefreshCw, BarChart3, TrendingUp, Globe } from 'lucide-react';

export const CMBOscillationSimulation: React.FC = () => {
  const [amplitude, setAmplitude] = useState(0.2);
  const [frequency, setFrequency] = useState(1);

  // Simulated CMB power spectrum with RHC oscillations
  const spectrum = useMemo(() => {
    const points = [];
    for (let l = 10; l <= 2000; l += 20) {
      const base = 1000 * Math.exp(-l / 500);
      const rhcOsc = 1 + amplitude * Math.sin(l * frequency * 0.01); // Simplified RHC oscillation
      points.push({ l, y: base * rhcOsc });
    }
    const max = Math.max(...points.map(p => p.y));
    return points.map(p => ({ ...p, y: (p.y / max) * 100 }));
  }, [amplitude, frequency]);

  return (
    <FigureWrapper
      id="fig-6-11"
      title="P11: CMB Oscillation Simulation"
      subtitle="RHC Signatures in the Power Spectrum"
      caption="Interactive simulation of the cosmic microwave background power spectrum. Observe how RHC-predicted oscillations appear at specific multipole moments ℓ."
      mathBasis="The multipole moments C_ℓ of the CMB power spectrum will exhibit oscillations with a period in ℓ given by the Fisher distance between successive rational approximations to π."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Oscillation Amplitude</div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">Value: {(amplitude * 100).toFixed(0)}%</label>
                  <input type="range" min="0" max="1" step="0.01" value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} className="w-full accent-gold-500" />
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">
                  RHC Frequency <span>{frequency.toFixed(2)}x</span>
                </label>
                <input type="range" min="0.1" max="5" step="0.1" value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))} className="w-full accent-navy-900" />
              </div>

              <div className="p-4 bg-navy-900 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-1">Cosmic Signature</div>
                  <div className="text-xs font-serif text-cream-50 opacity-80 italic">
                    "The early universe's arithmetic lattice imprinted in the sky."
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">CMB Power Spectrum C_ℓ</div>
            
            <div className="flex-1 flex items-end justify-between px-4 pb-8 mt-12">
              {spectrum.map((p, i) => (
                <motion.div 
                  key={i} 
                  className={cn(
                    "w-1 rounded-t-sm transition-all duration-300",
                    p.y > 80 ? "bg-gold-500" : "bg-navy-900/20"
                  )}
                  animate={{ height: `${p.y}%` }}
                />
              ))}
            </div>

            {/* X-Axis */}
            <div className="h-[2px] bg-navy-900 flex justify-between px-4 relative">
              <div className="absolute -bottom-6 left-4 text-[8px] font-bold text-navy-400">ℓ = 10</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gold-600">ℓ = 1000</div>
              <div className="absolute -bottom-6 right-4 text-[8px] font-bold text-navy-400">ℓ = 2000</div>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
