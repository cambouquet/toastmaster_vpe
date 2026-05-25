import React from "react";
import { KFontText } from "./KFontText";

export const KFontValidator = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0";
  const finalized = "ABDEFHIKJLNP RTSUZVXMWY0".split("");
  const gold = "CQG".split("");
  const silver = "O".split("");
  const kId = ["K"];
  const [testInput, setTestInput] = React.useState("TEST");
  const [ratio, setRatio] = React.useState(0.620);
  const [spacing, setSpacing] = React.useState(3);
  
  const getCharStyle = (char) => {
    if (char === "I") return { color: "#ffffff", border: "1px solid #ffffff", bg: "rgba(255, 255, 255, 0.1)" };
    if (gold.includes(char)) return { color: "#ffea00", border: "1px solid #ffea00", bg: "rgba(255, 234, 0, 0.1)" };
    if (silver.includes(char)) return { color: "#c0c0c0", border: "1px solid #c0c0c0", bg: "rgba(192, 192, 192, 0.1)" };
    if (kId.includes(char)) return { color: "#ff0055", border: "1px solid #ff0055", bg: "rgba(255, 0, 85, 0.1)" };
    if (finalized.includes(char)) return { color: "#00bac4", border: "1px solid #00bac4", bg: "rgba(0, 186, 196, 0.1)" };
    return { color: "rgba(0, 186, 196, 0.15)", border: "1px solid rgba(0, 186, 196, 0.05)", bg: "transparent" };
  };
  
  const atoms = [
    { name: "TOWER", path: "M10 76 L13 4 L16 76 Z" },
    { name: "SAIL", path: "M14 4 Q60 4 65 35 L55 35 Q50 14 14 14 Z M14 76 Q60 76 65 45 L55 45 Q50 66 14 66 Z" },
    { name: "A_WING", path: "M10 40 Q40 10 70 40 L62 52 Q30 35 10 40 Z" },
    { name: "B_WING", path: "M10 4 Q-5 40 30 76 L34 76 Q-1 40 16 4 Z" },
    { name: "KATANA", path: "M10 42 L21 53 L18 56 L7 45 Z M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z" },
    { name: "SABER", path: "M11 35 L16 35 L16 41 L11 41 Z M18 34 L45 34 L50 38 L45 42 L18 42 Z" },
    { name: "BRIDGE", path: "M10 20 Q40 0 70 20 L70 32 Q40 12 10 32 Z" },
    { name: "SCARF", path: "M10 4 Q10 64 35 64 L35 76 Q10 76 10 4 Z" },
    { name: "STICK", path: "M29 35 L35 35 L35 41 L29 41 Z M37 34 L60 34 L65 38 L60 42 L37 42 Z M27 34 L4 34 L0 38 L4 42 L27 42 Z" },
    { name: "LANCE", path: "M20 76 L15 76 L35 15 L42 18 L40 4 L33 18 L38 15 Z" },
    { name: "POINT", path: "M40 10 L45 26 L40 22 L35 26 Z" },
    { name: "RING", path: "M8 22 Q40 -10 72 22 L72 32 Q40 0 8 32 Z M8 58 Q40 90 72 58 L72 48 Q40 80 8 48 Z M22 20 Q-10 40 22 60 L32 60 Q0 40 32 20 Z M58 20 Q90 40 58 60 L48 60 Q80 40 48 20 Z" },
    { name: "COIL", path: "M55 18 Q55 4 30 4 Q5 4 5 18 C5 31 55 26 55 40" },
    { name: "SCIMITAR", path: "M60 10 L50 10 L50 50 Q50 70 20 70 Q60 70 60 50 Z" }
  ];

  return (
    <div className="k-font-validator" style={{ 
      padding: "30px", background: "#0a0c10", color: "#00bac4", height: "100vh", 
      overflowY: "auto", display: "flex", flexDirection: "column", gap: "25px",
      msOverflowStyle: "none", scrollbarWidth: "none"
    }}>
      <style>{`
        .k-font-validator::-webkit-scrollbar { display: none; }
        .id-input { background: transparent; border: none; border-bottom: 1px solid rgba(0,186,196,0.2); color: #00bac4; font-size: 10px; padding: 4px; width: 100%; outline: none; }
        .id-label { font-size: 8px; letter-spacing: 2px; opacity: 0.5; margin-bottom: 4px; }
      `}</style>

      {/* 1. Alphabet Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: "8px", flexShrink: 0 }}>
        {alphabet.split("").map(char => {
          const style = getCharStyle(char);
          return (
            <div key={char} style={{ 
              border: style.border, 
              padding: "6px", background: style.bg,
              display: "flex", justifyContent: "center"
            }}>
              <KFontText text={char} height={30} color={style.color} />
            </div>
          );
        })}
      </div>

      {/* 2. Atomic Elements */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: "15px 0", borderTop: "1px solid rgba(0,186,196,0.1)", borderBottom: "1px solid rgba(0,186,196,0.1)", flexShrink: 0 }}>
        {atoms.map(atom => (
          <div key={atom.name} style={{ textAlign: "center", border: "1px dashed rgba(0,186,196,0.15)", padding: "10px", flex: 1, minWidth: "80px" }}>
            <svg viewBox="0 0 80 80" style={{ height: "30px", width: "30px" }} fill="#00bac4"><path d={atom.path} /></svg>
            <div style={{ fontSize: "6px", letterSpacing: "1px", opacity: 0.7, marginTop: "6px" }}>{atom.name}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "60px", paddingBottom: "100px" }}>
          {/* Test Lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "50px", alignItems: "center" }}>
            {["TOASTMASTER", "KEYCLOAK SYNC", "KRONO SYSTEM"].map((line, lIdx) => (
              <div key={lIdx} style={{ display: "flex", gap: `${spacing}px`, justifyContent: "center" }}>
                {line.split(" ").map((word, wIdx) => (
                  <div key={wIdx} style={{ display: "flex", gap: `${spacing}px` }}>
                    {word.split("").map((char, cIdx) => {
                      const baseH = lIdx === 0 ? 80 : 40;
                      return (
                        <div key={char + cIdx} style={{ width: `${baseH * ratio}px` }}>
                          <KFontText 
                            text={char} 
                            height={baseH} 
                            color={getCharStyle(char).color} 
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>

      {/* 4. Interactive Test Input */}
          <div style={{ marginTop: "40px", borderTop: "1px solid rgba(0, 186, 196, 0.2)", paddingTop: "40px", width: "100%", maxWidth: "800px", display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <div style={{ fontSize: "8px", letterSpacing: "3px", opacity: 0.5, marginBottom: "15px", textAlign: "left" }}>IDENTITY_STRESS_TEST (MAX_12_CHARS)</div>
              <input 
                type="text" 
                maxLength={12}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value.toUpperCase())}
                style={{ 
                  background: "rgba(0, 186, 196, 0.05)", 
                  border: "1px solid rgba(0, 186, 196, 0.2)", 
                  color: "#00bac4", 
                  padding: "15px", 
                  width: "100%", 
                  fontSize: "20px", 
                  outline: "none",
                  letterSpacing: "4px",
                  marginBottom: "30px",
                  textAlign: "center"
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ borderBottom: "1px solid rgba(0,186,196,0.1)", paddingBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "8px", letterSpacing: "2px", opacity: 0.5 }}>WIDTH_RATIO: {ratio.toFixed(3)}</span>
                  <span style={{ fontSize: "8px", color: "rgba(0,186,196,0.5)" }}>GOLD: 0.618</span>
                </div>
                <input 
                  type="range" min="0.2" max="1.5" step="0.005" 
                  value={ratio} onChange={(e) => setRatio(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "#00bac4" }}
                />
              </div>

              <div style={{ borderBottom: "1px solid rgba(0,186,196,0.1)", paddingBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "8px", letterSpacing: "2px", opacity: 0.5 }}>LETTER_SPACING: {spacing}px</span>
                </div>
                <input 
                  type="range" min="-10" max="40" step="1" 
                  value={spacing} onChange={(e) => setSpacing(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "#00bac4" }}
                />
              </div>
            </div>

            <div style={{ width: "100%", display: "flex", gap: `${spacing}px`, justifyContent: "center", minHeight: "80px", marginTop: "20px" }}>
              {testInput.split("").map((char, idx) => (
                <div key={idx} style={{ width: `${60 * ratio}px` }}>
                  <KFontText text={char} height={60} color={getCharStyle(char).color} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "60px", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
            {[...new Set([...kId, ...gold, ...silver, ...finalized])].filter(char => char.trim()).map((char, index) => {
              const style = getCharStyle(char);
              let status = "OK";
              if (kId.includes(char)) status = "SIGNATURE";
              if (gold.includes(char)) status = "GOLD";
              if (silver.includes(char)) status = "SILVER";
              return (
                <div key={char} style={{ 
                  border: style.border, 
                  padding: "8px 16px", 
                  background: style.bg,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px"
                }}>
                  <KFontText text={char} height={30} color={style.color} />
                  <div style={{ fontSize: "6px", fontWeight: "bold", letterSpacing: "1px", color: style.color }}>
                    STATUS: {status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};
