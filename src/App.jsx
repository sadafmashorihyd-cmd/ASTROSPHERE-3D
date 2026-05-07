import React, { useRef, useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- 1. Background Floating Particles ---
const BackgroundParticles = () => {
  const points = useRef();
  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={1500} 
          array={new Float32Array(4500).map(() => (Math.random() - 0.5) * 30)} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="cyan" transparent opacity={0.4} />
    </points>
  );
};

// --- 2. Interactive Globe Component (Shifted Right) ---
const GlobeScene = ({ setSelected }) => {
  const earthRef = useRef();
  const [colorMap] = useLoader(THREE.TextureLoader, ['earth_color.jpg']);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.1;
  });

  const markers = [
    { id: 1, pos: [1.8, 0.5, 1], label: "Project S.Q.U.", info: "Standardized Units of Suffering." },
    { id: 2, pos: [-1.2, 1.2, 1.2], label: "Consciousness", info: "Mind-Brain Interface Research." }
  ];

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      {/* Globe position shifted to the right in the 3D space */}
      <group ref={earthRef} position={[1.5, 0, 0]}> 
        <mesh>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial map={colorMap} metalness={0.4} roughness={0.7} />
        </mesh>
        {markers.map((m) => (
          <mesh key={m.id} position={m.pos} onClick={() => setSelected(m)}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="cyan" />
          </mesh>
        ))}
      </group>
    </>
  );
};

// --- 3. Home Component (Layout Fix) ---
const Home = ({ setSelected }) => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '6%', position: 'relative', overflow: 'hidden' }}>
    {/* Left Side Content - Pushed slightly more to the left */}
    <div style={{ zIndex: 10, maxWidth: '550px', pointerEvents: 'none' }}>
      <motion.h1 
        initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}
        style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '900', letterSpacing: '8px', lineHeight: '1', textShadow: '0 0 25px rgba(0,255,255,0.7)' }}
      >
        GLOBAL <br/><span style={{ color: 'cyan' }}>SCIENCE</span>
      </motion.h1>
      <p style={{ opacity: 0.6, marginTop: '30px', fontSize: '18px', maxWidth: '400px', lineHeight: '1.6' }}>
        Decoding the Human Mind and Biological Immortality.
      </p>
    </div>

    {/* Right Side 3D Globe - Shifted using absolute positioning and right offset */}
    <div style={{ position: 'absolute', right: '-10%', width: '75%', height: '100%', zIndex: 1 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} />
        <Stars count={3000} factor={4} fade />
        <Suspense fallback={null}>
          <GlobeScene setSelected={setSelected} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  </div>
);

// --- 4. Community & Forum Pages (Keeping Spacing Consistent) ---
const Community = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingTop: '220px', paddingLeft: '8%', paddingRight: '8%', color: 'white' }}>
    <h1 style={{ textAlign: 'center', letterSpacing: '10px', textShadow: '0 0 20px cyan', marginBottom: '80px' }}>RESEARCH NETWORK</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px' }}>
      {['DR. ALISHBA', 'PROF. RAZA'].map((name, i) => (
        <motion.div key={i} whileHover={{ y: -10, borderColor: 'cyan' }} 
          style={{ background: 'rgba(255,255,255,0.02)', padding: '50px 30px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', width: '320px', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'cyan', margin: '0 auto 25px', boxShadow: '0 0 15px cyan' }} />
          <h3>{name}</h3>
          <button style={{ marginTop: '30px', width: '100%', padding: '12px', borderRadius: '15px', border: '1px solid cyan', color: 'cyan', cursor: 'pointer', fontWeight: 'bold' }}>VIEW PROFILE</button>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Forum = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingTop: '220px', paddingLeft: '8%', paddingRight: '8%', color: 'white' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <input placeholder="SEARCH DISCUSSIONS..." style={{ width: '100%', padding: '22px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: '100px', color: 'white', marginBottom: '80px' }} />
      <h1 style={{ letterSpacing: '8px', color: 'cyan', textShadow: '0 0 15px cyan', marginBottom: '50px' }}>DISCOURSE FORUM</h1>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '5px solid cyan' }}>
        <h3>Quantum Consciousness in Sindh</h3>
        <p style={{ opacity: 0.4, marginTop: '10px' }}>Active Researchers: 12 • 5 mins ago</p>
      </div>
    </div>
  </motion.div>
);

// --- 5. Main App Content Wrapper ---
const AppContent = () => {
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: 'white', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas><BackgroundParticles /></Canvas>
      </div>

      <nav style={{ position: 'fixed', top: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', gap: '40px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', padding: '15px 50px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
        {['HOME', 'COMMUNITY', 'FORUM'].map((label, i) => (
          <Link key={label} to={i === 0 ? '/' : `/${label.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px', opacity: location.pathname === (i === 0 ? '/' : `/${label.toLowerCase()}`) ? 1 : 0.6 }}>{label}</Link>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home setSelected={setSelected} />} />
          <Route path="/community" element={<Community />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} style={{ position: 'fixed', bottom: '40px', right: '40px', width: '300px', background: 'rgba(0,0,0,0.9)', padding: '30px', borderRadius: '25px', border: '1px solid cyan', zIndex: 10000 }}>
            <h2 style={{ color: 'cyan' }}>{selected.label}</h2>
            <p style={{ opacity: 0.7, marginTop: '10px' }}>{selected.info}</p>
            <button onClick={() => setSelected(null)} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'cyan', fontWeight: 'bold', cursor: 'pointer' }}>CLOSE</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}