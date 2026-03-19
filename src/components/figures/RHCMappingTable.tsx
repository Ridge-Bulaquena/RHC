import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table as TableIcon, ArrowRight, Info } from 'lucide-react';

const RHCMappingTable: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const mappings = [
    {
      rhc: 'RHC Angle (θ)',
      ig: 'Statistical Manifold Coordinate',
      description: 'The fundamental parameter defining the state of the harmonic distribution.',
      details: 'In RHC, θ is derived from coprime pairs (p, q). In IG, it represents a point on the manifold of probability distributions.'
    },
    {
      rhc: 'Primitive Lattice (LP)',
      ig: 'Discrete Information Space',
      description: 'The set of irreducible states defined by the primitivity condition.',
      details: 'The lattice structure provides a natural quantization of the information manifold, linking arithmetic to geometry.'
    },
    {
      rhc: 'Fold Operator (Φ)',
      ig: 'Manifold Projection / Overlap',
      description: 'The transformation that reveals the symmetry and overlap of distributions.',
      details: 'Folding the RHC manifold is equivalent to calculating the Bhattacharyya coefficient between mirrored states.'
    },
    {
      rhc: 'Harmonic Ratio (p/q)',
      ig: 'Information Density / Curvature',
      description: 'The arithmetic ratio that determines the local geometric properties.',
      details: 'The ratio p/q dictates the local Fisher information, where simpler ratios correspond to higher information density.'
    },
    {
      rhc: 'Recursive Structure',
      ig: 'Hierarchical Manifold Topology',
      description: 'The self-similar nature of the RHC across different scales.',
      details: 'The recursive generation of RHC angles mirrors the hierarchical structure of complex statistical models.'
    }
  ];

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <TableIcon className="text-emerald-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          The RHC-IG Mapping
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          Summarizing the profound correspondences between the Recursive Harmonic Codex 
          and the framework of Information Geometry.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-emerald-400 font-mono">RHC Structure</th>
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-blue-400 font-mono">IG Concept</th>
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-slate-500 font-mono">Description</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((m, i) => (
              <tr 
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-white/5 transition-colors duration-300 ${hoveredRow === i ? 'bg-white/5' : ''}`}
              >
                <td className="py-6 px-6 font-serif italic text-white text-lg">{m.rhc}</td>
                <td className="py-6 px-6 font-mono text-blue-300 text-sm">
                  <div className="flex items-center gap-2">
                    <ArrowRight size={14} className="text-blue-500" />
                    {m.ig}
                  </div>
                </td>
                <td className="py-6 px-6 text-slate-400 text-sm">{m.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {hoveredRow !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex gap-4"
          >
            <Info className="text-emerald-400 shrink-0" size={20} />
            <div>
              <h4 className="text-emerald-200 font-serif italic mb-1">Deep Correspondence</h4>
              <p className="text-sm text-emerald-100/70 leading-relaxed">
                {mappings[hoveredRow].details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Table 4.1: Mapping RHC Structures to Information-Geometric Concepts.
      </div>
    </div>
  );
};

export default RHCMappingTable;
