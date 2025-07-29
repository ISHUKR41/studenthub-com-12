import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Clock, Globe, Zap, Star, Trophy, Target, Users } from 'lucide-react';
import { Enhanced3DScene } from './Enhanced3DScene';

export const EnhancedHeroSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Personalized study plans with advanced machine learning"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Adaptive Testing",
      description: "Dynamic mock tests that adapt to your skill level"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Deep insights into your learning progress and patterns"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Community",
      description: "Connect with millions of students worldwide"
    }
  ];

  const stats = [
    { value: "15M+", label: "Active Students", increment: "+2.5k daily" },
    { value: "25K+", label: "Question Papers", increment: "+100 weekly" },
    { value: "89%", label: "Success Rate", increment: "+5% this year" },
    { value: "500+", label: "Exams Covered", increment: "+25 recently" },
    { value: "22+", label: "Languages", increment: "Expanding" },
    { value: "24/7", label: "AI Support", increment: "Always Available" }
  ];

  return (
    <motion.section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Enhanced 3D Background */}
      <Enhanced3DScene className="absolute inset-0 z-0 opacity-90" />

      {/* Dynamic Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-1"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.05) 0%, transparent 50%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.05) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(120, 200, 255, 0.05) 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="space-y-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Live Time Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass backdrop-blur-xl border border-white/10 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-foreground">
              Live Now • {currentTime.toLocaleTimeString()}
            </span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </motion.div>

          {/* Main Headline with Typewriter Effect */}
          <motion.div className="space-y-6">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.span 
                className="gradient-text block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                NEXT-GEN
              </motion.span>
              <motion.span 
                className="text-foreground block mt-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Learning Platform
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              Experience the future of education with AI-powered personalization, 
              immersive 3D learning environments, and real-time collaboration.
            </motion.p>
          </motion.div>

          {/* Dynamic Feature Showcase */}
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`
                    relative p-6 rounded-2xl glass backdrop-blur-xl border transition-all duration-500
                    ${activeFeature === index 
                      ? 'border-primary/50 bg-white/15 shadow-2xl scale-105' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }
                  `}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                >
                  <motion.div 
                    className={`
                      flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto
                      ${activeFeature === index 
                        ? 'bg-gradient-to-br from-primary to-secondary text-white' 
                        : 'bg-white/10 text-foreground-secondary'
                      }
                    `}
                    animate={{ 
                      rotate: activeFeature === index ? [0, 5, -5, 0] : 0,
                      scale: activeFeature === index ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Active indicator */}
                  {activeFeature === index && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Stats Grid with Real-time Updates */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.1 + index * 0.1 }}
              >
                <div className="glass p-6 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:bg-white/10">
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm font-medium text-foreground mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-xs text-primary/80">
                    {stat.increment}
                  </div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="btn-hero group text-lg px-12 py-6 rounded-2xl min-w-[200px] relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-ghost group text-lg px-12 py-6 rounded-2xl border-white/20 text-white hover:bg-white/10 min-w-[200px]"
                >
                  <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>
            </div>

            {/* Trust Indicators with Animation */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.7 }}
            >
              <p className="text-foreground-secondary mb-6 text-lg">
                Trusted by students from <span className="gradient-text font-semibold">1000+</span> institutions worldwide
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 opacity-80">
                {['IIT', 'MIT', 'Stanford', 'Harvard', 'Oxford', 'Cambridge'].map((institute, index) => (
                  <motion.div
                    key={institute}
                    className="text-foreground-secondary hover:text-primary transition-colors cursor-pointer font-semibold text-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.9 + index * 0.1 }}
                  >
                    {institute}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Indicators */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 rounded-full glass backdrop-blur-xl border border-white/10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm text-foreground-secondary">Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};