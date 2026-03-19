import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';
import { Info, Eye, EyeOff, RefreshCw } from 'lucide-react';

export const PrimitivePairs: React.FC = () => {
  const [range, setRange] = useState(10);
  const [showVisibility, setShowVisibility] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<{ p: number, q: number, isPrimitive: boolean } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      x %= y;
      [x, y] = [y, x];
    }
    return x;
  }

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const origin = { x: width / 2, y: height / 2 };
    const scale = (width / 2) / (range + 1);

    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    for (let i = -range; i <= range; i++) {
      ctx.beginPath();
      ctx.moveTo(origin.x + i * scale, 0);
      ctx.lineTo(origin.x + i * scale, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, origin.y + i * scale);
      ctx.lineTo(width, origin.y + i * scale);
      ctx.stroke();
    }

    // Draw Axes
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(width, origin.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, height);
    ctx.stroke();

    // Draw Visibility Lines
    if (showVisibility) {
      for (let p = -range; p <= range; p++) {
        for (let q = -range; q <= range; q++) {
          if (p === 0 && q === 0) continue;
          const isPrimitive = gcd(p, q) === 1;
          
          if (isPrimitive) {
            ctx.strokeStyle = 'rgba(240, 184, 0, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(origin.x + p * scale * 2, origin.y - q * scale * 2); // Extend ray
            ctx.stroke();
          }
        }
      }
    }

    // Draw Points
    for (let p = -range; p <= range; p++) {
      for (let q = -range; q <= range; q++) {
        if (p === 0 && q === 0) continue;
        const isPrimitive = gcd(p, q) === 1;
        
        const x = origin.x + p * scale;
        const y = origin.y - q * scale;

        if (isPrimitive) {
          ctx.fillStyle = '#F0B800';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(28, 40, 69, 0.3)';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Highlight hovered point
        if (hoveredPoint && hoveredPoint.p === p && hoveredPoint.q === q) {
          ctx.strokeStyle = '#1C2845';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Origin
    ctx.fillStyle = '#1C2845';
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    draw();
  }, [range, showVisibility, hoveredPoint]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const origin = { x: width / 2, y: height / 2 };
    const scale = (width / 2) / (range + 1);

    let closest = null;
    let minDist = 10;

    for (let p = -range; p <= range; p++) {
      for (let q = -range; q <= range; q++) {
        if (p === 0 && q === 0) continue;
        const px = origin.x + p * scale;
        const py = origin.y - q * scale;
        const d = Math.sqrt((mouseX - px)**2 + (mouseY - py)**2);
        if (d < minDist) {
          minDist = d;
          closest = { p, q, isPrimitive: gcd(p, q) === 1 };
        }
      }
    }
    setHoveredPoint(closest);
  };

  return (
    <FigureContainer
      id="fig-2-9"
      title="Figure 2.9 — Primitive Pairs and Visibility"
      caption="A point (p,q) is primitive if gcd(p,q)=1. Geometrically, these are the points 'visible' from the origin, with no other lattice points blocking the line of sight."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <div className="relative w-full h-full max-h-[450px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredPoint(null)}
            className="w-full h-full object-contain cursor-crosshair"
          />
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-navy-100 p-4 rounded-xl shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gold-400" />
              <span className="text-[10px] font-mono text-navy-900 uppercase tracking-widest">Primitive (Visible)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-navy-200" />
              <span className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">Composite (Hidden)</span>
            </div>
          </div>

          {/* Tooltip Overlay */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 left-4 bg-white border border-navy-100 p-4 rounded-xl shadow-2xl z-10 pointer-events-none"
              >
                <div className="text-[10px] font-mono text-navy-400 uppercase tracking-widest mb-2">Point Analysis</div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-8 text-xs font-mono">
                    <span className="text-navy-400">Pair (p,q)</span>
                    <span className="text-navy-900 font-bold">({hoveredPoint.p}, {hoveredPoint.q})</span>
                  </div>
                  <div className="flex justify-between gap-8 text-xs font-mono">
                    <span className="text-navy-400">gcd(p,q)</span>
                    <span className="text-navy-900 font-bold">{gcd(hoveredPoint.p, hoveredPoint.q)}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-xs font-mono">
                    <span className="text-navy-400">Status</span>
                    <span className={hoveredPoint.isPrimitive ? "text-gold-600 font-bold" : "text-navy-400"}>
                      {hoveredPoint.isPrimitive ? 'PRIMITIVE' : 'COMPOSITE'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
              <span>Lattice Range (N)</span>
              <span className="text-navy-900 font-bold">{range}</span>
            </div>
            <input 
              type="range" min="5" max="25" step="1" value={range} 
              onChange={(e) => setRange(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowVisibility(!showVisibility)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
                showVisibility ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
              }`}
            >
              {showVisibility ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showVisibility ? 'Hide Rays' : 'Show Rays'}
            </button>
            <button
              onClick={() => setRange(10)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase bg-navy-100 text-navy-900 hover:bg-navy-200"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Observe how rays only hit primitive points first
        </div>
      </div>
    </FigureContainer>
  );
};
