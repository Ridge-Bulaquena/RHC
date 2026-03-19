import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, BookOpen, Layers, Zap, Shield, Globe } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

const chapters = [
  {
    id: 'ch-1',
    title: 'Chapter 1: Introduction',
    subtitle: 'The Unification of Information and Geometry',
    description: 'Foundational concepts, historical context, and the core problem statement of the RHC.',
    icon: <BookOpen size={20} className="text-gold-400" />,
    color: 'bg-gold-400/10',
    borderColor: 'border-gold-400/30',
  },
  {
    id: 'ch-2',
    title: 'Chapter 2: Discrete Foundations',
    subtitle: 'Arithmetic Origins of Spacetime',
    description: 'Mapping integer pairs (a,b) to the complex plane and deriving the Fisher metric.',
    icon: <Layers size={20} className="text-gold-400" />,
    color: 'bg-navy-900/5',
    borderColor: 'border-navy-900/10',
  },
  {
    id: 'ch-3',
    title: 'Chapter 3: Geometric Embedding',
    subtitle: 'The Fisher Information Metric',
    description: 'Exploring the information-geometric structure of the complex plane and its physical implications.',
    icon: <Zap size={20} className="text-gold-400" />,
    color: 'bg-gold-400/5',
    borderColor: 'border-gold-400/20',
  },
  {
    id: 'ch-4',
    title: 'Chapter 4: Physical Unification',
    subtitle: 'Reconstructing GR and QM',
    description: 'Deriving the Einstein field equations and the Schrödinger equation from information-geometric principles.',
    icon: <Shield size={20} className="text-gold-400" />,
    color: 'bg-navy-900/5',
    borderColor: 'border-navy-900/10',
  },
  {
    id: 'ch-5',
    title: 'Chapter 5: Falsifiable Predictions',
    subtitle: 'Cosmological Observables',
    description: 'Deriving 18 specific, testable predictions for cosmological and particle physics observables.',
    icon: <Globe size={20} className="text-gold-400" />,
    color: 'bg-gold-400/10',
    borderColor: 'border-gold-400/30',
  },
];

export const MonographStructure: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <FigureContainer
      id="fig-1-11"
      title="Figure 1.11 — Structure of the Monograph"
      caption="An interactive overview of the monograph's chapters and their core themes. Click each chapter to see a detailed summary."
      variant="light"
    >
      <div className="flex flex-col gap-4">
        {chapters.map((ch) => (
          <div key={ch.id} className={`rounded-xl border-2 transition-all duration-300 ${expandedId === ch.id ? 'border-gold-400 bg-gold-400/10 shadow-lg' : 'border-cream-200 bg-white hover:border-gold-400/30'}`}>
            <button 
              onClick={() => setExpandedId(expandedId === ch.id ? null : ch.id)}
              className="w-full p-6 flex items-center gap-6 text-left"
            >
              <div className={`p-4 rounded-2xl ${expandedId === ch.id ? 'bg-gold-400 text-navy-900' : 'bg-cream-100 text-navy-400'}`}>
                {ch.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest leading-none mb-1">{ch.subtitle}</span>
                <h3 className="font-serif font-bold text-navy-800 text-xl">{ch.title}</h3>
              </div>
              <div className="ml-auto">
                {expandedId === ch.id ? <ChevronUp size={20} className="text-gold-400" /> : <ChevronDown size={20} className="text-navy-400" />}
              </div>
            </button>

            <AnimatePresence>
              {expandedId === ch.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white/50"
                >
                  <div className="p-8 border-t border-cream-100">
                    <p className="text-lg text-navy-800 leading-relaxed font-light italic">
                      "{ch.description}"
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </FigureContainer>
  );
};
