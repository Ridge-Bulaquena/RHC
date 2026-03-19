import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Play, RefreshCw, BarChart3 } from 'lucide-react';

export const SpectralScalingSimulation: React.FC = () => {
  const [ratio1, setRatio1] = useState({ a: 1, b: 1 });
  const [ratio2, setRatio2] = useState({ a: 2, b: 1 });
  const [noise, setNoise] = useState(0.1);

  const theta1 = Math.atan(ratio1.b / ratio1.a);
  const theta2 = Math.atan(ratio2.b / ratio2.a);
  const fisherDist = Math.abs(Math.log(Math.tan(theta2)) - Math.log(Math.tan(theta1)));
  
  // Simulated energy gap with some noise
  const energyGap = useMemo(() => {
    const base = fisherDist * 10; // Scaling factor
    return base + (Math.random() - 0.5) * noise * 5;
  }, [fisherDist, noise]);

  return (
    <FigureWrapper
      id="fig-6-1"
      title="P1: Geometric Spectral Scaling Simulation"
      subtitle="ΔE ∝ d_F"
      caption="Interactive simulation of energy gap scaling. Select two RHC ratios to see the predicted Fisher distance and the resulting simulated energy gap."
      mathBasis="\Delta E \propto |\ln\tan\theta_2 - \ln\tan\theta_1|. This prediction links the information-geometric distance between states to the physical energy required to transition between them."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">State 1 (a₁, b₁)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">a₁: {ratio1.a}</label>
                    <input type="range" min="1" max="10" value={ratio1.a} onChange={(e) => setRatio1({ ...ratio1, a: parseInt(e.target.value) })} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">b₁: {ratio1.b}</label>
                    <input type="range" min="1" max="10" value={ratio1.b} onChange={(e) => setRatio1({ ...ratio1, b: parseInt(e.target.value) })} className="w-full accent-gold-500" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">State 2 (a₂, b₂)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">a₂: {ratio2.a}</label>
                    <input type="range" min="1" max="10" value={ratio2.a} onChange={(e) => setRatio2({ ...ratio2, a: parseInt(e.target.value) })} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">b₂: {ratio2.b}</label>
                    <input type="range" min="1" max="10" value={ratio2.b} onChange={(e) => setRatio2({ ...ratio2, b: parseInt(e.target.value) })} className="w-full accent-gold-500" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">
                  Measurement Noise <span>{(noise * 100).toFixed(0)}%</span>
                </label>
                <input type="range" min="0" max="1" step="0.01" value={noise} onChange={(e) => setNoise(parseFloat(e.target.value))} className="w-full accent-navy-900" />
              </div>
            </div>
          </div>

          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Spectral Analysis</div>
            
            <div className="flex-1 flex items-center justify-center gap-12">
              {/* Energy Levels */}
              <div className="relative h-64 w-32 border-l-2 border-navy-900 flex flex-col justify-between py-4">
                <motion.div 
                  className="absolute left-0 w-full h-[2px] bg-gold-500"
                  animate={{ bottom: '10%' }}
                >
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-bold text-navy-400">E₁</div>
                </motion.div>
                
                <motion.div 
                  className="absolute left-0 w-full h-[2px] bg-gold-500"
                  animate={{ bottom: `${10 + (energyGap / 20) * 80}%` }}
                >
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-bold text-navy-400">E₂</div>
                </motion.div>

                {/* Gap Indicator */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-4 border-l border-r border-navy-300 flex items-center justify-center"
                  animate={{ 
                    bottom: '10%', 
                    height: `${(energyGap / 20) * 80}%` 
                  }}
                >
                  <div className="rotate-90 text-[10px] font-bold text-navy-900 whitespace-nowrap">ΔE = {energyGap.toFixed(3)}</div>
                </motion.div>
              </div>

              {/* Data Display */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-cream-50 rounded-xl border border-cream-100">
                  <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Fisher Distance d_F</div>
                  <div className="text-2xl font-bold font-mono text-navy-900">{fisherDist.toFixed(4)}</div>
                </div>
                <div className="p-4 bg-navy-900 rounded-xl">
                  <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-1">Predicted Scaling</div>
                  <div className="text-2xl font-bold font-mono text-cream-50">{(energyGap / fisherDist).toFixed(2)}x</div>
                </div>
              </div>
            </div>

            {/* Correlation Plot (Mini) */}
            <div className="h-32 bg-cream-50 rounded-xl border border-cream-100 mt-4 p-4 relative">
              <div className="absolute top-2 left-2 text-[8px] font-bold text-navy-400 uppercase tracking-widest">ΔE vs d_F Correlation</div>
              <div className="w-full h-full flex items-end justify-between px-4 pb-2">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-4 bg-gold-400/30 rounded-t-sm"
                    style={{ height: `${(i + 1) * 10}%` }}
                  />
                ))}
                <motion.div 
                  className="absolute w-2 h-2 bg-navy-900 rounded-full"
                  animate={{ 
                    left: `${(fisherDist / 2.5) * 100}%`,
                    bottom: `${(energyGap / 20) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
