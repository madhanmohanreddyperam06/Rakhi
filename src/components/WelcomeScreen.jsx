import React from 'react';
import { motion } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onContinue }) => {
  const { welcomeMessages, colors, animations } = rakhiConfig;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 30px rgba(255, 193, 7, 0.6)" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="welcome-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative Rakhi Thread */}
      <motion.div
        className="rakhi-thread"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      {/* Main Content */}
      <motion.div
        className="welcome-content"
        variants={containerVariants}
      >
        {/* Greeting */}
        <motion.h1
          className="greeting"
          variants={itemVariants}
          style={{ color: colors.gold }}
        >
          {welcomeMessages.greeting}
        </motion.h1>

        {/* Distance Message */}
        <motion.p
          className="message distance-message"
          variants={itemVariants}
        >
          {welcomeMessages.distance}
        </motion.p>

        {/* Promise Message */}
        <motion.p
          className="message promise-message"
          variants={itemVariants}
          style={{ color: colors.pink }}
        >
          {welcomeMessages.promise}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="cta-button"
          variants={itemVariants}
          onClick={onContinue}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          style={{
            background: `linear-gradient(135deg, ${colors.orange}, ${colors.red})`,
            borderColor: colors.gold
          }}
        >
          <span className="cta-text">{welcomeMessages.cta}</span>
          <motion.span
            className="cta-arrow"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="corner-decoration top-left"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.div
        className="corner-decoration top-right"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.div
        className="corner-decoration bottom-left"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
      />
      <motion.div
        className="corner-decoration bottom-right"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
      />
    </motion.div>
  );
};

export default WelcomeScreen;
