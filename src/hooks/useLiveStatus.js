// src/hooks/useLiveStatus.js

import { useState, useEffect, useCallback } from 'react';
import { streamURL, checkStream } from '../utils/streamUtils';

const RECOVERY_INTERVAL_MS = 5000;

/**
 * Custom hook to monitor the live status of the stream for display purposes (e.g., a badge).
 * It polls the stream manifest every 5 seconds.
 * @returns {boolean} True if the stream manifest returns 200, false otherwise.
 */
export function useLiveStatus() {
  const [isLive, setIsLive] = useState(false);

  const checkStatus = useCallback(async () => {
    const online = await checkStream(streamURL);
    // Ενημέρωση state μόνο αν έχει αλλάξει η κατάσταση
    if (online !== isLive) {
      setIsLive(online);
    }
  }, [isLive]); 

  useEffect(() => {
    let intervalId;

    // Άμεσος έλεγχος κατά το mount
    checkStatus(); 

    // Έναρξη συνεχούς polling
    intervalId = setInterval(checkStatus, RECOVERY_INTERVAL_MS);

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [checkStatus]);

  return isLive;
}