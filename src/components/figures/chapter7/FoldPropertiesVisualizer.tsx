import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';

export const FoldPropertiesVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'symmetry' | 'projection' | 'minimum'>('symmetry');

  const symmetryData = useMemo(() => {
    const data = [];
    for (let x = 0.1; x <= 5; x += 0.1) {
      const fx = (x + 1/x) / 2;
      const finvx = (1/x + 1/(1/x)) / 2;
      data.push({ x: x.toFixed(1), fx, finvx });
    }
    return data;
  }, []);

  const projectionData = useMemo(() => {
    const data = [];
    for (let theta = 0; theta <= Math.PI * 2; theta += 0.1) {
      const cosTheta = Math.cos(theta);
      // F(exp(i*theta)) = (exp(i*theta) + exp(-i*theta)) / 2 = cos(theta)
      data.push({ theta: (theta * 180 / Math.PI).toFixed(0), cosTheta });
    }
    return data;
  }, []);

  const minimumData = useMemo(() => {
    const data = [];
    for (let x = 0.1; x <= 3; x += 0.1) {
      const fx = (x + 1/x) / 2;
      data.push({ x: x.toFixed(1), fx });
    }
    return data;
  }, []);

  return (
    <FigureWrapper
      id="fig-7-3"
      title="7.2.3 Fold Operator Properties"
      subtitle="Symmetry, Projection, and Extremal Properties"
      caption="Interactive plots of the fold operator F(x) = (x + 1/x)/2. These visualizations confirm the core mathematical properties required for the RHC's physical interpretation."
      mathBasis="\mathcal{F}(x) = \mathcal{F}(1/x), \mathcal{F}(e^{i\theta}) = \cos\theta, \mathcal{F}(x) \ge 1 \text{ for } x > 0. These properties ensure that the fold operator acts as a reliable projection and symmetry-preserving transformation."
    >
      <div className="w-full h-full bg-white flex flex-col p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(['symmetry', 'projection', 'minimum'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-navy-900 text-cream-50 shadow-lg' 
                  : 'bg-cream-100 text-navy-400 hover:bg-cream-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 bg-cream-50 rounded-2xl border border-cream-200 p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'symmetry' && (
              <motion.div
                key="symmetry"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full flex flex-col"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-serif text-navy-900 mb-2">Symmetry: F(x) = F(1/x)</h4>
                  <p className="text-sm text-navy-600">The fold operator is invariant under inversion, mapping x and its reciprocal to the same value.</p>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={symmetryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="x" label={{ value: 'x', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'F(x)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="fx" stroke="#F0B800" strokeWidth={3} dot={false} name="F(x)" />
                      <Line type="monotone" dataKey="finvx" stroke="#141414" strokeWidth={3} strokeDasharray="5 5" dot={false} name="F(1/x)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'projection' && (
              <motion.div
                key="projection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full flex flex-col"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-serif text-navy-900 mb-2">Projection: F(eⁱᶿ) = cos(θ)</h4>
                  <p className="text-sm text-navy-600">On the unit circle, the fold operator projects the complex phase onto its real component.</p>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="theta" label={{ value: 'θ (degrees)', position: 'insideBottom', offset: -5 }} />
                      <YAxis domain={[-1.2, 1.2]} label={{ value: 'F(eⁱᶿ)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="cosTheta" stroke="#F0B800" fill="#F0B800" fillOpacity={0.1} strokeWidth={3} name="cos(θ)" />
                      <ReferenceLine y={0} stroke="#141414" strokeDasharray="3 3" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'minimum' && (
              <motion.div
                key="minimum"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full flex flex-col"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-serif text-navy-900 mb-2">Minimum Property: F(x) ≥ 1</h4>
                  <p className="text-sm text-navy-600">For positive real values, the fold operator is always greater than or equal to 1, with the minimum at x=1.</p>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={minimumData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="x" label={{ value: 'x', position: 'insideBottom', offset: -5 }} />
                      <YAxis domain={[0, 3]} label={{ value: 'F(x)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="fx" stroke="#F0B800" strokeWidth={3} dot={false} name="F(x)" />
                      <ReferenceLine y={1} stroke="#141414" strokeDasharray="3 3" label="Minimum = 1" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FigureWrapper>
  );
};
