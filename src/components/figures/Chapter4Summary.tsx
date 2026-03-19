import React from 'react';
import { motion } from 'motion/react';
import { Zap, Link } from 'lucide-react';

export const Chapter4Summary: React.FC = () => {
  return (
    <div className="relative my-20 p-1 bg-gradient-to-br from-gold-400 via-gold-600 to-gold-400 rounded-3xl overflow-hidden shadow-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,_#fff_0%,_transparent_70%)]"
        />
        <motion.div
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative bg-cream-50 rounded-[1.4rem] p-8 md:p-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-serif text-navy-900 mb-6 italic">
              Chapter 4 Summary
            </h3>
            <p className="text-xl text-navy-800 leading-relaxed font-serif">
              We have established that the RHC is not merely a collection of integer ratios, but a structured manifold of information. The Fisher metric provides the "glue" that binds arithmetic to geometry, while the fold operator quantifies the overlap of states.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-white rounded-2xl border border-gold-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-gold-600">
                <Zap size={20} />
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Key Insight</span>
              </div>
              <p className="text-navy-900 font-serif text-xl leading-snug">
                The Fisher distance between RHC states is the absolute difference of their log-tangents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-white rounded-2xl border border-gold-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-gold-600">
                <Link size={20} />
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Unification</span>
              </div>
              <p className="text-navy-900 font-serif text-xl leading-snug">
                The fold operator is the reciprocal of the Bhattacharyya coefficient for Bernoulli states.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
