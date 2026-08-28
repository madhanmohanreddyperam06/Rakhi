import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './TilakCeremony.css';

const TilakCeremony = ({ onContinue }) => {
  const [showGif, setShowGif] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const handleApplyTilak = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowComplete(true);
    }, 2500);
  };

  const handleContinue = () => {
    onContinue();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="tilak-ceremony"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="tilak-ceremony-container"
        variants={containerVariants}
      >
        <motion.div
          className="ceremony-instructions"
          variants={itemVariants}
        >
          <motion.h2
            className="instruction-text"
            style={{ color: rakhiConfig.colors.gold }}
          >
            {rakhiConfig.tilakCeremonyMessages.instruction1}
          </motion.h2>
          <motion.p
            className="instruction-subtext"
            variants={itemVariants}
            style={{ color: rakhiConfig.colors.lightText }}
          >
            {rakhiConfig.tilakCeremonyMessages.instruction2}
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {!showGif && (
            <motion.button
              className="cta-button"
              onClick={handleApplyTilak}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                borderColor: rakhiConfig.colors.gold
              }}
            >
              <span className="cta-text">Apply Tilak</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGif && (
            <motion.div
              className="gif-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/src/photos/rakhi_tilak_animation.gif"
                alt="Tilak Animation"
                className="tilak-gif"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showComplete && (
            <motion.div
              className="complete-message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h3
                className="complete-title"
                style={{ color: rakhiConfig.colors.gold }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                {rakhiConfig.tilakCeremonyMessages.complete}
              </motion.h3>

              <motion.button
                className="cta-button"
                onClick={handleContinue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                  borderColor: rakhiConfig.colors.gold
                }}
              >
                <span className="cta-text">{rakhiConfig.tilakCeremonyMessages.cta}</span>
                <motion.span
                  className="cta-arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TilakCeremony;
