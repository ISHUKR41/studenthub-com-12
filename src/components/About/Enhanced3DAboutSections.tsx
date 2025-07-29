import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  Globe, 
  BookOpen, 
  Award, 
  Target, 
  Lightbulb, 
  Heart, 
  Shield,
  TrendingUp,
  Star,
  Trophy,
  Clock,
  Brain,
  Diamond,
  Rocket,
  Zap,
  Building,
  GraduationCap,
  Coffee,
  Monitor
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Enhanced Company Statistics Section
export const EnhancedCompanyStatistics = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });

  const statistics = [
    { icon: <Users className="w-8 h-8" />, value: "5M+", label: "Active Students", color: "from-blue-500 to-cyan-500", description: "Students actively using our platform globally" },
    { icon: <BookOpen className="w-8 h-8" />, value: "50K+", label: "Study Materials", color: "from-green-500 to-emerald-500", description: "Comprehensive study resources and materials" },
    { icon: <Globe className="w-8 h-8" />, value: "150+", label: "Countries", color: "from-purple-500 to-pink-500", description: "Students from across the globe trust us" },
    { icon: <Award className="w-8 h-8" />, value: "99.8%", label: "Success Rate", color: "from-yellow-500 to-orange-500", description: "Students achieving their academic goals" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "10M+", label: "Downloads", color: "from-red-500 to-pink-500", description: "Total downloads across all platforms" },
    { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Support", color: "from-indigo-500 to-purple-500", description: "Round-the-clock assistance and support" }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-4 bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl opacity-10"
            style={{
              background: `radial-gradient(circle, hsl(${i * 30}, 70%, 60%) 0%, transparent 70%)`,
              width: `${100 + i * 20}px`,
              height: `${100 + i * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Our Impact by Numbers
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">
            Transforming Education
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Since our inception, we've been dedicated to revolutionizing the educational landscape with cutting-edge technology and innovative solutions
          </p>
        </motion.div>

        {/* 3D Statistics Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Visualization - Simplified to avoid errors */}
          <motion.div
            className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="text-center space-y-4">
              <motion.div
                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-16 h-16 text-white" />
              </motion.div>
              <div className="text-2xl font-bold gradient-text">Global Impact</div>
              <div className="text-foreground-secondary">Transforming education worldwide</div>
            </div>
          </motion.div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="relative p-6 glassmorphism group hover:shadow-2xl transition-all duration-500 border-white/10">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <CardContent className="relative z-10 space-y-4 p-0">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                      <div className="font-semibold text-lg">{stat.label}</div>
                      <div className="text-sm text-foreground-secondary">{stat.description}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Timeline */}
        <motion.div
          className="mt-32 space-y-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30">
                Major Milestones
              </Badge>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold gradient-text">Our Journey</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-secondary rounded-full"></div>
            
            {/* Timeline Items */}
            {[
              { year: "2018", title: "STUDENTHUB Founded", desc: "Started with a vision to democratize education", icon: <Rocket className="w-6 h-6" /> },
              { year: "2019", title: "1M Users Milestone", desc: "Reached our first million active users", icon: <Users className="w-6 h-6" /> },
              { year: "2020", title: "Global Expansion", desc: "Expanded to 50+ countries worldwide", icon: <Globe className="w-6 h-6" /> },
              { year: "2021", title: "AI Integration", desc: "Launched AI-powered study assistant", icon: <Brain className="w-6 h-6" /> },
              { year: "2022", title: "Mobile Excellence", desc: "Won Best Educational App Award", icon: <Award className="w-6 h-6" /> },
              { year: "2023", title: "5M+ Community", desc: "Built the world's largest student community", icon: <Star className="w-6 h-6" /> }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center gap-8 mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              >
                <div className="flex-1">
                  <Card className={`p-6 glassmorphism ${index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'} max-w-md`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white">
                        {milestone.icon}
                      </div>
                      <div className="text-sm font-bold text-primary">{milestone.year}</div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                    <p className="text-foreground-secondary">{milestone.desc}</p>
                  </Card>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background z-10"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Team Values Section
export const EnhancedTeamValues = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });

  const values = [
    { 
      icon: <Heart className="w-12 h-12" />, 
      title: "Student-Centric", 
      description: "Every decision we make puts students first. We're committed to creating tools and resources that genuinely improve learning outcomes.",
      color: "from-red-500 to-pink-500"
    },
    { 
      icon: <Shield className="w-12 h-12" />, 
      title: "Trust & Security", 
      description: "We safeguard student data with enterprise-grade security measures and maintain transparent privacy practices.",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Lightbulb className="w-12 h-12" />, 
      title: "Innovation", 
      description: "We continuously evolve our platform using cutting-edge technology to stay ahead of educational trends.",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      icon: <Target className="w-12 h-12" />, 
      title: "Excellence", 
      description: "We maintain the highest standards in everything we do, from content quality to user experience design.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-4 bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div 
              className={`w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl`}
              style={{
                clipPath: i % 3 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                         : i % 3 === 1 ? 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                         : 'circle(50%)'
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-accent via-secondary to-primary rounded-2xl">
              <Diamond className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30">
              Our Core Values
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">
            What Drives Us
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Our values aren't just words on a wall—they're the principles that guide every decision, every feature, and every interaction we have with our community
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Card className="relative p-8 h-full glassmorphism hover:shadow-2xl transition-all duration-500 border-white/10 overflow-hidden">
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Floating Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ y: -5 }}
                >
                  {value.icon}
                </motion.div>
                
                <CardContent className="relative z-10 p-0 space-y-4">
                  <h3 className="text-2xl font-bold">{value.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>

                {/* Hover Effect Lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full glassmorphism border border-white/20">
            <Coffee className="w-6 h-6 text-primary" />
            <span className="text-lg">
              Want to join our mission? We're always looking for passionate individuals to join our team.
            </span>
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};