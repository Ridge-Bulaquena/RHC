import React, { useMemo } from 'react';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';

export const LameTheoremPlot: React.FC = () => {
  const fibonacci = useMemo(() => {
    const fib = [1, 1];
    for (let i = 2; i < 20; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
  }, []);

  const getEuclideanSteps = (a: number, b: number): number => {
    let steps = 0;
    while (b > 0) {
      const r = a % b;
      a = b;
      b = r;
      steps++;
    }
    return steps;
  };

  const data = useMemo(() => {
    const d = [];
    // Fibonacci pairs
    for (let i = 2; i < fibonacci.length; i++) {
      const a = fibonacci[i];
      const b = fibonacci[i - 1];
      const steps = getEuclideanSteps(a, b);
      d.push({ a, b, steps, ratio: (a/b).toFixed(4), type: 'Fibonacci' });
    }
    // Random pairs for comparison
    for (let i = 0; i < 100; i++) {
      const a = Math.floor(Math.random() * 5000) + 1;
      const b = Math.floor(Math.random() * a) + 1;
      const steps = getEuclideanSteps(a, b);
      d.push({ a, b, steps, ratio: (a/b).toFixed(4), type: 'Random' });
    }
    return d;
  }, [fibonacci]);

  const phi = (1 + Math.sqrt(5)) / 2;

  return (
    <FigureWrapper
      id="fig-7-4"
      title="7.2.4 Lamé's Theorem and the Golden Ratio"
      subtitle="Step Count vs. Ratio"
      caption="A plot of the number of steps in the Euclidean algorithm versus the ratio b/a. Fibonacci pairs (red) represent the worst-case scenario, peaking at the golden ratio φ. This confirms Lamé's theorem and the RHC's emphasis on φ as the point of extremal convergence."
      mathBasis="N \le \lfloor \log_{\phi}(\sqrt{5}b) \rfloor - 2. The Euclidean algorithm takes the maximum number of steps for consecutive Fibonacci numbers, whose ratio approaches φ."
    >
      <div className="w-full h-full bg-white flex flex-col p-8">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                type="number" dataKey="ratio" name="Ratio" unit="" 
                domain={[0, 3]} label={{ value: 'Ratio (a/b)', position: 'insideBottom', offset: -10 }} 
              />
              <YAxis 
                type="number" dataKey="steps" name="Steps" unit="" 
                label={{ value: 'Steps', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Random Pairs" data={data.filter(d => d.type === 'Random')} fill="#94A3B8" opacity={0.5} />
              <Scatter name="Fibonacci Pairs" data={data.filter(d => d.type === 'Fibonacci')} fill="#EF4444" shape="star">
                <LabelList dataKey="a" position="top" style={{ fontSize: '10px', fill: '#EF4444' }} />
              </Scatter>
              <ReferenceLine x={phi} stroke="#F0B800" strokeDasharray="5 5" label={{ value: 'φ ≈ 1.618', position: 'top', fill: '#F0B800' }} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-8 text-[10px] font-bold text-navy-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Fibonacci Pairs (Worst Case)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-400 rounded-full" />
            <span>Random Pairs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-gold-500 border-t border-dashed border-gold-500" />
            <span>Golden Ratio φ</span>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
