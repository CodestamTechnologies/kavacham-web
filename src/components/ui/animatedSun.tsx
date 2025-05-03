import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const fadeAnimation = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.4; }
  100% { opacity: 0.2; }
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

// Keyword
const Keyword = styled.div`
  position: absolute;
  color: rgba(200, 200, 200, 0.8);
  font-size: 1.25rem;
  font-weight: 400;
  animation: ${floatAnimation} 12s infinite ease-in-out;
  white-space: nowrap;
  z-index: 2;
  text-shadow: 0 0 8px rgba(255,255,255,0.3);
  transition: all 0.3s ease;

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
  animation: ${fadeAnimation} 10s infinite ease-in-out;
  z-index: 1;
`;

const KeywordsBackground = () => {
  // Reduced keyword set for mobile
  const keywords = [
    'Aries', 'Taurus', 'Gemini', 'Leo', 'Virgo', 
    'Libra', 'Scorpio', 'Moon', 'Mars', 'Venus',
    'Jupiter', 'Saturn', 'Sun'
  ];

  // Matched positions
  const keywordPositions = [
    { left: '8%', top: '12%' }, { left: '22%', top: '28%' },
    { left: '82%', top: '18%' }, { left: '68%', top: '38%' },
    { left: '12%', top: '72%' }, { left: '28%', top: '88%' },
    { left: '78%', top: '78%' }, { left: '88%', top: '65%' },
    { left: '52%', top: '22%' }, { left: '78%', top: '52%' },
    { left: '62%', top: '68%' }, { left: '18%', top: '42%' },
    { left: '42%', top: '78%' }
  ];

  const patches = [
    { size: '320px', left: '18%', top: '28%', delay: '0s' },
    { size: '420px', left: '72%', top: '62%', delay: '1.5s' },
    { size: '280px', left: '38%', top: '18%', delay: '0.8s' },
    { size: '380px', left: '65%', top: '82%', delay: '2.2s' },
    { size: '350px', left: '25%', top: '65%', delay: '1s' },
    { size: '400px', left: '55%', top: '35%', delay: '2.5s' },
    { size: '300px', left: '75%', top: '25%', delay: '0.5s' },
    { size: '450px', left: '35%', top: '75%', delay: '3s' }
  ];

  return (
    <BackgroundContainer>
      {/* Gray Patches */}
      {patches.map((patch, index) => (
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

      {/* Keywords */}
      {keywords.map((keyword, index) => (
        <Keyword 
          key={`word-${index}`}
          style={{
            left: keywordPositions[index]?.left,
            top: keywordPositions[index]?.top,
            animationDelay: `${index * 0.4}s`
          }}
        >
          {keyword}
        </Keyword>
      ))}
    </BackgroundContainer>
  );
};

export default KeywordsBackground;
