import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './SweetSection.css';

const SweetSection = ({ onContinue }) => {
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  const sweets = [
    {
      id: 1,
      name: 'Ladoo',
      emoji: '🟡',
      color: '#FFD700'
    },
    {
      id: 2,
      name: 'Peda',
      emoji: '🟤',
      color: '#8B4513'
    },
    {
      id: 3,
      name: 'Kaju Katli',
      emoji: '💎',
      color: '#DEB887'
    }
  ];

  const handleSweetSelect = (sweetId) => {
    setSelectedSweet(sweetId);
    setTimeout(() => {
      setShowMessages(true);
    }, 800);
  };

  const handleContinue = () => {
    onContinue();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const sweetVariants = {
    hover: { scale: 1.1, rotate: [0, -5, 5, -5, 0], transition: { rotate: { duration: 0.5 } } },
    tap: { scale: 0.95 },
    selected: { scale: [1, 1.3, 1.2, 1.3, 1.2], y: [0, -20, 0, -15, 0], rotate: [0, 360], transition: { duration: 0.8, ease: "easeInOut" } }
  };

  return (
    <motion.div
      className="sweet-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="sweet-container"
        variants={containerVariants}
      >
        {/* Prompt */}
        <motion.h2
          className="sweet-prompt"
          variants={itemVariants}
          style={{ color: rakhiConfig.colors.gold }}
        >
          {rakhiConfig.sweetSectionMessages.prompt}
        </motion.h2>

        {/* Festive Plate */}
        <motion.div
          className="festive-plate"
          variants={itemVariants}
        >
          <div className="plate-base">
            <div className="plate-pattern" />
            <div className="plate-border" />
          </div>

          {/* Sweets */}
          <div className="sweets-grid">
            {sweets.map((sweet, index) => (
              <motion.div
                key={sweet.id}
                className={`sweet-item ${selectedSweet === sweet.id ? 'selected' : ''}`}
                variants={itemVariants}
                onClick={() => !selectedSweet && handleSweetSelect(sweet.id)}
                whileHover={!selectedSweet ? "hover" : {}}
                whileTap={!selectedSweet ? "tap" : {}}
                animate={selectedSweet === sweet.id ? "selected" : {}}
                style={{ '--sweet-color': sweet.color }}
              >
                <div className="sweet-emoji">{sweet.emoji}</div>
                <div className="sweet-name">{sweet.name}</div>
                
                {/* Sparkles */}
                <AnimatePresence>
                  {selectedSweet === sweet.id && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="sweet-sparkle"
                          initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1
                          }}
                          animate={{
                            x: Math.cos(i * 60 * Math.PI / 180) * 50,
                            y: Math.sin(i * 60 * Math.PI / 180) * 50,
                            scale: [0, 1, 0.5],
                            opacity: [1, 0.8, 0]
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {showMessages && (
            <motion.div
              className="sweet-messages"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="sweet-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ color: rakhiConfig.colors.lightText }}
              >
                {rakhiConfig.sweetSectionMessages.message1}
              </motion.p>

              <motion.p
                className="sweet-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ color: rakhiConfig.colors.pink }}
              >
                {rakhiConfig.sweetSectionMessages.message2}
              </motion.p>

              <motion.button
                className="cta-button"
                onClick={handleContinue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                  borderColor: rakhiConfig.colors.gold
                }}
              >
                <span className="cta-text">{rakhiConfig.sweetSectionMessages.cta}</span>
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

export default SweetSection;
