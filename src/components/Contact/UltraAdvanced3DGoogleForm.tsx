import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text3D, Float, MeshDistortMaterial, OrbitControls, Sphere, Box, Torus, 
  Environment, Html, PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, CheckCircle, Clock, Shield, Sparkles, Globe, BookOpen, Settings,
  Users, Lightbulb, ArrowRight, ArrowLeft, Check, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tilt } from 'react-tilt';

// 3D Scene Component
const GoogleForm3DScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} position={[0, 0, 0]} args={[2, 32, 32]}>
          <MeshDistortMaterial color="#3b82f6" distort={0.4} speed={2} />
        </Sphere>
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </>
  );
};

const UltraAdvanced3DGoogleForm: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    priority: 'normal',
    terms: false
  });
  
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), { stiffness: 200, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Enhanced categories
  const categories = [
    { id: 'book-request', title: '📚 Academic Resources', icon: <BookOpen className="w-6 h-6" /> },
    { id: 'technical-support', title: '🔧 Technical Support', icon: <Settings className="w-6 h-6" /> },
    { id: 'community-access', title: '🤝 Community Access', icon: <Users className="w-6 h-6" /> },
    { id: 'feature-request', title: '💡 Feature Request', icon: <Lightbulb className="w-6 h-6" /> }
  ];

  // Calculate progress
  useEffect(() => {
    const fields = ['name', 'email', 'category', 'subject', 'message'];
    const completed = fields.filter(field => formData[field as keyof typeof formData]).length;
    setFormProgress((completed / fields.length) * 100);
  }, [formData]);

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.terms) newErrors.terms = 'Please accept terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate Google Form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    toast({
      title: "🎉 Success!",
      description: "Your form has been submitted successfully!"
    });

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        priority: 'normal',
        terms: false
      });
      setFormStep(1);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section ref={formRef} className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ background: 'transparent' }}>
          <Suspense fallback={null}>
            <GoogleForm3DScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Tilt options={{ max: 25, scale: 1.1 }}>
              <div className="p-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl shadow-glow">
                <Globe className="h-12 w-12 text-white" />
              </div>
            </Tilt>
            <Badge className="text-xl px-8 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Ultra-Advanced 3D Google Form
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">
            Revolutionary Contact Experience
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Experience the future of form submission with our 3D Google Form integration
          </p>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Form Progress</span>
              <span className="text-sm font-bold text-primary">{Math.round(formProgress)}%</span>
            </div>
            <Progress value={formProgress} className="h-3" />
          </div>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <Card className="max-w-lg p-8 text-center glassmorphism">
                <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-400" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Success!</h3>
                <p className="text-foreground-secondary">
                  Your form has been successfully submitted to Google Forms!
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <Tilt options={{ max: 5, scale: 1.02 }}>
          <Card className="glassmorphism shadow-2xl border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold gradient-text">
                Ultra Contact Form
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Select Category *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.category === category.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleInputChange('category', category.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            {category.icon}
                          </div>
                          <span className="font-medium">{category.title}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description"
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && <p className="text-red-400 text-sm">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Detailed description of your request"
                    rows={6}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.terms}
                    onChange={(e) => handleInputChange('terms', e.target.checked)}
                    className="mt-1 w-4 h-4"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>
                {errors.terms && <p className="text-red-400 text-sm">{errors.terms}</p>}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-hero py-4 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Submitting to Google Forms...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 mr-3" />
                      Submit Ultra Form
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Tilt>
      </div>
    </section>
  );
};

export default UltraAdvanced3DGoogleForm;