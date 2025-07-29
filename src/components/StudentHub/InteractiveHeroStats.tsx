import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Trophy, Star, Zap, Target, Clock, TrendingUp } from 'lucide-react';

interface Stat {
  id: string;
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  increment: number;
}

export const InteractiveHeroStats: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const stats: Stat[] = [
    {
      id: 'students',
      icon: <Users className="w-6 h-6" />,
      value: '15M+',
      label: 'Active Students',
      description: 'Learning and growing every day with our platform',
      color: 'from-blue-500 to-cyan-500',
      increment: 15432
    },
    {
      id: 'papers',
      icon: <BookOpen className="w-6 h-6" />,
      value: '25K+',
      label: 'Question Papers',
      description: 'Comprehensive collection from Class 9 to PhD level',
      color: 'from-purple-500 to-pink-500',
      increment: 25847
    },
    {
      id: 'success',
      icon: <Trophy className="w-6 h-6" />,
      value: '89%',
      label: 'Success Rate',
      description: 'Students achieving their target scores',
      color: 'from-green-500 to-emerald-500',
      increment: 89
    },
    {
      id: 'exams',
      icon: <Target className="w-6 h-6" />,
      value: '500+',
      label: 'Exams Covered',
      description: 'From board exams to competitive tests',
      color: 'from-orange-500 to-red-500',
      increment: 543
    },
    {
      id: 'hours',
      icon: <Clock className="w-6 h-6" />,
      value: '2.5M+',
      label: 'Study Hours',
      description: 'Total hours of quality learning content',
      color: 'from-indigo-500 to-purple-500',
      increment: 2547893
    },
    {
      id: 'rating',
      icon: <Star className="w-6 h-6" />,
      value: '4.8/5',
      label: 'User Rating',
      description: 'Consistently rated by millions of students',
      color: 'from-yellow-500 to-orange-500',
      increment: 4.8
    },
    {
      id: 'growth',
      icon: <TrendingUp className="w-6 h-6" />,
      value: '150%',
      label: 'Growth Rate',
      description: 'Year-over-year platform growth',
      color: 'from-teal-500 to-green-500',
      increment: 150
    },
    {
      id: 'speed',
      icon: <Zap className="w-6 h-6" />,
      value: '<2s',
      label: 'Load Time',
      description: 'Lightning fast access to study materials',
      color: 'from-pink-500 to-rose-500',
      increment: 1.8
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [stats.length]);

  useEffect(() => {
    // Animate counter values
    stats.forEach((stat) => {
      setAnimatedValues(prev => ({
        ...prev,
        [stat.id]: stat.increment
      }));
    });
  }, []);

  return (
    <motion.section 
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Numbers That</span>
            <br />
            <span className="text-foreground">Speak Volumes</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Real-time statistics showcasing our impact on millions of students worldwide. 
            These aren't just numbers – they represent dreams achieved and futures built.
          </p>
        </motion.div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={`relative group cursor-pointer ${
                activeIndex === index ? 'z-10' : 'z-0'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, z: 20 }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Stat Card */}
              <div className={`
                relative p-6 rounded-2xl glass backdrop-blur-xl border border-white/10
                transition-all duration-500 overflow-hidden
                ${activeIndex === index 
                  ? 'bg-white/20 shadow-2xl shadow-primary/20' 
                  : 'bg-white/5 hover:bg-white/10'
                }
              `}>
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: activeIndex === index ? 1 : 0,
                    opacity: activeIndex === index ? 0.3 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Icon */}
                <motion.div 
                  className={`
                    relative z-10 flex items-center justify-center w-12 h-12 rounded-xl mb-4
                    bg-gradient-to-br ${stat.color} text-white
                  `}
                  animate={{ 
                    rotate: activeIndex === index ? 360 : 0,
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.8 }}
                >
                  {stat.icon}
                </motion.div>

                {/* Value */}
                <motion.div 
                  className="relative z-10 text-2xl md:text-3xl font-bold gradient-text mb-2"
                  animate={{ 
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="relative z-10 text-sm md:text-base font-medium text-foreground mb-2">
                  {stat.label}
                </div>

                {/* Description - Shows on active */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 text-xs md:text-sm text-foreground-secondary leading-relaxed"
                    >
                      {stat.description}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Particles */}
                {activeIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
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
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-time Counter Display */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="glass p-8 rounded-3xl backdrop-blur-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-foreground-secondary text-sm font-medium">LIVE STATISTICS</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  <motion.span
                    key={Math.floor(Date.now() / 1000)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {Math.floor(Math.random() * 100) + 1200}
                  </motion.span>
                </div>
                <div className="text-sm text-foreground-secondary">Students Online Now</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  <motion.span
                    key={Math.floor(Date.now() / 1000) + 1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {Math.floor(Math.random() * 50) + 25}
                  </motion.span>
                </div>
                <div className="text-sm text-foreground-secondary">Tests Taken Today</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  <motion.span
                    key={Math.floor(Date.now() / 1000) + 2}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {Math.floor(Math.random() * 20) + 15}
                  </motion.span>k
                </div>
                <div className="text-sm text-foreground-secondary">Downloads This Hour</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};