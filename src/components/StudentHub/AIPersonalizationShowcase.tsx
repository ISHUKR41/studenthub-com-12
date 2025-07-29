import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, Lightbulb, Zap, Users, TrendingUp, Award, Clock } from 'lucide-react';

interface AIFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  color: string;
}

const aiFeatures: AIFeature[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neural Learning Paths",
    description: "AI analyzes your learning patterns to create personalized study routes",
    metrics: [
      { label: "Accuracy", value: "94%" },
      { label: "Time Saved", value: "3.2h/day" }
    ],
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Adaptive Assessment",
    description: "Dynamic difficulty adjustment based on real-time performance",
    metrics: [
      { label: "Success Rate", value: "89%" },
      { label: "Engagement", value: "+67%" }
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Smart Recommendations",
    description: "Intelligent content suggestions powered by machine learning",
    metrics: [
      { label: "Relevance", value: "96%" },
      { label: "Discovery", value: "+45%" }
    ],
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Feedback",
    description: "Real-time performance analysis and improvement suggestions",
    metrics: [
      { label: "Response Time", value: "0.3s" },
      { label: "Improvement", value: "+78%" }
    ],
    color: "from-yellow-500 to-orange-600"
  }
];

export const AIPersonalizationShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % aiFeatures.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            AI-Powered Personalization
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto">
            Experience the next generation of personalized learning with advanced artificial intelligence
            that adapts to your unique learning style and pace.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={`
                  relative cursor-pointer transition-all duration-500
                  ${activeFeature === index ? 'scale-105' : 'scale-100'}
                `}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveFeature(index)}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`
                  glass border transition-all duration-500
                  ${activeFeature === index 
                    ? 'border-primary/50 bg-white/15 shadow-2xl' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }
                `}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`
                          flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white
                        `}
                        animate={{
                          scale: activeFeature === index ? [1, 1.1, 1] : 1,
                          rotate: activeFeature === index ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-foreground-secondary mb-4">
                          {feature.description}
                        </p>
                        
                        <div className="flex gap-4">
                          {feature.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="text-center">
                              <div className="text-2xl font-bold gradient-text">
                                {metric.value}
                              </div>
                              <div className="text-xs text-foreground-secondary">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Interactive Visualization */}
          <div className="relative">
            <motion.div
              className="relative w-full h-96 glass rounded-3xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className={`absolute inset-0 bg-gradient-to-br ${aiFeatures[activeFeature].color} opacity-20`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center text-white p-8"
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {aiFeatures[activeFeature].icon}
                  </motion.div>
                  
                  <h4 className="text-2xl font-bold mb-4">
                    {aiFeatures[activeFeature].title}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {aiFeatures[activeFeature].metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 rounded-lg p-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="text-xl font-bold">{metric.value}</div>
                        <div className="text-sm opacity-80">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {aiFeatures.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      activeFeature === index ? 'bg-white' : 'bg-white/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-6 -right-6 glass p-4 rounded-2xl border border-white/10"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-lg font-bold gradient-text">15M+</div>
                  <div className="text-xs text-foreground-secondary">Active Users</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl border border-white/10"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-lg font-bold gradient-text">89%</div>
                  <div className="text-xs text-foreground-secondary">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};