import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Globe, 
  Shield, 
  Heart, 
  Lightbulb,
  Star,
  Target,
  TrendingUp,
  Download,
  Languages,
  MessageCircle,
  Smartphone,
  Brain,
  Award,
  Zap,
  Rocket,
  Crown,
  Gem,
  Sparkles
} from 'lucide-react';

// Enhanced 3D Floating Elements
const FloatingElement = ({ position, color, type = 'sphere' }: { 
  position: [number, number, number], 
  color: string, 
  type?: 'sphere' | 'box' | 'pyramid' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case 'pyramid':
        return <coneGeometry args={[0.6, 1.2, 4]} />;
      default:
        return <sphereGeometry args={[0.6]} />;
    }
  };

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} position={position}>
        {getGeometry()}
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// 3D Scene Component
const Enhanced3DAboutScene = () => {
  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#10B981" intensity={0.6} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} color="#F59E0B" />

      <FloatingElement position={[-3, 2, -2]} color="#3B82F6" type="sphere" />
      <FloatingElement position={[3, -1, -3]} color="#10B981" type="box" />
      <FloatingElement position={[0, 3, -1]} color="#F59E0B" type="pyramid" />
      <FloatingElement position={[-2, -2, -4]} color="#EF4444" type="sphere" />
      <FloatingElement position={[2, 1, -2]} color="#8B5CF6" type="box" />
    </>
  );
};

export const EnhancedAboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 50);
    mouseY.set((e.clientY - centerY) / 50);
  };

  const coreValues = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Global Accessibility",
      description: "Making quality education accessible to every corner of India through technology and innovation.",
      color: "from-blue-500 to-cyan-500",
      stats: "22+ Languages",
      feature: "Multi-regional support"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Uncompromising Quality",
      description: "Every resource is carefully curated and verified by our expert academic team.",
      color: "from-green-500 to-emerald-500",
      stats: "98% Accuracy",
      feature: "Expert verification"
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Cutting-Edge Innovation",
      description: "Pioneering 3D learning experiences and AI-powered educational tools.",
      color: "from-yellow-500 to-orange-500",
      stats: "30+ AI Tools",
      feature: "Future-ready tech"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Vibrant Community",
      description: "Building the largest student community in India with peer support networks.",
      color: "from-purple-500 to-pink-500",
      stats: "170M+ Users",
      feature: "Active communities"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Student-First Approach",
      description: "Every decision we make is guided by what's best for our students' success.",
      color: "from-red-500 to-rose-500",
      stats: "4.9★ Rating",
      feature: "Student satisfaction"
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Continuous Evolution",
      description: "Constantly improving and adapting to meet the changing needs of modern education.",
      color: "from-indigo-500 to-purple-500",
      stats: "Weekly Updates",
      feature: "Rapid innovation"
    }
  ];

  const achievements = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Market Leader",
      description: "India's #1 educational resource platform",
      metric: "170M+ Active Users",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Highest quality standards in the industry",
      metric: "25,000+ Verified Papers",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Student Approved",
      description: "Trusted by millions of successful students",
      metric: "4.9/5 Star Rating",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Ultra-fast content delivery and support",
      metric: "< 2 Second Load Time",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const tabs = [
    {
      id: 'mission',
      label: 'Our Mission',
      icon: <Target className="w-5 h-5" />,
      content: {
        title: "Democratizing Quality Education",
        description: "To make world-class educational resources accessible to every student in India, regardless of their geographic location or economic background.",
        highlights: [
          "Free access to premium study materials",
          "AI-powered personalized learning paths",
          "Community-driven knowledge sharing",
          "24/7 academic support system"
        ]
      }
    },
    {
      id: 'vision',
      label: 'Our Vision',
      icon: <Brain className="w-5 h-5" />,
      content: {
        title: "Transforming Education Through Technology",
        description: "To become the global leader in educational technology, creating a future where every student has the tools and support they need to succeed.",
        highlights: [
          "AI-integrated learning experiences",
          "Virtual reality study environments",
          "Global educational partnerships",
          "Sustainable learning ecosystems"
        ]
      }
    },
    {
      id: 'impact',
      label: 'Our Impact',
      icon: <TrendingUp className="w-5 h-5" />,
      content: {
        title: "Creating Real Change",
        description: "Measuring our success through the achievements of our student community and the positive impact on Indian education.",
        highlights: [
          "170M+ students empowered",
          "95% improvement in study efficiency",
          "50,000+ success stories shared",
          "22 languages supported nationwide"
        ]
      }
    }
  ];

  return (
    <section className="py-32 px-4 bg-background relative overflow-hidden">
      {/* Temporarily disable 3D Canvas to fix errors */}
      <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-primary/5 to-accent/5">
      </div>

      {/* Floating Background Particles */}
      <div className="absolute inset-0 z-1">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center space-y-12 mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-6 mb-12">
            <motion.div 
              className="p-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="h-16 w-16 text-white" />
            </motion.div>
            <Badge className="text-2xl px-10 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              About STUDENTHUB
            </Badge>
          </div>
          
          <motion.h1 
            className="text-7xl md:text-9xl font-bold gradient-text leading-tight"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            Empowering Dreams
          </motion.h1>
          
          <motion.p 
            className="text-3xl text-foreground-secondary max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Revolutionizing education in India through cutting-edge technology, 
            community-driven learning, and unwavering commitment to student success.
          </motion.p>
        </motion.div>

        {/* Enhanced Achievements Section */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">Our Achievements</h2>
            <p className="text-xl text-foreground-secondary">Milestones that define our journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-3xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.05 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={hoveredCard === index ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="relative z-10 text-center space-y-6">
                  <motion.div 
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${achievement.color} text-white shadow-lg`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold">{achievement.title}</h3>
                  <p className="text-foreground-secondary">{achievement.description}</p>
                  
                  <motion.div 
                    className="text-3xl font-bold gradient-text"
                    animate={hoveredCard === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {achievement.metric}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Mission/Vision/Impact Tabs */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          style={{ perspective: "1000px" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">Our Foundation</h2>
            <p className="text-xl text-foreground-secondary">The principles that guide everything we do</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-background-secondary/50 p-2 rounded-2xl backdrop-blur-lg">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-background/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <AnimatePresence mode="wait">
              {tabs.map((tab) => 
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 50, rotateY: 90 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -50, rotateY: -90 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="glassmorphism p-12 rounded-3xl"
                  >
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                      <h3 className="text-4xl font-bold gradient-text">{tab.content.title}</h3>
                      <p className="text-2xl text-foreground-secondary leading-relaxed">
                        {tab.content.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mt-12">
                        {tab.content.highlights.map((highlight, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl glassmorphism"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ x: 10, scale: 1.02 }}
                          >
                            <div className="p-2 bg-primary rounded-lg">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-medium">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Enhanced Core Values Grid */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">Our Core Values</h2>
            <p className="text-xl text-foreground-secondary">The values that drive our commitment to excellence</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl glassmorphism hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className={`p-4 rounded-2xl bg-gradient-to-r ${value.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      {value.icon}
                    </motion.div>
                    <Badge className="text-sm px-3 py-1 bg-background/50">{value.stats}</Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold">{value.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{value.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Star className="w-4 h-4" />
                    {value.feature}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold gradient-text">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Join millions of students who have already discovered the power of STUDENTHUB
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="btn-hero bg-gradient-to-r from-primary via-secondary to-accent px-10 py-4 text-xl">
                <Download className="w-6 h-6 mr-3" />
                Start Learning Today
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="px-10 py-4 text-xl border-primary/50 hover:border-primary">
                <MessageCircle className="w-6 h-6 mr-3" />
                Contact Our Team
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};