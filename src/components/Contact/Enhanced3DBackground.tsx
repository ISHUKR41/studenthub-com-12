import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Points, 
  PointMaterial, 
  Float, 
  Text3D, 
  Center,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  OrbitControls,
  Environment,
  Lightformer,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Animated particle system
const ParticleSystem = ({ count = 5000 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.3}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// Floating geometric shapes
const FloatingShape = ({ position, shape, color, scale = 1 }: {
  position: [number, number, number];
  shape: 'sphere' | 'box' | 'torus';
  color: string;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'torus' && <torusGeometry args={[1, 0.4, 16, 100]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
    </Float>
  );
};

// Main 3D scene component
const ContactScene = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 1;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Environment and lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#06b6d4" />
      
      {/* Particle system */}
      <ParticleSystem count={3000} />
      
      {/* Floating shapes */}
      <FloatingShape position={[-8, 2, -5]} shape="sphere" color="#3b82f6" scale={1.2} />
      <FloatingShape position={[8, -2, -3]} shape="box" color="#10b981" scale={0.8} />
      <FloatingShape position={[0, 5, -8]} shape="torus" color="#f59e0b" scale={1.5} />
      <FloatingShape position={[-5, -5, -4]} shape="sphere" color="#ef4444" scale={1} />
      <FloatingShape position={[6, 3, -6]} shape="box" color="#8b5cf6" scale={1.1} />
      <FloatingShape position={[-3, 0, -7]} shape="torus" color="#06b6d4" scale={0.9} />
      <FloatingShape position={[4, -4, -2]} shape="sphere" color="#f59e0b" scale={1.3} />
      
      {/* Text3D elements temporarily disabled to fix font loading error */}
      
      {/* Orbiting elements */}
      <group>
        {[...Array(8)].map((_, i) => (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={1} floatIntensity={2}>
            <Sphere
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 15,
                Math.sin((i / 8) * Math.PI * 2) * 3,
                Math.sin((i / 8) * Math.PI * 2) * 15
              ]}
              scale={0.3 + (i % 3) * 0.2}
              args={[0.5, 16, 16]}
            >
              <MeshDistortMaterial
                color={`hsl(${(i * 45) % 360}, 70%, 60%)`}
                distort={0.4}
                speed={2 + i * 0.1}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
        ))}
      </group>
      
      {/* Interactive orbital controls */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.2}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

// Enhanced 3D background component
const Enhanced3DBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10" style={{ position: 'absolute' }}>
      <ErrorBoundary 
        fallback={
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />
        }
      >
        {/* 3D Canvas with enhanced error handling */}
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
          onError={(error) => {
            console.warn('3D Canvas error:', error);
          }}
          onCreated={(state) => {
            console.log('3D Canvas created successfully');
            state.gl.setClearColor(0x000000, 0);
          }}
          fallback={<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />}
        >
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Fallback gradient background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none -z-10" />
      
      {/* Additional 2D overlay effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.55, 0.25],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 6 }}
        />
        
        {/* Floating 2D particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default Enhanced3DBackground;