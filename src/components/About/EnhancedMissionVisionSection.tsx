import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Globe, 
  Lightbulb,
  ChevronRight,
  Star,
  Award,
  Shield,
  Zap,
  Rocket,
  Brain,
  Book,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Building,
  GraduationCap
} from 'lucide-react';

// 3D animated background elements for Mission/Vision
const MissionVision3DScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Stars radius={200} depth={100} count={8000} factor={8} saturation={0} fade />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#10B981" />
      
      <group ref={groupRef}>
        {/* Mission spheres */}
        {[...Array(8)].map((_, i) => (
          <Float key={`mission-${i}`} speed={1 + Math.random() * 0.5} rotationIntensity={1} floatIntensity={2}>
            <Sphere 
              position={[
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 40,
                -30 + Math.random() * -40
              ]}
              args={[Math.random() * 2 + 1, 32, 32]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 45) % 360}, 80%, 65%)`}
                transparent={true}
                opacity={0.6}
                distort={0.4}
                speed={2}
                emissive={`hsl(${(i * 45) % 360}, 80%, 30%)`}
                emissiveIntensity={0.3}
              />
            </Sphere>
          </Float>
        ))}
        
        {/* Vision geometric elements */}
        {[...Array(12)].map((_, i) => (
          <Float key={`vision-${i}`} speed={0.8 + Math.random() * 0.4} rotationIntensity={1.5} floatIntensity={1.5}>
            <Box 
              position={[
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 50,
                -20 + Math.random() * -50
              ]}
              args={[Math.random() * 3 + 0.5, Math.random() * 3 + 0.5, Math.random() * 2 + 0.3]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 30) % 360}, 75%, 60%)`}
                transparent={true}
                opacity={0.5}
                distort={0.3}
                speed={1.5}
                wireframe={i % 3 === 0}
              />
            </Box>
          </Float>
        ))}
        
        {/* Connecting rings */}
        {[...Array(6)].map((_, i) => (
          <Float key={`ring-${i}`} speed={1.2 + Math.random() * 0.3} rotationIntensity={0.8} floatIntensity={1.8}>
            <Torus 
              position={[
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 30,
                -15 + Math.random() * -60
              ]}
              args={[Math.random() * 4 + 2, Math.random() * 0.5 + 0.3, 16, 100]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 60) % 360}, 85%, 70%)`}
                transparent
                opacity={0.4}
                distort={0.5}
                speed={2.5}
              />
            </Torus>
          </Float>
        ))}
      </group>
    </>
  );
};

export const EnhancedMissionVisionSection: React.FC = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  const missionPoints = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Democratize Quality Education",
      description: "Making premium educational resources accessible to every student, regardless of their economic background or geographic location.",
      impact: "Reached 170M+ students across 2000+ cities"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation in Learning",
      description: "Leveraging cutting-edge technology, AI, and data analytics to create personalized learning experiences.",
      impact: "50+ AI-powered features implemented"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Building",
      description: "Fostering collaborative learning environments where students can connect, share knowledge, and grow together.",
      impact: "2M+ active community members"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Impact",
      description: "Expanding our reach to empower students worldwide while maintaining our focus on Indian educational needs.",
      impact: "Operating in 15+ countries"
    }
  ];

  const visionPoints = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Educational Transformation",
      description: "To become the world's most trusted platform for student empowerment and academic excellence.",
      timeline: "By 2030: 500M+ global users"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Technology Leadership",
      description: "Leading the digital education revolution with breakthrough innovations in AI, AR/VR, and personalized learning.",
      timeline: "Next 5 years: Revolutionary features"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Institutional Partnerships",
      description: "Collaborating with top universities and institutions to create comprehensive educational ecosystems.",
      timeline: "1000+ university partnerships"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Success Stories",
      description: "Creating millions of success stories by helping students achieve their academic and career goals.",
      timeline: "10M+ career transformations"
    }
  ];

  const coreValues = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Student-First Approach",
      description: "Every decision we make prioritizes student needs, success, and well-being above all else.",
      principle: "Students are our North Star"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity & Trust",
      description: "Building lasting relationships through transparency, honesty, and reliable service delivery.",
      principle: "Trust through transparency"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation Excellence",
      description: "Continuously pushing boundaries to create breakthrough solutions that enhance learning outcomes.",
      principle: "Innovation drives progress"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality Commitment",
      description: "Maintaining the highest standards in content, technology, and user experience across all our offerings.",
      principle: "Excellence in everything"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Accessibility",
      description: "Ensuring our platform is inclusive, accessible, and beneficial for students with diverse needs and abilities.",
      principle: "Education for everyone"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Continuous Growth",
      description: "Embracing learning, adaptation, and improvement as core aspects of our organizational culture.",
      principle: "Growth mindset always"
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'mission': return missionPoints;
      case 'vision': return visionPoints;
      case 'values': return coreValues;
      default: return missionPoints;
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
          onError={(error) => console.warn('Mission Vision 3D error:', error)}
          onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
          fallback={<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />}
        >
          <MissionVision3DScene />
        </Canvas>
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 z-10">
        <motion.div 
          className="absolute top-1/4 right-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Our Foundation
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text">
            Mission, Vision & Values
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            The driving forces behind our commitment to educational excellence and student empowerment
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex p-2 bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50">
            {[
              { key: 'mission', label: 'Our Mission', icon: <Target className="w-5 h-5" /> },
              { key: 'vision', label: 'Our Vision', icon: <Eye className="w-5 h-5" /> },
              { key: 'values', label: 'Core Values', icon: <Heart className="w-5 h-5" /> }
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'bg-transparent text-foreground-secondary hover:bg-background-secondary'
                }`}
                variant="ghost"
              >
                {tab.icon}
                <span className="ml-2 font-semibold">{tab.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {getCurrentData().map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full p-8 glassmorphism group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 gradient-text">{item.title}</h3>
                        <p className="text-foreground-secondary leading-relaxed mb-4">{item.description}</p>
                        
                        {/* Additional info based on tab */}
                        {activeTab === 'mission' && 'impact' in item && (
                          <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            <span>Impact: {item.impact}</span>
                          </div>
                        )}
                        
                        {activeTab === 'vision' && 'timeline' in item && (
                          <div className="flex items-center gap-2 text-sm text-accent font-semibold">
                            <ArrowRight className="w-4 h-4" />
                            <span>{item.timeline}</span>
                          </div>
                        )}
                        
                        {activeTab === 'values' && 'principle' in item && (
                          <div className="flex items-center gap-2 text-sm text-secondary font-semibold">
                            <Star className="w-4 h-4" />
                            <span>{item.principle}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className="text-center pt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-lg text-foreground-secondary mb-8 max-w-3xl mx-auto">
            Join us in our mission to transform education and empower the next generation of leaders, innovators, and changemakers.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              className="btn-hero bg-gradient-to-r from-primary to-accent px-10 py-4 text-lg group"
              size="lg"
            >
              Join Our Community
              <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="px-10 py-4 text-lg hover:border-primary group"
              size="lg"
            >
              Learn More
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};