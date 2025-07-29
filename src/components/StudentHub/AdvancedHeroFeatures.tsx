import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, Cpu, Shield, Zap, Globe, Users, BookOpen, Target, 
  Sparkles, Award, TrendingUp, Clock, Star, Lightbulb,
  ChartBar, Headphones, FileText, Video, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string; }[];
  color: string;
  category: 'ai' | 'study' | 'exam' | 'support';
}

export const AdvancedHeroFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const features: Feature[] = [
    {
      id: 'ai-tutor',
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Personal Tutor',
      subtitle: 'Powered by Advanced Machine Learning',
      description: 'Get personalized study plans, instant doubt resolution, and adaptive learning paths tailored to your unique learning style and pace.',
      metrics: [
        { label: 'Accuracy Rate', value: '97.8%' },
        { label: 'Response Time', value: '<0.5s' },
        { label: 'Languages', value: '22+' }
      ],
      color: 'from-purple-500 via-violet-500 to-purple-600',
      category: 'ai'
    },
    {
      id: 'smart-analytics',
      icon: <ChartBar className="w-8 h-8" />,
      title: 'Smart Performance Analytics',
      subtitle: 'Data-Driven Learning Insights',
      description: 'Advanced analytics track your progress, identify weak areas, predict performance, and recommend targeted improvements.',
      metrics: [
        { label: 'Prediction Accuracy', value: '94.2%' },
        { label: 'Improvement Rate', value: '+45%' },
        { label: 'Data Points', value: '50M+' }
      ],
      color: 'from-blue-500 via-cyan-500 to-blue-600',
      category: 'study'
    },
    {
      id: 'adaptive-exams',
      icon: <Target className="w-8 h-8" />,
      title: 'Adaptive Mock Exams',
      subtitle: 'Dynamic Difficulty Adjustment',
      description: 'AI-powered mock tests that adapt to your skill level in real-time, providing optimal challenge and comprehensive preparation.',
      metrics: [
        { label: 'Success Rate', value: '89.3%' },
        { label: 'Adaptive Tests', value: '10K+' },
        { label: 'Time Saved', value: '40%' }
      ],
      color: 'from-green-500 via-emerald-500 to-green-600',
      category: 'exam'
    },
    {
      id: 'live-support',
      icon: <Headphones className="w-8 h-8" />,
      title: '24/7 Expert Support',
      subtitle: 'Human + AI Hybrid Assistance',
      description: 'Round-the-clock support combining AI efficiency with human expertise for complex queries and emotional support.',
      metrics: [
        { label: 'Response Time', value: '<2min' },
        { label: 'Resolution Rate', value: '98.5%' },
        { label: 'Satisfaction', value: '4.9/5' }
      ],
      color: 'from-orange-500 via-red-500 to-orange-600',
      category: 'support'
    }
  ];

  const categories = {
    ai: { name: 'AI Technology', icon: <Cpu className="w-5 h-5" />, color: 'text-purple-400' },
    study: { name: 'Study Tools', icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-400' },
    exam: { name: 'Exam Prep', icon: <Award className="w-5 h-5" />, color: 'text-green-400' },
    support: { name: 'Support', icon: <Users className="w-5 h-5" />, color: 'text-orange-400' }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"
          style={{
            x: springX,
            y: springY,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Next-Generation Learning Platform</span>
            <Sparkles className="w-4 h-4 text-secondary" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="gradient-text block">Revolutionary</span>
            <span className="text-foreground block">Learning Experience</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Discover cutting-edge features that transform how students learn, practice, and excel. 
            Our platform combines artificial intelligence, advanced analytics, and personalized learning 
            to deliver unprecedented educational outcomes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-full glass backdrop-blur-xl
                border border-white/10 transition-all duration-300 hover:scale-105
                ${category.color}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`
                relative group cursor-pointer
                ${activeFeature === index ? 'z-20' : 'z-10'}
              `}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                x: isInView ? 0 : (index % 2 === 0 ? -50 : 50)
              }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              onMouseEnter={() => {
                setHoveredFeature(feature.id);
                setActiveFeature(index);
              }}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Feature Card */}
              <div className={`
                relative p-8 rounded-3xl glass backdrop-blur-xl border border-white/10
                transition-all duration-700 overflow-hidden group-hover:border-white/20
                ${activeFeature === index ? 'bg-white/10 shadow-2xl' : 'bg-white/5'}
              `}>
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: activeFeature === index ? 0.1 : 0,
                    scale: activeFeature === index ? 1 : 0.8
                  }}
                  transition={{ duration: 0.7 }}
                />

                {/* Header */}
                <div className="relative z-10 flex items-start gap-6 mb-8">
                  <motion.div 
                    className={`
                      flex items-center justify-center w-16 h-16 rounded-2xl
                      bg-gradient-to-br ${feature.color} text-white shadow-lg
                    `}
                    animate={{ 
                      rotate: activeFeature === index ? [0, 5, -5, 0] : 0,
                      scale: activeFeature === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-2xl font-bold text-foreground mb-2"
                      animate={{ 
                        scale: activeFeature === index ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-sm font-medium text-primary/80">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="relative z-10 text-foreground-secondary leading-relaxed mb-8 text-lg">
                  {feature.description}
                </p>

                {/* Metrics */}
                <div className="relative z-10 grid grid-cols-3 gap-4 mb-8">
                  {feature.metrics.map((metric, metricIndex) => (
                    <motion.div 
                      key={metricIndex}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeFeature === index ? 1 : 0.7,
                        y: activeFeature === index ? 0 : 20
                      }}
                      transition={{ duration: 0.5, delay: metricIndex * 0.1 }}
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-foreground-secondary mt-1">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeFeature === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg transition-all duration-300`}
                    size="lg"
                  >
                    Explore {feature.title}
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>

                {/* Floating Particles */}
                <AnimatePresence>
                  {hoveredFeature === feature.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`}
                          initial={{ 
                            opacity: 0,
                            x: Math.random() * 100,
                            y: Math.random() * 100
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: [Math.random() * 100, Math.random() * 50],
                            x: [Math.random() * 100, Math.random() * 120]
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Navigation Dots */}
        <motion.div 
          className="flex justify-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {features.map((_, index) => (
            <motion.button
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${activeFeature === index ? 'bg-primary scale-125' : 'bg-foreground-secondary/30'}
              `}
              onClick={() => setActiveFeature(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};