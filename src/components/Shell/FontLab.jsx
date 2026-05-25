import React, { useState } from "react";
import { AppHeader } from "../shared/AppHeader";
import { TerminalSection } from "./TerminalSection";
import { AlphabetSection } from "./AlphabetSection";
import { AtomsSection } from "./AtomsSection";
import "./FontLab.scss";

export const FontLab = () => {
  const [testInput, setTestInput] = useState("KRONOS");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0";
  const getCharStyle = (c) => ({
    color: c === "K" ? "#ff0055" : ["C", "Q", "G"].includes(c) ? "#ffea00" : c === "I" ? "#ffffff" : c === "0" ? "#c0c0c0" : "#00bac4",
    isRing: c === "0"
  });
  const atoms = [
    { name: "TOWER", path: "M10 76 L12.5 4 L15 76 Z" },
    { name: "SAIL", path: "M6 4 Q25 4 44 35 L38 35 Q25 14 6 14 Z" },
    { name: "WING", path: "M10 32 Q30 4 48 18 L18 42 Z" },
    { name: "LANCE", path: "M20 76 L15 76 L35 15 L40 4 L33 18 L38 15 Z" },
    { name: "BRIDGE", path: "M10 20 Q40 0 70 20 L70 32 Q40 12 10 32 Z" },
    { name: "SCIMITAR", path: "M60 10 L50 10 L50 50 Q50 70 20 70 Q60 70 60 50 Z" }
  ];

  return (
    <div className='workspace-screen font-lab'>
      <AppHeader title='Type Foundry'>
        <div className="header-status-sub">// OPTICS: 0.620_ARC // 3PX_GAP</div>
      </AppHeader>
      <div className='workspace-grid'>
        <TerminalSection testInput={testInput} setTestInput={setTestInput} ratio={0.620} spacing={3} getCharStyle={getCharStyle} />
        <AlphabetSection alphabet={alphabet} getCharStyle={getCharStyle} />
        <AtomsSection atoms={atoms} />
      </div>
    </div>
  );
};
