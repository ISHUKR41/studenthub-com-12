import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ContactMethodCardProps {
  method: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    action: string;
    href: string;
    stats: string;
    availability: string;
    responseTime: string;
    color: string;
    bgColor: string;
    borderColor: string;
    glowColor: string;
  };
  index: number;
}

export const ContactMethodCard: React.FC<ContactMethodCardProps> = ({ method, index }) => {
  const handleClick = () => {
    if (method.href.startsWith('mailto:')) {
      window.location.href = method.href;
    } else {
      window.open(method.href, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 45 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      className="perspective-1000 h-full"
    >
      <Card className={`
        relative overflow-hidden border-2 transition-all duration-700 h-full
        ${method.borderColor} ${method.bgColor}
        hover:${method.glowColor} hover:shadow-2xl
        glassmorphism group cursor-pointer transform-gpu
      `}>
        <CardContent className="p-8 h-full flex flex-col relative">
          {/* Animated Background Pattern */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10`}
            initial={{ scale: 0, rotate: 0 }}
            whileHover={{ scale: 1.2, rotate: 180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Icon with 3D Effect */}
          <motion.div 
            className={`
              w-24 h-24 rounded-3xl ${method.bgColor} border-2 ${method.borderColor}
              flex items-center justify-center mb-6 relative overflow-hidden
              shadow-lg group-hover:shadow-2xl transition-all duration-500
            `}
            whileHover={{ 
              rotateY: 360,
              scale: 1.15,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.3,
                rotate: 360 
              }}
              transition={{ duration: 0.6 }}
              className="text-primary relative z-10"
            >
              {method.icon}
            </motion.div>
            
            {/* Icon Background Glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-20`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Content with Stagger Animation */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                whileHover={{ x: 10 }}
              >
                {method.title}
              </motion.h3>
              <motion.p 
                className="text-lg text-primary font-semibold mt-1"
                whileHover={{ x: 5 }}
              >
                {method.subtitle}
              </motion.p>
            </motion.div>
            
            <motion.p 
              className="text-foreground-secondary leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              whileHover={{ x: 8 }}
            >
              {method.description}
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            >
              {method.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className={`
                    p-3 rounded-lg ${method.bgColor} border ${method.borderColor}
                    text-sm font-medium text-center
                    hover:shadow-md transition-all duration-300
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2 + 0.6 + idx * 0.1 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
            >
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="secondary" 
                  className="text-xs font-medium"
                >
                  📊 {method.stats}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-xs font-medium"
                >
                  🕒 {method.availability}
                </Badge>
                <Badge 
                  className="text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  ⚡ {method.responseTime}
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
            whileHover={{ y: -5 }}
          >
            <Button
              onClick={handleClick}
              className={`
                w-full bg-gradient-to-r ${method.color} 
                hover:shadow-2xl group/btn relative overflow-hidden
                text-white font-semibold py-4 text-lg
                transition-all duration-500 transform hover:scale-105
              `}
              size="lg"
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>{method.action}</span>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Corner Accent */}
          <motion.div
            className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${method.color} opacity-10`}
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            whileHover={{ scale: 1.5, opacity: 0.2 }}
            transition={{ duration: 0.5 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};