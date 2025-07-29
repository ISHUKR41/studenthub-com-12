import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text3D, 
  Center, 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Box, 
  Torus, 
  Environment, 
  OrbitControls,
  useTexture,
  Plane,
  RoundedBox,
  Cylinder
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  Building,
  FileText,
  Star,
  Sparkles,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  Users,
  Heart,
  Target,
  Rocket,
  Book,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// 3D Form Scene Components
const FloatingIcon = ({ position, icon, color, scale = 1 }: {
  position: [number, number, number];
  icon: string;
  color: string;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  const getGeometry = () => {
    switch (icon) {
      case 'sphere': return <Sphere ref={meshRef} position={position} scale={scale} args={[0.5, 32, 32]} />;
      case 'box': return <RoundedBox ref={meshRef} position={position} scale={scale} args={[0.8, 0.8, 0.8]} radius={0.1} />;
      case 'torus': return <Torus ref={meshRef} position={position} scale={scale} args={[0.6, 0.3, 16, 100]} />;
      case 'cylinder': return <Cylinder ref={meshRef} position={position} scale={scale} args={[0.4, 0.4, 1, 16]} />;
      default: return <Sphere ref={meshRef} position={position} scale={scale} args={[0.5, 32, 32]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {getGeometry()}
    </Float>
  );
};

const FormParticles = ({ count = 50 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i] * 0.01) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.15}
        sizeAttenuation={true}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

const ContactScene3D = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 1;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#10b981" />
      
      <FormParticles count={80} />
      
      {/* Floating form elements */}
      <FloatingIcon position={[-6, 3, -4]} icon="sphere" color="#3b82f6" scale={0.8} />
      <FloatingIcon position={[6, -2, -3]} icon="box" color="#10b981" scale={1} />
      <FloatingIcon position={[0, 4, -6]} icon="torus" color="#f59e0b" scale={1.2} />
      <FloatingIcon position={[-4, -3, -2]} icon="cylinder" color="#ef4444" scale={0.9} />
      
      {/* 3D Text elements */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <Center position={[-8, 6, -8]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            CONNECT
            <MeshDistortMaterial color="#3b82f6" distort={0.2} speed={1.5} />
          </Text3D>
        </Center>
      </Float>
      
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.3}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

export const UltraAdvanced3DGoogleFormNew: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
    serviceType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "We'll get back to you within 24 hours. Thank you for contacting StudentHub!",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          subject: '',
          message: '',
          serviceType: ''
        });
      }, 3000);
    }, 2000);
  };

  const formFields = [
    { 
      name: 'name', 
      type: 'text', 
      placeholder: 'Your Full Name', 
      icon: <User className="w-5 h-5" />,
      required: true 
    },
    { 
      name: 'email', 
      type: 'email', 
      placeholder: 'your.email@example.com', 
      icon: <Mail className="w-5 h-5" />,
      required: true 
    },
    { 
      name: 'phone', 
      type: 'tel', 
      placeholder: '+91 98765 43210', 
      icon: <Phone className="w-5 h-5" />,
      required: false 
    },
    { 
      name: 'organization', 
      type: 'text', 
      placeholder: 'School/College/Organization', 
      icon: <Building className="w-5 h-5" />,
      required: false 
    }
  ];

  const serviceTypes = [
    { value: '', label: 'Select Service Type' },
    { value: 'academic-support', label: '📚 Academic Support & Question Papers' },
    { value: 'technical-help', label: '🔧 Technical Help & Tools' },
    { value: 'partnership', label: '🤝 Partnership & Collaboration' },
    { value: 'feedback', label: '💭 Feedback & Suggestions' },
    { value: 'media-press', label: '📰 Media & Press Inquiries' },
    { value: 'other', label: '❓ Other Inquiries' }
  ];

  const features = [
    { icon: <Clock className="w-6 h-6" />, text: '24-48 Hour Response Time', color: 'text-blue-400' },
    { icon: <Shield className="w-6 h-6" />, text: 'Secure & Private', color: 'text-green-400' },
    { icon: <Users className="w-6 h-6" />, text: 'Expert Support Team', color: 'text-purple-400' },
    { icon: <Globe className="w-6 h-6" />, text: '24/7 Global Support', color: 'text-orange-400' }
  ];

  const stats = [
    { icon: <MessageSquare className="w-8 h-8" />, value: '50K+', label: 'Messages Handled', color: 'from-blue-500 to-cyan-500' },
    { icon: <Heart className="w-8 h-8" />, value: '98.7%', label: 'Satisfaction Rate', color: 'from-pink-500 to-rose-500' },
    { icon: <Zap className="w-8 h-8" />, value: '<2hrs', label: 'Avg Response Time', color: 'from-yellow-500 to-orange-500' },
    { icon: <Award className="w-8 h-8" />, value: '4.9★', label: 'Support Rating', color: 'from-purple-500 to-indigo-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
      {/* Ultra-Advanced 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <ContactScene3D />
        </Canvas>
      </div>

      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20`}
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
                : 'radial-gradient(circle, #10b981 0%, transparent 70%)',
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Rocket className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-xl px-8 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Ultra-Advanced Contact System
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            Connect With StudentHub
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Experience our revolutionary 3D contact system powered by advanced AI and real-time support technology
          </p>
        </motion.div>

        {/* Support Statistics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 glassmorphism hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Form */}
          <motion.div
            className="glassmorphism p-8 hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">Send Us a Message</h3>
                  </div>

                  {/* Service Type Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-background-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
                    >
                      {serviceTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {formFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <label className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
                          {field.icon}
                          {field.placeholder} {field.required && '*'}
                        </label>
                        <Input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="h-12 bg-background-secondary border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      required
                      className="h-12 bg-background-secondary border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide detailed information about your query. The more details you share, the better we can assist you!"
                      required
                      rows={5}
                      className="bg-background-secondary border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 btn-hero text-lg font-semibold group relative overflow-hidden"
                    >
                      <span className="flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                            Processing Your Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center py-12 space-y-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                  </motion.div>
                  <h3 className="text-3xl font-bold gradient-text">Message Sent Successfully!</h3>
                  <p className="text-lg text-foreground-secondary">
                    Thank you for contacting StudentHub. Our team will respond within 24-48 hours.
                  </p>
                  <motion.div
                    className="text-sm text-muted-foreground"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Redirecting to form in few seconds...
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Why Choose Our Support */}
            <div className="glassmorphism p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-secondary to-accent rounded-xl">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text">Why Choose Our Support?</h3>
              </div>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-background-secondary/50 rounded-xl hover:bg-background-secondary transition-all duration-300"
                    whileHover={{ x: 10 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className={`p-2 rounded-lg ${feature.color} bg-current/10`}>
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glassmorphism p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text">Quick Actions</h3>
              </div>
              <div className="space-y-4">
                <motion.button
                  className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl text-left hover:border-blue-500/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://wa.me/919876543210?text=Hello! I need support from STUDENTHUB.', '_blank')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="font-semibold">WhatsApp Support</div>
                        <div className="text-sm text-foreground-secondary">Get instant help</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                <motion.button
                  className="w-full p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl text-left hover:border-green-500/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:support@studenthub.com', '_blank')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="font-semibold">Email Support</div>
                        <div className="text-sm text-foreground-secondary">Detailed assistance</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                <motion.button
                  className="w-full p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-left hover:border-purple-500/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('tel:+919876543210', '_blank')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-purple-400" />
                      <div>
                        <div className="font-semibold">Phone Support</div>
                        <div className="text-sm text-foreground-secondary">Direct conversation</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div 
          className="text-center mt-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-foreground-secondary">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>170M+ Happy Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Industry Leading</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};