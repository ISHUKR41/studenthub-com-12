import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Users,
  BookOpen,
  TrendingUp,
  ExternalLink,
  Filter,
  Zap
} from 'lucide-react';

interface ExamNotification {
  id: string;
  examName: string;
  organization: string;
  type: 'registration' | 'admit-card' | 'result' | 'counseling' | 'application';
  status: 'live' | 'upcoming' | 'urgent' | 'new';
  date: string;
  deadline: string;
  registeredStudents: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'engineering' | 'medical' | 'banking' | 'ssc' | 'railway' | 'state';
}

export const LiveExamNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<ExamNotification[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock real-time data
  useEffect(() => {
    const mockNotifications: ExamNotification[] = [
      {
        id: '1',
        examName: 'JEE Main 2024 Session 2',
        organization: 'NTA',
        type: 'registration',
        status: 'live',
        date: '2024-12-10',
        deadline: '2024-12-15',
        registeredStudents: 1245678,
        description: 'Registration for JEE Main 2024 Session 2 is now open. Apply before the deadline.',
        priority: 'high',
        category: 'engineering'
      },
      {
        id: '2',
        examName: 'NEET UG 2024',
        organization: 'NTA',
        type: 'result',
        status: 'urgent',
        date: '2024-12-08',
        deadline: '2024-12-12',
        registeredStudents: 2156789,
        description: 'NEET UG 2024 results declared. Check your scores and counseling details.',
        priority: 'high',
        category: 'medical'
      },
      {
        id: '3',
        examName: 'SBI PO 2024',
        organization: 'SBI',
        type: 'admit-card',
        status: 'new',
        date: '2024-12-09',
        deadline: '2024-12-20',
        registeredStudents: 456123,
        description: 'SBI PO Admit Cards released. Download now for the examination.',
        priority: 'medium',
        category: 'banking'
      },
      {
        id: '4',
        examName: 'SSC CGL 2024',
        organization: 'SSC',
        type: 'application',
        status: 'upcoming',
        date: '2024-12-20',
        deadline: '2024-01-15',
        registeredStudents: 789456,
        description: 'SSC CGL 2024 application process will start soon. Get ready with documents.',
        priority: 'medium',
        category: 'ssc'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const statusColors = {
    live: 'bg-green-500 animate-pulse',
    urgent: 'bg-red-500 animate-bounce',
    new: 'bg-blue-500',
    upcoming: 'bg-yellow-500'
  };

  const typeIcons = {
    registration: BookOpen,
    'admit-card': CheckCircle,
    result: TrendingUp,
    counseling: Users,
    application: Bell
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div ref={ref} className="container mx-auto px-4 lg:px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="p-3 bg-gradient-primary rounded-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Bell className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="bg-red-500 text-white animate-pulse text-lg px-4 py-2">
              LIVE UPDATES
            </Badge>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Real-Time Exam Alerts
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Never miss important exam deadlines. Get instant notifications for registrations, 
            admit cards, results, and counseling updates.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {['all', 'engineering', 'medical', 'banking', 'ssc', 'railway', 'state'].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className="capitalize"
            >
              {cat === 'all' ? 'All Exams' : cat}
            </Button>
          ))}
        </motion.div>

        {/* Live Counter */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
            <motion.div 
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-foreground font-semibold">
              {filteredNotifications.length} Active Notifications
            </span>
            <Zap className="h-4 w-4 text-yellow-400" />
          </div>
        </motion.div>

        {/* Notifications Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => {
              const IconComponent = typeIcons[notification.type];
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="glass-intense border-l-4 border-l-primary hover:border-primary/50 transition-all duration-500 h-full relative overflow-hidden">
                    {/* Animated border effect */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    <CardContent className="p-6">
                      {/* Header with Status */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                              {notification.examName}
                            </h3>
                            <p className="text-sm text-foreground-secondary">
                              {notification.organization}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            className={`${statusColors[notification.status]} text-white text-xs px-2 py-1`}
                          >
                            {notification.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {notification.type.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-foreground-secondary mb-4 leading-relaxed">
                        {notification.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-background/50 rounded-lg">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-primary mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-sm font-semibold">Registered</span>
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {(notification.registeredStudents / 100000).toFixed(1)}L+
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-semibold">Deadline</span>
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {new Date(notification.deadline).toLocaleDateString('en-IN', { 
                              day: '2-digit', 
                              month: 'short' 
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full btn-hero group-hover:shadow-lg transition-all"
                        size="sm"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                        <motion.div
                          className="ml-auto"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.div>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Subscribe Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="glass-intense max-w-2xl mx-auto p-8">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bell className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold gradient-text">
                Never Miss an Update
              </h3>
            </motion.div>
            
            <p className="text-foreground-secondary mb-6">
              Get instant notifications on WhatsApp, Email, and SMS for all exam updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero flex-1">
                <Bell className="mr-2 h-5 w-5" />
                Enable Notifications
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Calendar className="mr-2 h-5 w-5" />
                Download App
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};