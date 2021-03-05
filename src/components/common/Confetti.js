import { useStoreActions } from 'easy-peasy';
import React from 'react';
import Confetti from 'react-confetti';

const CustomConfetti = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const setShowConfetti = useStoreActions((actions) => actions.setShowConfetti);
  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      onConfettiComplete={() => setShowConfetti(false)}
      numberOfPieces={1000}
      tweenDuration={1000}
    />
  );
};

export default CustomConfetti;
