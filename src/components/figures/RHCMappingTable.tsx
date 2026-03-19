import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="relative my-12 p-1 bg-gradient-to-br from-cream-200 via-cream-400 to-cream-200 rounded-3xl overflow-hidden shadow-2xl group">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,_#fff_0%,_transparent_70%)]"
        />
        <motion.div
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="relative bg-white rounded-[1.4rem] p-8 md:p-10">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-40 transition-opacity">
          <TableIcon className="text-navy-900 w-10 h-10" />
        </div>

        <div className="mb-10 relative z-10">
          <h3 className="text-3xl md:text-4xl font-serif italic text-navy-900 mb-3">
            The RHC-IG Mapping
          </h3>
          <p className="text-navy-700 text-lg max-w-3xl font-serif">
            Summarizing the profound correspondences between the Recursive Harmonic Codex 
            and the framework of Information Geometry.
          </p>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-navy-200">
                <th className="py-5 px-6 text-xs uppercase tracking-widest text-emerald-900 font-mono font-bold">RHC Structure</th>
                <th className="py-5 px-6 text-xs uppercase tracking-widest text-blue-900 font-mono font-bold">IG Concept</th>
                <th className="py-5 px-6 text-xs uppercase tracking-widest text-navy-800 font-mono font-bold">Description</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((m, i) => (
                <tr 
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-navy-100 transition-all duration-300 ${hoveredRow === i ? 'bg-navy-50/50' : ''}`}
                >
                  <td className="py-6 px-6 font-serif italic text-navy-900 text-xl font-medium">{m.rhc}</td>
                  <td className="py-6 px-6 font-mono text-blue-900 text-sm">
                    <div className="flex items-center gap-3">
                      <ArrowRight size={16} className="text-blue-800" />
                      <span className="font-bold tracking-tight">{m.ig}</span>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-navy-900 text-base leading-relaxed">{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {hoveredRow !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="mt-10 p-8 bg-emerald-50 border border-emerald-300 rounded-2xl flex gap-6 shadow-inner relative z-20"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                <Info className="text-emerald-700" size={24} />
              </div>
              <div>
                <h4 className="text-emerald-950 font-serif italic text-xl mb-2">Deep Correspondence</h4>
                <p className="text-base text-emerald-900 leading-relaxed">
                  {mappings[hoveredRow].details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-navy-200 text-[10px] text-navy-600 font-mono uppercase tracking-[0.3em] text-center font-bold">
          Table 4.1: Mapping RHC Structures to Information-Geometric Concepts.
        </div>
      </div>
    </div>
  );
};

export default RHCMappingTable;
