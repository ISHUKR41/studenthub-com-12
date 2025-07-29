import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Text, OrbitControls, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  Target, 
  Brain, 
  Users, 
  Globe, 
  Rocket, 
  Heart, 
  Trophy,
  BookOpen,
  Lightbulb,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

// 3D Animated Elements
const FloatingElement = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 2) * 0.4;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere ref={meshRef} position={position} args={[0.6, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={speed * 1.5}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

const About3DScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, 0, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[10, 0, -5]} intensity={0.8} color="#10b981" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <FloatingElement position={[-4, 2, -2]} color="#3b82f6" speed={1} />
      <FloatingElement position={[4, -1, -3]} color="#10b981" speed={1.2} />
      <FloatingElement position={[0, 3, -4]} color="#f59e0b" speed={0.8} />
      <FloatingElement position={[-3, -2, 2]} color="#ef4444" speed={1.5} />
      <FloatingElement position={[3, 1, 1]} color="#8b5cf6" speed={0.9} />
      <FloatingElement position={[0, -3, -1]} color="#06b6d4" speed={1.1} />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
};

export const MegaEnhanced3DAboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('mission');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const missionVisionData = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: <Target className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-600',
      description: 'To democratize quality education by providing free, accessible, and comprehensive learning resources to students worldwide.',
      details: [
        'Breaking down educational barriers',
        'Ensuring equal access to quality content',
        'Supporting diverse learning styles',
        'Building a global learning community'
      ],
      stats: { value: '500K+', label: 'Students Empowered' }
    },
    {
      id: 'vision',
      title: 'Our Vision',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-green-600',
      description: 'To become the world\'s leading platform where every student can achieve their educational dreams through innovative technology and collaborative learning.',
      details: [
        'Revolutionizing digital education',
        'Creating personalized learning experiences',
        'Fostering global academic excellence',
        'Inspiring lifelong learning habits'
      ],
      stats: { value: '2030', label: 'Vision Target' }
    },
    {
      id: 'values',
      title: 'Core Values',
      icon: <Heart className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-600',
      description: 'We believe in excellence, integrity, innovation, and inclusivity as the foundation of meaningful education.',
      details: [
        'Excellence in everything we do',
        'Integrity in all our interactions',
        'Innovation driving our solutions',
        'Inclusivity welcoming all learners'
      ],
      stats: { value: '4.9★', label: 'User Rating' }
    }
  ];

  const teamHighlights = [
    {
      title: 'Expert Educators',
      icon: <BookOpen className="w-6 h-6" />,
      count: '50+',
      description: 'PhD holders and industry experts curating content',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Tech Innovators',
      icon: <Lightbulb className="w-6 h-6" />,
      count: '25+',
      description: 'Engineers building cutting-edge learning tools',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Support Heroes',
      icon: <Shield className="w-6 h-6" />,
      count: '30+',
      description: '24/7 dedicated student support specialists',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Global Network',
      icon: <Globe className="w-6 h-6" />,
      count: '100+',
      description: 'Partners across universities worldwide',
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  const achievements = [
    { icon: <Users className="w-6 h-6" />, value: '500,000+', label: 'Active Students', color: 'text-blue-500' },
    { icon: <BookOpen className="w-6 h-6" />, value: '50,000+', label: 'Study Materials', color: 'text-green-500' },
    { icon: <Trophy className="w-6 h-6" />, value: '25+', label: 'Awards Won', color: 'text-yellow-500' },
    { icon: <Globe className="w-6 h-6" />, value: '180+', label: 'Countries Served', color: 'text-purple-500' }
  ];

  const timelineEvents = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a mission to make quality education accessible to all',
      icon: <Rocket className="w-5 h-5" />,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      year: '2021',
      title: 'First Milestone',
      description: 'Reached 50,000 students and launched AI-powered study tools',
      icon: <Brain className="w-5 h-5" />,
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Extended services to 100+ countries with multilingual support',
      icon: <Globe className="w-5 h-5" />,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      year: '2023',
      title: 'Innovation Leader',
      description: 'Introduced 3D learning environments and VR study sessions',
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      year: '2024',
      title: 'Future Ready',
      description: 'Half a million students strong, pioneering the future of education',
      icon: <Star className="w-5 h-5" />,
      gradient: 'from-red-500 to-pink-600'
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Ultra-Advanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <About3DScene />
      </div>

      {/* Enhanced Background Overlays */}
      <div className="absolute inset-0 z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-5"
            style={{
              background: `radial-gradient(circle, ${['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-20 py-20 px-4"
        style={{ y, opacity }}
      >
        {/* Hero Section */}
        <motion.div
          className="max-w-7xl mx-auto text-center space-y-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-2xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Revolutionary Educational Platform
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold gradient-text leading-tight">
            About
            <br />
            <span className="gradient-text-accent">STUDENTHUB</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-4xl mx-auto">
            Pioneering the future of education through innovation, technology, and unwavering commitment 
            to student success across the globe.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`${achievement.color} text-4xl font-bold flex items-center justify-center gap-2`}>
                  {achievement.icon}
                  <span>{achievement.value}</span>
                </div>
                <div className="text-sm text-foreground-secondary">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission, Vision, Values Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Built on strong principles that guide every decision and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {missionVisionData.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative p-8 rounded-3xl glassmorphism group cursor-pointer hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setActiveSection(item.id)}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {item.stats.value}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-foreground-secondary leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-3">
                    {item.details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + idx * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-foreground-secondary">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Badge className={`bg-gradient-to-r ${item.gradient} text-white`}>
                      {item.stats.label}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Highlights */}
        <section className="max-w-7xl mx-auto mb-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Our Amazing Team
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Passionate professionals dedicated to transforming education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamHighlights.map((team, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-2xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${team.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${team.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {team.icon}
                  </div>
                  
                  <div className="text-3xl font-bold gradient-text">{team.count}</div>
                  <h3 className="text-lg font-semibold text-foreground">{team.title}</h3>
                  <p className="text-sm text-foreground-secondary">{team.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="max-w-5xl mx-auto mb-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              From humble beginnings to educational excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      className="p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${event.gradient} text-white`}>
                          {event.icon}
                        </div>
                        <Badge className={`bg-gradient-to-r ${event.gradient} text-white font-bold`}>
                          {event.year}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                      <p className="text-foreground-secondary">{event.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Node */}
                  <motion.div
                    className="w-6 h-6 rounded-full border-4 border-primary bg-background relative z-10"
                    whileHover={{ scale: 1.3 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.7)',
                        '0 0 0 10px rgba(59, 130, 246, 0)',
                        '0 0 0 0 rgba(59, 130, 246, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">
            Join Our Educational Revolution
          </h2>
          <p className="text-xl text-foreground-secondary">
            Be part of a community that's reshaping the future of learning
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="btn-hero group text-lg px-8 py-4"
              onClick={() => window.location.href = '/contact'}
            >
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              className="text-lg px-8 py-4 border-2 hover:border-primary"
              onClick={() => window.location.href = '/tools'}
            >
              <Play className="w-5 h-5 mr-2" />
              Explore Tools
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};