import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);
  const [diyas, setDiyas] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: rakhiConfig.animations.particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 10
    }));
    setParticles(newParticles);
    const newDiyas = Array.from({ length: rakhiConfig.animations.diyaCount }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      delay: Math.random() * 5,
      scale: 0.8 + Math.random() * 0.4
    }));
    setDiyas(newDiyas);
  }, []);

  return (
    <>
      <div className="animated-background" />
      <div className="particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{ left: `${particle.left}%` }}
            animate={{ y: [-100, window.innerHeight + 100], opacity: [0, 0.6, 0.6, 0], rotate: [0, 360] }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
      <div className="diyas-container">
        {diyas.map((diya) => (
          <motion.div
            key={diya.id}
            className="diya"
            style={{ left: `${diya.left}%`, top: `${diya.top}%`, scale: diya.scale }}
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, delay: diya.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div className="diya-flame" animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} />
            <div className="diya-base" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
