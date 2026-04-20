// src/hooks/useTimer.js
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Countdown timer hook.
 * @param {number} initialSeconds - Starting value in seconds.
 * @returns {{ timeLeft, minutes, seconds, isRunning, start, pause, reset }}
 */
export function useTimer(initialSeconds) {
  const [timeLeft, setTimeLeft]     = useState(initialSeconds);
  const [isRunning, setIsRunning]   = useState(true);
  const intervalRef                 = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(intervalRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const pause  = useCallback(() => setIsRunning(false), []);
  const start  = useCallback(() => setIsRunning(true),  []);
  const reset  = useCallback(() => { setTimeLeft(initialSeconds); setIsRunning(true); }, [initialSeconds]);

  return {
    timeLeft,
    minutes: String(Math.floor(timeLeft / 60)).padStart(2, "0"),
    seconds: String(timeLeft % 60).padStart(2, "0"),
    isRunning,
    start,
    pause,
    reset,
  };
}
