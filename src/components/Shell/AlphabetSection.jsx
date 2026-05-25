import React from "react";
import { KFontText } from "./KFontText";

export const AlphabetSection = ({ alphabet, getCharStyle }) => (
  <div className='card alphabet-section'>
    <label>Character Matrix</label>
    <div className="alphabet-grid">
      {alphabet.split("").map((char) => {
        const style = getCharStyle(char);
        return (
          <div key={char} className={`char-cell ${style.isRing ? 'energy-ring' : ''}`}>
            <KFontText text={char} height={32} color={style.color} />
            <span className="char-id">{char}</span>
          </div>
        );
      })}
    </div>
  </div>
);