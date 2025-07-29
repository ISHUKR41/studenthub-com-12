import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Globe, 
  Award,
  Target,
  Heart,
  Lightbulb,
  Play,
  Pause,
  Sparkles,
  Rocket,
  Star,
  Zap
} from 'lucide-react';

interface Enhanced3DAboutHeroProps {
  isPlaying?: boolean;
  onToggleAnimation?: () => void;
}

export const Enhanced3DAboutHero: React.FC<Enhanced3DAboutHeroProps> = ({
  isPlaying = true,
  onToggleAnimation
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    sceneRef.current = scene;

    // Create floating educational elements
    const createEducationElement = (type: string, position: THREE.Vector3, color: number) => {
      let geometry;
      
      switch(type) {
        case 'book':
          geometry = new THREE.BoxGeometry(0.12, 0.18, 0.02);
          break;
        case 'globe':
          geometry = new THREE.SphereGeometry(0.08, 16, 16);
          break;
        case 'star':
          geometry = new THREE.ConeGeometry(0.06, 0.12, 5);
          break;
        case 'target':
          geometry = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16);
          break;
        default:
          geometry = new THREE.OctahedronGeometry(0.06);
      }
      
      const material = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      return mesh;
    };

    const elements: THREE.Mesh[] = [];
    const elementTypes = ['book', 'globe', 'star', 'target', 'crystal'];
    const colors = [0x3B82F6, 0x10B981, 0xF59E0B, 0xEF4444, 0x8B5CF6, 0xF97316, 0x06B6D4];

    for (let i = 0; i < 80; i++) {
      const type = elementTypes[i % elementTypes.length];
      const color = colors[i % colors.length];
      const position = new THREE.Vector3(
        Math.random() * 30 - 15,
        Math.random() * 25 - 12.5,
        Math.random() * 20 - 10
      );
      
      const element = createEducationElement(type, position, color);
      scene.add(element);
      elements.push(element);
    }

    camera.position.z = 15;

    const animate = () => {
      if (!isPlaying) return;
      
      elements.forEach((element, index) => {
        element.rotation.x += 0.005 + (index % 4) * 0.002;
        element.rotation.y += 0.007 + (index % 3) * 0.003;
        element.rotation.z += 0.003 + (index % 2) * 0.002;
        element.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
        element.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.002;
        
        // Add floating motion
        element.position.z += Math.sin(Date.now() * 0.0005 + index) * 0.001;
      });

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isInteracting) return;
      
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x += (x * 2 - camera.position.x) * 0.03;
      camera.position.y += (y * 1.5 - camera.position.y) * 0.03;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying, isInteracting]);

  const achievements = [
    { 
      icon: <BookOpen className="w-8 h-8" />, 
      value: '25,000+', 
      label: 'Question Papers',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      value: '170M+', 
      label: 'Students Helped',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      value: '22+', 
      label: 'Languages',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      value: '99.8%', 
      label: 'Success Rate',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const coreValues = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Accessibility",
      description: "Educational resources for every corner of India"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision & Quality",
      description: "Verified materials from trusted academic sources"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation First",
      description: "Cutting-edge technology for modern learning"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Student-Centric",
      description: "Every decision made with students in mind"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Enhanced 3D Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${
              i % 4 === 0 ? 'from-blue-500 to-cyan-500' :
              i % 4 === 1 ? 'from-green-500 to-emerald-500' :
              i % 4 === 2 ? 'from-purple-500 to-pink-500' :
              'from-yellow-500 to-orange-500'
            } opacity-60`}
            style={{
              left: `${10 + (i % 4) * 20}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Hero Badge */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              <Sparkles className="w-5 h-5 mr-2" />
              Transforming Education Since 2022
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-8">
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                About StudentHub
              </span>
              <motion.span 
                className="block text-4xl md:text-5xl lg:text-6xl text-foreground-secondary mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Empowering Every Student
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              From Class 9 to PhD, we're democratizing access to quality educational resources across India
            </motion.p>
          </div>

          {/* Core Values Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-foreground-secondary">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Achievement Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {achievements.map((stat, index) => (
              <motion.div 
                key={index}
                className="space-y-4 group"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {stat.icon}
                </div>
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-foreground"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(59, 130, 246, 0.8)', '0 0 20px rgba(59, 130, 246, 0.5)']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-foreground-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button 
              size="lg"
              className="btn-hero group px-8 py-4 text-lg"
              onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Discover Our Journey
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </Button>
            
            {onToggleAnimation && (
              <Button 
                variant="outline"
                size="lg"
                onClick={onToggleAnimation}
                className="group px-8 py-4 text-lg hover:shadow-glow transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-3" /> : <Play className="w-5 h-5 mr-3" />}
                {isPlaying ? 'Pause' : 'Play'} 3D Experience
                <motion.div
                  className="ml-2"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              </Button>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};