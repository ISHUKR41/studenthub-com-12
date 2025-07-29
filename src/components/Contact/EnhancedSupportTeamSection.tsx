import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, Award, Clock, MapPin, Languages, Star, 
  Brain, Headphones, MessageCircle, Video, Mail, Phone
} from 'lucide-react';

const EnhancedSupportTeamSection: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Lead Academic Consultant",
      avatar: "👩‍🏫",
      specialties: ["Academic Resources", "Research Papers", "Study Materials"],
      experience: "8+ years",
      rating: 4.9,
      reviews: 2847,
      languages: ["English", "Hindi", "Spanish"],
      status: "online",
      responseTime: "< 15 mins",
      description: "Expert in academic resource curation and research methodology"
    },
    {
      id: 2,
      name: "Raj Patel",
      role: "Technical Support Lead",
      avatar: "👨‍💻",
      specialties: ["Website Issues", "Tool Debugging", "API Integration"],
      experience: "6+ years",
      rating: 4.8,
      reviews: 1923,
      languages: ["English", "Hindi", "Gujarati"],
      status: "online",
      responseTime: "< 30 mins",
      description: "Full-stack developer specializing in educational technology"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Community Manager",
      avatar: "👩‍💼",
      specialties: ["Student Groups", "Community Building", "Events"],
      experience: "5+ years",
      rating: 4.9,
      reviews: 3156,
      languages: ["English", "Spanish", "Portuguese"],
      status: "busy",
      responseTime: "< 1 hour",
      description: "Expert in building and managing educational communities"
    },
    {
      id: 4,
      name: "Alex Chen",
      role: "AI & Innovation Specialist",
      avatar: "👨‍🔬",
      specialties: ["AI Features", "Innovation", "Future Tech"],
      experience: "7+ years",
      rating: 4.9,
      reviews: 1764,
      languages: ["English", "Mandarin", "Japanese"],
      status: "online",
      responseTime: "< 45 mins",
      description: "Machine learning engineer focused on educational AI"
    }
  ];

  const supportChannels = [
    {
      id: 1,
      name: "Live Chat",
      icon: <MessageCircle className="w-6 h-6" />,
      availability: "24/7",
      avgResponse: "< 2 mins",
      description: "Instant support for urgent issues",
      color: "from-green-500 to-emerald-500",
      status: "Available Now"
    },
    {
      id: 2,
      name: "Video Call",
      icon: <Video className="w-6 h-6" />,
      availability: "Mon-Fri 9AM-6PM",
      avgResponse: "15-30 mins",
      description: "Face-to-face support for complex issues",
      color: "from-blue-500 to-cyan-500",
      status: "Schedule Call"
    },
    {
      id: 3,
      name: "Email Support",
      icon: <Mail className="w-6 h-6" />,
      availability: "Always",
      avgResponse: "< 24 hours",
      description: "Detailed responses for complex queries",
      color: "from-purple-500 to-pink-500",
      status: "Send Email"
    },
    {
      id: 4,
      name: "Phone Support",
      icon: <Phone className="w-6 h-6" />,
      availability: "Mon-Fri 9AM-6PM",
      avgResponse: "Immediate",
      description: "Direct phone support for urgent matters",
      color: "from-yellow-500 to-orange-500",
      status: "Call Now"
    }
  ];

  const supportStats = [
    { label: "Response Time", value: "< 15 mins", icon: <Clock className="w-5 h-5" /> },
    { label: "Resolution Rate", value: "98.7%", icon: <Award className="w-5 h-5" /> },
    { label: "Languages", value: "12+", icon: <Languages className="w-5 h-5" /> },
    { label: "Satisfaction", value: "4.9/5", icon: <Star className="w-5 h-5" /> }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              World-Class Support Team
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">Meet Our Expert Team</h2>
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto">
            Our dedicated support specialists are here to help you succeed. Each team member brings years of experience in education technology and student support.
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
          {supportStats.map((stat, index) => (
            <div key={index} className="text-center p-6 glassmorphism rounded-2xl">
              <div className="inline-flex p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-foreground-secondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Support Channels */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold gradient-text text-center mb-12">Choose Your Support Channel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                className="group"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glassmorphism h-full transition-all duration-300 group-hover:shadow-2xl border-2 border-transparent group-hover:border-primary/30">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${channel.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {channel.icon}
                    </div>
                    <h4 className="text-xl font-bold">{channel.name}</h4>
                    <p className="text-sm text-foreground-secondary">{channel.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Availability:</span>
                        <span className="font-medium">{channel.availability}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Response:</span>
                        <span className="font-medium text-green-400">{channel.avgResponse}</span>
                      </div>
                    </div>
                    <Button className="w-full btn-hero">
                      {channel.status}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold gradient-text text-center mb-12">Our Support Specialists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glassmorphism transition-all duration-300 group-hover:shadow-2xl border-2 border-transparent group-hover:border-primary/30">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="text-6xl mb-4">{member.avatar}</div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-400' : 
                          member.status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-2xl font-bold">{member.name}</h4>
                          <p className="text-primary font-semibold">{member.role}</p>
                          <p className="text-sm text-foreground-secondary">{member.description}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-background/30 rounded-lg">
                            <div className="text-xl font-bold text-primary">{member.rating}</div>
                            <div className="text-xs text-foreground-secondary">Rating</div>
                          </div>
                          <div className="text-center p-3 bg-background/30 rounded-lg">
                            <div className="text-xl font-bold text-primary">{member.responseTime}</div>
                            <div className="text-xs text-foreground-secondary">Response</div>
                          </div>
                        </div>

                        {/* Specialties */}
                        <div>
                          <p className="text-sm font-semibold mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, idx) => (
                              <Badge key={idx} className="text-xs bg-primary/20 text-primary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Languages */}
                        <div>
                          <p className="text-sm font-semibold mb-2">Languages:</p>
                          <div className="flex flex-wrap gap-2">
                            {member.languages.map((language, idx) => (
                              <Badge key={idx} className="text-xs bg-secondary/20 text-secondary">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button size="sm" className="flex-1 btn-hero">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat Now
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Video className="w-4 h-4 mr-2" />
                            Video Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="glassmorphism border-2 border-primary/30 p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <Headphones className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold gradient-text">Need Immediate Assistance?</h3>
              </div>
              <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                Our support team is standing by to help you with any questions or issues. Choose your preferred method of contact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="btn-hero px-8 py-3">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="px-8 py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Support
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedSupportTeamSection;