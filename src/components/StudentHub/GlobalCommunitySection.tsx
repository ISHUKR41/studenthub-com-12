import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Globe, MessageSquare, Users, Star, Trophy, MapPin, Clock, Heart } from 'lucide-react';

interface CommunityMember {
  id: number;
  name: string;
  avatar: string;
  country: string;
  studyField: string;
  achievements: number;
  isOnline: boolean;
  lastActive: string;
  rank: string;
}

interface StudyGroup {
  id: number;
  name: string;
  members: number;
  topic: string;
  activity: string;
  color: string;
}

const communityMembers: CommunityMember[] = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "PS",
    country: "India",
    studyField: "Computer Science",
    achievements: 127,
    isOnline: true,
    lastActive: "2 min ago",
    rank: "Expert"
  },
  {
    id: 2,
    name: "Alex Johnson",
    avatar: "AJ",
    country: "USA",
    studyField: "Mathematics",
    achievements: 89,
    isOnline: true,
    lastActive: "5 min ago",
    rank: "Advanced"
  },
  {
    id: 3,
    name: "Emma Chen",
    avatar: "EC",
    country: "Singapore",
    studyField: "Physics",
    achievements: 156,
    isOnline: false,
    lastActive: "1 hour ago",
    rank: "Master"
  },
  {
    id: 4,
    name: "Hassan Ali",
    avatar: "HA",
    country: "UAE",
    studyField: "Engineering",
    achievements: 98,
    isOnline: true,
    lastActive: "Just now",
    rank: "Advanced"
  },
  {
    id: 5,
    name: "Sofia Rodriguez",
    avatar: "SR",
    country: "Spain",
    studyField: "Biology",
    achievements: 143,
    isOnline: true,
    lastActive: "3 min ago",
    rank: "Expert"
  }
];

const studyGroups: StudyGroup[] = [
  {
    id: 1,
    name: "AI & Machine Learning",
    members: 2847,
    topic: "Neural Networks",
    activity: "Active discussion",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 2,
    name: "Medical Students Unite",
    members: 1923,
    topic: "Anatomy Review",
    activity: "Study session live",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    name: "Engineering Hub",
    members: 3156,
    topic: "Thermodynamics",
    activity: "Q&A session",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    name: "Business Analytics",
    members: 987,
    topic: "Data Visualization",
    activity: "Project collaboration",
    color: "from-yellow-500 to-orange-600"
  }
];

export const GlobalCommunitySection: React.FC = () => {
  const [activeMember, setActiveMember] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const memberInterval = setInterval(() => {
        setActiveMember((prev) => (prev + 1) % communityMembers.length);
      }, 2000);
      
      const groupInterval = setInterval(() => {
        setActiveGroup((prev) => (prev + 1) % studyGroups.length);
      }, 3000);

      return () => {
        clearInterval(memberInterval);
        clearInterval(groupInterval);
      };
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/10 relative overflow-hidden">
      {/* Animated Globe Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary/10 relative">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  top: `${Math.sin(i * Math.PI / 4) * 40 + 50}%`,
                  left: `${Math.cos(i * Math.PI / 4) * 40 + 50}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Global Learning Community
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto">
            Connect with millions of learners worldwide. Collaborate, compete, and grow together 
            in our vibrant international community of knowledge seekers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Members */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Active Members</h3>
            </div>

            <div className="space-y-4">
              {communityMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className={`
                    transition-all duration-500 cursor-pointer
                    ${activeMember === index ? 'scale-105' : 'scale-100'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveMember(index)}
                >
                  <Card className={`
                    glass border transition-all duration-500
                    ${activeMember === index 
                      ? 'border-primary/50 bg-white/15 shadow-2xl' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }
                  `}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <motion.div
                              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{member.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {member.rank}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                            <MapPin className="w-3 h-3" />
                            <span>{member.country}</span>
                            <span>•</span>
                            <span>{member.studyField}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-foreground-secondary">
                                {member.achievements} achievements
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-foreground-secondary">
                                {member.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Central Stats */}
          <motion.div
            className="flex flex-col justify-center items-center space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-64 h-64 glass rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-center">
                <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold gradient-text">195</div>
                <div className="text-sm text-foreground-secondary">Countries</div>
              </div>
              
              {/* Floating particles around the globe */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/50 rounded-full"
                  style={{
                    top: `${Math.sin(i * Math.PI / 3) * 30 + 50}%`,
                    left: `${Math.cos(i * Math.PI / 3) * 30 + 50}%`,
                  }}
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="text-center glass p-6 rounded-2xl border border-white/10"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-text">2.4M</div>
                <div className="text-sm text-foreground-secondary">Daily Messages</div>
              </motion.div>

              <motion.div
                className="text-center glass p-6 rounded-2xl border border-white/10"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-text">156K</div>
                <div className="text-sm text-foreground-secondary">Study Buddies</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Study Groups */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-bold text-foreground">Study Groups</h3>
            </div>

            <div className="space-y-4">
              {studyGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  className={`
                    transition-all duration-500 cursor-pointer
                    ${activeGroup === index ? 'scale-105' : 'scale-100'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveGroup(index)}
                >
                  <Card className={`
                    glass border transition-all duration-500
                    ${activeGroup === index 
                      ? 'border-secondary/50 bg-white/15 shadow-2xl' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }
                  `}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center`}
                          animate={activeGroup === index ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <Users className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{group.name}</h4>
                          <p className="text-sm text-foreground-secondary mb-2">{group.topic}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-foreground-secondary">
                                {group.members.toLocaleString()} members
                              </span>
                            </div>
                            
                            <Badge 
                              variant="outline" 
                              className="text-xs border-green-500/30 text-green-500"
                            >
                              {group.activity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full border border-white/10 text-foreground-secondary">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Join the global conversation • 15M+ active learners online</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};