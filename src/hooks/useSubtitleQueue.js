import { useState, useRef, useCallback } from "react";

export const useSubtitleQueue = () => {
  const [subtitle, setSubtitle] = useState("Standby.");
  const subTimer = useRef(null);
  const subQueue = useRef([]);
  const isProcessingQueue = useRef(false);

  const processQueue = useCallback(() => {
    if (subQueue.current.length === 0) {
      setSubtitle("Standby.");
      isProcessingQueue.current = false;
      return;
    }
    isProcessingQueue.current = true;
    const { text, duration } = subQueue.current.shift();
    setSubtitle(text);
    if (subTimer.current) clearTimeout(subTimer.current);
    subTimer.current = setTimeout(processQueue, duration);
  }, []);

  const setTimedSubtitle = useCallback((text) => {
    if (!text || text === "Standby.") return;
    const isUrgent = /terminated|unauthorized|failed|error|terminal|uplink/i.test(text);
    let handled = false;
    setSubtitle(prev => {
      if (prev !== "Standby." && text.startsWith(prev) && text.length > prev.length) {
        handled = true;
        return text;
      }
      return prev;
    });

    if (handled) {
      if (subTimer.current) clearTimeout(subTimer.current);
      subTimer.current = setTimeout(processQueue, 5000);
      return;
    }

    if (isUrgent) {
      subQueue.current = [];
      setSubtitle(text);
      if (subTimer.current) clearTimeout(subTimer.current);
      subTimer.current = setTimeout(processQueue, 5000);
      isProcessingQueue.current = true;
    } else {
      const dur = Math.max(3000, Math.min(8000, text.length * 60));
      subQueue.current.push({ text, duration: dur });
      if (!isProcessingQueue.current) processQueue();
    }
  }, [processQueue]);

  return { subtitle, setTimedSubtitle };
};