import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Float, Text3D, useTexture, Sphere, Box, Torus, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Sparkles, 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Zap,
  Globe,
  Shield,
  Heart,
  Rocket
} from 'lucide-react';

// Advanced 3D Floating Elements
const FloatingGeometry = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.02 * speed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <dodecahedronGeometry args={[0.5]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Particle System for Enhanced Visual Effects
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#3B82F6" size={0.02} transparent opacity={0.6} />
    </points>
  );
};

// 3D Scene Component
const Enhanced3DScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#10B981" intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} color="#F59E0B" />

      {/* Particle Field */}
      <ParticleField />

      {/* Floating Geometric Elements */}
      <FloatingGeometry position={[-4, 2, -2]} color="#3B82F6" speed={0.8} />
      <FloatingGeometry position={[4, -1, -3]} color="#10B981" speed={1.2} />
      <FloatingGeometry position={[2, 3, -1]} color="#F59E0B" speed={1.0} />
      <FloatingGeometry position={[-3, -2, -4]} color="#EF4444" speed={0.9} />
      <FloatingGeometry position={[0, -3, -2]} color="#8B5CF6" speed={1.1} />

      {/* Central Ring Structure */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[2, 0.1, 16, 100]} position={[0, 0, -5]}>
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.3} />
        </Torus>
      </Float>

      {/* Background Sphere */}
      <Sphere args={[15]} position={[0, 0, -10]}>
        <meshBasicMaterial color="#0F172A" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
    </>
  );
};

export const UltraModern3DGoogleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 25);
    mouseY.set((e.clientY - centerY) / 25);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'general'
      });
    }, 3000);
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
      borderColor: "rgb(59, 130, 246)",
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 0 0px rgba(59, 130, 246, 0)",
      borderColor: "rgba(255, 255, 255, 0.1)",
    }
  };

  const serviceTypes = [
    { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-4 h-4" />, color: 'bg-blue-500' },
    { value: 'academic', label: 'Academic Support', icon: <Star className="w-4 h-4" />, color: 'bg-green-500' },
    { value: 'technical', label: 'Technical Issues', icon: <Zap className="w-4 h-4" />, color: 'bg-yellow-500' },
    { value: 'partnership', label: 'Partnerships', icon: <Globe className="w-4 h-4" />, color: 'bg-purple-500' },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: <Heart className="w-4 h-4" />, color: 'bg-pink-500' },
    { value: 'urgent', label: 'Urgent Support', icon: <Rocket className="w-4 h-4" />, color: 'bg-red-500' }
  ];

  return (
    <section className="py-32 px-4 bg-background relative overflow-hidden min-h-screen">
      {/* Ultra-Advanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Enhanced3DScene />
        </Canvas>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 z-1">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-6 mb-12">
            <motion.div 
              className="p-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="h-12 w-12 text-white" />
            </motion.div>
            <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Ultra-Modern Contact Experience
            </Badge>
          </div>
          
          <motion.h2 
            className="text-6xl md:text-8xl font-bold gradient-text leading-tight"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience the future of communication with our revolutionary 3D contact form. 
            Your message matters, and we're here to help you succeed.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Enhanced Contact Information */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Card className="glassmorphism p-8 hover:shadow-2xl transition-all duration-500">
              <CardContent className="space-y-8">
                <div className="text-center space-y-4">
                  <motion.div
                    className="inline-flex p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MessageSquare className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold gradient-text">Contact Information</h3>
                  <p className="text-foreground-secondary">Multiple ways to reach our expert team</p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: <Mail className="w-6 h-6" />, label: 'Email Support', value: 'support@studenthub.com', color: 'from-blue-500 to-cyan-500' },
                    { icon: <Phone className="w-6 h-6" />, label: 'Phone Support', value: '+91 98765 43210', color: 'from-green-500 to-emerald-500' },
                    { icon: <MessageSquare className="w-6 h-6" />, label: 'WhatsApp', value: '+91 98765 43210', color: 'from-green-600 to-green-400' },
                    { icon: <MapPin className="w-6 h-6" />, label: 'Address', value: 'Mumbai, Maharashtra, India', color: 'from-purple-500 to-pink-500' }
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-2xl glassmorphism hover:shadow-lg transition-all duration-300 group"
                      whileHover={{ x: 10, scale: 1.02 }}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${contact.color} text-white group-hover:scale-110 transition-transform`}>
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{contact.label}</div>
                        <div className="text-foreground-secondary">{contact.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Response Time Indicators */}
                <div className="space-y-4 pt-6 border-t border-border/30">
                  <h4 className="font-semibold text-xl text-center gradient-text">Response Times</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Email', time: '24-48h', color: 'bg-blue-500' },
                      { label: 'WhatsApp', time: '< 2h', color: 'bg-green-500' },
                      { label: 'Phone', time: 'Instant', color: 'bg-purple-500' },
                      { label: 'Urgent', time: '< 30m', color: 'bg-red-500' }
                    ].map((response, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-3 rounded-xl glassmorphism"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-3 h-3 ${response.color} rounded-full mx-auto mb-2`}></div>
                        <div className="font-medium text-sm">{response.label}</div>
                        <div className="text-xs text-foreground-secondary">{response.time}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ultra-Enhanced 3D Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            style={{
              perspective: "1000px",
            }}
          >
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              <Card className="glassmorphism p-10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <CardContent className="relative z-10">
                  <AnimatePresence mode="wait">
                    {showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-center space-y-8 py-20"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360, 0],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                          className="inline-flex p-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        >
                          <Shield className="w-16 h-16 text-white" />
                        </motion.div>
                        <h3 className="text-4xl font-bold gradient-text">Message Sent Successfully!</h3>
                        <p className="text-xl text-foreground-secondary">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                      >
                        <div className="text-center space-y-4 mb-12">
                          <motion.div
                            className="inline-flex p-4 bg-gradient-to-r from-primary to-accent rounded-2xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Send className="w-8 h-8 text-white" />
                          </motion.div>
                          <h3 className="text-4xl font-bold gradient-text">Send Us a Message</h3>
                          <p className="text-foreground-secondary text-lg">Fill out the form below and we'll respond promptly</p>
                        </div>

                        {/* Service Type Selection */}
                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">What can we help you with?</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {serviceTypes.map((service) => (
                              <motion.div
                                key={service.value}
                                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                  formData.serviceType === service.value
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFormData({ ...formData, serviceType: service.value })}
                              >
                                <div className="flex flex-col items-center text-center space-y-2">
                                  <div className={`p-2 rounded-lg ${service.color} text-white`}>
                                    {service.icon}
                                  </div>
                                  <span className="text-sm font-medium">{service.label}</span>
                                </div>
                                {formData.serviceType === service.value && (
                                  <motion.div
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                  >
                                    <Star className="w-3 h-3 text-white" />
                                  </motion.div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid md:grid-cols-2 gap-8">
                          <motion.div 
                            className="space-y-3"
                            variants={inputVariants}
                            animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                          >
                            <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                              <User className="w-5 h-5 text-primary" />
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Enter your full name"
                              className="h-14 text-lg bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                              required
                            />
                          </motion.div>

                          <motion.div 
                            className="space-y-3"
                            variants={inputVariants}
                            animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                          >
                            <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                              <Mail className="w-5 h-5 text-primary" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Enter your email address"
                              className="h-14 text-lg bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                              required
                            />
                          </motion.div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <motion.div 
                            className="space-y-3"
                            variants={inputVariants}
                            animate={focusedField === 'phone' ? 'focused' : 'unfocused'}
                          >
                            <Label htmlFor="phone" className="text-lg font-semibold flex items-center gap-2">
                              <Phone className="w-5 h-5 text-primary" />
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Enter your phone number"
                              className="h-14 text-lg bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                            />
                          </motion.div>

                          <motion.div 
                            className="space-y-3"
                            variants={inputVariants}
                            animate={focusedField === 'subject' ? 'focused' : 'unfocused'}
                          >
                            <Label htmlFor="subject" className="text-lg font-semibold flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-primary" />
                              Subject *
                            </Label>
                            <Input
                              id="subject"
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              onFocus={() => setFocusedField('subject')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Brief subject of your message"
                              className="h-14 text-lg bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                              required
                            />
                          </motion.div>
                        </div>

                        <motion.div 
                          className="space-y-3"
                          variants={inputVariants}
                          animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                        >
                          <Label htmlFor="message" className="text-lg font-semibold flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Your Message *
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Tell us how we can help you. Be as detailed as you'd like!"
                            className="min-h-[150px] text-lg bg-background/50 border-border/50 focus:border-primary transition-all duration-300 resize-none"
                            required
                          />
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary-dark hover:via-secondary hover:to-accent-glow transition-all duration-500 relative overflow-hidden group"
                          >
                            {/* Animated background effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            <AnimatePresence mode="wait">
                              {isSubmitting ? (
                                <motion.div
                                  key="submitting"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  className="flex items-center gap-3"
                                >
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  >
                                    <Sparkles className="w-6 h-6" />
                                  </motion.div>
                                  Sending Message...
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="send"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  className="flex items-center gap-3"
                                >
                                  <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                  Send Message
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>

                        <div className="text-center text-sm text-foreground-secondary pt-4">
                          <p>
                            By sending this message, you agree to our{' '}
                            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>{' '}
                            and{' '}
                            <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
                          </p>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Interactive Elements */}
        <motion.div 
          className="mt-20 text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold gradient-text">Why Choose STUDENTHUB Support?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'Quick response times', color: 'from-yellow-500 to-orange-500' },
              { icon: <Shield className="w-8 h-8" />, title: 'Secure & Private', desc: 'Your data is protected', color: 'from-green-500 to-emerald-500' },
              { icon: <Heart className="w-8 h-8" />, title: 'Personal Touch', desc: 'Human-centered support', color: 'from-pink-500 to-rose-500' },
              { icon: <Globe className="w-8 h-8" />, title: '24/7 Available', desc: 'Always here to help', color: 'from-blue-500 to-cyan-500' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 glassmorphism text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-foreground-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};