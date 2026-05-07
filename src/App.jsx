import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import * as THREE from 'three';

gsap.registerPlugin(Draggable);

// --- 1. Star Trail Cursor ---
const StarCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
      transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '18px', height: '18px',
        borderRadius: '50%', background: 'cyan', pointerEvents: 'none',
        zIndex: 9999, boxShadow: '0 0 15px cyan', mixBlendMode: 'screen'
      }}
    />
  );
};

// --- 2. Global Background ---
const GlobalBackground = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
    <Canvas>
      <Stars radius={150} depth={50} count={5000} factor={4} fade speed={1} />
    </Canvas>
  </div>
);

// --- 3. 3D Globe Component ---
const GlobeScene = ({ setSelected, selected }) => {
  const earthRef = useRef();
  const [colorMap, normalMap] = useLoader(THREE.TextureLoader, ['earth_color.jpg', 'earth_normal.jpg']);

  const markersData = [
    { id: 1, position: [1.8, 0.4, 1], label: "Project S.Q.U.", info: "Quantifying human suffering units.", color: "#0077ff" },
    { id: 2, position: [-1.2, 1.3, 1.2], label: "Consciousness Lab", info: "Decoding physical brain to mind bridge.", color: "#ff0055" },
    { id: 3, position: [0.3, -1.6, 1.5], label: "Vitalis AI", info: "Biological immortality research.", color: "#00ff88" }
  ];

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.12;
  });

  return (
    <>
      <ambientLight intensity={2.2} /> 
      <group ref={earthRef} position={[2.5, -0.2, 0]}> 
        <mesh>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial map={colorMap} normalMap={normalMap} emissive="#111" emissiveIntensity={0.6} />
        </mesh>
        {markersData.map((m) => (
          <mesh key={m.id} position={m.position} onClick={(e) => { e.stopPropagation(); setSelected(m); }}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color={selected?.id === m.id ? "#fff" : m.color} />
          </mesh>
        ))}
      </group>
    </>
  );
};

// --- 4. Page Components ---

const Home = ({ selected, setSelected }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '8%', position: 'relative', overflow: 'hidden' }}>
    <div style={{ zIndex: 100, color: 'white', maxWidth: '45%', pointerEvents: 'none', marginTop: '50px' }}>
      <h1 style={{ 
        fontSize: 'clamp(40px, 8vw, 65px)', // Responsive font size
        lineHeight: '1.1', 
        letterSpacing: '6px', 
        fontWeight: '900', 
        margin: '0' 
      }}>
        GLOBAL <br/> <span style={{ color: 'cyan', textShadow: '0 0 15px rgba(0, 255, 255, 0.4)' }}>SCIENCE</span>
      </h1>
      <p style={{ opacity: 0.8, fontSize: 'clamp(14px, 2vw, 18px)', marginTop: '30px', lineHeight: '1.6', textShadow: '2px 2px 10px rgba(0,0,0,1)' }}>
        Unlocking the mysteries of the <strong>Human Mind</strong> <br/> and <strong>Biological Immortality</strong>.
      </p>
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas><PerspectiveCamera makeDefault position={[0, 0, 9]} /><GlobeScene selected={selected} setSelected={setSelected} /><OrbitControls enablePan={false} enableDamping={true} /></Canvas>
    </div>
  </motion.div>
);

const Community = () => (
  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: '180px 10% 80px', color: 'white', minHeight: '100vh' }}>
    <h1 style={{ fontSize: 'clamp(30px, 5vw, 50px)', color: 'cyan', marginBottom: '40px' }}>Community Hub</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {[{ title: "Neuro-Group", m: "1.2k", g: "Synaptic Mapping" }, { title: "Longevity Lab", m: "850", g: "Cell Rejuvenation" }, { title: "Dark Energy Hub", m: "400", g: "Mind-Matter Study" }, { title: "Su Standards", m: "600", g: "Calibration" }].map((card, i) => (
        <div key={i} style={cardStyle}>
          <h2 style={{ color: 'cyan', fontSize: '20px' }}>{card.title}</h2>
          <p style={{ opacity: 0.6, fontSize: '12px' }}>{card.m} Members</p>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>{card.g}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const Forum = () => (
  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: '180px 10% 80px', color: 'white', minHeight: '100vh' }}>
    <h1 style={{ fontSize: 'clamp(30px, 5vw, 50px)', color: '#ff0055', marginBottom: '40px' }}>Discussion Forum</h1>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {[{ c: "General Research", p: "245", col: "#ff0055" }, { c: "Technical Su Units", p: "112", col: "#0077ff" }, { c: "Mind-Brain Bridge", p: "78", col: "#00ff88" }, { c: "Immortality Protocols", p: "56", col: "#f1c40f" }].map((item, i) => (
        <div key={i} style={{ ...forumItemStyle, borderLeftColor: item.col }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>{item.c}</h3>
          <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '12px' }}>{item.p} Posts</p>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- 5. App Component ---
const AppContent = () => {
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', cursor: 'none', background: 'black', overflowX: 'hidden' }}>
      <StarCursor />
      <GlobalBackground />
      
      <nav style={navbarStyle}>
        {['/', '/community', '/forum'].map((path, idx) => (
          <Link key={path} to={path} style={navLinkStyle}>
            {location.pathname === path && <motion.div layoutId="glow" style={navGlowStyle} />}
            <span style={{ position: 'relative', zIndex: 10 }}>{['HOME', 'COMMUNITY', 'FORUM'][idx]}</span>
          </Link>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home selected={selected} setSelected={setSelected} />} />
          <Route path="/community" element={<Community />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </AnimatePresence>

      {selected && (
        <div id="drag-card" style={detailCardStyle(selected.color)}>
          <button onClick={() => setSelected(null)} style={{ float: 'right', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          <h2 style={{ color: selected.color, fontSize: '22px' }}>{selected.label}</h2>
          <p style={{ fontSize: '14px', opacity: 0.85, marginTop: '10px' }}>{selected.info}</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (<Router><AppContent /></Router>);
}

// --- Styles ---
const navbarStyle = {
  position: 'fixed', top: '25px', left: '50%', transform: 'translateX(-50%)',
  zIndex: 5000, display: 'flex', gap: '30px', alignItems: 'center', height: '55px',
  background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)',
  padding: '0 40px', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.1)'
};

const navLinkStyle = { color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', letterSpacing: '2px', position: 'relative', padding: '8px 15px' };

const navGlowStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 255, 255, 0.15)', borderRadius: '30px', filter: 'blur(10px)', zIndex: 1 };

const cardStyle = { background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' };

const forumItemStyle = { background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '15px', borderLeft: '5px solid', cursor: 'pointer' };

const detailCardStyle = (color) => ({
  position: 'fixed', right: '30px', top: '120px', width: '280px', background: 'rgba(0,0,0,0.9)', padding: '25px', borderRadius: '20px', color: 'white', zIndex: 2000, border: `1px solid ${color}`, backdropFilter: 'blur(25px)'
});