import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';
import { Info, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

export const FoldLattice: React.FC = () => {
  const [range, setRange] = useState(10);
  const [view, setView] = useState<'lattice' | 'folded'>('folded');
  const [hoveredPoint, setHoveredPoint] = useState<{ a: number, b: number, fa: number, fb: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
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
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(width, origin.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, height);
    ctx.stroke();

    // Draw Points
    for (let a = -range; a <= range; a++) {
      for (let b = -range; b <= range; b++) {
        if (a === 0 && b === 0) continue;

        let x, y;
        const normSq = a * a + b * b;
        const fa = 0.5 * (a + a / normSq);
        const fb = 0.5 * (b - b / normSq);

        if (view === 'lattice') {
          x = origin.x + a * scale;
          y = origin.y - b * scale;
        } else {
          x = origin.x + fa * scale;
          y = origin.y - fb * scale;
        }

        const dist = Math.sqrt(a * a + b * b);
        const alpha = Math.max(0.2, 1 - dist / (range * 1.5));
        
        ctx.fillStyle = `rgba(240, 184, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Highlight hovered point
        if (hoveredPoint && hoveredPoint.a === a && hoveredPoint.b === b) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    draw();
  }, [range, view, hoveredPoint]);

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

    for (let a = -range; a <= range; a++) {
      for (let b = -range; b <= range; b++) {
        if (a === 0 && b === 0) continue;
        const normSq = a * a + b * b;
        const fa = 0.5 * (a + a / normSq);
        const fb = 0.5 * (b - b / normSq);

        let px, py;
        if (view === 'lattice') {
          px = origin.x + a * scale;
          py = origin.y - b * scale;
        } else {
          px = origin.x + fa * scale;
          py = origin.y - fb * scale;
        }

        const d = Math.sqrt((mouseX - px)**2 + (mouseY - py)**2);
        if (d < minDist) {
          minDist = d;
          closest = { a, b, fa, fb };
        }
      }
    }
    setHoveredPoint(closest);
  };

  return (
    <FigureContainer
      id="fig-2-8"
      title="Figure 2.8 — The Folded Integer Lattice"
      caption="The image of the integer lattice Ψ(a,b) = a + ib under the fold operator F(z) = (z + 1/z)/2. Notice the compression towards the unit circle."
      variant="dark"
    >
      <div className="relative w-full h-[600px] bg-navy-900 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <div className="relative w-full h-full max-h-[450px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredPoint(null)}
            className="w-full h-full object-contain cursor-crosshair"
          />
          
          {/* Tooltip Overlay */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-4 left-4 bg-navy-800/90 backdrop-blur-md border border-gold-400/30 p-4 rounded-xl shadow-2xl z-10 pointer-events-none"
              >
                <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest mb-2">Point Data</div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-8 text-xs font-mono">
                    <span className="text-cream-400">Original (a,b)</span>
                    <span className="text-cream-50">({hoveredPoint.a}, {hoveredPoint.b})</span>
                  </div>
                  <div className="flex justify-between gap-8 text-xs font-mono">
                    <span className="text-cream-400">Folded (Re, Im)</span>
                    <span className="text-cream-50">({hoveredPoint.fa.toFixed(3)}, {hoveredPoint.fb.toFixed(3)})</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-cream-400 uppercase tracking-widest">
              <span>Lattice Range (N)</span>
              <span className="text-gold-400 font-bold">{range}</span>
            </div>
            <input 
              type="range" min="5" max="30" step="1" value={range} 
              onChange={(e) => setRange(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setView('lattice')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
                view === 'lattice' ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
              }`}
            >
              Original Lattice
            </button>
            <button
              onClick={() => setView('folded')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
                view === 'folded' ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
              }`}
            >
              Folded Lattice
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-mono text-cream-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Hover over points to see their transformation
        </div>
      </div>
    </FigureContainer>
  );
};
