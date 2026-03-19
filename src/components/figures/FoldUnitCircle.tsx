import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { Info, Play, Pause, RefreshCw } from 'lucide-react';

export const FoldUnitCircle: React.FC = () => {
  const [theta, setTheta] = useState(Math.PI / 4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReciprocal, setShowReciprocal] = useState(true);

  useEffect(() => {
    let animationFrameId: number;
    if (isPlaying) {
      const animate = () => {
        setTheta(t => (t + 0.01) % (Math.PI * 2));
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  const origin = { x: 300, y: 250 };
  const radius = 180;

  const px = origin.x + Math.cos(theta) * radius;
  const py = origin.y - Math.sin(theta) * radius;
  
  const qx = origin.x + Math.cos(-theta) * radius;
  const qy = origin.y - Math.sin(-theta) * radius;

  const mx = (px + qx) / 2;
  const my = (py + qy) / 2;

  const cosTheta = Math.cos(theta);

  return (
    <FigureContainer
      id="fig-2-6"
      title="Figure 2.6 — The Fold Operator on the Unit Circle"
      caption="The fold operator on the unit circle: F(e^(iθ)) = (e^(iθ) + e^(-iθ))/2 = cosθ. It projects the point onto the real axis."
      variant="dark"
    >
      <div className="relative w-full h-[600px] bg-navy-900 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <svg className="w-full h-full max-h-[450px]" viewBox="0 0 600 500">
          {/* Grid */}
          <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={origin.x - 250 + i * 50} y1={0} x2={origin.x - 250 + i * 50} y2={500} />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1={0} y1={origin.y - 250 + i * 50} x2={600} y2={origin.y - 250 + i * 50} />
            ))}
          </g>

          {/* Axes */}
          <line x1={50} y1={origin.y} x2={550} y2={origin.y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1={origin.x} y1={50} x2={origin.x} y2={450} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="540" y={origin.y + 15} className="text-[10px] font-mono fill-cream-400">Re</text>
          <text x={origin.x + 10} y="60" className="text-[10px] font-mono fill-cream-400">Im</text>

          {/* Unit Circle */}
          <circle cx={origin.x} cy={origin.y} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          
          {/* Chord */}
          {showReciprocal && (
            <motion.line
              animate={{ x1: px, y1: py, x2: qx, y2: qy }}
              stroke="#F0B800"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          )}

          {/* Projection Line */}
          <motion.line
            animate={{ x1: px, y1: py, x2: mx, y2: my }}
            stroke="#F0B800"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.3"
          />

          {/* Points */}
          <motion.circle animate={{ cx: px, cy: py }} r="6" fill="#F0B800" className="shadow-lg" />
          {showReciprocal && (
            <motion.circle animate={{ cx: qx, cy: qy }} r="4" fill="#1C2845" stroke="#F0B800" strokeWidth="1" />
          )}

          {/* Fold Result (Midpoint) */}
          <motion.circle animate={{ cx: mx, cy: my }} r="5" fill="#F0B800" />
          <motion.text animate={{ x: mx - 10, y: my + 20 }} className="text-xs font-mono fill-gold-400 font-bold">
            cosθ = {cosTheta.toFixed(3)}
          </motion.text>

          {/* Labels */}
          <motion.text animate={{ x: px + 10, y: py - 10 }} className="text-xs font-mono fill-cream-50">e^(iθ)</motion.text>
          {showReciprocal && (
            <motion.text animate={{ x: qx + 10, y: qy + 20 }} className="text-xs font-mono fill-cream-400">e^(-iθ)</motion.text>
          )}
        </svg>

        {/* Controls */}
        <div className="mt-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-cream-400 uppercase tracking-widest">
              <span>Angle (θ)</span>
              <span className="text-gold-400 font-bold">{(theta * 180 / Math.PI).toFixed(1)}°</span>
            </div>
            <input 
              type="range" min="0" max={Math.PI * 2} step="0.01" value={theta} 
              onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
                isPlaying ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isPlaying ? 'Pause' : 'Animate'}
            </button>
            <button
              onClick={() => setShowReciprocal(!showReciprocal)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
                showReciprocal ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
              }`}
            >
              {showReciprocal ? 'Hide Reciprocal' : 'Show Reciprocal'}
            </button>
          </div>

          <div className="flex items-end">
             <button
              onClick={() => setTheta(Math.PI / 4)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase bg-navy-800 text-white hover:bg-navy-700"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Prominent Equation */}
        <div className="mt-8 bg-navy-800/50 backdrop-blur-md p-6 rounded-2xl border border-gold-400/30 shadow-2xl flex flex-col items-center gap-2">
          <div className="text-xl font-mono text-cream-50">
            <span className="text-gold-400">F(e^(iθ))</span> = <span className="text-gold-400">cosθ</span>
          </div>
          <div className="text-[10px] font-mono text-cream-400 uppercase tracking-widest">
            The projection onto the real axis
          </div>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono text-cream-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Slide to rotate the point
        </div>
      </div>
    </FigureContainer>
  );
};
