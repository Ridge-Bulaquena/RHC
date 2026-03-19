import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { FigureContainer } from '../FigureContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';
import { Info, BarChart2, TrendingUp } from 'lucide-react';

export const PrimitiveDensity: React.FC = () => {
  function gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      x %= y;
      [x, y] = [y, x];
    }
    return x;
  }

  const data = useMemo(() => {
    const results = [];
    let primitiveCount = 0;
    let totalCount = 0;

    // We calculate for expanding squares
    for (let n = 1; n <= 50; n++) {
      // Add points on the boundary of the n x n square in the first quadrant
      for (let i = 1; i <= n; i++) {
        if (gcd(i, n) === 1) primitiveCount++;
        totalCount++;
        if (i < n) {
          if (gcd(n, i) === 1) primitiveCount++;
          totalCount++;
        }
      }
      results.push({
        n,
        density: primitiveCount / totalCount,
        theoretical: 6 / (Math.PI * Math.PI)
      });
    }
    return results;
  }, []);

  return (
    <FigureContainer
      id="fig-2-10"
      title="Figure 2.10 — Density of Primitive Pairs"
      caption="As the range N increases, the proportion of primitive pairs in the lattice approaches 6/π² ≈ 0.6079, the probability that two random integers are coprime."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl border border-navy-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">Empirical Density vs. Theoretical Limit</h4>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-gold-400" /> Empirical</div>
              <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-navy-800 border-t border-dashed" /> 6/π²</div>
            </div>
          </div>

          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F0B800" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F0B800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="n" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  label={{ value: 'Range (N)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  domain={[0.5, 0.8]} 
                  label={{ value: 'Density', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  itemStyle={{ fontSize: '10px', fontFamily: 'Roboto Mono' }}
                  formatter={(value: number) => [value.toFixed(4), 'Density']}
                />
                <ReferenceLine y={6 / (Math.PI * Math.PI)} stroke="#1C2845" strokeDasharray="5 5" strokeWidth={1.5} />
                <Area type="monotone" dataKey="density" stroke="#F0B800" strokeWidth={2} fillOpacity={1} fill="url(#colorDensity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm flex flex-col gap-2">
            <div className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">Theoretical Limit</div>
            <div className="text-2xl font-mono text-navy-900 font-bold">0.6079</div>
            <div className="text-[10px] font-mono text-gold-600">6 / π²</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm flex flex-col gap-2">
            <div className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">Current Density (N=50)</div>
            <div className="text-2xl font-mono text-navy-900 font-bold">{data[data.length - 1].density.toFixed(4)}</div>
            <div className="text-[10px] font-mono text-emerald-600">Converging...</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm flex flex-col gap-2">
            <div className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">Error Margin</div>
            <div className="text-2xl font-mono text-navy-900 font-bold">
              {Math.abs(data[data.length - 1].density - 6 / (Math.PI * Math.PI)).toFixed(4)}
            </div>
            <div className="text-[10px] font-mono text-navy-400">|Empirical - Theoretical|</div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          The density fluctuates but stabilizes as N grows
        </div>
      </div>
    </FigureContainer>
  );
};
