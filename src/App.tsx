/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Menu, 
  X, 
  ChevronRight, 
  Info, 
  BookOpen, 
  Zap, 
  Target, 
  Cpu, 
  MessageSquare, 
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { Math, MathBlock } from './components/Math';
import { Section, Callout } from './components/Layout';
import { TitlePage } from './components/TitlePage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

const SECTIONS = [
  { id: 'abstract', title: 'Abstract', subtitle: 'A formal mapping of discrete arithmetic' },
  { id: 'introduction', title: '1. Introduction', subtitle: 'Background and Context' },
  { id: 'foundations', title: '2. Math Foundations', subtitle: 'The Fundamental Mapping' },
  { id: 'results', title: '3. Core Results', subtitle: 'Theorems and Identities' },
  { id: 'info-geom', title: '4. Info Geometry', subtitle: 'Fisher Metric and Manifolds' },
  { id: 'interpretation', title: '5. Interpretation', subtitle: 'Emergent Spacetime' },
  { id: 'predictions', title: '6. Predictions', subtitle: 'Falsifiable Hypotheses' },
  { id: 'conclusion', title: '7. Conclusion', subtitle: 'Final Synthesis' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('abstract');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        ignoreElements: (element) => {
          // Hide interactive/animated elements for PDF
          return element.classList.contains('no-pdf') || element.tagName === 'BUTTON';
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save('Recursive_Harmonic_Codex.pdf');
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F0B800', '#1C2845', '#FDFAF5']
      });
    } catch (err) {
      console.error('PDF Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 selection:bg-gold-300 selection:text-navy-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-navy-800/95 backdrop-blur-md z-50 border-b border-gold-400/20 flex items-center px-6 md:px-12 no-pdf">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-gold-400 rounded-sm flex items-center justify-center">
            <span className="text-navy-800 font-bold text-xs">RHC</span>
          </div>
          <span className="text-white font-serif text-xl tracking-widest uppercase hidden sm:block">Recursive Harmonic Codex</span>
        </motion.div>

        <div className="hidden lg:flex ml-auto gap-8">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-[10px] uppercase tracking-widest transition-colors ${
                activeSection === s.id ? 'text-gold-400' : 'text-navy-150 hover:text-white'
              }`}
            >
              {s.title.split('. ')[1] || s.title}
            </a>
          ))}
        </div>

        <div className="ml-auto lg:ml-8 flex items-center gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-gold-400 hover:bg-gold-300 disabled:bg-gold-300/50 text-navy-800 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            {isExporting ? 'Exporting...' : (
              <>
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </>
            )}
          </button>
          
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-navy-800 z-[60] p-8 flex flex-col no-pdf"
          >
            <button 
              className="self-end text-white mb-12"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl text-white font-serif hover:text-gold-400 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Title Page */}
      <TitlePage />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 px-6 md:px-12 pt-32 pb-24">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block sticky top-32 h-fit no-pdf">
          <div className="bg-cream-200 p-8 rounded-lg border border-cream-300">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cream-700 mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Contents
            </h3>
            <ul className="space-y-4">
              {SECTIONS.map((s, idx) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`group flex items-start gap-3 text-sm transition-all ${
                      activeSection === s.id ? 'text-navy-800 font-medium' : 'text-cream-700 hover:text-navy-500'
                    }`}
                  >
                    <span className="font-mono text-[10px] mt-1 opacity-50">
                      {String(idx).padStart(2, '0')}
                    </span>
                    <span className="flex-1">{s.title}</span>
                    {activeSection === s.id && (
                      <motion.div layoutId="active-indicator" className="w-1 h-4 bg-gold-400 rounded-full self-center" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div ref={contentRef} className="bg-white p-8 md:p-16 rounded-xl shadow-2xl shadow-navy-800/5 border border-cream-200">
          {/* Hero */}
          <header className="mb-24 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl text-navy-800 mb-8 leading-[0.9]">
                Recursive Harmonic Codex
              </h1>
              <div className="h-1 w-24 bg-gold-400 mb-12 mx-auto lg:mx-0" />
              <p className="text-2xl md:text-3xl font-serif italic text-gold-700 max-w-2xl">
                A formal mapping of discrete arithmetic structures to continuous geometric representations and information-theoretic measures.
              </p>
              <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-mono text-cream-700">
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> v3.14.159</span>
                <span className="flex items-center gap-2"><Target className="w-4 h-4" /> RHC Edition</span>
                <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> 2025-03-19</span>
              </div>
            </motion.div>
          </header>

          <Section id="abstract" title="Abstract" subtitle="The core premise">
            <p className="text-xl leading-relaxed mb-8">
              <strong>Problem:</strong> The absence of a unified mathematical framework that explicitly links discrete arithmetic structures (gcd, ratios) to continuous geometric representations (angles, radii) and information-theoretic measures (Fisher metric, Bhattacharyya coefficient).
            </p>
            <p className="text-xl leading-relaxed mb-8">
              <strong>Method:</strong> This work introduces a formal mapping <Math formula="\Psi: \mathbb{N}^2 \rightarrow \mathbb{C}" />, where an integer pair <Math formula="(a,b)" /> is represented as a point <Math formula="z = a + ib" /> in the complex plane. A key "fold operator" <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> is defined and rigorously explored.
            </p>
            <Callout type="critique" label="Scope Disclaimer">
              This work maintains a strict epistemological separation between its core mathematical results (Sections 2–4) and its speculative physical interpretations (Sections 5–6).
            </Callout>
          </Section>

          <Section id="introduction" title="1. Introduction" subtitle="Background and Context">
            <h3 className="text-2xl font-serif mb-6">1.1 Background and Context</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-2">1.1.1 Arithmetic Structures</h4>
                <p>At the foundation of number theory lies the study of integers and their relationships. The greatest common divisor (GCD) and the Euclidean algorithm reveal deep structural properties. The sequence of quotients in the Euclidean algorithm encodes the continued fraction expansion of the ratio <Math formula="a/b" />.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-2">1.1.2 Geometric Representation</h4>
                <p>The complex plane <Math formula="\mathbb{C}" /> offers a natural representation for ordered pairs. By identifying <Math formula="(a,b)" /> with <Math formula="z = a + ib" />, we embed discrete arithmetic into a continuous geometric space. The polar representation <Math formula="z = re^{i\theta}" /> separates scale <Math formula="r = \sqrt{a^2+b^2}" /> from shape <Math formula="\theta = \arctan(b/a)" />.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-2">1.1.3 Information Geometry</h4>
                <p>Information geometry provides a framework where parametric families of distributions form a statistical manifold. The Fisher‑Rao metric <Math formula="ds^2 = \sum g_{ij} d\xi^i d\xi^j" /> quantifies distinguishability.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-2">1.1.4 Physical Motivations</h4>
                <p>The "it from bit" paradigm (Wheeler 1990) proposes that physical entities derive from information. The holographic principle and ER=EPR suggest spacetime emerges from quantum information.</p>
              </div>
            </div>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-2xl font-serif mb-4">1.2 Problem Statement</h3>
                <p>No unified framework connects number theory, geometry, and information theory through a simple construction. We lack a formalism capturing exact discrete relationships, continuous geometric structure, and information‑theoretic measures simultaneously.</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-4">1.3 Objectives</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Construct mapping <Math formula="\Psi:\mathbb{N}^2\to\mathbb{C}" /> and fold operator <Math formula="\mathcal{F}" />.</li>
                  <li>Prove core geometric identities.</li>
                  <li>Connect to information measures.</li>
                  <li>Propose conjectural physical interpretations.</li>
                  <li>Derive falsifiable predictions.</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="foundations" title="2. Math Foundations" subtitle="The Fundamental Mapping">
            <h3 className="text-2xl font-serif mb-6">2.1 Preliminaries</h3>
            <p className="mb-6">
              <Math formula="\mathbb{N}, \mathbb{Z}, \mathbb{C}" />, <Math formula="\gcd(a,b)" />, coprime integers. Fundamental Theorem of Arithmetic, Correctness of Euclidean Algorithm, Polar Decomposition.
            </p>

            <h3 className="text-2xl font-serif mb-6">2.2 The Fundamental Mapping</h3>
            <p className="mb-6">
              We identify <Math formula="(a,b)" /> with <Math formula="z = a + ib" />, embedding discrete arithmetic into a continuous geometric space. The polar representation <Math formula="z = re^{i\theta}" /> separates scale <Math formula="r = \sqrt{a^2+b^2}" /> from shape <Math formula="\theta = \arctan(b/a)" />.
            </p>
            
            <MathBlock 
              label="Theorem 2.1 (GCD–Radius Relation)"
              formula="d = \gcd(a,b) = \frac{|z|}{\sqrt{p^2+q^2}}" 
            />

            <h3 className="text-2xl font-serif mb-6">2.4 The Fold Operator</h3>
            <Callout type="def" label="The Fold Operator">
              The fold operator <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> extracts real projections. For <Math formula="x = e^{i\theta}" />, it yields <Math formula="\cos\theta" />.
            </Callout>
            <p className="mt-6">
              Properties: symmetry <Math formula="\mathcal{F}(x)=\mathcal{F}(x^{-1})" />, real projection <Math formula="\mathcal{F}(e^{i\theta}) = \cos\theta" />, minimum <Math formula="\mathcal{F}(x)\ge 1" /> for real <Math formula="x>0" />.
            </p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.5 Geometric Constructions</h3>
            <p>Associated right triangle, composite structures (triangle chains), angle mismatch <Math formula="\Delta\theta_{ij}" />, curvature analogue <Math formula="K = \pi - \sum\theta_k" />.</p>
          </Section>

          <Section id="results" title="3. Core Results" subtitle="Theorems and Identities">
            <h3 className="text-2xl font-serif mb-6">3.2 Angle Complementarity</h3>
            <p className="mb-6">
              <strong>Theorem 3.2:</strong> For <Math formula="a \ge b" />, <Math formula="a = qb + r" />, <Math formula="\theta_1 = \arctan(b/a)" />, <Math formula="\theta_2 = \arctan(r/b)" />, then:
            </p>
            <MathBlock 
              formula="\tan\theta_1 = \frac{1}{q + \tan\theta_2}" 
            />
            <p className="mt-6">
              This identity provides a recursive geometric interpretation of the Euclidean algorithm, where each step corresponds to a "folding" of the angular space.
            </p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.3 Theorems on the Fold Operator</h3>
            <p className="mb-4"><strong>Theorem 3.3 (Fold as Inner Product):</strong> <Math formula="\mathcal{F}(u/v) = \cos(\theta_1-\theta_2)" /> for <Math formula="u=e^{i\theta_1}, v=e^{i\theta_2}" />.</p>
            <p className="mb-4"><strong>Theorem 3.4 (Fold and Euclidean Algorithm):</strong> <Math formula="\mathcal{F}(z/z') = \cos(\theta-\theta')" /> for successive remainders.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.4 Limits and Constraints</h3>
            <p className="mb-4"><strong>Lemma 3.1 (Discreteness):</strong> <Math formula="\Psi(\mathbb{N}^2)" /> is discrete.</p>
            <p className="mb-4"><strong>Proposition 3.1 (Density):</strong> Angles <Math formula="\{\arctan(b/a)\}" /> are dense in <Math formula="[0,\pi/2]" />.</p>

            <div className="mt-12 p-8 bg-navy-800 rounded-2xl text-white no-pdf">
              <h4 className="text-xl font-serif mb-4 text-gold-400">Interactive Exploration</h4>
              <p className="text-sm opacity-80 mb-6">
                The Recursive Harmonic Codex is not just a document; it's a living mathematical structure. Explore the relationships between discrete integers and continuous geometry.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-left">
                  <span className="block text-xs font-mono opacity-50 mb-1">01. LATTICE</span>
                  <span className="text-sm font-medium">Visualize Integer Grid</span>
                </button>
                <button className="p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-left">
                  <span className="block text-xs font-mono opacity-50 mb-1">02. FOLD</span>
                  <span className="text-sm font-medium">Apply Fold Operator</span>
                </button>
                <button className="p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-left">
                  <span className="block text-xs font-mono opacity-50 mb-1">03. HARMONIC</span>
                  <span className="text-sm font-medium">Extract Harmonics</span>
                </button>
              </div>
            </div>
          </Section>

          <Section id="info-geom" title="4. Info Geometry" subtitle="Fisher Metric and Manifolds">
            <h3 className="text-2xl font-serif mb-6">4.1 Fisher‑Rao Metric</h3>
            <p className="mb-6"><Math formula="g_{ij}(\xi) = \mathbb{E}[\partial_i\log p \,\partial_j\log p]" />, <Math formula="ds^2 = \sum g_{ij}d\xi^i d\xi^j" />. Čencov's theorem establishes uniqueness.</p>

            <h3 className="text-2xl font-serif mb-6">4.2 Mapping RHC to a Statistical Manifold</h3>
            <p className="mb-6">
              The ratio <Math formula="\mu = b/a" /> parameterizes a scale family. Transforming to <Math formula="\theta = \arctan\mu" /> yields the Fisher metric:
            </p>
            <MathBlock 
              label="Fisher Metric in Angle Coordinates"
              formula="ds^2 = \frac{1}{\sin^2\theta \cos^2\theta} d\theta^2" 
            />
            <p className="mt-6">
              Fisher distance: <Math formula="d_F(\theta_1,\theta_2) = |\ln\tan\theta_2 - \ln\tan\theta_1|" />.
            </p>

            <h3 className="text-2xl font-serif mt-12 mb-6">4.3 Small‑Angle Approximation</h3>
            <p className="mb-4"><strong>Theorem 4.1:</strong> <Math formula="d_F \approx \frac{2}{\sin(2\bar{\theta})}\Delta\theta + \mathcal{O}(\Delta\theta^2)" />.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">4.4 Connection to Fold Operator and Bhattacharyya</h3>
            <p className="mb-4">For Bernoulli family with <Math formula="p = a/(a+b)" />, <Math formula="BC = 2\sqrt{ab}/(a+b) = 1/\mathcal{F}(\sqrt{a/b})" />.</p>
          </Section>

          <Section id="interpretation" title="5. Interpretation" subtitle="Emergent Spacetime">
            <h3 className="text-2xl font-serif mb-6">5.2 Hypothesis 1: RHC as State Space</h3>
            <p className="mb-8"><Math formula="(a,b)" /> ↔ binary system state, <Math formula="\theta" /> ↔ continuous parameter, <Math formula="r" /> ↔ latent variable.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { symbol: '⊖', title: 'Recursive Mapping', body: 'Integer pairs map uniquely to points in the complex plane.', tag: 'FOUNDATIONAL' },
                { symbol: '∿', title: 'Fold Operator', body: 'Extracts real projections, models measurement via symmetry.', tag: 'OPERATIONAL' },
                { symbol: '⊕', title: 'GCD-Radius', body: 'Links arithmetic to geometry via Theorem 2.1.', tag: 'THEOREM' },
                { symbol: '◎', title: 'Fisher-RHC', body: 'Fisher distance derived from angular ratios.', tag: 'INFO-GEOM' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 border-2 border-cream-300 rounded-lg hover:border-gold-400 hover:shadow-xl transition-all"
                >
                  <div className="text-5xl text-navy-100 mb-4">{card.symbol}</div>
                  <h4 className="text-xl font-bold text-navy-800 mb-2">{card.title}</h4>
                  <p className="text-cream-700 mb-4">{card.body}</p>
                  <span className="text-[10px] font-bold tracking-widest text-gold-700 uppercase">{card.tag}</span>
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl font-serif mb-6">5.3 Hypothesis 2: Fold Operator as Projection</h3>
            <p className="mb-6"><Math formula="\mathcal{F}" /> applied to complex amplitude ↔ quantum measurement. Symmetry <Math formula="\mathcal{F}(x)=\mathcal{F}(1/x)" /> ↔ exchange duality.</p>

            <h3 className="text-2xl font-serif mb-6">5.4 Hypothesis 3: Emergent Spacetime</h3>
            <p className="mb-6">Composite geometric structures ↔ pre‑geometric fabric. Curvature analogue <Math formula="K = \pi - \sum\theta_k" /> ↔ local energy density. Continuum limit <Math formula="a,b\to\infty" /> yields smooth geometry.</p>
          </Section>

          <Section id="predictions" title="6. Predictions" subtitle="Falsifiable Hypotheses">
            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P1: Spectral Scaling
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> <Math formula="d_F = |\ln\tan\theta_2 - \ln\tan\theta_1|" />.
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Energy gaps in discrete systems will scale according to the Fisher distance <Math formula="\Delta E \propto |\ln\tan\theta_2 - \ln\tan\theta_1|" />.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P2: Measurement Bias
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> <Math formula="\mathcal{F}(x)=\mathcal{F}(1/x)" /> symmetry, fixed point at <Math formula="x=1" />.
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Distribution of measured ratios in quantum-like systems will peak at <Math formula="a=b" /> due to fold operator symmetry.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P3: Optimal Convergence at Golden Ratio
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> Lamé's theorem, worst‑case Fibonacci numbers approach <Math formula="\phi" />.
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Convergence time <Math formula="\tau(r)" /> peaks at <Math formula="r=\phi" />.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P4: Discrete‑to‑Continuous Transition
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> Discrete lattice (Lemma 3.1), dense angles (Proposition 3.1).
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Quantized Fisher distance for small integers, smooth for large.
                </p>
              </div>
            </div>
          </Section>

          <Section id="conclusion" title="7. Conclusion" subtitle="Final Synthesis">
            <blockquote className="text-3xl font-serif italic text-navy-800 border-l-4 border-gold-400 pl-8 py-4 my-12">
              "The Recursive Harmonic Codex offers a rigorous framework uniting number theory, complex geometry, and information theory. Its core is mathematically sound; its physical extensions are speculative but disciplined."
            </blockquote>

            <h3 className="text-2xl font-serif mt-12 mb-6">8. Discussion</h3>
            <Callout type="key" label="Key Insight">
              The RHC provides a unified language connecting number theory, geometry, and information through a single simple mapping.
            </Callout>

            <h3 className="text-2xl font-serif mt-12 mb-6">9. Open Problems</h3>
            <ul className="list-disc pl-6 space-y-2 mb-12">
              <li>Can a rigorous information‑theoretic quantity be derived directly from the Euclidean algorithm?</li>
              <li>Is there a natural Hamiltonian on the RHC state space?</li>
              <li>Extension to Gaussian integers and p-adic geometries.</li>
              <li>Does curvature analogue K correspond to a known geometric invariant?</li>
            </ul>

            <h3 className="text-2xl font-serif mt-12 mb-6">10. References</h3>
            <div className="space-y-4 text-sm text-cream-700 font-serif">
              <p>Lamé, G. (1844). "Note sur la limite du nombre des divisions dans la recherche du plus grand commun diviseur entre deux nombres entiers". <em>Comptes Rendus</em> 19: 867–870.</p>
              <p>Fisher, R.A. (1925). "Theory of statistical estimation". <em>Proceedings of the Cambridge Philosophical Society</em> 22: 700–725.</p>
              <p>Rao, C.R. (1945). "Information and the accuracy attainable in the estimation of statistical parameters". <em>Bulletin of the Calcutta Mathematical Society</em> 37: 81–89.</p>
              <p>Čencov, N.N. (1982). <em>Statistical Decision Rules and Optimal Inference</em>. American Mathematical Society.</p>
              <p>Wheeler, J.A. (1990). "Information, physics, quantum: The search for links". In <em>Complexity, Entropy, and the Physics of Information</em>, pp. 3–28.</p>
            </div>

            <p className="text-center text-cream-700 font-serif text-xl mt-24">
              Recursive Harmonic Codex · RHC Design System v3 · 2025
            </p>
          </Section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-900 text-navy-200 py-16 px-6 md:px-12 border-t border-gold-400/10 no-pdf">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-400 rounded-sm flex items-center justify-center">
                <span className="text-navy-800 font-bold text-sm">RHC</span>
              </div>
              <span className="font-serif text-2xl tracking-widest text-white">RHC</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              A formal mapping of discrete arithmetic structures to continuous geometric representations and information-theoretic measures.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Project</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#abstract" className="hover:text-gold-400 transition-colors">Abstract</a></li>
                <li><a href="#foundations" className="hover:text-gold-400 transition-colors">Foundations</a></li>
                <li><a href="#results" className="hover:text-gold-400 transition-colors">Core Results</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Author</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-white">Richard Bolt</span></li>
                <li><span className="opacity-70">Researcher</span></li>
                <li><a href="mailto:richard@boltdj.com" className="hover:text-gold-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50">© 2025 Recursive Harmonic Codex Project. All rights reserved.</p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest opacity-50">
            <span>Built with React</span>
            <span>Tailwind CSS</span>
            <span>Three.js</span>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-navy-800 text-gold-400 rounded-full flex items-center justify-center shadow-xl border border-gold-400/20 hover:scale-110 active:scale-90 transition-all z-40 no-pdf"
      >
        <ArrowUpRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
