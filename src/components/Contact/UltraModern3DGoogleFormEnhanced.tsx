import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Send, Sparkles, MessageCircle, User, Mail, Phone, FileText, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export const UltraModern3DGoogleFormEnhanced: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', priority: 'medium' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: { scale: 1.02, rotateY: 2 },
    focus: { scale: 1.05, rotateY: 5 }
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background-secondary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              background: `radial-gradient(circle, hsl(${i * 45}, 70%, 60%) 0%, transparent 70%)`,
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
              className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Ultra-Modern Contact Experience
            </Badge>
          </div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold gradient-text"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Get In Touch
          </motion.h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Experience our revolutionary 3D-enhanced contact form with real-time animations and intelligent assistance
          </p>

          <div className="flex justify-center items-center gap-8 text-sm text-foreground-secondary">
            {[
              { icon: <CheckCircle2 className="w-4 h-4" />, text: "Instant Response" },
              { icon: <Star className="w-4 h-4" />, text: "24/7 Support" },
              { icon: <Sparkles className="w-4 h-4" />, text: "AI-Powered" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-primary">{feature.icon}</div>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Enhanced Form Container */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Simplified Background */}
          <div className="absolute inset-0 h-full bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          </div>

          {/* Glass Morphism Form */}
          <div className="relative p-8 md:p-12 rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full blur-sm opacity-40"></div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Field */}
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                    onHoverStart={() => setHoveredField('name')}
                    onHoverEnd={() => setHoveredField(null)}
                  >
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${hoveredField === 'name' ? 'text-primary' : 'text-foreground-secondary'}`} />
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-xl focus:border-primary/50 focus:bg-white/20 transition-all duration-300"
                        required
                      />
                      {hoveredField === 'name' && (
                        <motion.div
                          className="absolute -right-2 top-1/2 transform -translate-y-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                    onHoverStart={() => setHoveredField('email')}
                    onHoverEnd={() => setHoveredField(null)}
                  >
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${hoveredField === 'email' ? 'text-primary' : 'text-foreground-secondary'}`} />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-xl focus:border-primary/50 focus:bg-white/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                    onHoverStart={() => setHoveredField('phone')}
                    onHoverEnd={() => setHoveredField(null)}
                  >
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${hoveredField === 'phone' ? 'text-primary' : 'text-foreground-secondary'}`} />
                      <Input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-xl focus:border-primary/50 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                    onHoverStart={() => setHoveredField('subject')}
                    onHoverEnd={() => setHoveredField(null)}
                  >
                    <div className="relative">
                      <FileText className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${hoveredField === 'subject' ? 'text-primary' : 'text-foreground-secondary'}`} />
                      <Input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-xl focus:border-primary/50 focus:bg-white/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Message Field */}
                <motion.div
                  className="relative"
                  variants={inputVariants}
                  initial="rest"
                  whileHover="hover"
                  whileFocus="focus"
                  onHoverStart={() => setHoveredField('message')}
                  onHoverEnd={() => setHoveredField(null)}
                >
                  <Textarea
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-32 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-xl focus:border-primary/50 focus:bg-white/20 transition-all duration-300 resize-none"
                    required
                  />
                </motion.div>

                {/* Priority Selector */}
                <div className="flex flex-wrap gap-4">
                  <span className="text-white/80 font-medium">Priority:</span>
                  {['low', 'medium', 'high', 'urgent'].map((priority) => (
                    <motion.button
                      key={priority}
                      type="button"
                      onClick={() => handleInputChange('priority', priority)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        formData.priority === priority
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </motion.button>
                  ))}
                </div>

                {/* Submit Button */}
                <motion.div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative px-12 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden group disabled:opacity-50"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-6 h-6" />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              </form>
            ) : (
              /* Success State */
              <motion.div
                className="text-center py-16 space-y-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto"
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-white/80 text-lg">We'll get back to you within 24 hours.</p>
                <div className="flex justify-center items-center gap-2 text-white/60">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">Thank you for choosing STUDENTHUB</span>
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { icon: <Phone className="w-6 h-6" />, title: "Call Us", info: "+91 98765 43210", action: "tel:+919876543210" },
            { icon: <Mail className="w-6 h-6" />, title: "Email Us", info: "support@studenthub.com", action: "mailto:support@studenthub.com" },
            { icon: <MessageCircle className="w-6 h-6" />, title: "WhatsApp", info: "Chat with us", action: "https://wa.me/919876543210" }
          ].map((contact, index) => (
            <motion.a
              key={index}
              href={contact.action}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{contact.icon}</div>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">{contact.title}</h4>
              <p className="text-white/70">{contact.info}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};