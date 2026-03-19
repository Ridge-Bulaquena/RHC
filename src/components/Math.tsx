import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import { motion } from 'motion/react';

interface MathProps {
  formula: string;
  display?: boolean;
  className?: string;
}

export const Math: React.FC<MathProps> = ({ formula, display = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode: display,
      });
    }
  }, [formula, display]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      ref={containerRef}
      className={`${display ? 'block my-4 text-center' : 'inline'} ${className}`}
    />
  );
};

export const MathBlock: React.FC<{ formula: string; label?: string }> = ({ formula, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="math-block group transition-all hover:shadow-xl hover:shadow-navy-800/20"
    >
      {label && (
        <span className="block text-[10px] uppercase tracking-widest text-gold-400 mb-4 font-mono opacity-70 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      )}
      <Math formula={formula} display className="text-xl md:text-2xl" />
    </motion.div>
  );
};
