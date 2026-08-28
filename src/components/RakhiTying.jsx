import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './RakhiTying.css';

const RakhiTying = ({ onContinue }) => {
  const [showGif, setShowGif] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const handleTieRakhi = () => {
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
      className="rakhi-tying"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="rakhi-tying-container"
        variants={containerVariants}
      >
        <motion.div
          className="tying-instructions"
          variants={itemVariants}
        >
          <motion.h2
            className="instruction-text"
            style={{ color: rakhiConfig.colors.gold }}
          >
            {rakhiConfig.rakhiTyingMessages.instruction1}
          </motion.h2>
          <motion.p
            className="instruction-subtext"
            variants={itemVariants}
            style={{ color: rakhiConfig.colors.lightText }}
          >
            {rakhiConfig.rakhiTyingMessages.instruction2}
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {!showGif && (
            <motion.button
              className="cta-button"
              onClick={handleTieRakhi}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                borderColor: rakhiConfig.colors.gold
              }}
            >
              <span className="cta-text">Tie Rakhi</span>
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
                src="/photos/rakhi_tying_story_9x16_small.gif"
                alt="Rakhi Tying Animation"
                className="rakhi-gif"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showComplete && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h3
                className="success-title"
                style={{ color: rakhiConfig.colors.gold }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                {rakhiConfig.rakhiTyingMessages.success}
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
                <span className="cta-text">{rakhiConfig.rakhiTyingMessages.cta}</span>
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

export default RakhiTying;
