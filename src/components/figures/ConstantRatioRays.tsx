import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { Settings, Info, RefreshCw } from 'lucide-react';

const RATIOS = [
  { name: '1:1', p: 1, q: 1, color: '#F0B800' },
  { name: '1:2', p: 2, q: 1, color: '#F5CC30' },
  { name: '2:1', p: 1, q: 2, color: '#A87E00' },
  { name: '3:2', p: 2, q: 3, color: '#E3D9C5' },
  { name: 'Golden', p: 1, q: 1.618, color: '#3A414F' }
];

export const ConstantRatioRays: React.FC = () => {
  const [maxD, setMaxD] = useState(6);
  const [activeRay, setActiveRay] = useState<string | null>(null);
  const [showRays, setShowRays] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const origin = { x: 100, y: height - 100 };
    const scale = 40;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Polar Grid
      ctx.strokeStyle = '#E1E7EB';
      ctx.lineWidth = 0.5;
      
      // Concentric Circles
      for (let r = 1; r <= 10; r++) {
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, r * scale, 0, -Math.PI / 2, true);
        ctx.stroke();
      }
      
      // Radial Lines
      for (let ang = 0; ang <= 90; ang += 15) {
        const rad = ang * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(origin.x + Math.cos(rad) * 450, origin.y - Math.sin(rad) * 450);
        ctx.stroke();
      }

      // Draw Rays and Points
      RATIOS.forEach(ratio => {
        const isActive = activeRay === ratio.name;
        const theta = Math.atan2(ratio.q, ratio.p);
        
        if (showRays) {
          ctx.strokeStyle = ratio.color;
          ctx.lineWidth = isActive ? 3 : 1;
          ctx.globalAlpha = isActive ? 0.8 : 0.3;
          ctx.beginPath();
          ctx.moveTo(origin.x, origin.y);
          ctx.lineTo(origin.x + Math.cos(theta) * 500, origin.y - Math.sin(theta) * 500);
          ctx.stroke();
          
          // Label
          ctx.fillStyle = ratio.color;
          ctx.font = '10px Roboto Mono';
          ctx.fillText(ratio.name, origin.x + Math.cos(theta) * 460, origin.y - Math.sin(theta) * 460);
        }

        // Points along ray
        for (let d = 1; d <= maxD; d++) {
          const x = origin.x + d * ratio.p * scale;
          const y = origin.y - d * ratio.q * scale;
          
          ctx.beginPath();
          ctx.arc(x, y, isActive ? 6 : 4, 0, Math.PI * 2);
          
          // Color by scale factor d
          const hue = 0.1 + (d / maxD) * 0.1;
          ctx.fillStyle = isActive ? ratio.color : `hsl(220, 40%, ${40 + d * 5}%)`;
          ctx.globalAlpha = isActive ? 1 : 0.6;
          ctx.fill();
          
          if (isActive) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = '#1C2845';
            ctx.font = 'bold 10px Roboto Mono';
            ctx.fillText(`(${d * ratio.p}, ${(d * ratio.q).toFixed(1)})`, x + 10, y - 10);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [maxD, activeRay, showRays]);

  return (
    <FigureContainer
      id="fig-2-5"
      title="Figure 2.5 — Rays of Constant Ratio"
      caption="Rays of constant ratio. All integer pairs with the same reduced ratio lie on the same ray. Points along a ray are scaled versions of the primitive pair."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={500} 
          className="w-full h-full max-h-[450px] object-contain cursor-pointer"
        />

        {/* Controls */}
        <div className="mt-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
              <span>MAX SCALE (d)</span>
              <span className="text-navy-900 font-bold">{maxD}</span>
            </div>
            <input 
              type="range" min="1" max="10" value={maxD} 
              onChange={(e) => setMaxD(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-navy-800"
            />
          </div>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            {RATIOS.map(r => (
              <button
                key={r.name}
                onMouseEnter={() => setActiveRay(r.name)}
                onMouseLeave={() => setActiveRay(null)}
                onClick={() => setActiveRay(activeRay === r.name ? null : r.name)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                  activeRay === r.name ? 'bg-gold-400 text-navy-900 shadow-md' : 'bg-navy-100 text-navy-400 hover:bg-navy-200'
                }`}
              >
                {r.name}
              </button>
            ))}
            <button
              onClick={() => setShowRays(!showRays)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                showRays ? 'bg-navy-800 text-white' : 'bg-navy-100 text-navy-400'
              }`}
            >
              {showRays ? 'Hide Rays' : 'Show Rays'}
            </button>
          </div>
        </div>

        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-navy-100 shadow-sm">
          <div className="text-xs font-mono text-navy-800">
            <p className="font-bold text-gold-600 mb-1 uppercase tracking-widest text-[10px]">Polar Rule</p>
            θ = arctan(q/p)
          </div>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Hover over ratios to highlight rays
        </div>
      </div>
    </FigureContainer>
  );
};
