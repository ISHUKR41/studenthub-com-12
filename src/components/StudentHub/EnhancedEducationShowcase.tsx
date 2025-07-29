import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Brain, Target, Zap, Rocket, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const EnhancedEducationShowcase: React.FC = () => {
  const educationFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized study paths with advanced AI that adapts to your learning style and pace.",
      gradient: "from-blue-500 to-purple-600",
      stats: "95% Success Rate"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Practice",
      description: "Focus on your weak areas with smart question recommendations and concept mapping.",
      gradient: "from-emerald-500 to-teal-600",
      stats: "40% Faster Learning"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Track your progress with detailed insights and performance predictions.",
      gradient: "from-orange-500 to-red-600",
      stats: "Real-time Insights"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges, certificates, and unlock new challenges as you progress.",
      gradient: "from-yellow-500 to-amber-600",
      stats: "10K+ Achievers"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Orbital Rings */}
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className={`absolute border-2 rounded-full opacity-20 ${
                index % 2 === 0 ? 'border-primary' : 'border-secondary'
              }`}
              style={{
                width: `${200 + index * 100}px`,
                height: `${200 + index * 100}px`,
              }}
              animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
              transition={{ 
                duration: 20 + index * 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
          
          {/* Floating Educational Icons */}
          {educationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="absolute text-primary"
              style={{
                left: `calc(50% + ${Math.cos(index * 90 * Math.PI / 180) * 250}px)`,
                top: `calc(50% + ${Math.sin(index * 90 * Math.PI / 180) * 250}px)`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                delay: index * 0.8,
              }}
            >
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-80 flex items-center justify-center backdrop-blur-xl shadow-2xl`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Central Hub Animation */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Particle Effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                left: `calc(50% + ${Math.cos(i * 30 * Math.PI / 180) * 150}px)`,
                top: `calc(50% + ${Math.sin(i * 30 * Math.PI / 180) * 150}px)`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Header */}
          <motion.div 
            className="text-center space-y-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
                Next-Gen Education
              </Badge>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
              Revolutionary Learning
              <br />
              <span className="gradient-text-accent">Experience</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-4xl mx-auto">
              Transform your educational journey with cutting-edge technology, personalized AI tutoring, 
              and immersive learning environments designed for the future.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {educationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-3xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {feature.stats}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-foreground-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                className="btn-hero group text-lg px-8 py-4"
                onClick={() => document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-5 h-5 ml-2" />
                </motion.div>
              </Button>
              
              <Button 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 hover:border-primary"
                onClick={() => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </div>
            
            <p className="text-sm text-foreground-secondary">
              Join 500,000+ students who've transformed their learning experience
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};