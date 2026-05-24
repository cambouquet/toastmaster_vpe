import React from "react";
import { K_FONT_LIBRARY } from "./KFontLibrary";

export const KFontText = ({ text = "", height = 30, color = "currentColor", customChars = {} }) => {
  const chars = text.toUpperCase().split("");
  return (
    <div style={{ display: "flex", gap: "2px", height: `${height}px` }}>
      {chars.map((char, i) => {
        const entry = customChars[char] || K_FONT_LIBRARY[char] || { path: null, width: 30 };
        if (!entry.path) return <div key={i} style={{ width: height / 2 }} />;
        return (
          <svg key={i} viewBox={`0 0 ${entry.width} 80`} style={{ height: "100%", width: "auto" }} fill={color}>
            <path d={entry.path} />
          </svg>
        );
      })}
    </div>
  );
};
