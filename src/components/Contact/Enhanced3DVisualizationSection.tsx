import React, { useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  Box, 
  Torus, 
  Octahedron, 
  MeshDistortMaterial, 
  Float, 
  Text3D, 
  OrbitControls,
  Stars,
  SpotLight
} from '@react-three/drei';
import * as THREE from 'three';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Globe, 
  Zap, 
  Heart, 
  Shield, 
  Users, 
  Star,
  Sparkles,
  MessageCircle,
  Headphones,
  Clock,
  Award
} from 'lucide-react';

// 3D Floating objects for the scene
const FloatingElements: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#3B82F6"
            metalness={0.8}
            roughness={0}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, -1, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#10B981"
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[0, 3, -1]}>
          <torusGeometry args={[0.6, 0.2, 16, 100]} />
          <meshStandardMaterial
            color="#F59E0B"
            metalness={0.3}
            roughness={0}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, -2, 2]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[3, 2, 3]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#EF4444"
            metalness={0.7}
            roughness={0}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Enhanced 3D Scene Component - Re-enabled with proper error handling
const ContactVisualizationScene: React.FC = () => (
  <Canvas
    camera={{ position: [0, 0, 8], fov: 75 }}
    style={{ background: 'transparent' }}
    dpr={[1, 2]}
    performance={{ min: 0.5 }}
    onError={(error) => console.warn('3D Visualization error:', error)}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingElements />
    </Suspense>
  </Canvas>
);

export const Enhanced3DVisualizationSection: React.FC = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Supporting students worldwide with 24/7 accessibility",
      color: "from-blue-500 to-cyan-500",
      stats: "195+ Countries"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Ultra-fast response times with AI-powered assistance",
      color: "from-yellow-500 to-orange-500",
      stats: "< 2 Seconds"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student-Centric",
      description: "Every feature designed with students' needs in mind",
      color: "from-red-500 to-pink-500",
      stats: "100% Focus"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Enterprise-grade security for your data protection",
      color: "from-green-500 to-emerald-500",
      stats: "256-bit SSL"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Team",
      description: "Dedicated support from education professionals",
      color: "from-purple-500 to-violet-500",
      stats: "50+ Experts"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Top Rated",
      description: "Consistently rated #1 by students and educators",
      color: "from-indigo-500 to-blue-500",
      stats: "4.9/5 Rating"
    }
  ];

  const supportChannels = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Real-time support with instant responses",
      availability: "24/7 Available",
      responseTime: "< 30 seconds",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Voice Support",
      description: "Direct phone support for complex issues",
      availability: "Mon-Fri 9AM-6PM",
      responseTime: "Immediate",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Scheduled Calls",
      description: "Book personalized consultation sessions",
      availability: "Flexible Timing",
      responseTime: "Same Day",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Support",
      description: "Priority support with dedicated specialists",
      availability: "VIP Access",
      responseTime: "Priority Queue",
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* 3D Scene Background */}
      <div className="absolute inset-0 opacity-20">
        <ContactVisualizationScene />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Why Choose STUDENTHUB?
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            Excellence in Every Interaction
          </h2>
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Experience the future of educational support with our cutting-edge technology, 
            dedicated experts, and unwavering commitment to student success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full glassmorphism border-2 border-border/30 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <CardContent className="p-8 relative z-10">
                  <div className="space-y-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-3 gradient-text">{feature.title}</h3>
                      <p className="text-foreground-secondary leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                          {feature.stats}
                        </Badge>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Star className="w-4 h-4 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold gradient-text mb-4">Multiple Ways to Connect</h3>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Choose your preferred communication method for the best support experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="group cursor-pointer"
              >
                <Card className="h-full glassmorphism border-2 border-border/30 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className={`inline-flex p-3 rounded-xl ${channel.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {channel.icon}
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold mb-2">{channel.title}</h4>
                        <p className="text-sm text-foreground-secondary mb-4">
                          {channel.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-foreground-secondary">Availability:</span>
                            <span className="font-medium text-primary">{channel.availability}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-foreground-secondary">Response:</span>
                            <span className="font-medium text-secondary">{channel.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};