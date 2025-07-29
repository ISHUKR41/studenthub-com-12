import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Globe, 
  Star, 
  Zap, 
  Award, 
  TrendingUp,
  ChevronRight,
  Play,
  Target,
  Heart,
  Shield
} from 'lucide-react';

export const InteractiveTimelineSection = () => {
  const [activeYear, setActiveYear] = useState(2025);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const milestones = [
    { 
      year: 2022, 
      quarter: "Q1",
      title: "The Vision Begins",
      event: "StudentHub launched with revolutionary mission to democratize education access across India",
      stats: "1K Papers • 10K Users • 5 States",
      highlights: ["First 1,000 question papers uploaded", "Basic PDF tools launched", "Foundation team of 5 members"],
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      impact: "Started the educational revolution in digital learning"
    },
    { 
      year: 2023, 
      quarter: "Q2-Q4",
      title: "Exponential Growth Phase",
      event: "Massive expansion milestone - reached 10,000+ papers with AI-powered categorization and 50M users",
      stats: "10K Papers • 50M Users • 15 States • 5 Languages",
      highlights: ["AI categorization system", "WhatsApp integration", "Mobile app beta launch", "Community forums"],
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      impact: "Became India's fastest-growing educational platform"
    },
    { 
      year: 2024, 
      quarter: "Q1-Q4",
      title: "Innovation & Expansion",
      event: "Introduced revolutionary smart conversion tools, expanded to 22 languages, and launched 3D learning features",
      stats: "20K Papers • 120M Users • 22 Languages • 28 States",
      highlights: ["30+ smart tools launched", "3D interactive features", "Regional language support", "University partnerships"],
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      impact: "Transformed how students access and interact with educational content"
    },
    { 
      year: 2025, 
      quarter: "Q1",
      title: "AI-Powered Future",
      event: "Achieved 170M users milestone, launched advanced AI features, and introduced personalized learning paths",
      stats: "25K Papers • 170M Users • AI Features • Global Reach",
      highlights: ["AI study recommendations", "Personalized learning paths", "Advanced analytics", "Global expansion"],
      icon: <Star className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      impact: "Leading the future of AI-powered education in India and beyond"
    }
  ];

  const achievements = [
    { label: "Students Impacted", value: "170M+", icon: <Users className="w-8 h-8" /> },
    { label: "Question Papers", value: "25K+", icon: <BookOpen className="w-8 h-8" /> },
    { label: "Languages Supported", value: "22+", icon: <Globe className="w-8 h-8" /> },
    { label: "Success Rate", value: "94%", icon: <Target className="w-8 h-8" /> },
    { label: "Customer Satisfaction", value: "4.9★", icon: <Heart className="w-8 h-8" /> },
    { label: "Security Score", value: "A+", icon: <Shield className="w-8 h-8" /> }
  ];

  const activeMilestone = milestones.find(m => m.year === activeYear) || milestones[milestones.length - 1];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background-secondary/50 to-background-tertiary/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <Calendar className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Our Journey Through Time
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">
            Milestones of
            <span className="block text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Excellence
            </span>
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            From a small startup vision to India's leading educational technology platform - 
            discover the incredible journey of innovation and impact
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform">
                  {achievement.icon}
                </div>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{achievement.value}</div>
              <div className="text-sm text-foreground-secondary">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Timeline */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline Navigation */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold gradient-text mb-8">Timeline Navigator</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary opacity-30"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`relative pl-16 pb-8 cursor-pointer group ${
                    activeYear === milestone.year ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                  onClick={() => setActiveYear(milestone.year)}
                  onMouseEnter={() => setHoveredMilestone(index)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className={`absolute left-4 top-2 w-5 h-5 rounded-full border-4 ${
                      activeYear === milestone.year 
                        ? 'bg-primary border-primary shadow-glow' 
                        : 'bg-background border-border group-hover:border-primary'
                    }`}
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className={`${milestone.color} text-white`}>
                        {milestone.year} {milestone.quarter}
                      </Badge>
                      {hoveredMilestone === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white"
                        >
                          {milestone.icon}
                        </motion.div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold">{milestone.title}</h4>
                    <p className="text-foreground-secondary">{milestone.stats}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Milestone Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glassmorphism border-primary/20 overflow-hidden">
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 bg-gradient-to-r ${activeMilestone.color} rounded-2xl text-white`}>
                          {activeMilestone.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold">{activeMilestone.title}</h3>
                          <Badge className="mt-2">{activeMilestone.year} {activeMilestone.quarter}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Event Description */}
                    <div className="space-y-6">
                      <p className="text-lg text-foreground-secondary leading-relaxed">
                        {activeMilestone.event}
                      </p>

                      {/* Impact */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                        <h4 className="font-semibold mb-2 text-primary">Key Impact:</h4>
                        <p className="text-foreground-secondary">{activeMilestone.impact}</p>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Major Highlights:</h4>
                        <div className="grid gap-3">
                          {activeMilestone.highlights.map((highlight, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-3 p-3 rounded-lg glassmorphism group hover:shadow-md transition-all duration-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              whileHover={{ x: 5 }}
                            >
                              <ChevronRight className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                              <span className="text-foreground-secondary">{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20">
                        <h4 className="font-semibold mb-2 text-secondary">Achievement Stats:</h4>
                        <p className="text-2xl font-bold gradient-text">{activeMilestone.stats}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};