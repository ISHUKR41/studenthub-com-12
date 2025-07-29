import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Zap, 
  Target, 
  Brain,
  Clock,
  Star
} from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const StatCard = ({ stat, index, isInView }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardSpring = useSpring({
    transform: isHovered ? 'scale(1.05) rotateY(5deg)' : 'scale(1) rotateY(0deg)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(0,0,0,0.15)' 
      : '0 10px 20px rgba(0,0,0,0.1)',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : { 
        opacity: 0, 
        y: 50, 
        rotateX: -15 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <animated.div 
        style={cardSpring}
        className="relative group"
      >
        <div className="glass p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
          
          {/* Icon with Animation */}
          <motion.div 
            className="mb-6"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white`}>
              {stat.icon}
            </div>
          </motion.div>

          {/* Main Stat */}
          <motion.div 
            className="text-4xl md:text-5xl font-bold gradient-text mb-2"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
          >
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {stat.label}
          </h3>
          
          <p className="text-foreground-secondary text-sm mb-4 leading-relaxed">
            {stat.description}
          </p>
          
          {/* Trend Indicator */}
          <motion.div 
            className="flex items-center gap-2 text-green-400"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{stat.trend}</span>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </div>
      </animated.div>
    </motion.div>
  );
};

export const InteractiveStatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  const [activeCategory, setActiveCategory] = useState(0);

  const statsCategories = [
    {
      title: "Learning Performance",
      stats: [
        {
          icon: <Brain className="w-8 h-8" />,
          value: 15000000,
          suffix: "+",
          label: "Active Learners",
          description: "Students actively using our AI-powered platform daily",
          trend: "+12.5% this month",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          icon: <Target className="w-8 h-8" />,
          value: 95,
          suffix: "%",
          label: "Success Rate",
          description: "Students achieving their target scores",
          trend: "+8.3% improvement",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          icon: <Zap className="w-8 h-8" />,
          value: 89,
          suffix: "ms",
          label: "Response Time",
          description: "Average AI response time for personalized feedback",
          trend: "-15ms faster",
          gradient: "from-yellow-500 to-orange-500"
        }
      ]
    },
    {
      title: "Global Reach",
      stats: [
        {
          icon: <Globe className="w-8 h-8" />,
          value: 195,
          suffix: "",
          label: "Countries",
          description: "Global presence across all continents",
          trend: "+8 new regions",
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          icon: <Users className="w-8 h-8" />,
          value: 50000,
          suffix: "+",
          label: "Daily Sessions",
          description: "Study sessions completed every day",
          trend: "+25% growth",
          gradient: "from-indigo-500 to-purple-500"
        },
        {
          icon: <Clock className="w-8 h-8" />,
          value: 2400000,
          suffix: "",
          label: "Hours Learned",
          description: "Total learning hours this month",
          trend: "+18% increase",
          gradient: "from-teal-500 to-blue-500"
        }
      ]
    },
    {
      title: "Content & Quality",
      stats: [
        {
          icon: <BookOpen className="w-8 h-8" />,
          value: 25000,
          suffix: "+",
          label: "Question Papers",
          description: "Comprehensive exam papers across all subjects",
          trend: "+500 weekly",
          gradient: "from-red-500 to-pink-500"
        },
        {
          icon: <Award className="w-8 h-8" />,
          value: 500,
          suffix: "+",
          label: "Exams Covered",
          description: "Competitive and academic examinations",
          trend: "+25 recently",
          gradient: "from-amber-500 to-orange-500"
        },
        {
          icon: <Star className="w-8 h-8" />,
          value: 98,
          suffix: "%",
          label: "Satisfaction",
          description: "Student satisfaction rate based on feedback",
          trend: "+3% this quarter",
          gradient: "from-violet-500 to-purple-500"
        }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % statsCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Dynamic Background - Simplified */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass backdrop-blur-xl border border-white/10 mb-8"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(120, 119, 198, 0.3)",
                "0 0 30px rgba(255, 119, 198, 0.4)", 
                "0 0 20px rgba(120, 119, 198, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Real-Time Analytics</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="gradient-text">Performance</span>
            <br />
            <span className="text-foreground">Metrics</span>
          </h2>

          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Real-time insights and comprehensive analytics showcasing our platform's 
            impact on global education and student success.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex gap-4 p-2 rounded-2xl glass backdrop-blur-xl border border-white/10">
            {statsCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${activeCategory === index 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                    : 'text-foreground-secondary hover:text-foreground hover:bg-white/5'
                  }
                `}
              >
                {category.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          key={activeCategory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {statsCategories[activeCategory].stats.map((stat, index) => (
            <StatCard 
              key={`${activeCategory}-${index}`}
              stat={stat} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </motion.div>

        {/* Bottom Progress Indicators */}
        <motion.div 
          className="flex justify-center mt-16 gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {statsCategories.map((_, index) => (
            <motion.div
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                ${activeCategory === index 
                  ? 'bg-gradient-to-r from-primary to-secondary scale-125' 
                  : 'bg-white/20 hover:bg-white/40'
                }
              `}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};