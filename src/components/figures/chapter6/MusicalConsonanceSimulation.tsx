import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Music, Zap, Info, ChevronRight, Play, RefreshCw, BarChart3, TrendingUp, Volume2 } from 'lucide-react';

export const MusicalConsonanceSimulation: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);

  const foldVal = (a/b + b/a) / 2;
  const consonance = 1 / foldVal;
  
  const playDyad = () => {
    setIsPlaying(true);
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.frequency.value = 220 * (a/b);
    osc2.frequency.value = 220;
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 1);
    osc2.stop(ctx.currentTime + 1);

    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <FigureWrapper
      id="fig-6-18"
      title="P18: Musical Consonance Simulation"
      subtitle="C ∝ 1/ℱ(x)"
      caption="Interactive simulation of musical consonance. Select an RHC ratio (a,b) to hear the resulting dyad and see the predicted consonance based on the fold operator."
      mathBasis="C \propto \frac{1}{\mathcal{F}(\sqrt{a/b})}. This prediction links the algebraic properties of the fold operator to the psychoacoustic perception of musical consonance."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Frequency Ratio (a:b)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">a: {a}</label>
                    <input type="range" min="1" max="12" value={a} onChange={(e) => setA(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">b: {b}</label>
                    <input type="range" min="1" max="12" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Consonance Analysis</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-navy-700">Ratio</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{a}:{b}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-navy-700">Fold Value ℱ</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{foldVal.toFixed(4)}</span>
                </div>
              </div>

              <button 
                onClick={playDyad}
                disabled={isPlaying}
                className={cn(
                  "w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  isPlaying ? "bg-gold-400 text-navy-900" : "bg-navy-900 text-gold-400"
                )}
              >
                {isPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                {isPlaying ? "Playing..." : "Play Dyad"}
              </button>
            </div>
          </div>

          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Consonance Landscape</div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {/* Consonance Meter */}
              <div className="relative w-64 h-64 rounded-full border-4 border-cream-100 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-gold-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: consonance }}
                  style={{ rotate: -90 }}
                />
                <div className="text-center">
                  <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Consonance</div>
                  <div className="text-5xl font-bold font-serif text-navy-900">{(consonance * 100).toFixed(0)}%</div>
                </div>
              </div>

              {/* Waveform Visualization (Mock) */}
              <div className="flex gap-1 h-12 items-center">
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-1 bg-navy-900 rounded-full"
                    animate={{ 
                      height: isPlaying ? [10, 40, 10] : 10 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.5, 
                      delay: i * 0.05 
                    }}
                  />
                ))}
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
