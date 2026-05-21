import { useEffect } from "react";

export const useCollaborationEffects = (lastAct, lastInput, setState, interact) => {
  useEffect(() => {
    const itv = setInterval(() => {
      const now = Date.now(), inp = lastInput.current;
      if (now - lastAct.current < 5000 && inp.trim()) {
        setState(p => ({ ...p, ackCount: p.ackCount + 1 }));
        interact(inp, true, false);
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
