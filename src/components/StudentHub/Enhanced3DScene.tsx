import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Enhanced3DSceneProps {
  className?: string;
}

export const Enhanced3DScene: React.FC<Enhanced3DSceneProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameId = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced performance
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Lighting System
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0x1E88E5, 1.5);
    mainLight.position.set(10, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    // Accent lights for dramatic effect
    const accentLight1 = new THREE.PointLight(0x00ffff, 1.2, 25);
    accentLight1.position.set(-8, 6, 8);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xff6b6b, 0.8, 20);
    accentLight2.position.set(8, -6, -8);
    scene.add(accentLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 2, 30, Math.PI / 6, 0.25, 1);
    spotLight.position.set(0, 15, 0);
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);

    // Central Knowledge Nexus - More complex geometry
    const nexusGroup = new THREE.Group();
    
    // Core sphere with animated material
    const coreGeometry = new THREE.IcosahedronGeometry(1.8, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1E88E5,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.3,
      emissive: 0x112244,
      emissiveIntensity: 0.2,
      transmission: 0.3,
      thickness: 0.5
    });
    const coreNexus = new THREE.Mesh(coreGeometry, coreMaterial);
    nexusGroup.add(coreNexus);

    // Orbital rings
    for (let i = 0; i < 4; i++) {
      const ringGeometry = new THREE.TorusGeometry(2.5 + i * 0.5, 0.05, 8, 64);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: [0x00ffff, 0xff6b6b, 0x4ecdc4, 0xffd700][i],
        transparent: true,
        opacity: 0.6,
        emissive: [0x003333, 0x330000, 0x003333, 0x333300][i],
        emissiveIntensity: 0.3
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.rotation.z = Math.random() * Math.PI;
      nexusGroup.add(ring);
    }

    scene.add(nexusGroup);

    // Enhanced floating books with better materials
    const books: THREE.Group[] = [];
    const bookGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.12);
    
    for (let i = 0; i < 20; i++) {
      const bookGroup = new THREE.Group();
      
      const bookMaterial = new THREE.MeshPhysicalMaterial({
        color: [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xffeaa7, 0xdda0dd, 0xff9ff3, 0x54a0ff][i % 8],
        roughness: 0.7,
        metalness: 0.1,
        clearcoat: 0.3,
        clearcoatRoughness: 0.25
      });
      
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      book.castShadow = true;
      book.receiveShadow = true;
      bookGroup.add(book);
      
      // Add glow effect
      const glowGeometry = new THREE.BoxGeometry(0.52, 0.72, 0.14);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: bookMaterial.color,
        transparent: true,
        opacity: 0.2
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      bookGroup.add(glow);
      
      const radius = 5 + Math.random() * 4;
      const angle = (i / 20) * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;
      
      bookGroup.position.x = Math.cos(angle) * radius;
      bookGroup.position.y = height;
      bookGroup.position.z = Math.sin(angle) * radius;
      
      books.push(bookGroup);
      scene.add(bookGroup);
    }

    // Advanced Mathematical Symbols with particle effects
    const mathElements: THREE.Group[] = [];
    
    for (let i = 0; i < 25; i++) {
      const mathGroup = new THREE.Group();
      
      // Create more complex math symbols
      if (i % 5 === 0) {
        // Integral symbol
        const curve = new THREE.EllipseCurve(0, 0, 0.15, 0.3, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
          color: 0xffd700,
          linewidth: 3
        });
        const integral = new THREE.Line(geometry, material);
        mathGroup.add(integral);
      } else if (i % 5 === 1) {
        // Sigma (summation)
        const sigmaGeometry = new THREE.ConeGeometry(0.12, 0.25, 3);
        const sigmaMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0x32cd32,
          emissive: 0x001100,
          emissiveIntensity: 0.3
        });
        const sigma = new THREE.Mesh(sigmaGeometry, sigmaMaterial);
        mathGroup.add(sigma);
      } else if (i % 5 === 2) {
        // Pi symbol
        const piGeometry = new THREE.TorusGeometry(0.18, 0.04, 8, 16);
        const piMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0xff4757,
          metalness: 0.5,
          roughness: 0.3
        });
        const pi = new THREE.Mesh(piGeometry, piMaterial);
        mathGroup.add(pi);
      } else if (i % 5 === 3) {
        // Delta (triangle)
        const deltaGeometry = new THREE.ConeGeometry(0.15, 0.25, 3);
        const deltaMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0x8e44ad,
          transmission: 0.2,
          opacity: 0.9,
          transparent: true
        });
        const delta = new THREE.Mesh(deltaGeometry, deltaMaterial);
        mathGroup.add(delta);
      } else {
        // Infinity symbol
        const infinityShape = new THREE.Shape();
        infinityShape.absellipse(0, 0, 0.15, 0.08, 0, Math.PI * 2, false, 0);
        const infinityGeometry = new THREE.ShapeGeometry(infinityShape);
        const infinityMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0x00bcd4,
          side: THREE.DoubleSide,
          emissive: 0x001122,
          emissiveIntensity: 0.2
        });
        const infinity = new THREE.Mesh(infinityGeometry, infinityMaterial);
        mathGroup.add(infinity);
      }
      
      const radius = 4 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 10;
      
      mathGroup.position.x = Math.cos(angle) * radius;
      mathGroup.position.y = height;
      mathGroup.position.z = Math.sin(angle) * radius;
      
      mathElements.push(mathGroup);
      scene.add(mathGroup);
    }

    // Enhanced Physics Elements
    const physicsElements: THREE.Group[] = [];
    
    for (let i = 0; i < 15; i++) {
      const physicsGroup = new THREE.Group();
      
      if (i % 4 === 0) {
        // Enhanced atom model
        const nucleus = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 12, 12),
          new THREE.MeshPhysicalMaterial({ 
            color: 0xff0000,
            emissive: 0x330000,
            emissiveIntensity: 0.5,
            roughness: 0.2,
            metalness: 0.8
          })
        );
        physicsGroup.add(nucleus);
        
        // Multiple electron orbits with particles
        for (let j = 0; j < 4; j++) {
          const orbitRadius = 0.25 + j * 0.15;
          const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(orbitRadius, 0.015, 6, 24),
            new THREE.MeshPhysicalMaterial({ 
              color: 0x00ff00,
              transparent: true,
              opacity: 0.7,
              emissive: 0x002200,
              emissiveIntensity: 0.3
            })
          );
          orbit.rotation.x = Math.random() * Math.PI;
          orbit.rotation.y = Math.random() * Math.PI;
          orbit.rotation.z = Math.random() * Math.PI;
          physicsGroup.add(orbit);
          
          // Electron particle
          const electron = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0x00ffff })
          );
          electron.position.set(orbitRadius, 0, 0);
          orbit.add(electron);
        }
      } else if (i % 4 === 1) {
        // Wave representation with sine wave geometry
        const wavePoints: THREE.Vector3[] = [];
        for (let x = 0; x <= 40; x++) {
          const y = Math.sin(x * 0.2) * 0.3;
          wavePoints.push(new THREE.Vector3(x * 0.02 - 0.4, y, 0));
        }
        const waveGeometry = new THREE.BufferGeometry().setFromPoints(wavePoints);
        const wave = new THREE.Line(waveGeometry, new THREE.LineBasicMaterial({ 
          color: 0x00bfff,
          linewidth: 3
        }));
        physicsGroup.add(wave);
      } else if (i % 4 === 2) {
        // DNA double helix
        const helixGroup = new THREE.Group();
        for (let t = 0; t < Math.PI * 4; t += 0.2) {
          const x1 = Math.cos(t) * 0.15;
          const y1 = t * 0.05;
          const z1 = Math.sin(t) * 0.15;
          
          const x2 = Math.cos(t + Math.PI) * 0.15;
          const y2 = t * 0.05;
          const z2 = Math.sin(t + Math.PI) * 0.15;
          
          const sphere1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.03, 8, 8),
            new THREE.MeshPhysicalMaterial({ color: 0xff6b35 })
          );
          sphere1.position.set(x1, y1, z1);
          helixGroup.add(sphere1);
          
          const sphere2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.03, 8, 8),
            new THREE.MeshPhysicalMaterial({ color: 0x74b9ff })
          );
          sphere2.position.set(x2, y2, z2);
          helixGroup.add(sphere2);
        }
        physicsGroup.add(helixGroup);
      } else {
        // Molecular structure
        const molecule = new THREE.Group();
        const centralAtom = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 12, 12),
          new THREE.MeshPhysicalMaterial({ 
            color: 0xffffff,
            metalness: 0.7,
            roughness: 0.3
          })
        );
        molecule.add(centralAtom);
        
        for (let j = 0; j < 6; j++) {
          const angle = (j / 6) * Math.PI * 2;
          const bondAtom = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshPhysicalMaterial({ 
              color: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff][j],
              metalness: 0.5,
              roughness: 0.4
            })
          );
          bondAtom.position.set(Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0);
          molecule.add(bondAtom);
          
          // Bond line
          const bondGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.2, 8);
          const bondMaterial = new THREE.MeshPhysicalMaterial({ color: 0x888888 });
          const bond = new THREE.Mesh(bondGeometry, bondMaterial);
          bond.position.set(Math.cos(angle) * 0.1, Math.sin(angle) * 0.1, 0);
          bond.rotation.z = angle + Math.PI / 2;
          molecule.add(bond);
        }
        physicsGroup.add(molecule);
      }
      
      const radius = 6 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;
      
      physicsGroup.position.x = Math.cos(angle) * radius;
      physicsGroup.position.y = height;
      physicsGroup.position.z = Math.sin(angle) * radius;
      
      physicsElements.push(physicsGroup);
      scene.add(physicsGroup);
    }

    // Particle system for ambient effects
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 12;

    // Enhanced Animation Loop
    let lastTime = 0;
    const clock = new THREE.Clock();
    
    const animate = (currentTime: number) => {
      frameId.current = requestAnimationFrame(animate);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < 16) return; // Limit to ~60fps
      lastTime = currentTime;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Animate knowledge nexus with complex rotation
      nexusGroup.rotation.y += 0.005;
      nexusGroup.rotation.x += 0.002;
      nexusGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
          child.rotation.x += 0.01 * (index + 1);
          child.rotation.y += 0.008 * (index + 1);
          child.rotation.z += 0.006 * (index + 1);
        }
      });
      
      // Enhanced book animations
      books.forEach((book, index) => {
        book.rotation.x += 0.008;
        book.rotation.y += 0.006;
        book.rotation.z += 0.004;
        
        // Complex orbital motion
        const baseAngle = (index / books.length) * Math.PI * 2;
        const radius = 5 + Math.sin(elapsedTime * 0.3 + index) * 1.5;
        const heightOffset = Math.sin(elapsedTime * 0.4 + index * 0.5) * 2;
        
        book.position.x = Math.cos(baseAngle + elapsedTime * 0.1) * radius;
        book.position.z = Math.sin(baseAngle + elapsedTime * 0.1) * radius;
        book.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.015;
        
        // Animate glow
        if (book.children[1] && book.children[1] instanceof THREE.Mesh) {
          const glowMesh = book.children[1] as THREE.Mesh;
          if (glowMesh.material instanceof THREE.MeshBasicMaterial) {
            glowMesh.material.opacity = 0.2 + Math.sin(elapsedTime * 2 + index) * 0.1;
          }
        }
      });
      
      // Enhanced math element animations
      mathElements.forEach((element, index) => {
        element.rotation.x += 0.015;
        element.rotation.y += 0.012;
        element.rotation.z += 0.008;
        
        const baseAngle = (index / mathElements.length) * Math.PI * 2;
        const radius = 4 + Math.sin(elapsedTime * 0.4 + index) * 0.8;
        
        element.position.x = Math.cos(baseAngle + elapsedTime * 0.15) * radius;
        element.position.z = Math.sin(baseAngle + elapsedTime * 0.15) * radius;
        element.position.y += Math.sin(elapsedTime * 0.6 + index) * 0.01;
      });
      
      // Enhanced physics element animations
      physicsElements.forEach((element, index) => {
        element.rotation.y += 0.018;
        element.rotation.x += 0.01;
        
        const baseAngle = (index / physicsElements.length) * Math.PI * 2;
        const radius = 6 + Math.sin(elapsedTime * 0.25 + index) * 1;
        
        element.position.x = Math.cos(baseAngle + elapsedTime * 0.08) * radius;
        element.position.z = Math.sin(baseAngle + elapsedTime * 0.08) * radius;
        element.position.y += Math.sin(elapsedTime * 0.7 + index) * 0.012;
        
        // Animate individual components
        element.children.forEach((child, childIndex) => {
          if (child instanceof THREE.Group) {
            child.rotation.y += 0.02 * (childIndex + 1);
          }
        });
      });
      
      // Animate particle system
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime + i * 0.1) * 0.002;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y += 0.001;
      
      // Dynamic lighting
      accentLight1.intensity = 1.2 + Math.sin(elapsedTime * 2) * 0.3;
      accentLight2.intensity = 0.8 + Math.cos(elapsedTime * 1.5) * 0.2;
      
      renderer.render(scene, camera);
    };

    animate(0);
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Loading overlay */}
      <motion.div
        className={`absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10 ${
          isLoaded ? 'pointer-events-none' : ''
        }`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-foreground-secondary">Loading 3D Experience...</p>
        </div>
      </motion.div>
    </div>
  );
};