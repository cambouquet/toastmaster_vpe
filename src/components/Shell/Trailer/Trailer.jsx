import React, { useState, useEffect } from "react";
import { TRAILER_SCENES } from "./TrailerScenes";
import { TextFrame } from "./TextFrame";
import { DiscFrame } from "./DiscFrame";
import { CycleFrame } from "./CycleFrame";
import "./Trailer.scss";

export const Trailer = ({ onComplete }) => {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    if (scene < TRAILER_SCENES.length) {
      const timer = setTimeout(() => setScene(s => s + 1), TRAILER_SCENES[scene].next);
      return () => clearTimeout(timer);
    } else onComplete();
  }, [scene, onComplete]);

  if (scene >= TRAILER_SCENES.length) return null;
  const s = TRAILER_SCENES[scene];
  return (
    <div className={`trailer-container scene-${scene} type-${s.type}`}>
      <div className="vignette" />
      <div className="trailer-content">
        {s.type === "text" && <TextFrame scene={scene} content={s.content} color={s.color} />}
        {(s.type === "disc" || s.type === "grab") && <DiscFrame type={s.type} />}
        {s.type === "cycle" && <CycleFrame />}
      </div>
    </div>
  );
};
