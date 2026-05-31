import React, { useState, useEffect } from "react";
import { TRAILER_SCENES } from "./TrailerScenes";
import { TextFrame } from "./TextFrame";
import { DiscFrame } from "./DiscFrame";
import { CycleFrame } from "./CycleFrame";
import { TrailerControls } from "./TrailerControls";
import "./Trailer.scss";

export const Trailer = ({ onComplete }) => {
  const [scene, setScene] = useState(0), [paused, setPaused] = useState(false);
  const [repeat, setRepeat] = useState(false);
  useEffect(() => {
    if (paused) return;
    if (scene < TRAILER_SCENES.length) {
      const t = TRAILER_SCENES[scene].next;
      const timer = setTimeout(() => {
        if (repeat) setScene(s => s); // Trigger re-run of same scene
        else setScene(s => (s + 1) % TRAILER_SCENES.length);
      }, t);
      return () => clearTimeout(timer);
    } else if (!repeat) onComplete();
  }, [scene, onComplete, paused, repeat]);

  if (scene >= TRAILER_SCENES.length && !repeat) return null;
  const s = TRAILER_SCENES[scene];
  return (
    <div className={`trailer-container scene-${scene} type-${s.type} ${paused ? 'is-paused' : ''}`}>
      <div className="vignette" />
      <div className="trailer-content" onClick={() => setPaused(!paused)}>
        {s.type === "text" && <TextFrame scene={scene} content={s.content} color={s.color} effect={s.effect} />}
        {(s.type === "disc" || s.type === "grab") && <DiscFrame type={s.type} paused={paused} />}
        {s.type === "cycle" && <CycleFrame paused={paused} />}
        {paused && <div className="center-play-hint">▶</div>}
      </div>
      <TrailerControls 
        current={scene} onJump={setScene} 
        paused={paused} onTogglePause={() => setPaused(!paused)}
        repeat={repeat} onToggleRepeat={() => setRepeat(!repeat)}
      />
    </div>
  );
};
