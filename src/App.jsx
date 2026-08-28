import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import rakhiConfig from './rakhiConfig';
import Layout from './components/Layout';
import BackgroundEffects from './components/BackgroundEffects';
import WelcomeScreen from './components/WelcomeScreen';
import MemorySection from './components/MemorySection';
import DistanceSection from './components/DistanceSection';
import RakhiSelection from './components/RakhiSelection';
import RakhiTying from './components/RakhiTying';
import TilakCeremony from './components/TilakCeremony';
import SweetSection from './components/SweetSection';
import GiftBox from './components/GiftBox';
import VoiceMessage from './components/VoiceMessage';
import FinalCelebration from './components/FinalCelebration';
import ProgressIndicator from './components/ProgressIndicator';
import './App.css';

function App() {
  const [currentState, setCurrentState] = useState(rakhiConfig.states.WELCOME);
  const [selectedRakhi, setSelectedRakhi] = useState(null);

  const handleContinue = () => {
    if (currentState === rakhiConfig.states.WELCOME) setCurrentState(rakhiConfig.states.MEMORY);
    else if (currentState === rakhiConfig.states.MEMORY) setCurrentState(rakhiConfig.states.DISTANCE);
    else if (currentState === rakhiConfig.states.DISTANCE) setCurrentState(rakhiConfig.states.RAKHI_SELECTION);
    else if (currentState === rakhiConfig.states.RAKHI_SELECTION) setCurrentState(rakhiConfig.states.TILAK_CEREMONY);
    else if (currentState === rakhiConfig.states.TILAK_CEREMONY) setCurrentState(rakhiConfig.states.RAKHI_TYING);
    else if (currentState === rakhiConfig.states.RAKHI_TYING) setCurrentState(rakhiConfig.states.SWEET_SECTION);
    else if (currentState === rakhiConfig.states.SWEET_SECTION) setCurrentState(rakhiConfig.states.GIFT_BOX);
    else if (currentState === rakhiConfig.states.GIFT_BOX) setCurrentState(rakhiConfig.states.FINAL);
  };

  const handleRakhiSelect = (rakhiId) => {
    setSelectedRakhi(rakhiId);
  };

  const handleReplay = () => {
    setCurrentState(rakhiConfig.states.WELCOME);
    setSelectedRakhi(null);
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case rakhiConfig.states.WELCOME: return <WelcomeScreen onContinue={handleContinue} />;
      case rakhiConfig.states.MEMORY: return <MemorySection onContinue={handleContinue} />;
      case rakhiConfig.states.DISTANCE: return <DistanceSection onContinue={handleContinue} />;
      case rakhiConfig.states.RAKHI_SELECTION: return <RakhiSelection onContinue={handleContinue} selectedRakhi={selectedRakhi} onRakhiSelect={handleRakhiSelect} />;
      case rakhiConfig.states.RAKHI_TYING: return <RakhiTying onContinue={handleContinue} />;
      case rakhiConfig.states.TILAK_CEREMONY: return <TilakCeremony onContinue={handleContinue} />;
      case rakhiConfig.states.SWEET_SECTION: return <SweetSection onContinue={handleContinue} />;
      case rakhiConfig.states.GIFT_BOX: return <GiftBox onContinue={handleContinue} />;
      case rakhiConfig.states.VOICE_MESSAGE: return <VoiceMessage onContinue={handleContinue} />;
      case rakhiConfig.states.FINAL: return <FinalCelebration onReplay={handleReplay} />;
      default: return <WelcomeScreen onContinue={handleContinue} />;
    }
  };

  return (
    <div className="app">
      <BackgroundEffects />
      <Layout>
        <AnimatePresence mode="wait">
          <div key={currentState} className="screen-container">{renderCurrentScreen()}</div>
        </AnimatePresence>
      </Layout>
      <ProgressIndicator currentState={currentState} />
    </div>
  );
}

export default App;
