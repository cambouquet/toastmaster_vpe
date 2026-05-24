import { useState, useRef, useCallback } from "react";

export const useSubtitleQueue = () => {
  const [subtitle, setSubtitle] = useState("Standby.");
  const subTimer = useRef(null), subQueue = useRef([]), isProc = useRef(false);

  const processQueue = useCallback(() => {
    if (subQueue.current.length === 0) { setSubtitle("Standby."); isProc.current = false; return; }
    isProc.current = true;
    const { text, duration } = subQueue.current.shift();
    setSubtitle(text);
    if (subTimer.current) clearTimeout(subTimer.current);
    subTimer.current = setTimeout(processQueue, duration);
  }, []);

  const setTimedSubtitle = useCallback((text) => {
    if (!text || text === "Standby.") return;
    const isUrgent = /terminated|unauthorized|failed|error|terminal|uplink/i.test(text);
    let handled = false;
    setSubtitle(p => { if (p !== "Standby." && text.startsWith(p) && text.length > p.length) { handled = true; return text; } return p; });
    if (handled) { if (subTimer.current) clearTimeout(subTimer.current); subTimer.current = setTimeout(processQueue, 5000); return; }
    if (isUrgent) {
      subQueue.current = []; setSubtitle(text);
      if (subTimer.current) clearTimeout(subTimer.current);
      subTimer.current = setTimeout(processQueue, 5000); isProc.current = true;
    } else {
      subQueue.current.push({ text, duration: Math.max(3000, Math.min(8000, text.length * 60)) });
      if (!isProc.current) processQueue();
    }
  }, [processQueue]);

  return { subtitle, setTimedSubtitle };
};