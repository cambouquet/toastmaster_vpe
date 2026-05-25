import React from "react";
import { KFontText } from "./KFontText";

export const AlphabetSection = ({ alphabet, getCharStyle }) => (
  <div className='card alphabet-section'>
    <div className="alphabet-grid">
      {alphabet.split("").map((char) => {
        const style = getCharStyle(char);
        const classNames = [
          style.isRing ? 'number-0' : '',
          style.isShiny ? 'shiny-o' : '',
          style.isFighter ? 'fighter-k' : '',
          style.isPure ? 'pure-i' : ''
        ].filter(Boolean).join(' ');

        return (
          <div key={char} className={`char-cell ${classNames}`}>
            <KFontText text={char} height={32} color={style.color} />
            <span className="char-id">{char}</span>
          </div>
        );
      })}
    </div>
  </div>
);