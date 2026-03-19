import React, { useState, useMemo } from 'react';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const AngleDistributionHistograms: React.FC = () => {
  const [maxN, setMaxN] = useState(50);

  const { thetaData, tData } = useMemo(() => {
    const nbins = 30;
    const thetaCounts = new Array(nbins).fill(0);
    const tCounts = new Array(nbins).fill(0);
    
    const tMin = -3;
    const tMax = 3;

    for (let a = 1; a <= maxN; a++) {
      for (let b = 1; b <= maxN; b++) {
        const theta = Math.atan2(b, a);
        const t = Math.log(Math.tan(theta));
        
        const thetaIdx = Math.floor((theta / (Math.PI / 2)) * nbins);
        if (thetaIdx >= 0 && thetaIdx < nbins) thetaCounts[thetaIdx]++;
        
        const tIdx = Math.floor(((t - tMin) / (tMax - tMin)) * nbins);
        if (tIdx >= 0 && tIdx < nbins) tCounts[tIdx]++;
      }
    }

    const tD = thetaCounts.map((count, i) => ({
      label: ((i / nbins) * 90).toFixed(0) + '°',
      count
    }));

    const tD2 = tCounts.map((count, i) => ({
      label: (tMin + (i / nbins) * (tMax - tMin)).toFixed(1),
      count
    }));

    return { thetaData: tD, tData: tD2 };
  }, [maxN]);

  return (
    <FigureWrapper
      id="fig-7-6"
      title="7.3.2 Distribution of Angles"
      subtitle="Convergence to Uniformity in t"
      caption="Side-by-side histograms of the angle θ and the transformed coordinate t = ln tan θ. While the distribution of θ is non-uniform (peaked near 45°), the distribution of t becomes uniform as N increases, confirming the RHC's natural coordinate system."
      mathBasis="t = \ln\tan\theta. The Fisher metric g_{\theta\theta} = 1/\sin^2 2\theta implies that the natural, uniform coordinate for the RHC state space is t."
    >
      <div className="w-full h-full bg-white flex flex-col p-8">
        {/* Slider */}
        <div className="mb-8 w-full max-w-md mx-auto bg-cream-50 p-6 rounded-2xl border border-cream-200">
          <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between mb-2">
            Lattice Size N <span>{maxN}</span>
          </label>
          <input 
            type="range" min="10" max="200" step="1" value={maxN} onChange={(e) => setMaxN(parseInt(e.target.value))}
            className="w-full accent-gold-500"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Theta Histogram */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-navy-900 mb-4 uppercase tracking-widest text-center">Distribution of θ</h4>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={thetaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* t Histogram */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-navy-900 mb-4 uppercase tracking-widest text-center">Distribution of t = ln tan θ</h4>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F0B800" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
