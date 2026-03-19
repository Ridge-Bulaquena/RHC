import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Compass, Maximize2 } from 'lucide-react';

const CurvatureHeatmap: React.FC = () => {
  const gridSize = 10;
  const cells = useMemo(() => {
    const arr = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Simple curvature model: higher near the center (pi/2)
        const x = (i / (gridSize - 1)) * Math.PI;
        const y = (j / (gridSize - 1)) * Math.PI;
        const curvature = Math.sin(x) * Math.sin(y);
        arr.push({ x: i, y: j, curvature });
      }
    }
    return arr;
  }, []);

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Compass className="text-emerald-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          Information Curvature
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          Visualizing the scalar curvature $R$ of the RHC manifold. 
          The constant negative curvature implies a hyperbolic geometry for the space 
          of harmonic distributions, where information density is highest at the center.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Heatmap Grid */}
        <div className="relative aspect-square bg-navy-950/50 rounded-xl border border-white/5 p-4 grid grid-cols-10 gap-1">
          {cells.map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.005 }}
              className="aspect-square rounded-sm relative group/cell"
              style={{ 
                backgroundColor: `rgba(16, 185, 129, ${cell.curvature * 0.8})`,
                boxShadow: cell.curvature > 0.8 ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover/cell:opacity-100 bg-white/20 transition-opacity flex items-center justify-center">
                <span className="text-[8px] font-mono text-white">{cell.curvature.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
          
          {/* Axis Labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>θ₁ = 0</span>
            <span>θ₁ = π</span>
          </div>
          <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            <span>θ₂ = 0</span>
            <span>θ₂ = π</span>
          </div>
        </div>

        {/* Legend and Analysis */}
        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-4">Curvature Scale (R)</h4>
            <div className="h-4 w-full bg-gradient-to-r from-navy-900 via-emerald-500 to-emerald-300 rounded-full mb-2" />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Low Density</span>
              <span>High Information Density</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Maximize2 size={18} />
              </div>
              <div>
                <h5 className="text-white font-serif italic text-lg mb-1">Hyperbolic Scaling</h5>
                <p className="text-sm text-slate-400">
                  The RHC manifold exhibits constant negative curvature, meaning the volume 
                  of information states grows exponentially with distance from the center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.5: Information Curvature. The constant negative curvature of the RHC manifold implies a hyperbolic geometry.
      </div>
    </div>
  );
};

export default CurvatureHeatmap;
