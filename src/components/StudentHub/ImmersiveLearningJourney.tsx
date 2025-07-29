import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, Box, Cone, Line } from '@react-three/drei';
import { 
  Play, 
  BookOpen, 
  Award, 
  Users, 
  Brain, 
  Target,
  Lightbulb,
  Rocket,
  Star,
  Zap,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const LearningStage = ({ position, color, icon, title, isActive }: any) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Main sphere */}
        <Sphere 
          args={[0.5, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial 
            color={isActive ? "#ff6b6b" : color}
            emissive={isActive ? "#ff3333" : "#000000"}
            emissiveIntensity={isActive ? 0.3 : 0}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        
        {/* Floating ring */}
        {(hovered || isActive) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.8, 0.05, 16, 100]} />
            <meshStandardMaterial 
              color={color}
              transparent
              opacity={0.6}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        )}
        
        {/* Connecting lines to next stage */}
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      </group>
    </Float>
  );
};

const LearningJourney3D = ({ activeStage }: { activeStage: number }) => {
  const stages = [
    { position: [-6, 0, 0], color: "#4ecdc4", title: "Discover" },
    { position: [-3, 1, 0], color: "#45b7d1", title: "Learn" },
    { position: [0, 0, 0], color: "#96ceb4", title: "Practice" },
    { position: [3, -1, 0], color: "#feca57", title: "Master" },
    { position: [6, 0, 0], color: "#ff6b6b", title: "Achieve" },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#4ecdc4" intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#ff6b6b" intensity={0.5} />
      
      {stages.map((stage, index) => (
        <LearningStage
          key={index}
          position={stage.position}
          color={stage.color}
          title={stage.title}
          isActive={index === activeStage}
        />
      ))}
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export const ImmersiveLearningJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const learningStages = [
    {
      id: 0,
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Discover Your Path",
      description: "AI-powered assessment identifies your unique learning style, strengths, and areas for improvement",
      features: [
        "Comprehensive skill assessment",
        "Learning style analysis",
        "Personalized roadmap creation",
        "Goal setting and planning"
      ],
      stats: "98% accuracy in path prediction",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20"
    },
    {
      id: 1,
      icon: <BookOpen className="w-8 h-8" />,
      title: "Adaptive Learning",
      description: "Dynamic content delivery that adjusts to your pace, with multi-modal learning experiences",
      features: [
        "Interactive video lessons",
        "3D visualizations",
        "Gamified challenges",
        "Real-time difficulty adjustment"
      ],
      stats: "15M+ learning interactions daily",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      id: 2,
      icon: <Target className="w-8 h-8" />,
      title: "Intelligent Practice",
      description: "Smart practice sessions with adaptive questioning and instant feedback mechanisms",
      features: [
        "Adaptive question generation",
        "Mistake pattern analysis",
        "Spaced repetition system",
        "Performance optimization"
      ],
      stats: "89% improvement in retention",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      id: 3,
      icon: <Brain className="w-8 h-8" />,
      title: "Mastery Validation",
      description: "Comprehensive assessment and certification with real-world application scenarios",
      features: [
        "Simulation-based testing",
        "Peer review system",
        "Expert evaluation",
        "Industry-standard certification"
      ],
      stats: "95% employer acceptance rate",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8" />,
      title: "Achievement & Growth",
      description: "Continuous growth tracking with career guidance and community recognition",
      features: [
        "Achievement badges",
        "Career pathway guidance",
        "Community showcase",
        "Lifetime learning support"
      ],
      stats: "78% career advancement rate",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setActiveStage((prev) => (prev + 1) % learningStages.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, learningStages.length]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
      style={{ opacity }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <LearningJourney3D activeStage={activeStage} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90 z-10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
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
            <Rocket className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Immersive Learning Experience</span>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            style={{ y }}
          >
            <span className="gradient-text">Your Learning</span>
            <br />
            <span className="text-foreground">Journey</span>
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience a revolutionary approach to education through our five-stage adaptive learning ecosystem 
            designed to transform how you acquire, practice, and master new skills.
          </motion.p>

          {/* Play Controls */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`
                group flex items-center gap-3 px-8 py-4 rounded-2xl 
                glass backdrop-blur-xl border border-white/10 hover:border-white/20 
                transition-all duration-300 text-lg font-semibold
                ${isPlaying 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                  : 'text-foreground hover:text-primary'
                }
              `}
            >
              <Play className={`w-6 h-6 transition-transform ${isPlaying ? 'scale-110' : ''}`} />
              {isPlaying ? 'Pause Journey' : 'Start Journey'}
            </button>
          </motion.div>
        </motion.div>

        {/* Journey Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stage Content */}
          <motion.div
            key={activeStage}
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`p-8 rounded-3xl ${learningStages[activeStage].bgColor} border border-white/10`}>
              {/* Stage Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${learningStages[activeStage].color} text-white`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {learningStages[activeStage].icon}
                </motion.div>
                
                <div>
                  <motion.div 
                    className="text-sm font-medium text-primary mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Stage {activeStage + 1} of {learningStages.length}
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {learningStages[activeStage].title}
                  </motion.h3>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                className="text-lg text-foreground-secondary mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {learningStages[activeStage].description}
              </motion.p>

              {/* Features List */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {learningStages[activeStage].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold text-foreground">
                  {learningStages[activeStage].stats}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage Navigation */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {learningStages.map((stage, index) => (
              <motion.div
                key={index}
                className={`
                  relative cursor-pointer group transition-all duration-500
                  ${index === activeStage ? 'scale-105' : 'hover:scale-102'}
                `}
                onClick={() => setActiveStage(index)}
                whileHover={{ x: 10 }}
              >
                <div className={`
                  p-6 rounded-2xl glass backdrop-blur-xl border transition-all duration-300
                  ${index === activeStage 
                    ? 'border-primary/50 bg-white/15 shadow-2xl' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }
                `}>
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`
                        flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
                        ${index === activeStage 
                          ? `bg-gradient-to-br ${stage.color} text-white` 
                          : 'bg-white/10 text-foreground-secondary group-hover:bg-white/20'
                        }
                      `}
                      animate={index === activeStage ? { 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {stage.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className={`
                        text-lg font-bold transition-colors duration-300
                        ${index === activeStage ? 'text-primary' : 'text-foreground group-hover:text-primary'}
                      `}>
                        {stage.title}
                      </h4>
                      <p className="text-sm text-foreground-secondary truncate">
                        {stage.description}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                      className={`
                        w-4 h-4 rounded-full transition-all duration-300
                        ${index <= activeStage 
                          ? `bg-gradient-to-r ${stage.color}` 
                          : 'bg-white/20'
                        }
                      `}
                      animate={index === activeStage ? {
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Connection Line */}
                {index < learningStages.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              Begin Your Personalized Journey
            </span>
            <Zap className="w-6 h-6 text-secondary" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};