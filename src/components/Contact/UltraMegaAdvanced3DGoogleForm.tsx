import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, User, Mail, MessageCircle, Phone, Calendar,
  CheckCircle, Clock, Users, BookOpen, Target, Star
} from 'lucide-react';

export const UltraMegaAdvanced3DGoogleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', category: '', message: '', phone: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact-form" className="py-20 px-4 bg-gradient-to-br from-background-secondary via-background to-background-tertiary relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-20">
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
            Contact Form
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Send Us a Message</h2>
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto">
            Get personalized support from our expert team
          </p>
        </motion.div>

        <Card className="glassmorphism border-2 border-primary/30 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <Input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              />
              
              <Textarea
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                rows={6}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hero"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};