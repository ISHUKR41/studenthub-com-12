import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  PerspectiveCamera, 
  OrbitControls,
  Stars,
  Sphere,
  Box,
  Torus,
  Html,
  Text,
  MeshDistortMaterial,
  Points,
  PointMaterial,
  ContactShadows,
  Cylinder,
  Cone
} from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { 
  BookOpen, 
  Users, 
  Globe, 
  Shield, 
  Heart, 
  Lightbulb,
  ChevronRight,
  Play,
  ArrowUp,
  Target,
  Star,
  Award,
  TrendingUp,
  Download,
  Languages,
  MessageCircle,
  Smartphone,
  Brain,
  Search,
  Rocket,
  Zap,
  Trophy,
  Clock,
  Sparkles,
  Eye,
  CheckCircle,
  Cpu,
  Diamond,
  Palette,
  Settings,
  ThumbsUp,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Share,
  Bookmark,
  Filter,
  RefreshCw,
  Headphones,
  Monitor,
  Wifi,
  Database,
  Code,
  Layers,
  GitBranch,
  PieChart,
  BarChart,
  LineChart,
  Activity,
  Building,
  GraduationCap,
  Coffee,
  Camera,
  Video,
  Mic,
  Volume2,
  Maximize,
  Minimize
} from 'lucide-react';

// Ultra Advanced 3D Particle System for About Page
const UltraAdvancedAboutParticleSystem = ({ count = 3000 }) => {
  const points = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Create galaxy-like distribution
      const radius = Math.random() * 80 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.5; // Flatten the distribution
      
      positions[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
      
      // Educational themed colors
      const colorPalette = [
        { r: 0.23, g: 0.51, b: 0.96 }, // Blue
        { r: 0.06, g: 0.73, b: 0.51 }, // Green
        { r: 0.96, g: 0.62, b: 0.07 }, // Orange
        { r: 0.54, g: 0.17, b: 0.89 }, // Purple
        { r: 0.94, g: 0.27, b: 0.27 }, // Red
      ];
      const color = colorPalette[i % colorPalette.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.8 + 0.2;
    }
    
    return { positions, colors, sizes };
  });

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.z = state.clock.elapsedTime * 0.01;
      
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 1.5 + positions[i] * 0.02) * 0.003;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points 
      ref={points}
      positions={particles.positions} 
      colors={particles.colors} 
      sizes={particles.sizes}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Ultra Advanced Floating Educational Elements
const UltraAdvancedEducationalElement = ({ 
  position, 
  type, 
  scale = 1 
}: { 
  position: [number, number, number]; 
  type: 'book' | 'brain' | 'trophy' | 'globe' | 'rocket' | 'diamond'; 
  scale?: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2 + position[1]) * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6 + position[2]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.8;
    }
  });

  const getGeometry = () => {
    switch(type) {
      case 'book':
        return <boxGeometry args={[0.6, 0.8, 0.12]} />;
      case 'brain':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'trophy':
        return <cylinderGeometry args={[0.3, 0.5, 0.8, 12]} />;
      case 'globe':
        return <sphereGeometry args={[0.4, 32, 32]} />;
      case 'rocket':
        return <coneGeometry args={[0.2, 1, 8]} />;
      case 'diamond':
        return <coneGeometry args={[0.3, 0.6, 4]} />;
      default:
        return <boxGeometry args={[0.4, 0.4, 0.4]} />;
    }
  };

  const getColor = () => {
    switch(type) {
      case 'book': return '#3B82F6';
      case 'brain': return '#10B981';
      case 'trophy': return '#F59E0B';
      case 'globe': return '#06B6D4';
      case 'rocket': return '#EF4444';
      case 'diamond': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {getGeometry()}
        <MeshDistortMaterial 
          color={getColor()} 
          distort={0.3}
          speed={2}
          metalness={0.8} 
          roughness={0.1}
          emissive={getColor()}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

// Mega Advanced 3D Scene for About Page
const MegaAdvanced3DAboutScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <>
      {/* Ultra Advanced Lighting Setup */}
      <ambientLight intensity={0.3} color="#1a1a2e" />
      <directionalLight position={[15, 15, 8]} intensity={2} color="#3B82F6" />
      <pointLight position={[-15, -15, -8]} intensity={1.5} color="#10B981" />
      <pointLight position={[0, 20, 0]} intensity={1} color="#F59E0B" />
      <spotLight position={[8, 8, 8]} intensity={1.5} angle={0.4} penumbra={1} color="#8B5CF6" />
      <spotLight position={[-8, -8, 8]} intensity={1.2} angle={0.3} penumbra={1} color="#EC4899" />
      
      <Environment preset="dawn" />
      <Stars radius={400} depth={150} count={15000} factor={10} saturation={0} fade />
      
      {/* Ultra Advanced Particle System */}
      <UltraAdvancedAboutParticleSystem count={3500} />
      
      {/* Mega Complex Educational Elements */}
      <group ref={groupRef}>
        {/* Main Educational Icons */}
        {[...Array(25)].map((_, i) => (
          <UltraAdvancedEducationalElement
            key={i}
            position={[
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 80,
              -50 + Math.random() * -60
            ]}
            type={['book', 'brain', 'trophy', 'globe', 'rocket', 'diamond'][Math.floor(Math.random() * 6)] as any}
            scale={0.8 + Math.random() * 0.6}
          />
        ))}
        
        {/* Floating Knowledge Spheres */}
        {[...Array(20)].map((_, i) => (
          <Float key={`knowledge-${i}`} speed={0.8 + Math.random() * 0.5} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere 
              position={[
                (Math.random() - 0.5) * 120,
                (Math.random() - 0.5) * 60,
                -40 + Math.random() * -70
              ]}
              args={[Math.random() * 2.5 + 1, 32, 32]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 18) % 360}, 85%, 65%)`}
                transparent
                opacity={0.7}
                distort={0.5}
                speed={2}
                emissive={`hsl(${(i * 18) % 360}, 85%, 30%)`}
                emissiveIntensity={0.4}
              />
            </Sphere>
          </Float>
        ))}
        
        {/* Advanced Geometric Elements */}
        {[...Array(15)].map((_, i) => (
          <Float key={`geo-${i}`} speed={1 + Math.random() * 0.8} rotationIntensity={2} floatIntensity={1.5}>
            <Box 
              position={[
                (Math.random() - 0.5) * 140,
                (Math.random() - 0.5) * 70,
                -30 + Math.random() * -80
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
              args={[Math.random() * 4 + 1, Math.random() * 4 + 1, Math.random() * 1 + 0.5]}
            >
              <MeshDistortMaterial 
                color={`hsl(${Math.random() * 360}, 80%, 60%)`}
                transparent
                opacity={0.6}
                distort={0.4}
                speed={1.5}
                metalness={0.7}
                roughness={0.2}
              />
            </Box>
          </Float>
        ))}
        
        {/* Ultra Advanced Torus Elements */}
        {[...Array(12)].map((_, i) => (
          <Float key={`torus-${i}`} speed={1.5 + Math.random() * 0.7} rotationIntensity={1.2} floatIntensity={2.2}>
            <Torus 
              position={[
                (Math.random() - 0.5) * 160,
                (Math.random() - 0.5) * 50,
                -25 + Math.random() * -90
              ]}
              args={[Math.random() * 3 + 1.5, Math.random() * 0.8 + 0.4, 16, 100]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 30) % 360}, 90%, 70%)`}
                transparent
                opacity={0.5}
                distort={0.6}
                speed={3}
                wireframe={i % 3 === 0}
              />
            </Torus>
          </Float>
        ))}
      </group>
      
      <ContactShadows opacity={0.4} scale={300} blur={2} far={80} resolution={512} color="#000000" />
    </>
  );
};

// Hero Section Component with Enhanced 3D Background
const UltraAdvancedHeroSection = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });

  const stats = [
    { 
      icon: <Users className="w-8 h-8" />, 
      value: "170M+", 
      label: "Students Empowered",
      color: "from-blue-500 to-cyan-500",
      description: "Across India and globally",
      details: "Active learners from 2000+ cities"
    },
    { 
      icon: <BookOpen className="w-8 h-8" />, 
      value: "25,000+", 
      label: "Study Resources",
      color: "from-green-500 to-emerald-500",
      description: "Question papers and materials",
      details: "Updated daily with latest patterns"
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      value: "500+", 
      label: "Universities Covered",
      color: "from-purple-500 to-pink-500",
      description: "Leading institutions",
      details: "Including IITs, NITs, and top colleges"
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      value: "99.8%", 
      label: "Success Rate",
      color: "from-yellow-500 to-orange-500",
      description: "Student satisfaction",
      details: "Based on 50K+ feedback responses"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary"
    >
      {/* Ultra Advanced 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
          onError={(error) => {
            console.warn('3D About Hero error:', error);
          }}
          onCreated={(state) => {
            state.gl.setClearColor(0x000000, 0);
          }}
          fallback={<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />}
        >
          <Suspense fallback={null}>
            <MegaAdvanced3DAboutScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Animated Background Gradients */}
      <div className="absolute inset-0 z-10">
        <motion.div 
          className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-gradient-radial from-primary/20 via-accent/15 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1.2, 1],
            opacity: [0.4, 0.8, 0.6, 0.4],
            x: [0, 120, -60, 0],
            y: [0, -80, 40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-gradient-radial from-secondary/20 via-accent/15 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1.1, 1],
            opacity: [0.3, 0.7, 0.5, 0.3],
            x: [0, -100, 80, 0],
            y: [0, 70, -30, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, delay: 4 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-radial from-accent/15 via-primary/10 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1.6, 1],
            opacity: [0.35, 0.65, 0.45, 0.35],
            rotate: [0, 270, 540],
            x: [0, 60, -40, 0],
            y: [0, -90, 50, 0]
          }}
          transition={{ duration: 28, repeat: Infinity, delay: 8 }}
        />
        
        {/* Additional animated elements for enhanced visual depth */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 2.5, 0],
              rotate: [0, 720, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-12">
          {/* Header */}
          <motion.div
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
                About STUDENTHUB
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold gradient-text mb-8 leading-tight">
              Revolutionizing Education
              <br />
              <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
                One Student at a Time
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground-secondary max-w-5xl mx-auto leading-relaxed mb-8">
              We're not just a platform—we're a movement. Since our inception in 2018, we've been dedicated to 
              democratizing quality education and empowering students across India with cutting-edge tools, 
              comprehensive resources, and unwavering support.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-foreground-secondary max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span>AI-Powered Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-accent" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-secondary" />
                <span>100% Free Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <span>Community Driven</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-3xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-foreground-secondary mb-2">{stat.description}</div>
                <div className="text-xs text-foreground-secondary opacity-80">{stat.details}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex flex-wrap justify-center gap-6">
              <Button 
                className="btn-hero bg-gradient-to-r from-primary to-accent px-10 py-4 text-lg group"
                size="lg"
              >
                Join Our Mission
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                className="px-10 py-4 text-lg border-2 hover:border-primary group"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Mission & Vision Section
const MissionVisionSection = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });

  const missions = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description: "To democratize quality education by providing every student with access to comprehensive study materials, cutting-edge tools, and expert guidance, regardless of their geographical or economic background.",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Free access to premium resources",
        "AI-powered personalized learning",
        "24/7 expert support",
        "Community-driven content"
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Our Vision", 
      description: "To create a world where every student has the opportunity to excel academically and achieve their dreams through innovative technology, collaborative learning, and unwavering support.",
      color: "from-purple-500 to-pink-500",
      features: [
        "Global educational ecosystem",
        "Technology-enhanced learning",
        "Inclusive educational opportunities",
        "Future-ready skill development"
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 bg-gradient-to-br from-background-secondary via-background to-background-tertiary overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Our Purpose & Future</h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Driven by a clear mission and guided by an ambitious vision, we're reshaping the educational landscape.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full glassmorphism border-2 border-border/30 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${mission.color} opacity-0 hover:opacity-5 transition-opacity duration-300`} />
                <CardContent className="p-10 relative z-10">
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${mission.color} text-white mb-6 hover:scale-110 transition-transform duration-300`}>
                        {mission.icon}
                      </div>
                      <h3 className="text-3xl font-bold gradient-text mb-4">{mission.title}</h3>
                    </div>
                    
                    <p className="text-lg text-foreground-secondary leading-relaxed text-center">
                      {mission.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-center">Key Focus Areas</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {mission.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-background/50"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 + index * 0.2 + featureIndex * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground-secondary">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      expertise: "Educational Technology",
      image: "👨‍💼",
      description: "15+ years in EdTech, former IIT professor",
      achievements: ["100+ patents", "Forbes 40 Under 40", "Education Pioneer Award"]
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer",
      expertise: "AI & Machine Learning",
      image: "👩‍💻",
      description: "Ex-Google engineer, AI research specialist",
      achievements: ["AI Innovation Award", "Tech Leader 2024", "50+ research papers"]
    },
    {
      name: "Prof. Anand Mishra",
      role: "Head of Content",
      expertise: "Academic Excellence",
      image: "👨‍🏫",
      description: "Former university dean, curriculum expert",
      achievements: ["Educational Excellence Award", "Best Teacher Award", "Content Creator"]
    },
    {
      name: "Kavya Patel",
      role: "Head of Design",
      expertise: "UX/UI Design",
      image: "👩‍🎨", 
      description: "Award-winning designer, user experience expert",
      achievements: ["Design Excellence Award", "UX Innovation", "Creative Director"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Leadership Team
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Meet Our Visionaries</h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            A diverse team of educators, technologists, and innovators united by a common goal: transforming education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full glassmorphism border-2 border-border/30 hover:border-primary/50 transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <div>
                      <h3 className="text-2xl font-bold gradient-text mb-2">{member.name}</h3>
                      <p className="text-lg font-semibold text-primary mb-2">{member.role}</p>
                      <p className="text-sm text-accent mb-4">{member.expertise}</p>
                      <p className="text-foreground-secondary mb-6">{member.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm">Key Achievements</h4>
                      {member.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center justify-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs text-foreground-secondary">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Ultra Advanced About Page Component
export const UltraAdvancedAboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden">
      {/* Ultra Advanced Hero Section */}
      <ParallaxScroll speed={0.5} direction="up">
        <UltraAdvancedHeroSection />
      </ParallaxScroll>
      
      {/* Enhanced Mission & Vision Section */}
      <ParallaxScroll speed={0.3} direction="down">
        <MissionVisionSection />
      </ParallaxScroll>
      
      {/* Enhanced Team Section */}
      <ParallaxScroll speed={0.4} direction="up">
        <TeamSection />
      </ParallaxScroll>
    </ParallaxContainer>
  );
};