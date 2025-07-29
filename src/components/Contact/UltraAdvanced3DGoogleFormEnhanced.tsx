import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Plane, Html } from '@react-three/drei';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Sparkles, 
  Zap, 
  Globe,
  Book,
  Users,
  Lightbulb,
  Heart,
  Shield,
  Trophy,
  Rocket,
  Brain,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Floating Particles Component
const FloatingParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        ],
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
        size: Math.random() * 0.1 + 0.05
      });
    }
    return temp;
  });

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.children.forEach((child, index) => {
        child.position.y += Math.sin(clock.getElapsedTime() + index) * 0.001;
        child.rotation.x += 0.01;
        child.rotation.z += 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <Sphere key={index} position={particle.position as [number, number, number]} args={[particle.size]}>
          <meshStandardMaterial color={particle.color} emissive={particle.color} emissiveIntensity={0.3} />
        </Sphere>
      ))}
    </group>
  );
};

// Animated Form Container
const AnimatedFormContainer = ({ children }: { children: React.ReactNode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.1;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[viewport.width * 0.8, viewport.height * 0.9, 0.2]} />
      <meshStandardMaterial 
        color="#1a1a1a" 
        transparent 
        opacity={0.9}
        emissive="#3B82F6"
        emissiveIntensity={0.1}
      />
      <Html
        transform
        distanceFactor={1}
        position={[0, 0, 0.11]}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}
      >
        <div className="w-full max-w-4xl p-8">
          {children}
        </div>
      </Html>
    </mesh>
  );
};

// Background Scene Component
const BackgroundScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      {/* Ambient and Directional Lighting */}
      <ambientLight intensity={0.6} color="#4F46E5" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#3B82F6" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#10B981" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Background Elements */}
      <group ref={groupRef}>
        {[...Array(20)].map((_, i) => (
          <Box 
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 40,
              -20 + Math.random() * -20
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            args={[0.5, 0.5, 0.5]}
          >
            <meshStandardMaterial 
              color={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)]}
              transparent
              opacity={0.3}
            />
          </Box>
        ))}
      </group>
    </>
  );
};

export const UltraAdvanced3DGoogleFormEnhanced: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / (rect.width / 2) * 10);
    mouseY.set((e.clientY - centerY) / (rect.height / 2) * -10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const categories = [
    { value: 'academic', label: 'Academic Support', icon: <Book className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { value: 'technical', label: 'Technical Issues', icon: <Zap className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
    { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
    { value: 'partnership', label: 'Partnership', icon: <Users className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' },
    { value: 'feedback', label: 'Feedback', icon: <Heart className="w-4 h-4" />, color: 'from-red-500 to-rose-500' }
  ];

  const features = [
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", desc: "End-to-end encryption" },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Response", desc: "< 2 hours reply time" },
    { icon: <Globe className="w-6 h-6" />, title: "24/7 Available", desc: "Always here to help" },
    { icon: <Trophy className="w-6 h-6" />, title: "Expert Support", desc: "Qualified professionals" }
  ];

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <BackgroundScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>
        
        <motion.div 
          className="relative z-10 text-center space-y-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl font-bold gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Message Sent Successfully!
          </motion.h2>
          
          <motion.p 
            className="text-xl text-foreground-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Thank you for reaching out! Our expert team will respond within 2 hours.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 text-lg"
            >
              Send Another Message
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 text-lg"
            >
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section 
      id="contact-form" 
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary"
      onMouseMove={handleMouseMove}
    >
      {/* Ultra Modern 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <BackgroundScene />
          <AnimatedFormContainer>
            <div className="relative z-10 max-w-4xl mx-auto">
              {/* Form Content Will Be Rendered Here via HTML in 3D Space */}
            </div>
          </AnimatedFormContainer>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Main Form Container */}
      <motion.div 
        className="relative z-20 w-full max-w-6xl mx-auto"
        style={{ 
          rotateX: rotateX.get(),
          rotateY: rotateY.get(),
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features & Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 mb-2">
                    Ultra Modern Contact
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                    Connect with Excellence
                  </h2>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-xl text-foreground-secondary leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Experience our revolutionary 3D contact system. Get expert support, request study materials, 
                and join our community of <span className="gradient-text font-semibold">50,000+ students</span>.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-4 glassmorphism rounded-xl hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-secondary">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div 
              className="flex items-center justify-between p-6 glassmorphism rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { value: "< 2h", label: "Response Time" },
                { value: "98%", label: "Resolution Rate" },
                { value: "50K+", label: "Happy Students" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-foreground-secondary">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative p-8 glassmorphism rounded-3xl shadow-2xl backdrop-blur-lg border border-primary/20">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary p-[2px]">
                <div className="w-full h-full rounded-3xl bg-background"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    className="inline-flex p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold gradient-text mb-2">Send us a Message</h3>
                  <p className="text-foreground-secondary">We're here to help you succeed!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-foreground">Select Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <motion.button
                          key={category.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: category.value })}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            formData.category === category.value
                              ? `border-primary bg-gradient-to-r ${category.color} text-white`
                              : 'border-border/30 hover:border-primary/50 bg-background/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            {category.icon}
                            <span>{category.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center gap-3"
                      animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.div>
                    
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                      style={{ opacity: 0.3 }}
                    />
                  </motion.button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-foreground-secondary">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>Fast Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Expert Support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Action Elements */}
      <motion.div 
        className="absolute top-20 right-20 hidden lg:block"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity },
          rotate: { duration: 6, repeat: Infinity }
        }}
      >
        <div className="p-4 glassmorphism rounded-2xl">
          <Target className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-20 left-20 hidden lg:block"
        animate={{ 
          x: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          x: { duration: 5, repeat: Infinity },
          scale: { duration: 3, repeat: Infinity }
        }}
      >
        <div className="p-4 glassmorphism rounded-2xl">
          <Lightbulb className="w-8 h-8 text-accent" />
        </div>
      </motion.div>
    </section>
  );
};