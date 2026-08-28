import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './GiftBox.css';

const GiftBox = ({ onContinue }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [currentPromiseIndex, setCurrentPromiseIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBoxClick = () => {
    if (isOpened) return;
    setIsOpened(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowReveal(true);
    }, 1500);

    setTimeout(() => {
      setCurrentPromiseIndex(1);
    }, 3500);

    setTimeout(() => {
      setCurrentPromiseIndex(2);
    }, 5500);

    setTimeout(() => {
      setCurrentPromiseIndex(3);
    }, 7500);

    setTimeout(() => {
      setCurrentPromiseIndex(4);
    }, 9500);
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

  const boxShakeVariants = {
    idle: { rotate: 0 },
    shake: { rotate: [-5, 5, -5, 5, -5, 5, -3, 3, -3, 3, 0], transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const lidVariants = {
    closed: { rotateX: 0, y: 0 },
    open: { rotateX: -110, y: -20, transition: { duration: 0.8, delay: 0.8, ease: "easeOut" } }
  };

  const lightVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: [0, 0.8, 0.6], scale: [0, 1.5, 2], transition: { duration: 2, delay: 1.2, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="gift-box-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="gift-container"
        variants={containerVariants}
      >
        {/* Initial Message */}
        <AnimatePresence>
          {!showReveal && (
            <motion.h2
              className="gift-prompt"
              variants={itemVariants}
              style={{ color: rakhiConfig.colors.gold }}
            >
              {rakhiConfig.giftBoxMessages.initial}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Gift Box */}
        <motion.div
          className="gift-box-wrapper"
          variants={itemVariants}
          onClick={handleBoxClick}
          style={{ cursor: isOpened ? 'default' : 'pointer' }}
        >
          <motion.div
            className="gift-box"
            animate={isOpened ? "shake" : "idle"}
            variants={boxShakeVariants}
          >
            {/* Box Body */}
            <div className="box-body">
              <div className="box-front" />
              <div className="box-side" />
              <div className="ribbon-vertical" />
              <div className="ribbon-horizontal" />
              <div className="bow" />
            </div>

            {/* Box Lid */}
            <motion.div
              className="box-lid"
              variants={lidVariants}
              animate={isOpened ? "open" : "closed"}
            >
              <div className="lid-top" />
              <div className="lid-ribbon-vertical" />
              <div className="lid-ribbon-horizontal" />
              <div className="lid-bow" />
            </motion.div>

            {/* Golden Light */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  className="golden-light"
                  variants={lightVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}
            </AnimatePresence>

            {/* Confetti */}
            <AnimatePresence>
              {showConfetti && (
                <div className="confetti-container">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={`confetti-${i}`}
                      className="confetti"
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        rotate: 0
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 400,
                        y: -Math.random() * 300 - 100,
                        scale: [0, 1, 0.5],
                        rotate: [0, Math.random() * 720],
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 1.5 + i * 0.05,
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
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Reveal Messages */}
        <AnimatePresence>
          {showReveal && (
            <motion.div
              className="reveal-messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="reveal-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ color: rakhiConfig.colors.lightText }}
              >
                {rakhiConfig.giftBoxMessages.reveal1}
              </motion.p>

              <motion.p
                className="reveal-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{ color: rakhiConfig.colors.gold }}
              >
                {rakhiConfig.giftBoxMessages.reveal2}
              </motion.p>

              {/* Promises */}
              <div className="promises-list">
                {rakhiConfig.giftBoxMessages.promises.map((promise, index) => (
                  <motion.p
                    key={index}
                    className={`promise-text ${index <= currentPromiseIndex ? 'visible' : ''}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                      opacity: index <= currentPromiseIndex ? 1 : 0,
                      x: index <= currentPromiseIndex ? 0 : -30
                    }}
                    transition={{
                      delay: 2 + index * 2,
                      duration: 0.8
                    }}
                    style={{
                      color: index === 4 ? rakhiConfig.colors.pink : rakhiConfig.colors.lightText
                    }}
                  >
                    {promise}
                  </motion.p>
                ))}
              </div>

              {/* CTA Button */}
              <AnimatePresence>
                {currentPromiseIndex >= 4 && (
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
                    <span className="cta-text">{rakhiConfig.giftBoxMessages.cta}</span>
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
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default GiftBox;
