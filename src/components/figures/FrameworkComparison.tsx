import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Star, Link as LinkIcon, Info } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

const frameworks = [
  {
    name: "RHC (This Work)",
    ontology: "Integer pairs (a,b)",
    structure: "Complex plane, fold operator F, Fisher metric",
    dynamics: "Kinematical (dynamics open)",
    predictions: "18 falsifiable predictions across multiple domains",
    relation: "foundational",
    equations: "z = a + ib, F(x) = (x + x⁻¹)/2",
    publications: "Recursive Harmonic Codex (2026)",
    color: "bg-gold-400/10",
  },
  {
    name: "IGEG (Bulaqueña)",
    ontology: "Informational field ψ",
    structure: "Modified Einstein equations, stress-energy I_μν",
    dynamics: "Field equations G_μν = 8πG(T_μν + I_μν)",
    predictions: "Dark matter/energy from ∇ψ ≠ 0; Universal Consilience",
    relation: "complementary",
    equations: "G_μν = 8πG(T_μν + I_μν), ρ_ψ = (∇ψ)²/2 + V(ψ)",
    publications: "Information Geometric Extended Gravity (2024)",
    color: "bg-navy-900/5",
  },
  {
    name: "Emergent Spacetime",
    ontology: "Generative dynamics",
    structure: "Fisher metric on macrostates; projection operator Π_GR",
    dynamics: "Emergent from projection",
    predictions: "Λ_eff = Λ_geom + Λ_stat; emergent arrow of time",
    relation: "compatible",
    equations: "Λ_eff = Λ_geom + Λ_stat, Π_GR: Φ ↦ (M, g, Ψ)",
    publications: "Axelkrans (2025)",
    color: "bg-gold-400/5",
  },
  {
    name: "MCIMES",
    ontology: "Quantum information",
    structure: "Interaction graphs, monoidal categories, invariants",
    dynamics: "Minimal information loss principle",
    predictions: "w = -0.97 ± 0.01; Λ ≈ 1.9 × 10⁻¹²³",
    relation: "compatible",
    equations: "w = -0.97 ± 0.01, Λ_theor = (1.9 ± 0.7) × 10⁻¹²³",
    publications: "Kondrashov (2025)",
    color: "bg-navy-900/5",
  },
];

const RelationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'foundational': return <Star size={16} className="text-gold-400" fill="currentColor" />;
    case 'complementary': return <Star size={16} className="text-gold-400" />;
    case 'compatible': return <Info size={16} className="text-gold-400" />;
    default: return null;
  }
};

export const FrameworkComparison: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <FigureContainer
      id="fig-1-7"
      title="Table 1.1 — Comparison of Information-Geometric Frameworks"
      caption="Comparison of information-geometric frameworks. The RHC complements continuous-field approaches with a discrete arithmetic foundation."
      variant="light"
    >
      <div className="w-full overflow-hidden rounded-xl border border-cream-200">
        <div className="grid grid-cols-12 bg-navy-800 text-gold-400 font-mono text-[10px] uppercase tracking-widest p-4">
          <div className="col-span-3">Framework</div>
          <div className="col-span-3">Ontology</div>
          <div className="col-span-4">Predictions</div>
          <div className="col-span-2 text-center">Relation</div>
        </div>

        <div className="flex flex-col">
          {frameworks.map((fw, idx) => (
            <div key={idx} className={`border-b border-cream-100 last:border-0 ${fw.color}`}>
              <button 
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className="w-full grid grid-cols-12 p-4 items-center hover:bg-gold-400/5 transition-colors text-left"
              >
                <div className="col-span-3 font-serif font-bold text-navy-800">{fw.name}</div>
                <div className="col-span-3 text-xs text-navy-600 font-light">{fw.ontology}</div>
                <div className="col-span-4 text-xs text-navy-600 font-light italic">{fw.predictions}</div>
                <div className="col-span-2 flex justify-center items-center gap-2">
                  <RelationIcon type={fw.relation} />
                  {expandedIndex === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/50"
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-cream-100">
                      <div>
                        <h6 className="text-[10px] font-mono text-gold-600 uppercase tracking-widest mb-2">Mathematical Structure</h6>
                        <p className="text-xs text-navy-800 leading-relaxed mb-4">{fw.structure}</p>
                        <div className="bg-navy-800/5 p-3 rounded-lg border border-navy-800/10 font-mono text-[10px] text-navy-700">
                          {fw.equations}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-[10px] font-mono text-gold-600 uppercase tracking-widest mb-2">Primary Publications</h6>
                        <div className="flex items-start gap-2 mb-4">
                          <LinkIcon size={12} className="mt-1 text-gold-600" />
                          <p className="text-xs text-navy-800 italic">{fw.publications}</p>
                        </div>
                        <h6 className="text-[10px] font-mono text-gold-600 uppercase tracking-widest mb-2">Dynamics</h6>
                        <p className="text-xs text-navy-800 leading-relaxed">{fw.dynamics}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </FigureContainer>
  );
};
