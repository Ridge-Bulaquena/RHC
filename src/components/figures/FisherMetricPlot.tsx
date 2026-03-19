import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Info, Activity } from 'lucide-react';
import { MathComp } from '../Math';

const FisherMetricPlot: React.FC = () => {
  const [theta, setTheta] = useState(Math.PI / 4);

  const metricValue = useMemo(() => {
    const sinTheta = Math.sin(theta);
    return 1 / (sinTheta * sinTheta);
  }, [theta]);

  // Generate points for the plot g(theta) = 1/sin^2(theta)
  const plotPoints = useMemo(() => {
    const points = [];
    const steps = 100;
    const margin = 0.1; // Avoid 0 and PI where it diverges
    for (let i = 0; i <= steps; i++) {
      const t = margin + (i / steps) * (Math.PI - 2 * margin);
      const val = 1 / (Math.sin(t) * Math.sin(t));
      points.push({ t, val });
    }
    return points;
  }, []);

  const maxVal = 20; // Cap for visualization
  const xScale = (t: number) => (t / Math.PI) * 100;
  const yScale = (v: number) => 100 - (Math.min(v, maxVal) / maxVal) * 100;

  const pathData = useMemo(() => {
    return plotPoints.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${xScale(p.t)} ${yScale(p.val)}`
    ).join(' ');
  }, [plotPoints]);

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Activity className="text-emerald-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          The Fisher Information Metric
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          Visualizing the metric tensor <MathComp formula="g_{\theta\theta} = \csc^2\theta" />. 
          The divergence at <MathComp formula="\theta \to 0" /> and <MathComp formula="\theta \to \pi" /> indicates that 
          infinitely many distinguishable states exist near the boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Plot Area */}
        <div className="relative aspect-video bg-navy-950/50 rounded-xl border border-white/5 p-6">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            
            {/* Labels */}
            <text x="0" y="105" fill="rgba(255,255,255,0.3)" fontSize="3" textAnchor="middle">0</text>
            <text x="50" y="105" fill="rgba(255,255,255,0.3)" fontSize="3" textAnchor="middle">π/2</text>
            <text x="100" y="105" fill="rgba(255,255,255,0.3)" fontSize="3" textAnchor="middle">π</text>
            
            {/* Metric Curve */}
            <path 
              d={pathData} 
              fill="none" 
              stroke="url(#metricGradient)" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Current Point Indicator */}
            <motion.circle
              cx={xScale(theta)}
              cy={yScale(metricValue)}
              r="2"
              fill="#10b981"
              initial={false}
              animate={{ cx: xScale(theta), cy: yScale(metricValue) }}
            />
            
            <defs>
              <linearGradient id="metricGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Controls and Info */}
        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">Current Angle (θ)</span>
                <div className="text-4xl font-mono text-white">{(theta / Math.PI).toFixed(3)}π</div>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Metric gθθ</span>
                <div className="text-4xl font-mono text-emerald-400">{metricValue.toFixed(2)}</div>
              </div>
            </div>
            
            <input 
              type="range" 
              min="0.05" 
              max={Math.PI - 0.05} 
              step="0.01" 
              value={theta}
              onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="flex gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <Info className="text-emerald-400 shrink-0" size={20} />
            <p className="text-sm text-emerald-100/80 italic">
              "The divergence at the poles suggests that as we approach a deterministic state (θ=0 or θ=π), 
              the sensitivity of the distribution to small changes in θ becomes infinite."
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.2: The Fisher Information Metric as a function of the RHC angle θ.
      </div>
    </div>
  );
};

export default FisherMetricPlot;
