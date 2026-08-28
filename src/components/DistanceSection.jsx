import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './DistanceSection.css';

const DistanceSection = ({ onContinue }) => {
  const [showConnection, setShowConnection] = useState(false);
  const [showRakhi, setShowRakhi] = useState(false);
  const [showBondMessage, setShowBondMessage] = useState(false);
  const [showVirtualMessage, setShowVirtualMessage] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Sequence the animations
    const timers = [
      setTimeout(() => setShowConnection(true), 1000),      // Show connection after 1s
      setTimeout(() => setShowRakhi(true), 2000),            // Start rakhi animation after 2s
      setTimeout(() => setShowBondMessage(true), 4000),     // Show bond message after 4s
      setTimeout(() => setShowVirtualMessage(true), 6000),  // Show virtual message after 6s
      setTimeout(() => setShowCTA(true), 7000),              // Show CTA after 7s
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleContinue = () => {
    onContinue();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="distance-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="distance-container">
        {/* Me - Top Location */}
        <motion.div
          className="location me-location"
          variants={itemVariants}
        >
          <motion.div
            className="location-avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="avatar-icon">👨</span>
          </motion.div>
          <motion.h3
            className="location-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ color: rakhiConfig.colors.gold }}
          >
            {rakhiConfig.distanceMessages.me}
          </motion.h3>
          <motion.p
            className="location-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {rakhiConfig.locations.me}
          </motion.p>
        </motion.div>

        {/* Glowing Connection */}
        <AnimatePresence>
          {showConnection && (
            <motion.div
              className="connection-line"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '200px', opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div
                className="connection-glow"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Rakhi/Thread */}
        <AnimatePresence>
          {showRakhi && (
            <motion.div
              className="rakhi-traveler"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 200, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <motion.div
                className="rakhi-thread"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="rakhi-knot">🎀</div>
                <div className="thread-line" />
              </motion.div>
              <motion.div
                className="travel-sparkle"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* My Sister - Bottom Location */}
        <motion.div
          className="location sister-location"
          variants={itemVariants}
        >
          <motion.div
            className="location-avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
          >
            <span className="avatar-icon">👩</span>
          </motion.div>
          <motion.h3
            className="location-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ color: rakhiConfig.colors.pink }}
          >
            {rakhiConfig.distanceMessages.sister}
          </motion.h3>
          <motion.p
            className="location-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {rakhiConfig.locations.sister}
          </motion.p>
        </motion.div>

        {/* Bond Message */}
        <AnimatePresence>
          {showBondMessage && (
            <motion.div
              className="bond-message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {rakhiConfig.distanceMessages.bond.map((message, index) => (
                <motion.p
                  key={index}
                  className="bond-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.5, duration: 0.8 }}
                  style={{
                    color: index === 1 ? rakhiConfig.colors.pink : rakhiConfig.colors.lightText
                  }}
                >
                  {message}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Virtual Rakhi Message */}
        <AnimatePresence>
          {showVirtualMessage && (
            <motion.div
              className="virtual-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="virtual-text"
                style={{ color: rakhiConfig.colors.gold }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {rakhiConfig.distanceMessages.virtual}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <AnimatePresence>
          {showCTA && (
            <motion.button
              className="cta-button distance-cta"
              onClick={handleContinue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                borderColor: rakhiConfig.colors.gold
              }}
            >
              <span className="cta-text">{rakhiConfig.distanceMessages.cta}</span>
              <motion.span
                className="cta-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DistanceSection;
