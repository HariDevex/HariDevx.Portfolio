import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

// Component to handle smooth camera movement based on scroll triggers
function CameraController({ scrollValues }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, scrollValues.current.cameraX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollValues.current.cameraY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, scrollValues.current.cameraZ, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Morphing 3D centerpiece mesh that rotates, scales, and recolors based on active sections
function MorphingShape({ scrollValues, theme }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Add subtle interactive mouse parallax
    const mouseX = state.pointer.x * 0.45;
    const mouseY = state.pointer.y * 0.45;

    // Smoothly interpolate position
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, scrollValues.current.shapePositionX + mouseX, 0.06);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, scrollValues.current.shapePositionY + mouseY, 0.06);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, scrollValues.current.shapePositionZ, 0.06);

    // Smoothly interpolate rotation (adding slow baseline rotation)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, scrollValues.current.shapeRotationX + t * 0.1, 0.06);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, scrollValues.current.shapeRotationY + t * 0.15, 0.06);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, scrollValues.current.shapeRotationZ, 0.06);

    // Smoothly interpolate scale
    const targetScale = scrollValues.current.shapeScale;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.06));

    // Smoothly interpolate color
    const targetColor = new THREE.Color(scrollValues.current.shapeColor);
    meshRef.current.material.color.lerp(targetColor, 0.04);

    // Smoothly interpolate distortion factor
    meshRef.current.material.distort = THREE.MathUtils.lerp(meshRef.current.material.distort, scrollValues.current.distort, 0.06);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 150, 20]} />
      <MeshDistortMaterial
        color="#0ea5e9"
        attach="material"
        distort={0.3}
        speed={1.8}
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}

// Particle System that speeds up and rotates based on scrolling
function ParticleSystem({ scrollValues, theme }) {
  const pointsRef = useRef();
  const particleCount = 350;

  // Create static buffer positions
  const positions = useRef(
    new Float32Array(
      Array.from({ length: particleCount * 3 }, () => (Math.random() - 0.5) * 18)
    )
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Rotate particle system
    pointsRef.current.rotation.y = t * 0.015 * scrollValues.current.particleSpeed;
    pointsRef.current.rotation.x = t * 0.008 * scrollValues.current.particleSpeed;
  });

  const pColor = theme === 'dark' ? '#0ea5e9' : '#0369a1';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={pColor}
        sizeAttenuation={true}
        transparent
        opacity={theme === 'dark' ? 0.75 : 0.45}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Secondary floating nodes that appear in the 'Skills' section
function FloatingNodes({ scrollValues }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Rotate the group
    groupRef.current.rotation.y = t * 0.08;

    // Interpolate vertical placement based on scroll state
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollValues.current.nodesPositionY, 0.06);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, scrollValues.current.nodesPositionZ, 0.06);

    // Bounce elements individually
    groupRef.current.children.forEach((child, index) => {
      child.position.y = Math.sin(t * 1.5 + index) * 0.25;
      child.rotation.x = t * 0.2 + index;
      child.rotation.y = t * 0.15;
    });
  });

  return (
    <group ref={groupRef} position={[0, -10, 0]}>
      {/* Node 1: Frontend */}
      <mesh position={[-2.4, 0, 1.2]}>
        <dodecahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#0ea5e9" wireframe roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Node 2: Backend */}
      <mesh position={[2.4, 0, -1.2]}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#10b981" wireframe roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Node 3: Database */}
      <mesh position={[-1.2, 1.8, -2.0]}>
        <icosahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#ec4899" wireframe roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Node 4: Languages & Tools */}
      <mesh position={[1.2, -1.8, 2.0]}>
        <tetrahedronGeometry args={[0.32]} />
        <meshStandardMaterial color="#f59e0b" wireframe roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

export default function Scene3D({ theme }) {
  const containerRef = useRef();

  // Reference for storing animation target values updated by GSAP
  const scrollValues = useRef({
    shapePositionX: window.innerWidth < 768 ? 0 : 2.0,
    shapePositionY: window.innerWidth < 768 ? -0.2 : 0,
    shapePositionZ: 0,
    shapeRotationX: 0,
    shapeRotationY: 0,
    shapeRotationZ: 0,
    shapeScale: window.innerWidth < 768 ? 0.75 : 1.15,
    shapeColor: '#0ea5e9',
    distort: 0.28,

    cameraX: 0,
    cameraY: 0,
    cameraZ: 4.8,

    particleSpeed: 1,

    nodesPositionY: -12, // Start off-screen
    nodesPositionZ: -2,
  });

  // Use GSAP ScrollTrigger to coordinate animations with section scroll states
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    const vals = scrollValues.current;

    // Safety check: only register scroll animations if elements are present (e.g. on HomePage)
    if (!document.getElementById('Home')) {
      vals.shapePositionX = 0;
      vals.shapePositionY = 0;
      vals.shapePositionZ = -1.0;
      vals.shapeScale = isMobile ? 0.75 : 1.2;
      vals.shapeColor = '#6366f1'; // Indigo for Contact
      vals.distort = 0.15;
      vals.cameraZ = 4.8;
      return;
    }

    // Adjust values dynamically on window resize
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile) {
        vals.shapePositionX = 0;
        vals.shapeScale = 0.75;
      } else {
        vals.shapePositionX = 2.0;
        vals.shapeScale = 1.15;
      }
    };
    window.addEventListener('resize', handleResize);

    // 1. Scroll past Home (Hero) into About
    gsap.timeline({
      scrollTrigger: {
        trigger: '#Home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: isMobile ? 0 : -2.3,
      shapePositionY: isMobile ? 1.6 : 0.2,
      shapePositionZ: -0.6,
      shapeScale: isMobile ? 0.55 : 0.85,
      shapeRotationX: 1.5,
      shapeRotationY: 0.8,
      shapeColor: '#8b5cf6', // Indigo/Purple
      distort: 0.38,
      cameraZ: 4.5,
      particleSpeed: 1.5,
    });

    // 2. Scroll from About to Skills
    gsap.timeline({
      scrollTrigger: {
        trigger: '#About',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: isMobile ? 0 : 2.3,
      shapePositionY: isMobile ? -1.6 : -0.2,
      shapePositionZ: 0.2,
      shapeScale: isMobile ? 0.65 : 1.05,
      shapeRotationX: -0.5,
      shapeRotationY: 2.4,
      shapeColor: '#ec4899', // Pink/Crimson
      distort: 0.2,
      nodesPositionY: 0, // Float technology nodes into view
      nodesPositionZ: 0,
      particleSpeed: 2.0,
    });

    // 3. Scroll from Skills to Experience
    gsap.timeline({
      scrollTrigger: {
        trigger: '#Skills',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: isMobile ? 0 : -2.3,
      shapePositionY: isMobile ? 1.5 : 0.3,
      shapePositionZ: -0.8,
      shapeScale: isMobile ? 0.55 : 0.85,
      shapeRotationX: 2.2,
      shapeRotationY: -1.2,
      shapeColor: '#10b981', // Emerald Green
      distort: 0.35,
      nodesPositionY: -12, // Float nodes back out of view
      particleSpeed: 1.5,
    });

    // 4. Scroll from Experience to Education
    gsap.timeline({
      scrollTrigger: {
        trigger: '#Experience',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: isMobile ? 0 : 2.3,
      shapePositionY: isMobile ? -1.5 : -0.4,
      shapePositionZ: 0,
      shapeScale: isMobile ? 0.65 : 1.0,
      shapeRotationX: -1.2,
      shapeRotationY: 1.8,
      shapeColor: '#f59e0b', // Amber/Orange
      distort: 0.42,
      particleSpeed: 1.2,
    });

    // 5. Scroll from Education to Stats & Profiles
    gsap.timeline({
      scrollTrigger: {
        trigger: '#education',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: 0,
      shapePositionY: isMobile ? 1.8 : 1.6,
      shapePositionZ: -2.2,
      shapeScale: isMobile ? 0.75 : 1.35,
      shapeRotationX: 2.8,
      shapeRotationY: 2.8,
      shapeColor: '#06b6d4', // Cyan
      distort: 0.18,
      particleSpeed: 1.8,
    });

    // 6. Scroll from Featured Case Study to Projects list
    gsap.timeline({
      scrollTrigger: {
        trigger: '#featured',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: isMobile ? 0 : -2.4,
      shapePositionY: 0,
      shapePositionZ: -0.4,
      shapeScale: isMobile ? 0.5 : 0.8,
      shapeRotationX: 0.4,
      shapeRotationY: 0.4,
      shapeColor: '#6366f1', // Indigo
      distort: 0.4,
      particleSpeed: 2.5,
    });

    // 7. Scroll from Projects to Certificates
    gsap.timeline({
      scrollTrigger: {
        trigger: '#Projects',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    })
    .to(vals, {
      shapePositionX: 0,
      shapePositionY: 0,
      shapePositionZ: -3.5,
      shapeScale: 2.6,
      shapeRotationX: 1.2,
      shapeRotationY: 3.5,
      shapeColor: '#3b82f6', // Bright Blue
      distort: 0.1,
      particleSpeed: 4.5, // Hyper speed particles in certificates gallery
    });

    // Make sure heights are accurately calculated
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="canvas-3d-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        transition: 'opacity 0.6s ease',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={theme === 'dark' ? 0.35 : 0.75} />
        
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={theme === 'dark' ? 1.6 : 1.0} 
          color="#ffffff"
        />
        
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={theme === 'dark' ? 0.8 : 0.5} 
          color="#0ea5e9"
        />

        <MorphingShape scrollValues={scrollValues} theme={theme} />
        
        <FloatingNodes scrollValues={scrollValues} />
        
        <ParticleSystem scrollValues={scrollValues} theme={theme} />
        
        <CameraController scrollValues={scrollValues} />

        {/* Postprocessing glow effect */}
        {theme === 'dark' && (
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.25} 
              luminanceSmoothing={0.9} 
              height={300} 
              intensity={0.65} 
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
