import React, { useState, useEffect, useRef } from "react";
import { TRAILER_SCENES } from "./TrailerScenes";
import { TextFrame } from "./TextFrame";
import { DiscFrame } from "./DiscFrame";
import { CycleFrame } from "./CycleFrame";
import { CyberGrid } from "./CyberGrid";
import { TrailerControls } from "./TrailerControls";
import "./Trailer.scss";

export const Trailer = ({ onComplete }) => {
  const [scene, setScene] = useState(0), [paused, setPaused] = useState(false);
  const [repeat, setRepeat] = useState(false), [showUI, setShowUI] = useState(false);
  const uiTimer = useRef(null);
  const isHoveringControls = useRef(false);

  const resetUITimer = () => {
    setShowUI(true);
    if (uiTimer.current) clearTimeout(uiTimer.current);
    if (!isHoveringControls.current) {
      uiTimer.current = setTimeout(() => setShowUI(false), 2500);
    }
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.code === "Space") setPaused(p => !p); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (scene < TRAILER_SCENES.length) {
      const t = TRAILER_SCENES[scene].next;
      const timer = setTimeout(() => {
        if (!repeat) setScene(s => (s + 1) % TRAILER_SCENES.length);
      }, t);
      return () => clearTimeout(timer);
    } else if (!repeat) onComplete();
  }, [scene, onComplete, paused, repeat]);

  if (scene >= TRAILER_SCENES.length && !repeat) return null;
  const s = TRAILER_SCENES[scene];
  
  return (
    <div 
      className={`trailer-container scene-${scene} ${paused ? 'is-paused' : ''} ${showUI ? 'show-ui' : ''}`}
      onMouseMove={resetUITimer}
      onMouseLeave={() => { if (!paused) setShowUI(false); }}
    >
      <div className="vignette" />
      <div className="trailer-content" onClick={() => setPaused(!paused)}>
        {s.type === "text" && <TextFrame scene={scene} content={s.content} color={s.color} effect={s.effect} />}
        {(s.type === "disc" || s.type === "grab") && <DiscFrame type={s.type} paused={paused} />}
        {scene === 1 && <DiscFrame type="disc" paused={paused} extraClass="fondu-out" />}
        {s.type === "cycle" && <><CyberGrid /><CycleFrame paused={paused} /></>}
      </div>
      <div 
        className="controls-hitbox"
        onMouseEnter={() => { isHoveringControls.current = true; resetUITimer(); }}
        onMouseLeave={() => { isHoveringControls.current = false; resetUITimer(); }}
      >
        <TrailerControls 
          current={scene} onJump={(i) => { setScene(i); if (paused) setPaused(false); }} 
          paused={paused} onTogglePause={(e) => { e.stopPropagation(); setPaused(!paused); }}
          repeat={repeat} onToggleRepeat={(e) => { e.stopPropagation(); setRepeat(!repeat); }}
        />
      </div>
    </div>
  );
};
