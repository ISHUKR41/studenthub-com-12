import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCursorProps {
  className?: string;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ className }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springOptions = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springOptions);
  const cursorYSpring = useSpring(cursorY, springOptions);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else if (target.matches('h1, h2, h3, h4, h5, h6')) {
        setCursorVariant('text');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], input, textarea, select, h1, h2, h3, h4, h5, h6'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(59, 130, 246, 0.9)',
      border: '2px solid rgba(59, 130, 246, 1)',
      scale: 1,
      borderRadius: '50%',
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.2)',
    },
    hover: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      border: '2px solid rgba(59, 130, 246, 1)',
      scale: 1.3,
      borderRadius: '50%',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)',
    },
    text: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(251, 191, 36, 0.3)',
      border: '2px solid rgba(251, 191, 36, 1)',
      scale: 1.2,
      borderRadius: '50%',
      boxShadow: '0 0 18px rgba(251, 191, 36, 0.5), 0 0 35px rgba(251, 191, 36, 0.2)',
    },
    click: {
      width: 16,
      height: 16,
      backgroundColor: 'rgba(239, 68, 68, 0.9)',
      border: '2px solid rgba(239, 68, 68, 1)',
      scale: 0.8,
      borderRadius: '50%',
      boxShadow: '0 0 12px rgba(239, 68, 68, 0.7), 0 0 25px rgba(239, 68, 68, 0.4)',
    }
  };

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }
          
          button, a, [role="button"], input, textarea, select {
            cursor: none !important;
          }
        `}
      </style>
      
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-mode-screen ${className}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={isClicking ? 'click' : cursorVariant}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
          mass: 0.3,
        }}
      >
        <div className="w-full h-full rounded-full backdrop-blur-lg relative overflow-hidden">
          {/* Enhanced 3D Core */}
          <motion.div
            className="absolute inset-2 rounded-full"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 1) 0%, rgba(251, 191, 36, 0.8) 25%, rgba(16, 185, 129, 0.8) 50%, rgba(245, 158, 11, 0.8) 75%, rgba(59, 130, 246, 1) 100%)',
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
          
          {/* 3D Crystal Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: '50%',
                left: '50%',
                filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 1)) drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))',
              }}
              animate={{
                x: [0, Math.cos(i * 45 * Math.PI / 180) * 28],
                y: [0, Math.sin(i * 45 * Math.PI / 180) * 28],
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Enhanced Multiple Trail Rings */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute inset-0 rounded-full"
              style={{
                border: `3px solid hsl(var(--primary) / ${0.9 - i * 0.15})`,
                filter: `blur(${i * 0.5}px)`,
              }}
              animate={{
                scale: [1, 2 + i * 0.5, 3 + i * 0.7],
                opacity: [1, 0.6, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* 3D Orbital Rings */}
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-accent"
            animate={{
              rotate: [0, 360],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(245, 158, 11, 0.3) 50%, transparent 100%)',
              filter: 'blur(0.5px)',
            }}
          />
          
          {/* Central 3D Gem */}
          <motion.div
            className="absolute inset-4 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -360],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.8) 50%, transparent 100%)',
              boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          />
          
          {/* Floating Micro Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${20 + (i % 4) * 20}%`,
                left: `${20 + (i % 4) * 20}%`,
                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))',
              }}
              animate={{
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 15],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 15],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};