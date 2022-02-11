import { initializePerformance } from 'firebase/performance';
import { useEffect } from 'react';
import { firebaseApp } from './firebase';

export const usePerformance = () => {
  useEffect(() => {
    initializePerformance(firebaseApp);
  }, []);
}
