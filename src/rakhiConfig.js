// Raksha Bandhan App Configuration
export const rakhiConfig = {
  // App States (in navigation order)
  states: {
    WELCOME: 'welcome',
    MEMORY: 'memory',
    DISTANCE: 'distance',
    RAKHI_SELECTION: 'rakhi_selection',
    RAKHI_TYING: 'rakhi_tying',
    TILAK_CEREMONY: 'tilak_ceremony',
    SWEET_SECTION: 'sweet_section',
    GIFT_BOX: 'gift_box',
    VOICE_MESSAGE: 'voice_message',
    FINAL: 'final'
  },

  // Animation Timing
  animations: {
    slow: 1000,
    normal: 500,
    fast: 300,
    particleCount: 50,
    diyaCount: 8
  },

  // Festive Colors
  colors: {
    red: '#FF6B6B',
    orange: '#FFA500',
    yellow: '#FFD700',
    pink: '#FF69B4',
    purple: '#9B59B6',
    gold: '#FFC107',
    darkBg: '#1a0a0a',
    lightText: '#ffffff'
  },

  // Welcome Screen Messages
  welcomeMessages: {
    greeting: "Hey Sis ❤️",
    distance: "I couldn't be there with you today...",
    promise: "But distance can't stop me from tying your Rakhi.",
    cta: "I have something for you →"
  },

  // Distance Section Messages
  distanceMessages: {
    me: "Me",
    sister: "My Sister",
    bond: [
      "Distance may separate us...",
      "...but it can't separate our bond."
    ],
    virtual: "Let's tie your Rakhi virtually ❤️",
    cta: "Let's Begin →"
  },

  // Rakhi Selection Messages
  rakhiSelectionMessages: {
    prompt: "Collect Rakhi",
    selected: "Perfect choice ❤️",
    cta: "Go and Tie it to your Brother →"
  },

  // Rakhi Tying Messages
  rakhiTyingMessages: {
    instruction1: "Now help me tie your Rakhi.",
    instruction2: "Drag the Rakhi onto your wrist.",
    success: "Rakhi successfully tied! ❤️",
    message1: "I may be far away...",
    message2: "...but today, I tied it with all my heart.",
    cta: "Continue →",
    hint: "Try dragging it closer to the wrist"
  },

  // Tilak Ceremony Messages
  tilakCeremonyMessages: {
    instruction1: "One thing is still missing...",
    instruction2: "Apply the Tilak ❤️",
    complete: "Tilak applied successfully!",
    cta: "Continue →",
    hint: "Drag the Tilak to the forehead"
  },

  // Sweet Section Messages
  sweetSectionMessages: {
    prompt: "Rakhi isn't complete without sweets.",
    message1: "One for you 🍬",
    message2: "And one for me... obviously 😄",
    cta: "Continue →"
  },

  // Gift Box Messages
  giftBoxMessages: {
    initial: "I have one more thing for you...",
    reveal1: "My gift isn't something I can wrap...",
    reveal2: "It's a promise.",
    promises: [
      "I'll always have your back. ❤️",
      "I'll always annoy you. 😂",
      "I'll always listen to you.",
      "And no matter how far away I am...",
      "I'll always be your brother. 🫂"
    ],
    cta: "Continue →"
  },

  // Voice Message Messages
  voiceMessageMessages: {
    prompt: "There's something I wanted to tell you...",
    instruction: "Listen to my message 🎧",
    fallback: "Audio message not available, but the thought counts! ❤️",
    cta: "Continue →"
  },

  // Final Celebration Messages
  finalMessages: {
    greeting: "Happy Raksha Bandhan, Sis ❤️",
    distance: "Distance: [distance]",
    love: "Love: 0 km ❤️",
    message: "Today I am not with you to tie rakhi to my hand, so i tried technology for you to tie rakhii, Until you can tie the next one to me, keep this one safe",
    replay: "Love You Sister"
  },

  // Location Data
  locations: {
    me: "My City",
    sister: "Sister's City"
  },

  // Typography
  fonts: {
    heading: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    body: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },

  // Layout
  layout: {
    maxWidth: 1200,
    padding: 20,
    mobileBreakpoint: 768
  }
};

export default rakhiConfig;
