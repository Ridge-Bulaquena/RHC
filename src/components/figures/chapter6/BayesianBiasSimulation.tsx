import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Play, RefreshCw, BarChart3, TrendingUp, Search } from 'lucide-react';

export const BayesianBiasSimulation: React.FC = () => {
  const [observation, setObservation] = useState(1.2);
  const [useRHCPrior, setUseRHCPrior] = useState(true);

  // Simulated posterior distribution
  const posterior = useMemo(() => {
    const points = [];
    for (let x = 0.5; x <= 2.5; x += 0.05) {
      const likelihood = Math.exp(-Math.pow(x - observation, 2) / 0.1);
      const prior = useRHCPrior ? Math.exp(-Math.pow(x - 1, 2) / 0.5) : 1; // Simplified RHC prior peak at 1
      points.push({ x, y: likelihood * prior });
    }
    const max = Math.max(...points.map(p => p.y));
    return points.map(p => ({ ...p, y: (p.y / max) * 100 }));
  }, [observation, useRHCPrior]);

  const estimate = useMemo(() => {
    const maxPoint = posterior.reduce((prev, curr) => (curr.y > prev.y ? curr : prev), posterior[0]);
    return maxPoint.x;
  }, [posterior]);

  return (
    <FigureWrapper
      id="fig-6-2"
      title="P2: Bayesian Bias Simulation"
      subtitle="Posterior Peak at a=b"
      caption="Interactive simulation of Bayesian inference with an RHC prior. Observe how the posterior estimate is biased toward 1 (a=b) when the RHC prior is active."
      mathBasis="The RHC prior peaks at unity (a=b). When combined with a symmetric likelihood, the posterior distribution is shifted toward the symmetric point, reflecting the 'preferred' status of equality in the RHC lattice."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Observation (Measured Ratio)</div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">Value: {observation.toFixed(2)}</label>
                  <input type="range" min="0.5" max="2.5" step="0.01" value={observation} onChange={(e) => setObservation(parseFloat(e.target.value))} className="w-full accent-gold-500" />
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl border border-cream-100">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all",
                    useRHCPrior ? "bg-gold-400 border-gold-500" : "bg-white border-cream-300"
                  )} />
                  <span className="text-[10px] font-bold text-navy-900 uppercase tracking-widest">Use RHC Prior</span>
                </div>
                <button 
                  onClick={() => setUseRHCPrior(!useRHCPrior)}
                  className="px-3 py-1 bg-navy-900 text-gold-400 rounded-md text-[8px] font-bold uppercase tracking-widest hover:bg-navy-800 transition-all"
                >
                  Toggle
                </button>
              </div>

              <div className="p-4 bg-navy-900 rounded-xl">
                <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-1">Inferred Estimate</div>
                <div className="text-2xl font-bold font-mono text-cream-50">{estimate.toFixed(3)}</div>
                <div className="text-[8px] font-bold text-gold-500/50 uppercase tracking-widest mt-1">
                  Bias: {(estimate - observation).toFixed(3)}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Posterior Distribution</div>
            
            <div className="flex-1 flex items-end justify-between px-4 pb-8 mt-12">
              {posterior.map((p, i) => (
                <motion.div 
                  key={i} 
                  className={cn(
                    "w-2 rounded-t-sm transition-all duration-300",
                    Math.abs(p.x - estimate) < 0.03 ? "bg-gold-500" : "bg-navy-900/10"
                  )}
                  animate={{ height: `${p.y}%` }}
                />
              ))}
            </div>

            {/* X-Axis */}
            <div className="h-[2px] bg-navy-900 flex justify-between px-4 relative">
              <div className="absolute -bottom-6 left-4 text-[8px] font-bold text-navy-400">0.5</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gold-600">1.0 (a=b)</div>
              <div className="absolute -bottom-6 right-4 text-[8px] font-bold text-navy-400">2.5</div>
              
              {/* Observation Marker */}
              <motion.div 
                className="absolute -top-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-navy-900"
                animate={{ left: `${((observation - 0.5) / 2) * 100}%` }}
              />
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
