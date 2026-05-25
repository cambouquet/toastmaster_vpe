import React, { useState } from "react";
import { KFontText } from "./KFontText";
import { K_FONT_LIBRARY } from "./KFontLibrary";
import "./FontLab.scss";

export const FontLab = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0";
  const [testInput, setTestInput] = useState("KRONOS");
  const ratio = 0.620;
  const spacing = 3;

  const getCharStyle = (char) => {
    if (char === "K") return { color: "#ff0055" };
    if (["C", "Q", "G", "0"].includes(char)) return { color: "#ffea00" };
    if (char === "I") return { color: "#ffffff" };
    return { color: "#00bac4" };
  };

  const atoms = [
    { name: "TOWER", path: "M10 76 L12.5 4 L15 76 Z" },
    { name: "SAIL", path: "M6 4 Q25 4 44 35 L38 35 Q25 14 6 14 Z" },
    { name: "WING", path: "M10 32 Q30 4 48 18 L18 42 Z" },
    { name: "KATANA", path: "M10 42 L21 53 L18 56 L7 45 Z" }
  ];

  return (
    <div className="font-lab">
      <div className="lab-header">
        <div className="header-label">K-Font Construction Deck</div>
        <div className="header-status">// LENS CALIBRATION: 0.620_ARC // 3PX_GAP</div>
      </div>

      <div className="lab-content">
        {/* 1. Alphabet Forge */}
        <section className="forge-section">
          <label className="section-label">Glyph Stress Array</label>
          <div className="alphabet-grid">
            {alphabet.split("").map((char) => (
              <div key={char} className="char-cell">
                <KFontText text={char} height={40} color={getCharStyle(char).color} />
                <span className="char-id">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Atomic Elements */}
        <section className="forge-section">
          <label className="section-label">Steel-Core Primitives</label>
          <div className="atoms-grid">
            {atoms.map((atom) => (
              <div key={atom.name} className="atom-cell">
                <svg viewBox="0 0 50 80" className="atom-svg">
                  <path d={atom.path} fill="#00bac4" />
                </svg>
                <span className="atom-name">{atom.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Terminal Input */}
        <section className="forge-section terminal-section">
          <label className="section-label">Neural Identity Uplink</label>
          <div className="terminal-wrap">
            <input 
              type="text" 
              maxLength={12}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value.toUpperCase())}
              className="terminal-input"
              placeholder="Inject Signature"
            />
            <div className="terminal-output" style={{ gap: `${spacing}px` }}>
              {testInput.split("").map((char, idx) => (
                <div key={idx} style={{ width: `${60 * ratio}px` }}>
                  <KFontText text={char} height={60} color={getCharStyle(char).color} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
