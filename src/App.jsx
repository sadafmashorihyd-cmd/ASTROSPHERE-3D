import React, { useRef, useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';


// --- 1. GLOBAL RESPONSIVE STYLES ---
const glowHeader = { 
  textShadow: '0 0 20px rgba(0, 255, 255, 0.6)', 
  // Mobile par 28px, Tablet par medium, aur Desktop par 60px tak jaye ga
  fontSize: 'clamp(28px, 8vw, 60px)', 
  letterSpacing: 'clamp(2px, 1.5vw, 15px)', 
  lineHeight: '1.2', 
  textAlign: 'center',
  marginBottom: 'clamp(30px, 8vh, 100px)',
  width: '100%',
  fontWeight: '900',
  textTransform: 'uppercase'
};

const sectionPadding = { 
  // Navbar se door rakhne ke liye dynamic padding
  paddingTop: 'clamp(140px, 20vh, 220px)', 
  paddingBottom: '80px',
  paddingLeft: '5%',
  paddingRight: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%'
};

// --- 2. HOME COMPONENT (Multi-Device Support) ---
const Home = ({ setSelected }) => {
  // Screen size check karne ke liye state (taake resize par design na tootay)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      // Mobile par Column, Desktop par Row
      flexDirection: isMobile ? 'column' : 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative', 
      overflow: 'hidden',
      padding: '0 5%'
    }}>
      {/* Text Container */}
      <div style={{ 
        zIndex: 10, 
        maxWidth: isMobile ? '100%' : '550px', 
        pointerEvents: 'none',
        marginTop: isMobile ? '80px' : '0',
        flexShrink: 0
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...glowHeader, lineHeight: '1.1' }}
        >
          GLOBAL <br/>
          <span style={{ color: 'cyan', textShadow: '0 0 30px cyan' }}>SCIENCE</span>
        </motion.h1>
        <p style={{ opacity: 0.5, marginTop: '20px', fontSize: 'clamp(14px, 2vw, 18px)', letterSpacing: '1px' }}>
          Decoding the Human Mind and Biological Immortality.
        </p>
      </div>

      {/* 3D Globe Container */}
      <div style={{ 
        position: isMobile ? 'relative' : 'absolute', 
        right: isMobile ? '0' : '0', 
        width: isMobile ? '100%' : '75%', 
        height: isMobile ? '45vh' : '100%',
        zIndex: 1
      }}>
        <Canvas>
          {/* Camera position adjusts for mobile vs desktop */}
          <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 12 : 9]} />
          <Stars count={3000} factor={4} fade />
          <ambientLight intensity={1.5} />
          <Suspense fallback={null}>
            <GlobeScene setSelected={setSelected} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
};

// --- 3. UPDATED COMMUNITY & FORUM (Using sectionPadding) ---
const Community = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={sectionPadding}>
    <h1 style={glowHeader}>RESEARCH <span style={{ color: 'cyan' }}>NETWORK</span></h1>
    {/* Grid setup for responsiveness */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '40px', 
      width: '100%', 
      maxWidth: '1200px' 
    }}>
      {['DR. ALISHBA', 'PROF. RAZA'].map((name, i) => (
        <motion.div 
          key={i} 
          whileHover={{ y: -10, borderColor: 'cyan' }}
          style={{ 
            background: 'rgba(255,255,255,0.02)', padding: '50px 30px', 
            borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', 
            textAlign: 'center', backdropFilter: 'blur(20px)' 
          }}
        >
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'cyan', margin: '0 auto 25px', boxShadow: '0 0 20px cyan' }} />
          <h3 style={{ letterSpacing: '2px' }}>{name}</h3>
          <button style={{ marginTop: '30px', width: '100%', padding: '12px', borderRadius: '15px', border: '1px solid cyan', color: 'cyan', cursor: 'pointer', fontWeight: 'bold' }}>VIEW PROFILE</button>
        </motion.div>
      ))}
    </div>
  </motion.div>
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