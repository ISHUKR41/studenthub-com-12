import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Cylinder, Sphere, Box, MeshDistortMaterial, Environment, Stars, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  TrendingUp,
  Rocket,
  Star,
  CheckCircle2,
  Target,
  Globe,
  Building,
  BookOpen,
  Heart,
  Zap,
  Trophy,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Play
} from 'lucide-react';

// 3D Timeline visualization
const Timeline3DScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <>
      <Environment preset="night" />
      <Stars radius={300} depth={150} count={12000} factor={8} saturation={0} fade />
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 20, 20]} intensity={2} color="#3B82F6" />
      <pointLight position={[-20, -20, -20]} intensity={1.5} color="#10B981" />
      
      <group ref={groupRef}>
        {/* Timeline backbone */}
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Cylinder 
            position={[0, 0, -30]}
            args={[0.2, 0.2, 100, 32]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <MeshDistortMaterial 
              color="#3B82F6"
              transparent={true}
              opacity={0.6}
              distort={0.1}
              speed={1}
              emissive="#1E40AF"
              emissiveIntensity={0.3}
            />
          </Cylinder>
        </Float>
        
        {/* Timeline milestones */}
        {[...Array(8)].map((_, i) => (
          <Float key={`milestone-${i}`} speed={1 + Math.random() * 0.5} rotationIntensity={1} floatIntensity={2}>
            <Sphere 
              position={[
                -40 + (i * 10),
                Math.sin(i) * 5,
                -25 + Math.random() * -20
              ]}
              args={[2 + Math.random(), 32, 32]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 45) % 360}, 80%, 60%)`}
                transparent={true}
                opacity={0.7}
                distort={0.3}
                speed={1.5}
                emissive={`hsl(${(i * 45) % 360}, 80%, 30%)`}
                emissiveIntensity={0.4}
              />
            </Sphere>
          </Float>
        ))}
        
        {/* Achievement markers */}
        {[...Array(12)].map((_, i) => (
          <Float key={`achievement-${i}`} speed={0.8 + Math.random() * 0.4} rotationIntensity={1.2} floatIntensity={1.5}>
            <Box 
              position={[
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 40,
                -15 + Math.random() * -40
              ]}
              args={[Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 1 + 0.3]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 30) % 360}, 75%, 65%)`}
                transparent={true}
                opacity={0.5}
                distort={0.4}
                speed={2}
                wireframe={i % 4 === 0}
              />
            </Box>
          </Float>
        ))}
      </group>
    </>
  );
};

export const EnhancedJourneyTimelineSection: React.FC = () => {
  const [sectionRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const timelineData = [
    {
      year: 2018,
      title: "The Beginning",
      subtitle: "Foundation & Vision",
      description: "STUDENTHUB was founded with a simple yet powerful vision: to democratize quality education for every student in India.",
      achievements: [
        "Platform launched with 100+ study materials",
        "First 1,000 students joined our community",
        "Basic PDF tools introduced",
        "Mobile-responsive design implemented"
      ],
      stats: { users: "1K+", materials: "100+", tools: "5", satisfaction: "95%" },
      icon: <Rocket className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      image: "/placeholder.svg"
    },
    {
      year: 2019,
      title: "Rapid Growth",
      subtitle: "Scaling & Innovation",
      description: "Massive expansion of our platform with advanced tools and comprehensive study resources across multiple domains.",
      achievements: [
        "Reached 100K+ active users",
        "Launched 15+ productivity tools",
        "Introduced university-specific content",
        "WhatsApp support system established"
      ],
      stats: { users: "100K+", materials: "2K+", tools: "15", satisfaction: "97%" },
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      image: "/placeholder.svg"
    },
    {
      year: 2020,
      title: "Digital Revolution",
      subtitle: "Pandemic Response",
      description: "Pivoted quickly to support students during COVID-19, becoming a lifeline for online education and remote learning.",
      achievements: [
        "10M+ users adopted our platform",
        "24/7 support system launched",
        "Live study sessions introduced",
        "Community forums established"
      ],
      stats: { users: "10M+", materials: "5K+", tools: "20", satisfaction: "98%" },
      icon: <Globe className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      image: "/placeholder.svg"
    },
    {
      year: 2021,
      title: "AI Integration",
      subtitle: "Smart Learning",
      description: "Introduced AI-powered features for personalized learning experiences and intelligent content recommendations.",
      achievements: [
        "AI recommendation engine deployed",
        "Personalized study plans launched",
        "50M+ users milestone achieved",
        "Advanced analytics dashboard"
      ],
      stats: { users: "50M+", materials: "10K+", tools: "25", satisfaction: "98.5%" },
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      image: "/placeholder.svg"
    },
    {
      year: 2022,
      title: "Community Power",
      subtitle: "Collaborative Learning",
      description: "Focused on building stronger communities with peer-to-peer learning, study groups, and collaborative features.",
      achievements: [
        "100M+ users community built",
        "Study groups feature launched",
        "Peer tutoring system introduced",
        "Regional language support added"
      ],
      stats: { users: "100M+", materials: "15K+", tools: "30", satisfaction: "99%" },
      icon: <Users className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      image: "/placeholder.svg"
    },
    {
      year: 2023,
      title: "Global Expansion",
      subtitle: "International Reach",
      description: "Expanded beyond India to serve students globally while maintaining our commitment to quality education.",
      achievements: [
        "International markets entered",
        "150M+ global user base",
        "Multi-language platform support",
        "University partnerships established"
      ],
      stats: { users: "150M+", materials: "20K+", tools: "35", satisfaction: "99.2%" },
      icon: <Building className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      image: "/placeholder.svg"
    },
    {
      year: 2024,
      title: "Excellence Today",
      subtitle: "Current Achievements",
      description: "Today, we stand as India's most trusted educational platform, continuously innovating for student success.",
      achievements: [
        "170M+ students empowered",
        "25,000+ study resources available",
        "500+ universities covered",
        "99.8% student satisfaction rate"
      ],
      stats: { users: "170M+", materials: "25K+", tools: "40+", satisfaction: "99.8%" },
      icon: <Trophy className="w-8 h-8" />,
      color: "from-green-500 to-blue-500",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-background-secondary via-background to-background-tertiary">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 80], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
          onError={(error) => console.warn('Timeline 3D error:', error)}
          onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
          fallback={<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />}
        >
          <Timeline3DScene />
        </Canvas>
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/5 left-1/8 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 80, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 16, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/5 right-1/8 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -60, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 4 }}
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
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Calendar className="h-10 w-10 text-white" />
            </motion.div>
            <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Our Journey
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text">
            Timeline of Excellence
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Discover the milestones, achievements, and transformative moments that shaped STUDENTHUB 
            into the educational powerhouse it is today
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-accent to-secondary"></div>
          
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                  <motion.div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} p-1 shadow-2xl`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <div className={`p-2 bg-gradient-to-r ${item.color} rounded-full text-white`}>
                        {item.icon}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                  <Card className="glassmorphism group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                        onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Badge className={`text-2xl font-bold px-4 py-2 bg-gradient-to-r ${item.color} text-white`}>
                            {item.year}
                          </Badge>
                          <div>
                            <h3 className="text-2xl font-bold gradient-text">{item.title}</h3>
                            <p className="text-lg text-accent font-semibold">{item.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-foreground-secondary leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(item.stats).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-background/50 rounded-xl">
                              <div className="text-lg font-bold gradient-text">{value}</div>
                              <div className="text-sm text-foreground-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between group-hover:bg-primary/10 transition-colors"
                        >
                          <span>View Details</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${selectedYear === item.year ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Expanded details */}
                  <AnimatePresence>
                    {selectedYear === item.year && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <Card className="glassmorphism">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-bold mb-4 gradient-text">Key Achievements</h4>
                            <div className="space-y-3">
                              {item.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-foreground-secondary">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future vision */}
        <motion.div 
          className="mt-24 text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="p-12 glassmorphism rounded-3xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-accent to-primary rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30">
                The Future Awaits
              </Badge>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              What's Next?
            </h3>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-8">
              We're just getting started. With cutting-edge AI, immersive technologies, and global expansion plans, 
              the next chapter of STUDENTHUB will redefine educational excellence.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button 
                className="btn-hero bg-gradient-to-r from-accent to-primary px-10 py-4 text-lg group"
                size="lg"
              >
                Join Our Future
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="px-10 py-4 text-lg hover:border-primary group"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};