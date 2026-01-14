import { useState } from 'react';

interface UseRandomNumberProps {
  min?: number;
  max?: number;
}

export const useRandomNumber = ({ min = 1, max = 8 }: UseRandomNumberProps = {}) => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  const generate = () => {
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setCurrentNumber(newNumber);
    return newNumber;
  };

  const reset = () => {
    setCurrentNumber(null);
  };

  return {
    currentNumber,
    generate,
    reset
  };
};