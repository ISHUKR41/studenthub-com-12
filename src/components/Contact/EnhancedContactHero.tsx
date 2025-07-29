import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Tilt } from 'react-tilt';
import { 
  Clock, Users, CheckCircle, Star, Award, Zap, 
  HeartHandshake, Globe, MessageCircle, Shield,
  GraduationCap, BookOpen, Target, TrendingUp 
} from 'lucide-react';

const EnhancedContactHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 25 },
    delay: 200,
  });

  const statsData = [
    {
      icon: <Clock className="w-10 h-10" />,
      value: "<2h",
      label: "Response Time",
      description: "Lightning-fast support responses",
      color: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: <Users className="w-10 h-10" />,
      value: "50K+",
      label: "Students Connected",
      description: "Active learning community",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      value: "95%",
      label: "Success Rate",
      description: "Problem resolution guarantee",
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: <Star className="w-10 h-10" />,
      value: "4.9/5",
      label: "Satisfaction Rating",
      description: "Exceptional service quality",
      color: "from-yellow-500 to-orange-500",
      delay: 0.3
    }
  ];

  const achievementBadges = [
    { icon: <Award className="w-6 h-6" />, label: "Excellence Award 2024", color: "text-yellow-400" },
    { icon: <Zap className="w-6 h-6" />, label: "24/7 Support", color: "text-blue-400" },
    { icon: <HeartHandshake className="w-6 h-6" />, label: "Student-First Approach", color: "text-red-400" },
    { icon: <Globe className="w-6 h-6" />, label: "Global Reach", color: "text-green-400" },
    { icon: <MessageCircle className="w-6 h-6" />, label: "Multi-language Support", color: "text-purple-400" },
    { icon: <Shield className="w-6 h-6" />, label: "Privacy Protected", color: "text-indigo-400" }
  ];

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{ 
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <animated.div 
        style={springProps}
        className="text-center space-y-12 max-w-6xl mx-auto relative z-10"
      >
        {/* Achievement Badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {achievementBadges.map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <span className={badge.color}>{badge.icon}</span>
              <span className="text-sm font-medium text-foreground-secondary">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Connect With
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Get expert support, request study materials, and join our community of 
            <span className="gradient-text font-semibold"> 50,000+ students</span> who trust 
            STUDENTHUB for their academic success journey.
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {statsData.map((stat, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.05, speed: 300 }}>
              <motion.div
                className="relative p-6 rounded-2xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + stat.delay, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className="w-full h-full rounded-2xl bg-background"></div>
                </div>
                
                <div className="relative z-10 text-center space-y-3">
                  <motion.div 
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold gradient-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + stat.delay, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                    <div className="text-xs text-foreground-secondary">{stat.description}</div>
                  </div>
                </div>

                {/* Hover Effect Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold text-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact-services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Start Your Journey
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.button>

          <motion.button
            className="group px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Quick Contact
            </span>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-foreground-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm">24/7 Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Trusted by 50K+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-sm">95% Success Rate</span>
          </div>
        </motion.div>
      </animated.div>
    </motion.section>
  );
};

export default EnhancedContactHero;