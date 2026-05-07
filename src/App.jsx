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
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
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

// --- 2. Interactive Globe Component ---
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
      <group ref={earthRef} position={[window.innerWidth < 768 ? 0 : 1.5, 0, 0]}> 
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

// --- 3. Global Responsive Styles ---
const glowHeader = { 
  textShadow: '0 0 20px rgba(0, 255, 255, 0.6)', 
  fontSize: 'clamp(32px, 8vw, 75px)', 
  letterSpacing: 'clamp(2px, 1.5vw, 15px)', 
  lineHeight: '1.2', 
  textAlign: 'center',
  marginBottom: 'clamp(20px, 5vh, 40px)',
  fontWeight: '900',
  textTransform: 'uppercase'
};

const sectionPadding = { 
  paddingTop: 'clamp(140px, 20vh, 220px)', 
  paddingBottom: '80px',
  paddingLeft: '5%',
  paddingRight: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh'
};

// --- 4. Page Components ---
const Home = ({ setSelected }) => {
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{ 
      height: '100vh', display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row', 
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 5%'
    }}>
      <div style={{ zIndex: 10, maxWidth: isMobile ? '100%' : '550px', textAlign: isMobile ? 'center' : 'left', marginTop: isMobile ? '60px' : '0' }}>
        <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} style={glowHeader}>
          GLOBAL <br/><span style={{ color: 'cyan' }}>SCIENCE</span>
        </motion.h1>
        <p style={{ opacity: 0.5, fontSize: 'clamp(14px, 2vw, 18px)', textAlign: isMobile ? 'center' : 'left' }}>
          Decoding the Human Mind and Biological Immortality.
        </p>
      </div>
      <div style={{ position: isMobile ? 'relative' : 'absolute', right: isMobile ? '0' : '-10%', width: isMobile ? '100%' : '75%', height: isMobile ? '40vh' : '100%', zIndex: 1 }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 12 : 9]} />
          <Stars count={3000} factor={4} fade />
          <Suspense fallback={null}><GlobeScene setSelected={setSelected} /></Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
};

const Community = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={sectionPadding}>
    <h1 style={glowHeader}>RESEARCH <span style={{ color: 'cyan' }}>NETWORK</span></h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', width: '100%', maxWidth: '1100px' }}>
      {['DR. ALISHBA', 'PROF. RAZA'].map((name, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '50px 30px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'cyan', margin: '0 auto 25px', boxShadow: '0 0 20px cyan' }} />
          <h3>{name}</h3>
          <button style={{ marginTop: '20px', width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid cyan', color: 'cyan', background: 'none', fontWeight: 'bold', cursor: 'pointer' }}>VIEW PROFILE</button>
        </div>
      ))}
    </div>
  </motion.div>
);

const Forum = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={sectionPadding}>
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <input placeholder="SEARCH..." style={{ width: '100%', padding: '18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: '100px', color: 'white', marginBottom: '60px' }} />
      <h1 style={glowHeader}>DISCOURSE <span style={{ color: 'cyan' }}>FORUM</span></h1>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '25px', borderLeft: '5px solid cyan' }}>
        <h3>Quantum Consciousness in Sindh</h3>
        <p style={{ opacity: 0.4, marginTop: '10px' }}>Active Researchers: 12 • 5 mins ago</p>
      </div>
    </div>
  </motion.div>
);

// --- 5. Main App Logic ---
const AppContent = () => {
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: 'white', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas><BackgroundParticles /></Canvas>
      </div>

      <nav style={{ position: 'fixed', top: '25px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', gap: 'clamp(15px, 4vw, 40px)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', padding: '12px 35px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
        {['HOME', 'COMMUNITY', 'FORUM'].map((label, i) => (
          <Link key={label} to={i === 0 ? '/' : `/${label.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', letterSpacing: '2px', opacity: location.pathname === (i === 0 ? '/' : `/${label.toLowerCase()}`) ? 1 : 0.5 }}>{label}</Link>
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
          <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} style={{ position: 'fixed', bottom: '30px', right: '30px', width: '280px', background: 'rgba(0,0,0,0.9)', padding: '25px', borderRadius: '20px', border: '1px solid cyan', zIndex: 10000 }}>
            <h2 style={{ color: 'cyan' }}>{selected.label}</h2>
            <p style={{ opacity: 0.7, marginTop: '10px', fontSize: '14px' }}>{selected.info}</p>
            <button onClick={() => setSelected(null)} style={{ marginTop: '15px', padding: '8px 18px', borderRadius: '8px', border: 'none', background: 'cyan', fontWeight: 'bold', cursor: 'pointer' }}>CLOSE</button>
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