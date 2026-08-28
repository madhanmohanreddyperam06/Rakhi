import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import rakhiConfig from '../rakhiConfig';
import './VoiceMessage.css';

const VoiceMessage = ({ onContinue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  
  const audioRef = useRef(null);
  const animationFrameRef = useRef(null);

  const audioPath = '/assets/audio/message.mp3';

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setAudioError(false);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(100);
        setShowContinue(true);
      };

      const handleError = () => {
        setAudioError(true);
        setShowContinue(true);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    audio.currentTime = (percentage / 100) * duration;
    setProgress(percentage);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  // Generate waveform bars
  const waveformBars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <motion.div
      className="voice-message"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="voice-container"
        variants={containerVariants}
      >
        {/* Prompt */}
        <motion.h2
          className="voice-prompt"
          variants={itemVariants}
          style={{ color: rakhiConfig.colors.gold }}
        >
          {rakhiConfig.voiceMessageMessages.prompt}
        </motion.h2>

        {/* Instruction */}
        <motion.p
          className="voice-instruction"
          variants={itemVariants}
          style={{ color: rakhiConfig.colors.lightText }}
        >
          {rakhiConfig.voiceMessageMessages.instruction}
        </motion.p>

        {/* Audio Player */}
        <motion.div
          className="audio-player"
          variants={itemVariants}
        >
          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={audioPath}
            preload="metadata"
          />

          {/* Fallback Message */}
          {audioError && (
            <motion.div
              className="audio-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: rakhiConfig.colors.pink }}
            >
              {rakhiConfig.voiceMessageMessages.fallback}
            </motion.div>
          )}

          {!audioError && (
            <>
              {/* Play/Pause Button */}
              <motion.button
                className="play-button"
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
                  borderColor: rakhiConfig.colors.gold
                }}
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="2" />
                    <rect x="14" y="4" width="4" height="16" rx="2" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </motion.button>

              {/* Progress Bar */}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  onClick={handleSeek}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`
                    }}
                  />
                  <motion.div
                    className="progress-thumb"
                    style={{
                      left: `${progress}%`,
                      background: rakhiConfig.colors.gold
                    }}
                    animate={{
                      scale: isPlaying ? [1, 1.2, 1] : 1
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isPlaying ? Infinity : 0
                    }}
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="time-display" style={{ color: rakhiConfig.colors.lightText }}>
                <span>{formatTime(currentTime)}</span>
                <span className="time-separator">/</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Animated Waveform/Equalizer */}
              <div className="waveform">
                {waveformBars.map((i) => (
                  <motion.div
                    key={i}
                    className="waveform-bar"
                    style={{
                      background: rakhiConfig.colors.gold
                    }}
                    animate={{
                      height: isPlaying 
                        ? [10, 30, 20, 40, 15, 35, 25, 45, 20, 30]
                        : [10, 10]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: isPlaying ? Infinity : 0,
                      delay: i * 0.05,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Continue Button */}
        {showContinue && (
          <motion.button
            className="cta-button"
            onClick={handleContinue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, ${rakhiConfig.colors.orange}, ${rakhiConfig.colors.red})`,
              borderColor: rakhiConfig.colors.gold
            }}
          >
            <span className="cta-text">{rakhiConfig.voiceMessageMessages.cta}</span>
            <motion.span
              className="cta-arrow"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VoiceMessage;
