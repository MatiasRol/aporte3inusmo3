import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

interface UseShakeDetectorProps {
  threshold?: number;
  cooldown?: number;
  onShake: () => void;
}

export const useShakeDetector = ({ 
  threshold = 1.8, 
  cooldown = 800,
  onShake 
}: UseShakeDetectorProps) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    let subscription: any;
    let lastShakeTime = 0;
    let lastX = 0, lastY = 0, lastZ = 0;

    Accelerometer.setUpdateInterval(100);

    subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      
      // Calcular el cambio (delta) en cada eje
      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);
      
      // Detectar movimiento brusco en CUALQUIER dirección
      const totalDelta = deltaX + deltaY + deltaZ;
      
      const now = Date.now();
      
      if (totalDelta > threshold && now - lastShakeTime > cooldown) {
        lastShakeTime = now;
        setIsShaking(true);
        onShake();
        
        // Reset shaking state después de la animación
        setTimeout(() => setIsShaking(false), 500);
      }
      
      // Actualizar valores anteriores
      lastX = x;
      lastY = y;
      lastZ = z;
    });

    return () => {
      subscription && subscription.remove();
    };
  }, [threshold, cooldown, onShake]);

  return { isShaking };
};