import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Brain, Globe } from 'lucide-react';

export const Interactive3DLearning: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-hidden">
      {/* Simple animated background instead of 3D */}
      <div className="absolute inset-0 z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Animated geometric shapes */}
          <motion.div
            className="absolute w-96 h-96 border-2 border-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-64 h-64 border-2 border-secondary/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-accent/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating icons */}
          {[
            { icon: <Brain className="w-8 h-8" />, position: { x: -200, y: -100 } },
            { icon: <Target className="w-8 h-8" />, position: { x: 200, y: -50 } },
            { icon: <Sparkles className="w-8 h-8" />, position: { x: -150, y: 150 } },
            { icon: <Globe className="w-8 h-8" />, position: { x: 150, y: 100 } },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-primary"
              style={{
                left: `calc(50% + ${item.position.x}px)`,
                top: `calc(50% + ${item.position.y}px)`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-xl">
                {item.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <motion.div 
          className="text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-8">
            Immersive Learning
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed">
            Step into the future of education with our revolutionary learning environments. 
            Explore complex concepts through interactive visualizations and hands-on experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
};