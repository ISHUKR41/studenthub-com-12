import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text3D, 
  Center, 
  Float, 
  Sphere, 
  Box, 
  Torus, 
  Environment, 
  OrbitControls,
  Plane,
  RoundedBox,
  Cylinder,
  Points,
  PointMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Enhanced floating educational elements
const FloatingBookElement = ({ position, color, scale = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[0.15, 0.2, 0.03]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={0.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

// Educational subject spheres
const SubjectSphere = ({ position, subject, color }: {
  position: [number, number, number];
  subject: string;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={0.8}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={0.7}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
};

// Knowledge particles system
const KnowledgeParticles = ({ count = 100 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          color="#3b82f6"
          size={0.1}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// Main About Scene
const AboutScene3D = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 2;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.05) * 1;
    camera.lookAt(0, 0, 0);
  });

  const subjects = [
    { name: 'Science', color: '#3b82f6', position: [-8, 4, -6] as [number, number, number] },
    { name: 'Math', color: '#10b981', position: [8, -2, -4] as [number, number, number] },
    { name: 'History', color: '#f59e0b', position: [0, 6, -8] as [number, number, number] },
    { name: 'Literature', color: '#ef4444', position: [-6, -4, -3] as [number, number, number] },
    { name: 'Physics', color: '#8b5cf6', position: [6, 2, -7] as [number, number, number] },
    { name: 'Chemistry', color: '#06b6d4', position: [-4, 0, -5] as [number, number, number] }
  ];

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#10b981" />
      
      <KnowledgeParticles count={120} />
      
      {/* Floating books */}
      {[...Array(20)].map((_, i) => (
        <FloatingBookElement
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
          ]}
          color={`hsl(${(i * 36) % 360}, 70%, 60%)`}
          scale={0.8 + Math.random() * 0.4}
        />
      ))}
      
      {/* Subject spheres */}
      {subjects.map((subject, i) => (
        <SubjectSphere
          key={subject.name}
          position={subject.position}
          subject={subject.name}
          color={subject.color}
        />
      ))}
      
      {/* 3D Text elements - disabled temporarily due to font loading */}
      {/* <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center position={[-12, 8, -12]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={2}
            height={0.3}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            EDUCATION
            <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
          </Text3D>
        </Center>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Center position={[12, -8, -12]}>
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
            EXCELLENCE
            <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.2} />
          </Text3D>
        </Center>
      </Float> */}
      
      {/* Orbiting knowledge symbols */}
      <group>
        {[...Array(12)].map((_, i) => (
          <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={1} floatIntensity={2}>
            <mesh
              position={[
                Math.cos((i / 12) * Math.PI * 2) * 18,
                Math.sin((i / 12) * Math.PI * 2) * 4,
                Math.sin((i / 12) * Math.PI * 2) * 18
              ]}
              scale={0.2 + (i % 3) * 0.1}
            >
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial
                color={`hsl(${(i * 30) % 360}, 80%, 65%)`}
                transparent={true}
                opacity={0.6}
                metalness={0.4}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.1}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

interface Enhanced3DAboutSceneProps {
  isPlaying?: boolean;
}

export const Enhanced3DAboutScene: React.FC<Enhanced3DAboutSceneProps> = ({ 
  isPlaying = true 
}) => {
  return (
    <div className="absolute inset-0 -z-10" style={{ position: 'absolute' }}>
      <ErrorBoundary 
        fallback={
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-science/5 via-commerce/5 to-arts/5" />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 20], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
          onError={(error) => {
            console.warn('3D About Scene error:', error);
          }}
          onCreated={(state) => {
            console.log('3D About Scene created successfully');
            state.gl.setClearColor(0x000000, 0);
          }}
          fallback={<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-science/5 via-commerce/5 to-arts/5" />}
        >
          <Suspense fallback={null}>
            {isPlaying && <AboutScene3D />}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Enhanced 2D overlay effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Educational gradient overlays */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-science/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 60, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-engineering/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.4, 0.15],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, delay: 4 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-medical/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.18, 0.45, 0.18],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 8 }}
        />
        
        {/* Floating knowledge symbols */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 2, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated knowledge network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="knowledge-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30"/>
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-secondary/50"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#knowledge-grid)" />
        </svg>
      </div>
    </div>
  );
};