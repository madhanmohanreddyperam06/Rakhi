import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './FinalCelebration.css';
import finalPhoto from '../Photos/final-photo.jpeg';

const FinalCelebration = ({ onReplay }) => {
  const [showGreeting, setShowGreeting] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [triggerCelebration, setTriggerCelebration] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowGreeting(true), 500),
      setTimeout(() => setShowStats(true), 1500),
      setTimeout(() => setShowMessage(true), 3000),
      setTimeout(() => {
        setTriggerCelebration(true);
        setShowReplay(true);
      }, 5000)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleReplay = () => {
    onReplay();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="final-celebration"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Celebration Effects */}
      {triggerCelebration && (
        <div className="celebration-effects">
          {/* Rakhi */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`rakhi-${i}`}
              className="effect-rakhi"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: -Math.random() * 400 - 100,
                scale: [0, 1.5, 1],
                rotate: [0, 360],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            >
              🧵
            </motion.div>
          ))}

          {/* Diyas */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`diya-${i}`}
              className="effect-diya"
              initial={{
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{
                x: Math.cos(i * 45 * Math.PI / 180) * 200,
                y: Math.sin(i * 45 * Math.PI / 180) * 200,
                scale: [0, 1.2, 1],
                opacity: [1, 0.6, 0]
              }}
              transition={{
                duration: 2.5,
                delay: 0.3 + i * 0.15,
                ease: "easeOut"
              }}
            >
              🪔
            </motion.div>
          ))}

          {/* Flowers */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`flower-${i}`}
              className="effect-flower"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: -Math.random() * 350 - 150,
                scale: [0, 1.3, 0.8],
                rotate: [0, Math.random() * 360],
                opacity: [1, 0.7, 0]
              }}
              transition={{
                duration: 3,
                delay: 0.5 + i * 0.1,
                ease: "easeOut"
              }}
            >
              🌸
            </motion.div>
          ))}

          {/* Hearts */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="effect-heart"
              initial={{
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 350,
                y: -Math.random() * 300 - 100,
                scale: [0, 1.5, 1],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 2.8,
                delay: 0.2 + i * 0.12,
                ease: "easeOut"
              }}
            >
              ❤️
            </motion.div>
          ))}

          {/* Golden Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="effect-particle"
              initial={{
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                scale: [0, 1, 0.5],
                opacity: [1, 0.6, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.08,
                ease: "easeOut"
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Confetti */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="effect-confetti"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 500,
                y: -Math.random() * 400 - 200,
                scale: [0, 1, 0.6],
                rotate: [0, Math.random() * 720],
                opacity: [1, 0.7, 0]
              }}
              transition={{
                duration: 3.5,
                delay: 0.4 + i * 0.05,
                ease: "easeOut"
              }}
              style={{
                backgroundColor: [
                  rakhiConfig.colors.red,
                  rakhiConfig.colors.gold,
                  rakhiConfig.colors.orange,
                  rakhiConfig.colors.pink,
                  rakhiConfig.colors.purple
                ][i % 5]
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="final-content"
        variants={containerVariants}
      >
        {/* Greeting */}
        <AnimatePresence>
          {showGreeting && (
            <motion.h1
              className="final-greeting"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ color: rakhiConfig.colors.gold }}
            >
              {rakhiConfig.finalMessages.greeting}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Photo */}
        <AnimatePresence>
          {showGreeting && (
            <motion.img
              src={finalPhoto}
              alt="Celebration Photo"
              className="final-photo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Stats */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              className="final-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.p
                className="stat-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: rakhiConfig.colors.lightText }}
              >
                {rakhiConfig.finalMessages.distance.replace('[distance]', '1000 km')}
              </motion.p>
              <motion.p
                className="stat-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{ color: rakhiConfig.colors.pink }}
              >
                {rakhiConfig.finalMessages.love}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="final-messages">
          <AnimatePresence>
            {showMessage && (
              <motion.p
                className="final-message highlight"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{ color: rakhiConfig.colors.pink }}
              >
                {rakhiConfig.finalMessages.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Replay Button */}
        <AnimatePresence>
          {showReplay && (
            <motion.button
              className="replay-button"
              onClick={handleReplay}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                borderColor: rakhiConfig.colors.gold
              }}
            >
              <span className="replay-text">{rakhiConfig.finalMessages.replay}</span>
              <motion.span
                className="replay-icon"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🔄
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FinalCelebration;
