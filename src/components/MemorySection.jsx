import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories, memoryMessages } from '../data/memories';
import rakhiConfig from '../rakhiConfig';
import './MemorySection.css';

const MemorySection = ({ onContinue }) => {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  if (memories.length === 0) {
    onContinue();
    return null;
  }

  const handleNext = () => {
    if (currentMemoryIndex < memories.length - 1) {
      setCurrentMemoryIndex(prev => prev + 1);
    } else {
      setShowFinalMessage(true);
    }
  };

  const handlePrevious = () => {
    if (currentMemoryIndex > 0) {
      setCurrentMemoryIndex(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    onContinue();
  };

  const slideVariants = {
    enter: { x: 1000, opacity: 0, scale: 0.8 },
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { x: -1000, opacity: 0, scale: 0.8, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
  };

  if (showFinalMessage) {
    return (
      <motion.div
        className="memory-section final-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="final-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {memoryMessages.final.map((message, index) => (
            <motion.p
              key={index}
              className="final-text"
              style={{ color: index === 1 ? rakhiConfig.colors.pink : rakhiConfig.colors.lightText }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.4 }}
            >
              {message}
            </motion.p>
          ))}

          <motion.button
            className="cta-button final-cta"
            onClick={handleContinue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
              borderColor: rakhiConfig.colors.gold
            }}
          >
            <span className="cta-text">{memoryMessages.cta}</span>
            <motion.span
              className="cta-arrow"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="memory-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="memory-container">
        {/* Memory Counter */}
        <motion.div
          className="memory-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="current">{currentMemoryIndex + 1}</span>
          <span className="separator">/</span>
          <span className="total">{memories.length}</span>
        </motion.div>

        {/* Memory Slides */}
        <div className="memory-slides">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentMemoryIndex}
              className="memory-slide"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Memory Image */}
              <motion.div
                className="memory-image-container"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              >
                <img
                  src={memories[currentMemoryIndex].image}
                  alt={memories[currentMemoryIndex].title}
                  className="memory-image"
                />
                <div className="memory-overlay" />
              </motion.div>

              {/* Memory Content */}
              <motion.div
                className="memory-content"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="memory-year"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {memories[currentMemoryIndex].year}
                </motion.div>

                <motion.h2
                  className="memory-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{ color: rakhiConfig.colors.gold }}
                >
                  {memories[currentMemoryIndex].title}
                </motion.h2>

                <motion.p
                  className="memory-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {memories[currentMemoryIndex].caption}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <motion.div
          className="memory-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentMemoryIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ opacity: currentMemoryIndex === 0 ? 0.3 : 1 }}
          >
            ←
          </motion.button>

          <motion.button
            className="nav-button next-button"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`
            }}
          >
            {currentMemoryIndex === memories.length - 1 ? 'Finish' : 'Next →'}
          </motion.button>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          className="memory-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {memories.map((_, index) => (
            <motion.div
              key={index}
              className={`memory-dot ${index === currentMemoryIndex ? 'active' : ''}`}
              onClick={() => setCurrentMemoryIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 + index * 0.1 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemorySection;
