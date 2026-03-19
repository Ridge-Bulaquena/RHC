import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Globe, Cpu, Calculator, Activity } from 'lucide-react';

const UnifiedFrameworkInfographic: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 0,
      title: 'Recursive Harmonic Codex',
      icon: <Network className="w-8 h-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/40',
      summary: 'The core arithmetic-geometric framework defining harmonic distributions through coprime pairs and recursive angles.',
      x: 50, y: 50
    },
    {
      id: 1,
      title: 'Information Geometry',
      icon: <Globe className="w-6 h-6" />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/40',
      summary: 'The geometric study of probability distributions, providing the Fisher-Rao metric and statistical manifold structure.',
      x: 20, y: 20
    },
    {
      id: 2,
      title: 'Physics & Entropy',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/40',
      summary: 'The physical implications of information flow, entropy gradients, and the emergence of physical laws from geometry.',
      x: 80, y: 20
    },
    {
      id: 3,
      title: 'Arithmetic Topology',
      icon: <Calculator className="w-6 h-6" />,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/40',
      summary: 'The connection between number theory (primitivity, lattices) and the topological properties of the information manifold.',
      x: 20, y: 80
    },
    {
      id: 4,
      title: 'Quantum Information',
      icon: <Cpu className="w-6 h-6" />,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
      borderColor: 'border-rose-500/40',
      summary: 'The extension to complex-valued states, interference patterns, and the Fubini-Study metric in quantum systems.',
      x: 80, y: 80
    }
  ];

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Network className="text-blue-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          The Unified Framework
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          A high-level overview of the Recursive Harmonic Information Geometry framework, 
          integrating arithmetic, geometry, physics, and information theory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Concept Map Area */}
        <div className="relative aspect-square bg-navy-950/50 rounded-xl border border-white/5 p-8">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Connection Lines */}
            {nodes.slice(1).map((node, i) => (
              <motion.line
                key={`line-${i}`}
                x1="50" y1="50" x2={node.x} y2={node.y}
                stroke={node.id === selectedNode ? '#fff' : 'rgba(255,255,255,0.1)'}
                strokeWidth={node.id === selectedNode ? '0.5' : '0.2'}
                strokeDasharray="1 1"
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.button
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ${node.bgColor} ${node.borderColor} ${node.color} ${selectedNode === node.id ? 'scale-125 shadow-lg shadow-white/10 border-white' : 'hover:scale-110'}`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              whileHover={{ y: -5 }}
            >
              {node.icon}
            </motion.button>
          ))}
        </div>

        {/* Node Content */}
        <div className="min-h-[240px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedNode !== null ? (
              <motion.div
                key={selectedNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${nodes[selectedNode].bgColor} ${nodes[selectedNode].color}`}>
                    {nodes[selectedNode].icon}
                  </div>
                  <h4 className="text-2xl font-serif italic text-white">
                    {nodes[selectedNode].title}
                  </h4>
                </div>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {nodes[selectedNode].summary}
                </p>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors font-mono"
                >
                  Back to Overview
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-4"
              >
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
                  <Network className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-400 italic">Select a node to explore the framework's components.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.11: The Unified Framework of Recursive Harmonic Information Geometry.
      </div>
    </div>
  );
};

export default UnifiedFrameworkInfographic;
