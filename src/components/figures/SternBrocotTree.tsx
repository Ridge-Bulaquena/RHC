import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';
import { Info, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface Node {
  p: number;
  q: number;
  level: number;
  x: number;
  y: number;
  left?: Node;
  right?: Node;
  parent?: Node;
}

export const SternBrocotTree: React.FC = () => {
  const [maxLevel, setMaxLevel] = useState(4);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const treeData = useMemo(() => {
    const nodes: Node[] = [];
    const build = (
      lP: number, lQ: number, 
      rP: number, rQ: number, 
      level: number, 
      minX: number, maxX: number
    ): Node | undefined => {
      if (level > maxLevel) return undefined;

      const p = lP + rP;
      const q = lQ + rQ;
      const x = (minX + maxX) / 2;
      const y = level * 80 + 50;

      const node: Node = { p, q, level, x, y };
      nodes.push(node);

      node.left = build(lP, lQ, p, q, level + 1, minX, x);
      node.right = build(p, q, rP, rQ, level + 1, x, maxX);
      
      return node;
    };

    const root = build(0, 1, 1, 0, 0, 50, 750);
    return { root, nodes };
  }, [maxLevel]);

  return (
    <FigureContainer
      id="fig-2-11"
      title="Figure 2.11 — The Stern-Brocot Tree of Primitive Pairs"
      caption="The Stern-Brocot tree generates all primitive pairs (p,q) in the first quadrant. Each child is the mediant of its closest ancestors."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <svg className="w-full h-full max-h-[450px]" viewBox="0 0 800 500">
          {/* Connections */}
          <g stroke="rgba(28, 40, 69, 0.1)" strokeWidth="1.5">
            {treeData.nodes.map((node, i) => (
              <React.Fragment key={`conn-${i}`}>
                {node.left && (
                  <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} />
                )}
                {node.right && (
                  <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} />
                )}
              </React.Fragment>
            ))}
          </g>

          {/* Nodes */}
          {treeData.nodes.map((node, i) => (
            <motion.g
              key={`node-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: node.level * 0.1 }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={18 - node.level * 2}
                fill={hoveredNode === node ? "#F0B800" : "#fff"}
                stroke="#1C2845"
                strokeWidth="1.5"
                className="transition-colors duration-200"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                className="text-[10px] font-mono fill-navy-900 font-bold pointer-events-none"
              >
                {node.p}/{node.q}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* Info Panel */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-24 bg-white border border-navy-100 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-2"
            >
              <div className="text-2xl font-mono text-navy-900 font-bold">
                ({hoveredNode.p}, {hoveredNode.q})
              </div>
              <div className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">
                Level {hoveredNode.level} · Ratio { (hoveredNode.p / hoveredNode.q).toFixed(3) }
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-6 w-full max-w-md space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
            <span>Tree Depth</span>
            <span className="text-navy-900 font-bold">{maxLevel}</span>
          </div>
          <input 
            type="range" min="1" max="5" step="1" value={maxLevel} 
            onChange={(e) => setMaxLevel(parseInt(e.target.value))}
            className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
          />
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Hover over nodes to see their details
        </div>
      </div>
    </FigureContainer>
  );
};
