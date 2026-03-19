import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Activity, Zap, Info, ChevronRight, Play, RefreshCw, BarChart3, TrendingUp } from 'lucide-react';

const RingingBlackHole = ({ frequency, amplitude }: { frequency: number, amplitude: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(time * frequency) * amplitude);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#0B1120"
          speed={frequency}
          distort={amplitude * 2}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

export const BlackHoleRingdownSimulation: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [isRinging, setIsRinging] = useState(false);

  const theta = Math.atan(b / a);
  const fisherFreq = Math.abs(Math.log(Math.tan(theta))) * 5; // Scaling for visual effect

  return (
    <FigureWrapper
      id="fig-6-5"
      title="P5: Black Hole Ringdown Simulation"
      subtitle="Quantized Frequencies"
      caption="Interactive simulation of black hole quasinormal modes. Select an RHC ratio (a,b) to see the predicted ringdown frequency and its effect on the event horizon."
      mathBasis="M\omega_{lmn} = \frac{1}{2} | \ln\tan\theta_{lmn} | + \text{constant}. This prediction links the discrete RHC state space to the characteristic frequencies of a perturbed black hole."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Mode Parameters (a, b)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">a: {a}</label>
                    <input type="range" min="1" max="10" value={a} onChange={(e) => setA(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-bold text-navy-400 uppercase tracking-widest">b: {b}</label>
                    <input type="range" min="1" max="10" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Frequency Analysis</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-navy-700">θ = arctan(b/a)</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{(theta * 180 / Math.PI).toFixed(1)}°</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-navy-700">Predicted ω</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{fisherFreq.toFixed(4)}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsRinging(!isRinging)}
                className={cn(
                  "w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  isRinging ? "bg-gold-400 text-navy-900" : "bg-navy-900 text-gold-400"
                )}
              >
                {isRinging ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isRinging ? "Stop Ringdown" : "Trigger Ringdown"}
              </button>
            </div>
          </div>

          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Event Horizon Visualization</div>
            
            <div className="flex-1">
              <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <RingingBlackHole frequency={fisherFreq} amplitude={isRinging ? 0.1 : 0} />
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>

            {/* Spectrum Plot (Mini) */}
            <div className="h-24 bg-cream-50 rounded-xl border border-cream-100 mt-4 p-4 relative">
              <div className="absolute top-2 left-2 text-[8px] font-bold text-navy-400 uppercase tracking-widest">Predicted Spectrum</div>
              <div className="w-full h-full flex items-end justify-center gap-1 px-4 pb-2">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-2 rounded-t-sm transition-all duration-500",
                      Math.abs(i - Math.round(fisherFreq * 2)) < 1 ? "bg-gold-500 h-full" : "bg-navy-900/10 h-1/4"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
