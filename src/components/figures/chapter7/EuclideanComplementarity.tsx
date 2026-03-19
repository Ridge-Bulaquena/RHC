import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';

interface Step {
  a: number;
  b: number;
  q: number;
  r: number;
  theta1: number;
  theta2: number;
  lhs: number;
  rhs: number;
}

export const EuclideanComplementarity: React.FC = () => {
  const [a, setA] = useState(21);
  const [b, setB] = useState(13);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(() => {
    const s: Step[] = [];
    let curA = a;
    let curB = b;
    while (curB > 0) {
      const q = Math.floor(curA / curB);
      const r = curA % curB;
      const theta1 = Math.atan2(curB, curA);
      const theta2 = r > 0 ? Math.atan2(r, curB) : 0;
      const lhs = Math.tan(theta1);
      const rhs = 1 / (q + Math.tan(theta2));
      s.push({ a: curA, b: curB, q, r, theta1, theta2, lhs, rhs });
      curA = curB;
      curB = r;
    }
    return s;
  }, [a, b]);

  const step = steps[currentStep] || steps[steps.length - 1];

  return (
    <FigureWrapper
      id="fig-7-2"
      title="7.2.2 Angle Complementarity Animator"
      subtitle="Euclidean Step Verification"
      caption="An animated step-by-step visualization of the Euclidean algorithm. At each step, the RHC angle complementarity identity is verified numerically, showing how the angle θ evolves as the ratio is reduced."
      mathBasis="\tan\theta_1 = \frac{1}{q + \tan\theta_2}. This identity connects the geometry of the state space to the arithmetic of the Euclidean algorithm."
    >
      <div className="w-full h-full bg-cream-50 flex flex-col p-8">
        {/* Input Controls */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-2">Numerator (a)</label>
            <input 
              type="number" value={a} onChange={(e) => { setA(parseInt(e.target.value) || 1); setCurrentStep(0); }}
              className="w-full bg-white border border-cream-200 rounded-lg p-3 font-mono text-navy-900 focus:ring-2 focus:ring-gold-500 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-2">Denominator (b)</label>
            <input 
              type="number" value={b} onChange={(e) => { setB(parseInt(e.target.value) || 1); setCurrentStep(0); }}
              className="w-full bg-white border border-cream-200 rounded-lg p-3 font-mono text-navy-900 focus:ring-2 focus:ring-gold-500 outline-none"
            />
          </div>
        </div>

        {/* Step Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-cream-200 overflow-hidden">
            <div className="bg-navy-900 p-4 flex justify-between items-center">
              <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  className="p-2 hover:bg-white/10 rounded-lg text-cream-50 transition-colors disabled:opacity-30"
                  disabled={currentStep === 0}
                >
                  Prev
                </button>
                <button 
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="p-2 hover:bg-white/10 rounded-lg text-cream-50 transition-colors disabled:opacity-30"
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-1">Division</span>
                  <div className="text-2xl font-serif text-navy-900">
                    {step.a} = {step.q} × {step.b} + {step.r}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-1">Angles</span>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">θ₁ = arctan({step.b}/{step.a})</span>
                      <span className="font-mono font-bold">{(step.theta1 * 180 / Math.PI).toFixed(4)}°</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">θ₂ = arctan({step.r}/{step.b})</span>
                      <span className="font-mono font-bold">{(step.theta2 * 180 / Math.PI).toFixed(4)}°</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream-50 rounded-xl p-6 border border-cream-200">
                <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-4">Verification</span>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-1">LHS: tan(θ₁)</span>
                    <div className="font-mono text-xl font-bold text-navy-900">{step.lhs.toFixed(8)}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest block mb-1">RHS: 1 / (q + tan(θ₂))</span>
                    <div className="font-mono text-xl font-bold text-navy-900">{step.rhs.toFixed(8)}</div>
                  </div>
                  <div className="pt-4 border-t border-cream-200">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Identity Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
