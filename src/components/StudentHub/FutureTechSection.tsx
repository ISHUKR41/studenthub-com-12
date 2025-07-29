import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Sparkles, 
  Eye, 
  Headphones, 
  Gamepad2, 
  Shield,
  Rocket,
  Infinity
} from 'lucide-react';

interface TechFeature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'Available' | 'Beta' | 'Coming Soon';
  color: string;
  details: string[];
}

const techFeatures: TechFeature[] = [
  {
    id: 1,
    icon: <Brain className="w-8 h-8" />,
    title: "Neural Learning Interface",
    description: "Direct brain-computer interfaces for accelerated learning",
    status: "Beta",
    color: "from-purple-500 to-indigo-600",
    details: [
      "Thought-based navigation",
      "Memory enhancement protocols",
      "Cognitive load optimization"
    ]
  },
  {
    id: 2,
    icon: <Eye className="w-8 h-8" />,
    title: "AR Knowledge Overlay",
    description: "Augmented reality integration for real-world learning",
    status: "Available",
    color: "from-blue-500 to-cyan-600",
    details: [
      "3D model visualization",
      "Interactive annotations",
      "Spatial learning contexts"
    ]
  },
  {
    id: 3,
    icon: <Cpu className="w-8 h-8" />,
    title: "Quantum Computing Lab",
    description: "Access to quantum algorithms and simulations",
    status: "Coming Soon",
    color: "from-green-500 to-emerald-600",
    details: [
      "Quantum circuit design",
      "Superposition experiments",
      "Entanglement visualization"
    ]
  }
];

export const FutureTechSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView && !isHovering) {
      const interval = setInterval(() => {
        setSelectedFeature((prev) => (prev + 1) % techFeatures.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [inView, isHovering]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-500 border-green-500/30';
      case 'Beta': return 'text-yellow-500 border-yellow-500/30';
      case 'Coming Soon': return 'text-blue-500 border-blue-500/30';
      default: return 'text-gray-500 border-gray-500/30';
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground-secondary">Next-Generation Technology</span>
            <Infinity className="w-4 h-4 text-secondary" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Future of Learning
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto">
            Experience cutting-edge technologies that push the boundaries of education. 
            From AI to quantum computing, we're building tomorrow's learning environment today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tech Features Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-1 gap-6">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`
                  cursor-pointer transition-all duration-500
                  ${selectedFeature === index ? 'scale-105' : 'scale-100'}
                `}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedFeature(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Card className={`
                  h-full glass border transition-all duration-500
                  ${selectedFeature === index 
                    ? 'border-primary/50 bg-white/15 shadow-2xl' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }
                `}>
                  <CardContent className="p-6">
                    <motion.div
                      className={`
                        w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} 
                        flex items-center justify-center text-white mb-4
                      `}
                      animate={selectedFeature === index ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>

                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <span className={`
                        text-xs px-2 py-1 rounded-full border ${getStatusColor(feature.status)}
                      `}>
                        {feature.status}
                      </span>
                    </div>

                    <p className="text-foreground-secondary mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          className="flex items-center gap-2 text-sm text-foreground-secondary"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                        >
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Featured Tech Showcase */}
          <div className="space-y-6">
            <motion.div
              className="glass rounded-3xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature}
                  className={`
                    relative h-80 bg-gradient-to-br ${techFeatures[selectedFeature].color} 
                    flex items-center justify-center text-white p-8
                  `}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      {techFeatures[selectedFeature].icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4">
                      {techFeatures[selectedFeature].title}
                    </h3>

                    <p className="text-white/90 mb-6">
                      {techFeatures[selectedFeature].description}
                    </p>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Tech Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="glass p-4 rounded-2xl border border-white/10 text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-2xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-foreground-secondary">Uptime</div>
              </motion.div>

              <motion.div
                className="glass p-4 rounded-2xl border border-white/10 text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-2xl font-bold gradient-text">50ms</div>
                <div className="text-sm text-foreground-secondary">Latency</div>
              </motion.div>
            </div>

            {/* Beta Access CTA */}
            <motion.div
              className="glass p-6 rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-foreground mb-2">
                  Early Access Program
                </h4>
                <p className="text-sm text-foreground-secondary mb-4">
                  Be among the first to experience next-gen features
                </p>
                <Button size="sm" className="w-full">
                  Join Beta
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};