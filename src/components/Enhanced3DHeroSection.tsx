import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  PerspectiveCamera, 
  OrbitControls,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Download, 
  Star, 
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Brain,
  Rocket,
  Shield,
  Heart,
  Target
} from 'lucide-react';

// Simplified 3D Floating Book Component
const FloatingBook = ({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number], color: string, rotation?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime + position[1]) * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.3, 0.4, 0.05]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

// Simplified 3D Knowledge Orb Component
const KnowledgeOrb = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Simplified 3D Scene
const Enhanced3DHeroScene = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4F46E5" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10B981" />
      
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Floating Elements */}
      <FloatingBook position={[-4, 2, -3]} color="#3B82F6" rotation={[0.2, 0.3, 0]} />
      <FloatingBook position={[4, -1, -2]} color="#10B981" rotation={[-0.1, -0.2, 0.1]} />
      <FloatingBook position={[-2, -3, -4]} color="#F59E0B" rotation={[0.3, 0.1, -0.2]} />
      <FloatingBook position={[3, 3, -5]} color="#EF4444" rotation={[-0.2, 0.4, 0.1]} />
      <FloatingBook position={[0, -4, -3]} color="#8B5CF6" rotation={[0.1, -0.3, 0.2]} />
      
      {/* Knowledge Orbs */}
      <KnowledgeOrb position={[-6, 0, -6]} />
      <KnowledgeOrb position={[6, 2, -7]} />
      <KnowledgeOrb position={[0, 4, -8]} />
    </>
  );
};

export const Enhanced3DHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, -300]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStats = [
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      value: "25,000+", 
      label: "Question Papers",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      value: "170M+", 
      label: "Students Served",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Download className="w-6 h-6" />, 
      value: "50M+", 
      label: "Downloads",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      value: "4.9★", 
      label: "User Rating",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "#1 Student Platform" },
    { icon: <Globe className="w-5 h-5" />, text: "22+ Languages" },
    { icon: <Shield className="w-5 h-5" />, text: "100% Secure" },
    { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast" }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Search",
      description: "Find exactly what you need with intelligent search algorithms"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Instant Downloads",
      description: "Get your study materials in seconds, not minutes"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by students, for students across India"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Exam Focused",
      description: "Curated content for NEET, JEE, UPSC, and more"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden pt-0">
      {/* Remove default padding/margin to eliminate gap */}
      {/* Enhanced 3D Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity, scale }}
      >
        <Canvas className="w-full h-full">
          <Suspense fallback={null}>
            <Enhanced3DHeroScene />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Achievement Badges */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {achievements.map((achievement, index) => (
                  <Badge 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 hover:scale-105 transition-transform"
                  >
                    {achievement.icon}
                    <span className="ml-2">{achievement.text}</span>
                  </Badge>
                ))}
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="gradient-text">Transform Your</span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
                    Academic Journey
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-foreground-secondary max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                India's most advanced student platform with 25,000+ question papers, 
                AI-powered tools, and a community of 170 million students.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Button 
                  className="btn-hero bg-gradient-to-r from-primary to-accent px-8 py-4 text-lg group"
                  size="lg"
                >
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="px-8 py-4 text-lg border-2 hover:border-primary group"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-foreground-secondary">
                            {feature.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-foreground-secondary"
        >
          <div className="text-sm">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};