import { useEffect } from "react";

export const useCollaborationEffects = (lastAct, lastInput, setState, interact) => {
  useEffect(() => {
    const itv = setInterval(() => {
      const now = Date.now(), inp = lastInput.current.toLowerCase();
      // Only pulse for agent-specific commands or if explicitly streaming
      if (now - lastAct.current < 5000 && inp.match(/agent|connect|stream/)) {
        setState(p => ({ ...p, ackCount: p.ackCount + 1 }));
        interact(lastInput.current, true, false);
      }
    }, 1000);
    return () => clearInterval(itv);
  }, []);

  useEffect(() => {
    const handler = (e) => setState(p => ({ ...p, testStatus: e.detail.success ? "PASSED" : "FAILED" }));
    window.addEventListener("TEST_RESULT", handler);
    return () => window.removeEventListener("TEST_RESULT", handler);
  }, []);
};
