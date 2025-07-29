import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Box, Torus, Text3D, Float, OrbitControls, Environment, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Sparkles as SparklesIcon, 
  MessageSquare, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  Star,
  Zap,
  Globe,
  Shield,
  Heart,
  BookOpen,
  Target
} from 'lucide-react';

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
  scale: number;
}

const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ position, color, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} position={position} scale={scale}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Sphere>
    </Float>
  );
};

const Floating3DElements: React.FC = () => {
  return (
    <>
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10B981" />
      
      {/* Floating spheres */}
      <AnimatedSphere position={[-3, 2, 0]} color="#3B82F6" scale={0.5} />
      <AnimatedSphere position={[3, -1, 1]} color="#10B981" scale={0.3} />
      <AnimatedSphere position={[0, 3, -2]} color="#F59E0B" scale={0.4} />
      <AnimatedSphere position={[-2, -2, 1]} color="#EF4444" scale={0.3} />
      <AnimatedSphere position={[2, 1, -1]} color="#8B5CF6" scale={0.4} />
      
      {/* Floating geometric shapes */}
      <Float speed={1} rotationIntensity={1} floatIntensity={0.8}>
        <Box position={[-4, 0, 2]} scale={0.3}>
          <meshStandardMaterial color="#3B82F6" transparent opacity={0.7} />
        </Box>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <Torus position={[4, 2, -1]} scale={0.2} args={[1, 0.3, 16, 32]}>
          <meshStandardMaterial color="#10B981" transparent opacity={0.6} />
        </Torus>
      </Float>
      
      {/* Sparkles effect */}
      <Sparkles count={100} scale={[10, 10, 10]} size={2} speed={0.3} />
    </>
  );
};

const FormField: React.FC<{
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  delay: number;
}> = ({ icon, label, type, placeholder, required = false, delay }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <motion.div
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isFocused || hasValue ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.div>
        </div>
        
        <motion.input
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full h-16 pl-16 pr-6 py-4 bg-background/50 backdrop-blur-md border-2 border-border/30 rounded-2xl text-lg transition-all duration-300 focus:border-primary focus:bg-background/80 focus:outline-none placeholder:text-muted-foreground"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
          }}
          onChange={(e) => setHasValue(!!e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />
        
        <motion.label
          className={`absolute left-16 transition-all duration-300 pointer-events-none ${
            isFocused || hasValue 
              ? 'top-2 text-xs text-primary font-medium' 
              : 'top-1/2 transform -translate-y-1/2 text-base text-muted-foreground'
          }`}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </motion.label>
        
        {/* Floating particles effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: '50%',
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const Ultimate3DGoogleFormEnhanced = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const supportFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "100% Secure", desc: "Your data is protected" },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Response", desc: "Quick replies guaranteed" },
    { icon: <Globe className="w-6 h-6" />, title: "24/7 Available", desc: "Round the clock support" },
    { icon: <Heart className="w-6 h-6" />, title: "Student First", desc: "Prioritizing your success" },
  ];

  return (
    <div ref={containerRef} className="relative py-20 px-4 overflow-hidden">
      {/* Animated background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary"
        style={{ y }}
      />
      
      {/* Enhanced 3D background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity, scale }}
      >
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <SparklesIcon className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Ultra-Advanced Contact Form
            </Badge>
          </div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            Get in Touch
          </motion.h2>
          
          <motion.p 
            className="text-xl text-foreground-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience our revolutionary 3D contact form powered by advanced animations and AI-driven interactions
          </motion.p>

          {/* Support features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-xl glassmorphism group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-foreground-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 3D Scene */}
          <motion.div
            className="relative h-[600px] rounded-3xl overflow-hidden glassmorphism"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Temporarily disabled 3D Canvas to fix error */}
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />
            
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div 
                className="text-center space-y-6 glassmorphism p-8 rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <BookOpen className="w-16 h-16 text-primary mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold">Interactive 3D Experience</h3>
                <p className="text-foreground-secondary">
                  Our advanced form integrates seamlessly with immersive 3D elements for an unforgettable user experience
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glassmorphism border-primary/20 overflow-hidden">
              <CardContent className="p-8">
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <FormField
                    icon={<User className="w-5 h-5" />}
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    delay={0.1}
                  />
                  
                  <FormField
                    icon={<Mail className="w-5 h-5" />}
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    required
                    delay={0.2}
                  />
                  
                  <FormField
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    delay={0.3}
                  />
                  
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-4 top-4 z-10">
                      <div className="p-2 bg-muted rounded-lg group-focus-within:bg-primary group-focus-within:text-white transition-colors duration-300">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <textarea
                      placeholder="How can we help you? Share your questions, feedback, or requests..."
                      rows={5}
                      required
                      className="w-full pl-16 pr-6 py-4 bg-background/50 backdrop-blur-md border-2 border-border/30 rounded-2xl text-lg transition-all duration-300 focus:border-primary focus:bg-background/80 focus:outline-none placeholder:text-muted-foreground resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting || submitSuccess}
                      className="w-full h-16 text-lg bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-2xl disabled:opacity-50 relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center gap-3"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Your Message...
                        </motion.div>
                      ) : submitSuccess ? (
                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                        >
                          <Star className="w-6 h-6" />
                          Message Sent Successfully!
                        </motion.div>
                      ) : (
                        <motion.div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Send Message
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};