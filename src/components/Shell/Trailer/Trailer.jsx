import React, { useState, useEffect, useRef } from "react";
import { TRAILER_SCENES } from "./TrailerScenes";
import { TextFrame } from "./TextFrame";
import { DiscFrame } from "./DiscFrame";
import { CycleFrame } from "./CycleFrame";
import { CyberGrid } from "./CyberGrid";
import { TrailerControls } from "./TrailerControls";
import { SplashScreen } from "../SplashScreen";
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
    const currentSceneData = TRAILER_SCENES[scene];
    if (!currentSceneData) return;

    const timer = setTimeout(() => {
      if (scene === TRAILER_SCENES.length - 1) {
        if (repeat) setScene(0);
        else onComplete();
      } else {
        setScene(s => s + 1);
      }
    }, currentSceneData.next);

    return () => clearTimeout(timer);
  }, [scene, onComplete, paused, repeat]);

  if (scene >= TRAILER_SCENES.length) return null;
  const s = TRAILER_SCENES[scene];
  
  return (
    <div 
      className={`trailer-container scene-${scene} ${paused ? 'is-paused' : ''} ${showUI ? 'show-ui' : ''}`}
      onMouseMove={resetUITimer}
      onMouseLeave={() => { if (!paused) setShowUI(false); }}
    >
      <div className="vignette" />
      <div className="trailer-content" onClick={() => setPaused(!paused)}>
        {/* Render text frames last to ensure they sit on top of everything including 3D world */}
        {s.type === "disc" && <DiscFrame type="disc" paused={paused} />}
        {s.type === "grab" && <DiscFrame type="grab" paused={paused} />}
        {scene === 1 && <DiscFrame type="disc" paused={paused} extraClass="fondu-out" />}
        {s.type === "cycle" && <><CyberGrid /><CycleFrame paused={paused} /><DiscFrame type="disc" paused={paused} extraClass="sky-mode" /></>}
        {s.type === "splash" && <SplashScreen onFinish={() => {}} />}
        
        {/* Dedicated layer for cinematic typography */}
        {s.type === "text" && <TextFrame scene={scene} content={s.content} color={s.color} effect={s.effect} />}
        {s.type === "grab" && <TextFrame scene={scene} content={s.content} color={s.color} effect={s.effect} />}
      </div>
      <div 
        className="controls-hitbox"
        onMouseEnter={() => { isHoveringControls.current = true; resetUITimer(); }}
        onMouseLeave={() => { isHoveringControls.current = false; resetUITimer(); }}
      >
        <div className="controls-wrapper">
          <TrailerControls 
            current={scene} onJump={(i) => { setScene(i); if (paused) setPaused(false); }} 
            paused={paused} onTogglePause={(e) => { e.stopPropagation(); setPaused(!paused); }}
            repeat={repeat} onToggleRepeat={(e) => { e.stopPropagation(); setRepeat(!repeat); }}
          />
        </div>
      </div>
    </div>
  );
};
