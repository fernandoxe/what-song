import { useEffect, useRef, useState } from 'react';

export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if(timer.current) clearInterval(timer.current);
    };
  }, []);

  const start = () => {
    if(timer.current) return;
    timer.current = setInterval(() => {
      setTime(time => time + 100);
    }, 100);
  };

  const pause = () => {
    if(timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return time;
  };

  const restart = () => {
    stop();
    start();
  };

  const stop = () => {
    pause();
    setTime(0);
  };

  return {
    time,
    start,
    pause,
    restart,
    stop,
  };
};
