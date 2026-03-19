import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';
import { Settings, Info, RefreshCw } from 'lucide-react';

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    x %= y;
    [x, y] = [y, x];
  }
  return x;
}

export const FactorizationDiagram: React.FC = () => {
  const [a, setA] = useState(6);
  const [b, setB] = useState(4);
  const [isExploded, setIsExploded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { d, p, q } = useMemo(() => {
    const dVal = gcd(a, b);
    return { d: dVal, p: a / dVal, q: b / dVal };
  }, [a, b]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const drawWidth = width - padding * 2;
    const drawHeight = height - padding * 2;

    const scale = Math.min(drawWidth / a, drawHeight / b);
    const offsetX = (width - a * scale) / 2;
    const offsetY = (height - b * scale) / 2;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Grid Background
      ctx.strokeStyle = '#E1E7EB';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= a; x++) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * scale, offsetY);
        ctx.lineTo(offsetX + x * x * scale, offsetY + b * scale);
        // wait, x*x is wrong, just x*scale
      }
      // Actually, let's just do a simple grid
      for (let x = 0; x <= a; x++) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * scale, offsetY);
        ctx.lineTo(offsetX + x * scale, offsetY + b * scale);
        ctx.stroke();
      }
      for (let y = 0; y <= b; y++) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + y * scale);
        ctx.lineTo(offsetX + a * scale, offsetY + y * scale);
        ctx.stroke();
      }

      // Draw Primitive Rectangles
      const explosionOffset = isExploded ? 20 : 0;
      
      for (let i = 0; i < d; i++) {
        const xPos = offsetX + (i * p * scale);
        const yPos = offsetY + (i * q * scale);
        
        // We can arrange them in a grid if d is a product, but let's just do a diagonal or a simple tiling
        // Actually, the user says "d copies of a smaller primitive rectangle... arranged in a grid"
        // Let's find factors of d for the grid
        let rows = 1;
        let cols = d;
        for (let k = Math.floor(Math.sqrt(d)); k >= 1; k--) {
          if (d % k === 0) {
            rows = k;
            cols = d / k;
            break;
          }
        }

        // Wait, a = dp, b = dq. The grid is naturally cols x rows where cols*p = a, rows*q = b?
        // No, d is the common factor. a/p = d, b/q = d. So it's a d x d grid of p x q? No.
        // (a,b) = d(p,q). So it's d copies of (p,q) along the diagonal? No, it's a single rectangle (a,b).
        // It's split into d*d blocks of (p,q)? No.
        // (a,b) is a rectangle. (p,q) is a smaller one. a/p = d, b/q = d.
        // So it's a d x d grid of p x q rectangles.
        
        for (let row = 0; row < d; row++) {
          for (let col = 0; col < d; col++) {
            const px = offsetX + col * p * scale + (isExploded ? col * explosionOffset : 0);
            const py = offsetY + row * q * scale + (isExploded ? row * explosionOffset : 0);
            
            ctx.fillStyle = (row + col) % 2 === 0 ? '#1C2845' : '#2A3B5F';
            ctx.globalAlpha = 0.8;
            ctx.fillRect(px, py, p * scale, q * scale);
            
            ctx.strokeStyle = '#F0B800';
            ctx.lineWidth = 2;
            ctx.strokeRect(px, py, p * scale, q * scale);
            
            if (isExploded) {
              ctx.fillStyle = '#F0B800';
              ctx.font = '10px Roboto Mono';
              ctx.fillText(`${p}×${q}`, px + 5, py + 15);
            }
          }
        }
        break; // We only need the nested loop
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [a, b, isExploded, d, p, q]);

  return (
    <FigureContainer
      id="fig-2-3"
      title="Figure 2.3 — Factorization: (a,b) = d·(p,q)"
      caption="Factorization (a,b) = d·(p,q) with d = gcd(a,b) and gcd(p,q)=1. The primitive pair (p,q) captures the essential ratio, while d scales it."
      variant="light"
    >
      <div className="relative w-full h-[500px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-full max-h-[350px] object-contain cursor-pointer"
          onClick={() => setIsExploded(!isExploded)}
        />

        {/* Controls */}
        <div className="mt-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
              <span>Value A</span>
              <span className="text-navy-900 font-bold">{a}</span>
            </div>
            <input 
              type="range" min="1" max="20" value={a} 
              onChange={(e) => setA(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-navy-800"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
              <span>Value B</span>
              <span className="text-navy-900 font-bold">{b}</span>
            </div>
            <input 
              type="range" min="1" max="20" value={b} 
              onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-navy-800"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                isExploded ? 'bg-gold-400 text-navy-900 shadow-lg' : 'bg-navy-800 text-white'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${isExploded ? 'animate-spin-slow' : ''}`} />
              {isExploded ? 'Collapse' : 'Decompose'}
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-navy-100 shadow-sm">
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between gap-8">
              <span className="text-navy-400">PAIR (a,b)</span>
              <span className="text-navy-900 font-bold">({a}, {b})</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-navy-400">GCD (d)</span>
              <span className="text-gold-600 font-bold">{d}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-navy-400">PRIMITIVE (p,q)</span>
              <span className="text-navy-800 font-bold">({p}, {q})</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-navy-50 text-[10px] text-navy-500 italic">
            ({a}, {b}) = {d} × ({p}, {q})
          </div>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Click diagram to toggle view
        </div>
      </div>
    </FigureContainer>
  );
};
