import React from "react";
import { K_FONT_LIBRARY } from "./KFontLibrary";

export const KFontText = ({ text = "", height = 30, color = "currentColor", firstLetterColor, customChars = {}, className = "" }) => {
  const chars = text.toUpperCase().split("");
  return (
    <div style={{ display: "flex", gap: "2px", height: `${height}px` }} className={className}>
      {chars.map((char, i) => {
        const entry = customChars[char] || K_FONT_LIBRARY[char] || { path: null, width: 30 };
        if (!entry.path) return <div key={i} style={{ width: height / 2 }} />;
        const charColor = (i === 0 && firstLetterColor) ? firstLetterColor : color;
        return (
          <svg key={i} viewBox={`0 0 ${entry.width} 80`} style={{ height: "100%", width: "auto" }} fill={charColor}>
            <path d={entry.path} className={char === '0' ? 'kfont-ring' : ''} />
          </svg>
        );
      })}
    </div>
  );
};
