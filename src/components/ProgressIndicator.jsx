import React from 'react';
import { motion } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './ProgressIndicator.css';

const ProgressIndicator = ({ currentState }) => {
  // Only show progress for implemented sections
  const activeStates = [rakhiConfig.states.WELCOME, rakhiConfig.states.MEMORY, rakhiConfig.states.DISTANCE];
  
  if (!activeStates.includes(currentState)) {
    return null;
  }

  const currentIndex = activeStates.indexOf(currentState);

  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / activeStates.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="progress-dots">
        {activeStates.map((state, index) => (
          <motion.div
            key={state}
            className={`progress-dot ${index <= currentIndex ? 'active' : ''}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index <= currentIndex && (
              <motion.div
                className="dot-inner"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
