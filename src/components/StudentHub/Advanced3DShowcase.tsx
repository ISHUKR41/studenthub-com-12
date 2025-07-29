import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Brain, Cpu, Zap, Target, Users, Globe, BookOpen, TrendingUp } from 'lucide-react';

const AnimatedSphere = ({ position, color, scale }: any) => {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#0080ff" intensity={0.5} />
      
      <AnimatedSphere position={[-3, 0, 0]} color="#ff6b6b" scale={0.8} />
      <AnimatedSphere position={[0, 2, -2]} color="#4ecdc4" scale={1} />
      <AnimatedSphere position={[3, -1, 1]} color="#45b7d1" scale={0.9} />
      <AnimatedSphere position={[0, -2, 0]} color="#96ceb4" scale={0.7} />
      <AnimatedSphere position={[-2, 1, 2]} color="#feca57" scale={0.6} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export const Advanced3DShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning Engine",
      description: "Advanced machine learning algorithms adapt to your learning style and pace in real-time",
      stats: "98.5% accuracy",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Neural Network Analysis",
      description: "Deep learning models analyze your performance patterns to optimize study plans",
      stats: "10M+ data points",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Targeting",
      description: "Identify knowledge gaps with surgical precision using advanced analytics",
      stats: "95% efficiency",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Performance",
      description: "Sub-second response times with edge computing and optimized algorithms",
      stats: "<100ms latency",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Intelligence",
      description: "Connect with global learning networks and peer-to-peer knowledge sharing",
      stats: "15M+ connections",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Accessibility",
      description: "Multi-language support with cultural adaptation for localized learning",
      stats: "50+ languages",
      color: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
      style={{ opacity }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 z-10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass backdrop-blur-xl border border-white/10 mb-8"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(120, 119, 198, 0.3)",
                "0 0 30px rgba(255, 119, 198, 0.4)",
                "0 0 20px rgba(120, 119, 198, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Next-Generation Technology</span>
            <Zap className="w-4 h-4 text-primary" />
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            style={{ y }}
          >
            <span className="gradient-text">Advanced</span>
            <br />
            <span className="text-foreground">Learning Ecosystem</span>
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the convergence of artificial intelligence, quantum computing, and immersive technologies 
            that power the most advanced educational platform ever created.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                rotateY: 0 
              } : { 
                opacity: 0, 
                y: 50, 
                rotateY: -15 
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8 + index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50
              }}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <div className="relative glass p-8 rounded-3xl backdrop-blur-xl border border-white/10 h-full overflow-hidden group-hover:border-white/20 transition-all duration-500">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ rotateZ: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  
                  {/* Floating particles around icon */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/60 rounded-full"
                        style={{
                          left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 30}px`,
                          top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}px`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-foreground-secondary mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <span className="text-sm font-semibold text-primary">
                    {feature.stats}
                  </span>
                  <motion.div
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              Explore Advanced Features
            </span>
            <TrendingUp className="w-6 h-6 text-secondary" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};