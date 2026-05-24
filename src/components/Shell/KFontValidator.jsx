import React from "react";
import { KFontText } from "./KFontText";

export const KFontValidator = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const okLetters = ["K", "I", "D", "E", "T", "Z"];
  
  const atoms = [
    { name: "TOWER", path: "M8 76 L11 4 L14 76 Z" },
    { name: "SAIL_U", path: "M14 4 Q60 4 65 35 L55 35 Q50 14 14 14 Z" },
    { name: "SAIL_L", path: "M14 76 Q60 76 65 45 L55 45 Q50 66 14 66 Z" },
    { name: "WING", path: "M18 32 Q50 4 75 18 L28 42 Z" },
    { name: "KATANA", path: "M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z" },
    { name: "JOINT", path: "M10 42 L21 53 L18 56 L7 45 Z" },
    { name: "SABER", path: "M11 35 L16 35 L16 41 L11 41 Z M18 34 L45 34 L50 38 L45 42 L18 42 Z" },
    { name: "STICK", path: "M29 35 L35 35 L35 41 L29 41 Z M37 34 L60 34 L65 38 L60 42 L37 42 Z M27 34 L4 34 L0 38 L4 42 L27 42 Z" }
  ];

  return (
    <div className="k-font-validator" style={{ 
      padding: "30px", background: "#0a0c10", color: "#00bac4", height: "100vh", 
      overflow: "hidden", display: "flex", flexDirection: "column", gap: "25px",
      msOverflowStyle: "none", scrollbarWidth: "none"
    }}>
      <style>{`
        .k-font-validator::-webkit-scrollbar { display: none; }
        .id-input { background: transparent; border: none; border-bottom: 1px solid rgba(0,186,196,0.2); color: #00bac4; font-size: 10px; padding: 4px; width: 100%; outline: none; }
        .id-label { font-size: 8px; letter-spacing: 2px; opacity: 0.5; margin-bottom: 4px; }
      `}</style>

      {/* 1. Alphabet Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: "8px" }}>
        {alphabet.split("").map(char => (
          <div key={char} style={{ 
            border: `1px solid ${okLetters.includes(char) ? "#00bac4" : "rgba(0,186,196,0.1)"}`, 
            padding: "6px", background: okLetters.includes(char) ? "rgba(0,186,196,0.05)" : "transparent",
            display: "flex", justifyContent: "center"
          }}>
            <KFontText text={char} height={30} color={okLetters.includes(char) ? "#00bac4" : "rgba(0,186,196,0.2)"} />
          </div>
        ))}
      </div>

      {/* 2. Atomic Elements */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: "15px 0", borderTop: "1px solid rgba(0,186,196,0.1)", borderBottom: "1px solid rgba(0,186,196,0.1)" }}>
        {atoms.map(atom => (
          <div key={atom.name} style={{ textAlign: "center", border: "1px dashed rgba(0,186,196,0.15)", padding: "10px", flex: 1, minWidth: "80px" }}>
            <svg viewBox="0 0 80 80" style={{ height: "30px", width: "30px" }} fill="#00bac4"><path d={atom.path} /></svg>
            <div style={{ fontSize: "6px", letterSpacing: "1px", opacity: 0.7, marginTop: "6px" }}>{atom.name}</div>
          </div>
        ))}
      </div>

      {/* 3. Sample Sentence Workspace */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "40px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", opacity: 0.5, marginBottom: "20px" }}>FONT_STRESS_TEST_MODE</div>
          
          {/* Main Hero Sentence */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
            {["THE", "K-ID", "IDENTITY", "DETECTOR"].map((word, wIdx) => (
              <div key={wIdx} style={{ display: "flex", gap: "4px" }}>
                {word.split("").map((char, cIdx) => (
                  <KFontText 
                    key={cIdx} 
                    text={char} 
                    height={80} 
                    color={okLetters.includes(char) ? "#00bac4" : "rgba(0,186,196,0.1)"} 
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "600px", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", position: "absolute", bottom: "40px", width: "calc(100% - 60px)" }}>
            {["K", "I", "D", "E", "T", "Z"].map(char => (
              <div key={char} style={{ 
                border: "1px solid #00bac4", 
                padding: "8px 16px", 
                background: "rgba(0,186,196,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px"
              }}>
                <KFontText text={char} height={30} color="#00bac4" />
                <div style={{ fontSize: "6px", fontWeight: "bold", letterSpacing: "2px" }}>STATUS: OK</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
