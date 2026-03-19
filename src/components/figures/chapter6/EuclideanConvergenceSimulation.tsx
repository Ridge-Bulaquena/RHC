import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Play, RefreshCw, BarChart3, TrendingUp } from 'lucide-react';

export const EuclideanConvergenceSimulation: React.FC = () => {
  const [a, setA] = useState(89);
  const [b, setB] = useState(55);
  const [isCalculating, setIsCalculating] = useState(false);

  const gcdSteps = useMemo(() => {
    let x = a;
    let y = b;
    const steps = [];
    while (y !== 0) {
      steps.push({ a: x, b: y, r: x % y });
      const temp = y;
      y = x % y;
      x = temp;
    }
    return steps;
  }, [a, b]);

  const phi = (1 + Math.sqrt(5)) / 2;
  const currentRatio = a / b;
  const distToPhi = Math.abs(currentRatio - phi);

  return (
    <FigureWrapper
      id="fig-6-3"
      title="P3: Euclidean Convergence Simulation"
      subtitle="Optimal Convergence at φ"
      caption="Interactive simulation of the Euclidean algorithm. Observe how the number of steps peaks when the ratio b/a approximates the golden ratio φ ≈ 1.618."
      mathBasis="Lamé's theorem states that the number of steps in the Euclidean algorithm is bounded by 5 times the number of digits in the smaller number. The maximum steps occur for consecutive Fibonacci numbers, whose ratio approaches φ."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Input Pair (a, b)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">a: {a}</label>
                    <input type="range" min="1" max="200" value={a} onChange={(e) => setA(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">b: {b}</label>
                    <input type="range" min="1" max="200" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Ratio Analysis</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-navy-700">b/a</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{(b/a).toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-navy-700">Distance to φ</span>
                  <span className={cn(
                    "text-lg font-bold font-mono",
                    distToPhi < 0.01 ? "text-emerald-600" : "text-navy-900"
                  )}>
                    {distToPhi.toFixed(4)}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => { setA(144); setB(89); }}
                className="w-full py-3 bg-navy-900 text-gold-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-navy-800 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Set Fibonacci Pair (144, 89)
              </button>
            </div>
          </div>

          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Euclidean Steps</div>
            
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 mt-8">
              {gcdSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-cream-50 rounded-xl border border-cream-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-600 font-bold text-xs">
                    {i + 1}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <MathComp formula={`${step.a} = q \cdot ${step.b} + ${step.r}`} />
                    <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">
                      Remainder: {step.r}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step Count Display */}
            <div className="absolute bottom-8 right-8 text-right">
              <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Total Steps</div>
              <div className="text-5xl font-bold font-serif text-navy-900">
                {gcdSteps.length}
                {gcdSteps.length > 8 && <Zap className="inline-block ml-2 w-8 h-8 text-emerald-500 animate-pulse" />}
              </div>
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
