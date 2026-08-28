import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './RakhiSelection.css';

const RakhiSelection = ({ onContinue, onRakhiSelect }) => {
  const [isCollected, setIsCollected] = useState(false);

  const handleCollect = () => {
    setIsCollected(true);
    if (onRakhiSelect) {
      onRakhiSelect(1);
    }
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

  const cardVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 40px rgba(255, 193, 7, 0.3)" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="rakhi-selection"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="selection-content"
        variants={containerVariants}
      >
        <motion.h2
          className="selection-prompt"
          variants={itemVariants}
          style={{ color: rakhiConfig.colors.gold }}
        >
          {rakhiConfig.rakhiSelectionMessages.prompt}
        </motion.h2>

        <motion.div
          className="rakhi-single"
          variants={itemVariants}
        >
          <motion.div
            className="rakhi-card"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            style={{
              borderColor: rakhiConfig.colors.gold,
              boxShadow: `0 0 30px ${rakhiConfig.colors.gold}40`
            }}
          >
            <div className="rakhi-image-container">
              <img
                src="/src/photos/image.png"
                alt="Rakhi"
                className="rakhi-image"
              />
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {!isCollected ? (
            <motion.button
              className="cta-button"
              variants={itemVariants}
              onClick={handleCollect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                borderColor: rakhiConfig.colors.gold
              }}
            >
              <span className="cta-text">Collect Rakhi</span>
            </motion.button>
          ) : (
            <motion.button
              className="cta-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                borderColor: rakhiConfig.colors.gold
              }}
            >
              <span className="cta-text">{rakhiConfig.rakhiSelectionMessages.cta}</span>
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
      </motion.div>
    </motion.div>
  );
};

export default RakhiSelection;
