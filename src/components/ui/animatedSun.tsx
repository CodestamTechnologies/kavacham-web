import React from 'react';
import styled, { keyframes } from 'styled-components';

// SSR-friendly animations
const floatAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -5px) rotate(2deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  75% { transform: translate(-10px, 5px) rotate(-2deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const fadeAnimation = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.3; }
  100% { opacity: 0.1; }
`;

// Container
const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

// Keyword with simple movement
const Keyword = styled.div`
  position: absolute;
  color: rgba(200, 200, 200, 0.8);
  font-size: 1.25rem;
  font-weight: 400;
  animation: ${floatAnimation} 6s infinite ease-in-out;
  white-space: nowrap;
  z-index: 2;
  text-shadow: 0 0 8px rgba(255,255,255,0.3);
  transition: all 0.3s ease;
  will-change: transform;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 12px rgba(255,255,255,0.5);
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

// Gray Patch
const GrayPatch = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(210, 210, 210, 0.08);
  filter: blur(40px);
  animation: ${fadeAnimation} 8s infinite ease-in-out;
  z-index: 1;
`;

interface Position {
  left: string;
  top: string;
}

interface Patch {
  size: string;
  left: string;
  top: string;
  delay: string;
}

const KeywordsBackground: React.FC = () => {
  // Keywords
  const keywords: string[] = [
    'Aries', 'Taurus', 'Gemini', 'Leo', 'Virgo', 
    'Libra', 'Scorpio', 'Moon', 'Mars', 'Venus',
    'Jupiter', 'Saturn', 'Sun',
  ];

  // Fixed positions covering the screen
  const keywordPositions: Position[] = [
    { left: '10%', top: '15%' }, { left: '25%', top: '30%' },
    { left: '80%', top: '20%' }, { left: '65%', top: '40%' },
    { left: '15%', top: '70%' }, { left: '30%', top: '85%' },
    { left: '75%', top: '75%' }, { left: '85%', top: '60%' },
    { left: '50%', top: '25%' }, { left: '75%', top: '50%' },
    { left: '60%', top: '65%' }, { left: '20%', top: '45%' },
    { left: '45%', top: '80%' }
  ];

  // Fixed patches
  const patches: Patch[] = [
    { size: '320px', left: '15%', top: '25%', delay: '0s' },
    { size: '420px', left: '70%', top: '60%', delay: '1s' },
    { size: '280px', left: '35%', top: '15%', delay: '0.5s' },
    { size: '380px', left: '65%', top: '80%', delay: '1.5s' },
    { size: '350px', left: '25%', top: '65%', delay: '0.8s' },
    { size: '400px', left: '55%', top: '35%', delay: '2s' },
    { size: '300px', left: '75%', top: '25%', delay: '0.3s' },
    { size: '450px', left: '35%', top: '75%', delay: '2.5s' }
  ];

  return (
    <BackgroundContainer>
      {/* Gray Patches */}
      {patches.map((patch: Patch, index: number) => (
        <GrayPatch 
          key={`patch-${index}`}
          style={{
            width: patch.size,
            height: patch.size,
            left: patch.left,
            top: patch.top,
            animationDelay: patch.delay
          }}
        />
      ))}

      {/* Keywords with simple movement */}
      {keywords.map((keyword: string, index: number) => (
        <Keyword 
          key={`word-${index}`}
          style={{
            left: keywordPositions[index]?.left,
            top: keywordPositions[index]?.top,
            animationDelay: `${index * 0.2}s`
          }}
        >
          {keyword}
        </Keyword>
      ))}
    </BackgroundContainer>
  );
};

export default KeywordsBackground;