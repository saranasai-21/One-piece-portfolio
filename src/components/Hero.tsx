import { Component, type ErrorInfo, type ReactNode, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import gsap from 'gsap';

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('The 3D hero scene could not start.', error, info);
  }

  render() {
    if (this.state.failed) {
      return <div className="h-full w-full bg-[radial-gradient(circle_at_50%_35%,#0b5275_0%,#001f3f_45%,#050505_100%)]" />;
    }

    return this.props.children;
  }
}

/* ── 3D Ocean Plane ── */
function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(80, 80, 128, 128);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const y = 
        Math.sin(x * 0.15 + time * 0.8) * 0.6 +
        Math.sin(z * 0.1 + time * 0.6) * 0.4 +
        Math.sin((x + z) * 0.08 + time * 1.2) * 0.3 +
        Math.cos(x * 0.05 - time * 0.3) * 0.2;
      positions.setY(i, y);
    }
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <primitive object={geo} attach="geometry" />
      <meshStandardMaterial
        color="#004466"
        transparent
        opacity={0.85}
        metalness={0.6}
        roughness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── 3D Ship (Going Merry) ── */
function Ship() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.3 - 1.2;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
    groupRef.current.rotation.y = t * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -1.2, 0]} scale={0.6}>
        {/* Hull */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4, 0.6, 1.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Hull front taper */}
        <mesh position={[2.2, 0, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.9, 2, 4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Deck */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[3.6, 0.1, 1.6]} />
          <meshStandardMaterial color="#DEB887" roughness={0.7} />
        </mesh>
        {/* Mast */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 4, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Sail - Straw Hat emblem */}
        <mesh position={[0, 2.8, 0]} castShadow>
          <planeGeometry args={[2.2, 2]} />
          <meshStandardMaterial color="#F5F5DC" side={THREE.DoubleSide} />
        </mesh>
        {/* Straw Hat on sail */}
        <mesh position={[0, 2.8, 0.01]}>
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial color="#daa520" />
        </mesh>
        {/* Flag */}
        <mesh position={[0, 4.4, 0]} castShadow>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial color="#000000" side={THREE.DoubleSide} />
        </mesh>
        {/* Skull on flag */}
        <mesh position={[0, 4.4, 0.01]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Bowsprit */}
        <mesh position={[3, 0.2, 0]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 2.5, 6]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating Devil Fruits with Power Auras ── */
function DevilFruits() {
  const fruits = useMemo(() => {
    const items = [];
    const fruitData = [
      { color: '#c41e3a', power: 'Gomu Gomu' },
      { color: '#4b0082', power: 'Yami Yami' },
      { color: '#ff69b4', power: 'Ope Ope' },
      { color: '#ff8c00', power: 'Mera Mera' },
      { color: '#228b22', power: 'Suna Suna' },
      { color: '#1a3a5c', power: 'Gura Gura' },
      { color: '#daa520', power: 'Hito Hito' },
      { color: '#800080', power: 'Bari Bari' },
    ];
    for (let i = 0; i < 8; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 30,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 30
        ] as [number, number, number],
        ...fruitData[i],
        scale: 0.15 + Math.random() * 0.15,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return items;
  }, []);

  return (
    <>
      {fruits.map((fruit, i) => (
        <Float key={i} speed={fruit.speed} rotationIntensity={2} floatIntensity={1}>
          <mesh position={fruit.position} scale={fruit.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <MeshDistortMaterial
              color={fruit.color}
              roughness={0.3}
              metalness={0.4}
              distort={0.3}
              speed={2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ── Particle Sea Foam ── */
function SeaFoam() {
  const count = 500;
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 2 - 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      pos.setY(i, y + Math.sin(time + i * 0.1) * 0.002);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.5} />
    </points>
  );
}

/* ── Camera Controller ── */
function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(({ mouse }) => {
    gsap.to(camera.position, {
      x: mouse.x * 2,
      y: 3 + mouse.y * 1,
      duration: 1.5,
      ease: 'power2.out',
    });
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Three.js Scene — Dramatic Lighting ── */
function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.5}
        color="#ffeedd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 5, -5]} intensity={1.0} color="#4488ff" />
      <pointLight position={[5, 3, 5]} intensity={0.7} color="#ff4422" />
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#daa520" />
      <fog attach="fog" args={['#000a14', 12, 40]} />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0.1} fade speed={0.8} />
      <Ocean />
      <Ship />
      <DevilFruits />
      <SeaFoam />
    </>
  );
}

/* ── Hero Component ── */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.from('.hero-title-line', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.5,
    })
    .from('.hero-subtitle', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-scroll', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2');
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <SceneErrorBoundary>
          <Canvas
            camera={{ position: [0, 3, 12], fov: 55 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </SceneErrorBoundary>
      </div>

      {/* Dramatic Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-[var(--op-darker)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* Speed Lines Effect */}
      <div className="absolute inset-0 z-[1] speed-lines opacity-30" />

      {/* Dramatic anime impact lines */}
      <div className="absolute inset-0 z-[1] opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'repeating-conic-gradient(rgba(218,165,32,0.08) 0deg, transparent 2deg, transparent 8deg)',
          transformOrigin: 'center center',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Straw Hat Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-6"
        >
          <svg viewBox="0 0 120 80" className="w-28 h-20 drop-shadow-[0_0_30px_rgba(218,165,32,0.5)]">
            <ellipse cx="60" cy="55" rx="55" ry="12" fill="#c41e3a"/>
            <rect x="20" y="30" width="80" height="30" rx="20" fill="#f4a460"/>
            <rect x="20" y="45" width="80" height="8" fill="#c41e3a"/>
            <circle cx="60" cy="40" r="6" fill="#daa520" opacity="0.8"/>
          </svg>
        </motion.div>

        {/* Dramatic Title with Aura */}
        <div className="overflow-hidden mb-2 relative">
          <h1 className="hero-title-line text-pirate-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-golden leading-none relative">
            <span className="relative z-10">PORTFOLIO</span>
            <span className="absolute inset-0 text-golden opacity-30 blur-sm">PORTFOLIO</span>
          </h1>
        </div>
        <div className="overflow-hidden mb-2">
          <h2 className="hero-title-line text-pirate-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-golden/60 leading-none">
            OF THE
          </h2>
        </div>
        <div className="overflow-hidden mb-6 relative">
          <h1 className="hero-title-line text-pirate-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none relative"
              style={{
                background: 'linear-gradient(135deg, #c41e3a, #ff2d55, #c41e3a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(4px 4px 0 rgba(0,0,0,0.6))',
              }}>
            PIRATE KING
            {/* Glow aura behind text */}
            <span className="absolute inset-0 blur-lg opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, #c41e3a, #ff69b4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
              PIRATE KING
            </span>
          </h1>
        </div>

        {/* Dramatic Subtitle */}
        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mb-8 font-[family-name:var(--font-display)] italic">
          "In this world, one's worth is measured by the strength of their code!"
        </p>

        {/* Dramatic CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-treasure haki-hover"
            whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(218, 165, 32, 0.6), 0 0 80px rgba(218, 165, 32, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            ⚓ Enter the Grand Line
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-treasure gear-fifth-hover"
            style={{ background: 'linear-gradient(135deg, var(--op-red), var(--op-red-dark))', color: '#fff', borderColor: 'var(--op-red)' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            🔥 Unleash Conqueror's Haki
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-[family-name:var(--font-pirate)]">
            Scroll Down
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--op-gold)" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
