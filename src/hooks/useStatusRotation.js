import { useState, useEffect } from 'react';

export const useStatusRotation = () => {
  const [mobileStep, setMobileStep] = useState(0);

  useEffect(() => {
    const checkRotation = () => {
      if (window.innerWidth < 768) {
        return setInterval(() => {
          setMobileStep((prev) => (prev + 1) % 2);
        }, 5000);
      }
    };
    
    let interval = checkRotation();
    const handleResize = () => {
      clearInterval(interval);
      interval = checkRotation();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mobileStep;
};