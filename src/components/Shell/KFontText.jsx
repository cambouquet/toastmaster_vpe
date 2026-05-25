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
        const subPaths = entry.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');
        
        return (
          <svg key={i} viewBox={`0 0 ${entry.width} 80`} style={{ height: "100%", width: "auto" }} fill={charColor}>
            {subPaths.map((p, j) => {
              let className = "";
              if (char === '0') className = 'kfont-ring';
              if (char === 'O' && j === 4) className = 'kfont-shiny-ring';
              if (char === 'K' && j === 1) className = 'kfont-wing';
              if (char === 'I') className = 'kfont-purity';
              
              return <path key={j} d={p} className={className} />;
            })}
          </svg>
        );
      })}
    </div>
  );
};
