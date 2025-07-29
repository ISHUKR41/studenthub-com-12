import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Enhanced3DContactSceneProps {
  className?: string;
}

export const Enhanced3DContactScene: React.FC<Enhanced3DContactSceneProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup with enhanced performance
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create premium 3D communication ecosystem with enhanced performance
    const createCommunicationEcosystem = () => {
      const communicationObjects: THREE.Object3D[] = [];
      
      // Premium material configurations with optimized rendering
      const createMaterial = (baseColor: number, type: 'metallic' | 'glass' | 'holographic' | 'neon') => {
        switch (type) {
          case 'metallic':
            return new THREE.MeshPhysicalMaterial({
              color: baseColor,
              metalness: 0.9,
              roughness: 0.1,
              emissive: baseColor,
              emissiveIntensity: 0.2,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1,
              envMapIntensity: 1.5
            });
          case 'glass':
            return new THREE.MeshPhysicalMaterial({
              color: baseColor,
              metalness: 0.0,
              roughness: 0.0,
              transmission: 0.95,
              transparent: true,
              opacity: 0.8,
              thickness: 0.5,
              ior: 1.5,
              clearcoat: 1.0,
              clearcoatRoughness: 0.0
            });
          case 'holographic':
            return new THREE.MeshPhysicalMaterial({
              color: baseColor,
              metalness: 0.3,
              roughness: 0.2,
              emissive: baseColor,
              emissiveIntensity: 0.4,
              iridescence: 1.0,
              iridescenceIOR: 1.3,
              transparent: true,
              opacity: 0.9
            });
          case 'neon':
            return new THREE.MeshBasicMaterial({
              color: baseColor,
              transparent: true,
              opacity: 0.9
            });
          default:
            return new THREE.MeshPhysicalMaterial({ color: baseColor });
        }
      };

      // Educational 3D objects with reduced complexity for better performance
      const objectTemplates = [
        {
          name: 'studyBook',
          geometry: () => new THREE.BoxGeometry(0.3, 0.4, 0.05),
          material: () => createMaterial(0x3B82F6, 'metallic'),
          count: 15
        },
        {
          name: 'graduationCap',
          geometry: () => {
            const group = new THREE.Group();
            const cap = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 12);
            const capMesh = new THREE.Mesh(cap, createMaterial(0x000000, 'metallic'));
            
            const board = new THREE.BoxGeometry(0.25, 0.25, 0.01);
            const boardMesh = new THREE.Mesh(board, createMaterial(0x000000, 'metallic'));
            boardMesh.position.y = 0.02;
            
            const tassel = new THREE.ConeGeometry(0.03, 0.15, 8);
            const tasselMesh = new THREE.Mesh(tassel, createMaterial(0xFFD700, 'neon'));
            tasselMesh.position.set(0.15, 0.08, 0);
            
            group.add(capMesh, boardMesh, tasselMesh);
            return group;
          },
          material: () => null,
          count: 12
        },
        {
          name: 'communicationOrb',
          geometry: () => new THREE.SphereGeometry(0.15, 20, 20),
          material: () => createMaterial(0x10B981, 'glass'),
          count: 20
        },
        {
          name: 'emailEnvelope',
          geometry: () => {
            const group = new THREE.Group();
            const envelope = new THREE.BoxGeometry(0.4, 0.25, 0.02);
            const envelopeMesh = new THREE.Mesh(envelope, createMaterial(0x6366F1, 'holographic'));
            
            // Add email icon
            const iconGeometry = new THREE.RingGeometry(0.05, 0.08, 8);
            const iconMesh = new THREE.Mesh(iconGeometry, createMaterial(0xFFFFFF, 'neon'));
            iconMesh.position.z = 0.015;
            
            group.add(envelopeMesh, iconMesh);
            return group;
          },
          material: () => null,
          count: 18
        },
        {
          name: 'techDevice',
          geometry: () => {
            const group = new THREE.Group();
            const device = new THREE.BoxGeometry(0.15, 0.25, 0.03);
            const deviceMesh = new THREE.Mesh(device, createMaterial(0x8B5CF6, 'metallic'));
            
            const screen = new THREE.PlaneGeometry(0.12, 0.18);
            const screenMesh = new THREE.Mesh(screen, createMaterial(0x00FFFF, 'neon'));
            screenMesh.position.z = 0.02;
            
            group.add(deviceMesh, screenMesh);
            return group;
          },
          material: () => null,
          count: 15
        },
        {
          name: 'knowledgeNetwork',
          geometry: () => new THREE.OctahedronGeometry(0.12),
          material: () => createMaterial(0xF59E0B, 'holographic'),
          count: 25
        },
        {
          name: 'supportSymbol',
          geometry: () => new THREE.TorusGeometry(0.12, 0.04, 12, 24),
          material: () => createMaterial(0xEF4444, 'glass'),
          count: 16
        },
        {
          name: 'innovationCube',
          geometry: () => new THREE.BoxGeometry(0.18, 0.18, 0.18),
          material: () => createMaterial(0x06B6D4, 'metallic'),
          count: 10
        }
      ];

      // Create objects with advanced positioning
      objectTemplates.forEach(template => {
        for (let i = 0; i < template.count; i++) {
          let object;
          
          if (typeof template.geometry === 'function') {
            const geometry = template.geometry();
            if (geometry instanceof THREE.Group) {
              object = geometry;
            } else {
              const material = template.material?.() || createMaterial(0xFFFFFF, 'metallic');
              object = new THREE.Mesh(geometry, material);
            }
          }
          
          if (object) {
            // Advanced positioning with multiple layers
            const layer = Math.floor(i / (template.count / 3));
            const angle = (i * 2 * Math.PI) / template.count;
            const radius = 8 + layer * 4;
            const height = (Math.random() - 0.5) * 20;
            
            object.position.set(
              Math.cos(angle) * radius + (Math.random() - 0.5) * 10,
              height,
              Math.sin(angle) * radius + (Math.random() - 0.5) * 10
            );
            
            object.rotation.set(
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2
            );
            
            // Add custom properties for animation
            (object as any).userData = {
              originalPosition: object.position.clone(),
              rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
              },
              floatAmplitude: Math.random() * 0.1 + 0.05,
              floatSpeed: Math.random() * 0.5 + 0.3,
              phase: Math.random() * Math.PI * 2
            };
            
            scene.add(object);
            communicationObjects.push(object);
          }
        }
      });

      return communicationObjects;
    };

    // Create advanced lighting setup
    const createAdvancedLighting = () => {
      // Ambient light for base illumination
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);
      
      // Primary directional light
      const mainLight = new THREE.DirectionalLight(0x3B82F6, 1.5);
      mainLight.position.set(20, 20, 10);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 4096;
      mainLight.shadow.mapSize.height = 4096;
      mainLight.shadow.camera.near = 0.5;
      mainLight.shadow.camera.far = 100;
      scene.add(mainLight);
      
      // Accent point lights for depth
      const lights = [
        { color: 0x10B981, position: [-15, 10, 5], intensity: 0.8 },
        { color: 0xF59E0B, position: [15, -10, 8], intensity: 0.6 },
        { color: 0x8B5CF6, position: [0, 0, 25], intensity: 0.7 },
        { color: 0xEF4444, position: [-10, -15, -5], intensity: 0.5 },
        { color: 0x06B6D4, position: [10, 15, -8], intensity: 0.6 }
      ];
      
      lights.forEach(lightConfig => {
        const pointLight = new THREE.PointLight(lightConfig.color, lightConfig.intensity, 50);
        pointLight.position.set(lightConfig.position[0], lightConfig.position[1], lightConfig.position[2]);
        scene.add(pointLight);
      });
      
      // Hemisphere light for natural feel
      const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x1e3a8a, 0.4);
      scene.add(hemisphereLight);
    };

    const communicationObjects = createCommunicationEcosystem();
    createAdvancedLighting();
    
    camera.position.set(0, 0, 25);
    camera.lookAt(0, 0, 0);

    const clock = new THREE.Clock();
    
    // Premium animation loop with performance optimization
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();
      
      // Advanced object animation with physics-like behavior
      communicationObjects.forEach((object, index) => {
        const userData = (object as any).userData;
        
        if (userData) {
          // Complex rotation with varying speeds
          object.rotation.x += userData.rotationSpeed.x;
          object.rotation.y += userData.rotationSpeed.y;
          object.rotation.z += userData.rotationSpeed.z;
          
          // Advanced floating motion with multiple sine waves
          const floatY = Math.sin(elapsedTime * userData.floatSpeed + userData.phase) * userData.floatAmplitude;
          const floatX = Math.cos(elapsedTime * userData.floatSpeed * 0.7 + userData.phase) * userData.floatAmplitude * 0.5;
          const floatZ = Math.sin(elapsedTime * userData.floatSpeed * 0.5 + userData.phase) * userData.floatAmplitude * 0.3;
          
          object.position.y = userData.originalPosition.y + floatY;
          object.position.x = userData.originalPosition.x + floatX;
          object.position.z = userData.originalPosition.z + floatZ;
          
          // Dynamic scaling effect
          const scaleVariation = 1 + Math.sin(elapsedTime * 2 + index * 0.5) * 0.1;
          object.scale.setScalar(scaleVariation);
          
          // Orbital motion for some objects
          if (index % 7 === 0) {
            const orbitRadius = 12;
            const orbitSpeed = 0.3;
            object.position.x = userData.originalPosition.x + Math.cos(elapsedTime * orbitSpeed + index) * orbitRadius * 0.3;
            object.position.z = userData.originalPosition.z + Math.sin(elapsedTime * orbitSpeed + index) * orbitRadius * 0.3;
          }
        }
      });

      // Cinematic camera movement
      const cameraRadius = 3;
      const cameraSpeed = 0.1;
      camera.position.x = Math.sin(elapsedTime * cameraSpeed) * cameraRadius;
      camera.position.y = Math.cos(elapsedTime * cameraSpeed * 0.7) * cameraRadius * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Responsive handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Mouse interaction for enhanced engagement
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x += (x * 2 - camera.position.x) * 0.02;
      camera.position.y += (y * 1 - camera.position.y) * 0.02;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Cleanup THREE.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};