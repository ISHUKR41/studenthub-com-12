import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Environment, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Globe, 
  Shield, 
  Heart, 
  Lightbulb,
  ChevronRight,
  Play,
  Pause,
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
  ChevronDown,
  Search,
  Rocket,
  Zap,
  Trophy,
  Clock
} from 'lucide-react';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Advanced 3D Floating Elements
const FloatingEducationElement = ({ position, type }: { position: [number, number, number], type: 'book' | 'star' | 'brain' | 'trophy' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const getGeometry = () => {
    switch(type) {
      case 'book':
        return <boxGeometry args={[0.4, 0.6, 0.08]} />;
      case 'star':
        return <coneGeometry args={[0.3, 0.6, 5]} />;
      case 'brain':
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case 'trophy':
        return <cylinderGeometry args={[0.2, 0.3, 0.5, 8]} />;
      default:
        return <boxGeometry args={[0.3, 0.3, 0.3]} />;
    }
  };

  const getColor = () => {
    switch(type) {
      case 'book': return '#3B82F6';
      case 'star': return '#F59E0B';
      case 'brain': return '#10B981';
      case 'trophy': return '#EF4444';
      default: return '#8B5CF6';
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {getGeometry()}
        <meshStandardMaterial 
          color={getColor()} 
          metalness={0.6} 
          roughness={0.2}
          emissive={getColor()}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Enhanced 3D Scene
const Enhanced3DAboutScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} color="#4F46E5" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#3B82F6" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#10B981" />
      <spotLight position={[0, 20, 10]} intensity={0.5} angle={0.3} penumbra={1} color="#F59E0B" />
      
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Floating Educational Elements */}
      <group ref={groupRef}>
        <FloatingEducationElement position={[-5, 2, -3]} type="book" />
        <FloatingEducationElement position={[5, -1, -2]} type="star" />
        <FloatingEducationElement position={[-2, -3, -4]} type="brain" />
        <FloatingEducationElement position={[3, 3, -5]} type="trophy" />
        <FloatingEducationElement position={[0, -4, -3]} type="book" />
        <FloatingEducationElement position={[-6, 0, -6]} type="star" />
        <FloatingEducationElement position={[6, 2, -7]} type="brain" />
        <FloatingEducationElement position={[0, 4, -8]} type="trophy" />
      </group>
    </>
  );
};

export const MegaEnhancedAboutPage: React.FC = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAnimation = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
  };

  const heroStats = [
    { 
      icon: <BookOpen className="w-8 h-8" />, 
      value: "25,000+", 
      label: "Question Papers",
      description: "Comprehensive collection across all major exams",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      value: "170M+", 
      label: "Students Served",
      description: "Growing community of learners nationwide",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Download className="w-8 h-8" />, 
      value: "50M+", 
      label: "Downloads",
      description: "Materials downloaded by students",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Languages className="w-8 h-8" />, 
      value: "22+", 
      label: "Languages",
      description: "Supporting diverse linguistic needs",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const coreValues = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Accessibility",
      description: "Breaking barriers to education across India and beyond, ensuring every student has access to quality resources.",
      features: ["22+ Regional Languages", "Rural Area Coverage", "Offline Access Support"]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Quality Assurance",
      description: "Rigorously verified content from trusted educational institutions and expert academic reviewers.",
      features: ["Expert Verification", "Regular Updates", "Quality Control"]
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Innovation First",
      description: "Cutting-edge AI/ML technologies and interactive 3D tools for modern, engaging learning experiences.",
      features: ["AI-Powered Search", "3D Visualizations", "Smart Recommendations"]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Driven",
      description: "Built by students, for students, with active peer support networks and collaborative learning.",
      features: ["Study Groups", "Peer Support", "Collaborative Learning"]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Student-Centric",
      description: "Every decision is made with student success in mind, prioritizing user experience and learning outcomes.",
      features: ["User-First Design", "Feedback Integration", "Continuous Improvement"]
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Future Ready",
      description: "Preparing students for tomorrow's challenges with next-generation educational tools and methodologies.",
      features: ["Emerging Tech", "Industry Alignment", "Future Skills"]
    }
  ];

  const timeline = [
    { 
      year: "2022", 
      quarter: "Q1",
      event: "StudentHub Foundation", 
      description: "Launched with 1,000 curated question papers and a vision to democratize education",
      stats: "1K Papers • 10K Users",
      milestone: "Genesis",
      color: "from-blue-500 to-purple-500"
    },
    { 
      year: "2022", 
      quarter: "Q4",
      event: "Rapid Growth Phase", 
      description: "Expanded to 5,000 papers and introduced multi-language support",
      stats: "5K Papers • 100K Users • 5 Languages",
      milestone: "Expansion",
      color: "from-purple-500 to-pink-500"
    },
    { 
      year: "2023", 
      quarter: "Q2",
      event: "Major Milestone", 
      description: "Reached 10,000+ papers and 50 million users, becoming India's fastest-growing platform",
      stats: "10K Papers • 50M Users • 12 Languages",
      milestone: "Breakthrough",
      color: "from-pink-500 to-red-500"
    },
    { 
      year: "2023", 
      quarter: "Q4",
      event: "Technology Revolution", 
      description: "Introduced AI-powered tools, smart search, and interactive 3D visualizations",
      stats: "15K Papers • 100M Users • AI Features",
      milestone: "Innovation",
      color: "from-red-500 to-orange-500"
    },
    { 
      year: "2024", 
      quarter: "Q2",
      event: "Global Recognition", 
      description: "Expanded to 22 languages and launched comprehensive tool ecosystem",
      stats: "20K Papers • 150M Users • 22 Languages",
      milestone: "Recognition",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      year: "2024", 
      quarter: "Q4",
      event: "Current Excellence", 
      description: "Achieved 170M users with 25,000+ papers and industry-leading features",
      stats: "25K Papers • 170M Users • Complete Ecosystem",
      milestone: "Excellence",
      color: "from-yellow-500 to-green-500"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Ananya Sharma",
      role: "Founder & CEO",
      quote: "Education should be accessible to everyone, everywhere, without barriers.",
      expertise: "Educational Technology • 15+ years",
      achievements: ["PhD in Education Technology", "Former MIT Research Fellow", "Published 50+ Research Papers"],
      image: "👩‍💼"
    },
    {
      name: "Rajesh Kumar",
      role: "Chief Technology Officer",
      quote: "Technology has the power to revolutionize how students learn and grow.",
      expertise: "AI/ML • Full-Stack Development",
      achievements: ["Ex-Google Senior Engineer", "AI Research Specialist", "Open Source Contributor"],
      image: "👨‍💻"
    },
    {
      name: "Priya Patel",
      role: "Head of Content & Academics",
      quote: "Quality content is the foundation of transformational education.",
      expertise: "Curriculum Design • Academic Research",
      achievements: ["M.Ed from Oxford", "Curriculum Expert", "Academic Publisher"],
      image: "👩‍🏫"
    },
    {
      name: "Amit Singh",
      role: "Community & Growth Manager",
      quote: "Building bridges between students across diverse backgrounds and regions.",
      expertise: "Community Building • Digital Marketing",
      achievements: ["Growth Hacking Expert", "Community Builder", "Social Impact Leader"],
      image: "👨‍🤝‍👨"
    },
    {
      name: "Dr. Kavya Nair",
      role: "Head of Quality Assurance",
      quote: "Every paper we upload can change a student's future trajectory.",
      expertise: "Educational Assessment • Quality Control",
      achievements: ["PhD in Assessment", "Quality Assurance Expert", "Educational Consultant"],
      image: "👩‍🔬"
    },
    {
      name: "Vikash Yadav",
      role: "Student Success Manager",
      quote: "Students succeed when they have the right tools, support, and guidance.",
      expertise: "Student Psychology • Success Coaching",
      achievements: ["Student Success Expert", "Psychology Graduate", "Mentor to 1000+ Students"],
      image: "👨‍🎓"
    }
  ];

  const impactStories = [
    {
      name: "Rahul Verma",
      location: "Rural Maharashtra",
      exam: "JEE Main 2024 - AIR 2,847",
      story: "From a village with no internet café to IIT admission - StudentHub's offline-capable app and comprehensive PYQ collection made the impossible possible.",
      achievement: "IIT Bombay Computer Science",
      image: "🎓"
    },
    {
      name: "Sneha Agarwal",
      location: "Jaipur, Rajasthan",
      exam: "NEET 2024 - AIR 1,245",
      story: "Multi-language support in Hindi helped me understand complex biology concepts better than English-only materials ever could.",
      achievement: "AIIMS Delhi MBBS",
      image: "👩‍⚕️"
    },
    {
      name: "Arjun Kumar",
      location: "Delhi",
      exam: "UPSC CSE 2023 - Rank 67",
      story: "The comprehensive material collection and community support saved me ₹2,00,000 in coaching fees and 8 months of preparation time.",
      achievement: "IAS Officer",
      image: "👨‍💼"
    }
  ];

  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          {isAnimationPlaying && <Enhanced3DAboutScene />}
        </Canvas>
      </div>

      {/* Mega Hero Section */}
      <ParallaxScroll speed={0.5} direction="up">
        <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full opacity-30"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0 
                }}
                animate={{ 
                  y: [null, -100],
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="text-center space-y-12 max-w-7xl mx-auto relative z-10">
            {/* Achievement Badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { icon: <Award className="w-5 h-5" />, text: "#1 Student Platform", color: "text-yellow-400" },
                { icon: <Trophy className="w-5 h-5" />, text: "Excellence Award 2024", color: "text-blue-400" },
                { icon: <Star className="w-5 h-5" />, text: "4.9★ Rating", color: "text-green-400" },
                { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast", color: "text-purple-400" }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-6 py-3 rounded-full glassmorphism border border-border/20 hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className={badge.color}>{badge.icon}</span>
                  <span className="text-sm font-medium text-foreground-secondary">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Heading */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold gradient-text leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Transforming
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Education
                </span>
                <span className="block text-5xl md:text-6xl lg:text-7xl">for 170M+ Students</span>
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl text-foreground-secondary max-w-5xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                From a simple idea to India's largest educational platform, 
                we're revolutionizing how students access quality education and achieve their dreams.
              </motion.p>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative p-8 rounded-3xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  {/* Gradient Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <div className="w-full h-full rounded-3xl bg-background"></div>
                  </div>
                  
                  <div className="relative z-10 text-center space-y-4">
                    <motion.div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {stat.icon}
                    </motion.div>
                    
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold gradient-text"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                      <div className="text-sm text-foreground-secondary">{stat.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.button
                className="group relative px-10 py-5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl font-semibold text-xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  Explore Our Journey
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>

              <motion.button
                className="group px-10 py-5 border-2 border-primary text-primary rounded-2xl font-semibold text-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAnimation}
              >
                {isAnimationPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isAnimationPlaying ? 'Pause' : 'Play'} Animation
              </motion.button>
            </motion.div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Interactive Timeline Section */}
      <ParallaxScroll speed={0.3} direction="down">
        <section className="py-32 px-4 bg-gradient-to-br from-background-secondary/50 to-background-tertiary/50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center space-y-8 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="text-lg px-8 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                Our Evolution Story
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold gradient-text">Journey to Excellence</h2>
              <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
                From humble beginnings to revolutionizing education for millions
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary opacity-30"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div 
                      className="space-y-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Badge className={`bg-gradient-to-r ${item.color} text-white px-4 py-2`}>
                        {item.quarter} {item.year} • {item.milestone}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground">{item.event}</h3>
                      <p className="text-foreground-secondary text-lg leading-relaxed">{item.description}</p>
                      <div className="text-sm font-semibold text-primary">{item.stats}</div>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Node */}
                  <motion.div 
                    className="relative z-10 w-2/12 flex justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}></div>
                  </motion.div>
                  
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Enhanced Core Values */}
      <ParallaxScroll speed={0.4} direction="up">
        <section className="py-32 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center space-y-8 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="text-lg px-8 py-3 bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border-secondary/30">
                Core Values & Principles
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold gradient-text">What Drives Us</h2>
              <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
                Six fundamental principles that guide everything we do
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-3xl glassmorphism hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <motion.div 
                      className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {value.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold gradient-text">{value.title}</h3>
                    <p className="text-foreground-secondary leading-relaxed">{value.description}</p>
                    
                    <div className="space-y-2">
                      {value.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm text-foreground-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Enhanced Team Section */}
      <ParallaxScroll speed={0.2} direction="down">
        <section className="py-32 px-4 bg-gradient-to-br from-background-secondary to-background-tertiary">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center space-y-8 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="text-lg px-8 py-3 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30">
                Meet Our Visionaries
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold gradient-text">The Dream Team</h2>
              <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
                Passionate leaders driving educational transformation
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-3xl glassmorphism hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="text-center space-y-6">
                    <div className="text-6xl">{member.image}</div>
                    <div>
                      <h3 className="text-2xl font-bold gradient-text">{member.name}</h3>
                      <p className="text-accent font-medium">{member.role}</p>
                    </div>
                    
                    <blockquote className="text-foreground-secondary italic">
                      "{member.quote}"
                    </blockquote>
                    
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-primary">{member.expertise}</p>
                      <div className="space-y-1">
                        {member.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-foreground-secondary">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Impact Stories */}
      <ParallaxScroll speed={0.3} direction="up">
        <section className="py-32 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center space-y-8 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="text-lg px-8 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-500 border-green-500/30">
                Student Success Stories
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold gradient-text">Real Impact, Real Dreams</h2>
              <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
                Stories of transformation that inspire us every day
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {impactStories.map((story, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-3xl glassmorphism hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{story.image}</div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{story.name}</h3>
                        <p className="text-sm text-foreground-secondary">{story.location}</p>
                      </div>
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      {story.exam}
                    </Badge>
                    
                    <blockquote className="text-foreground-secondary leading-relaxed">
                      "{story.story}"
                    </blockquote>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-primary">{story.achievement}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </ParallaxContainer>
  );
};