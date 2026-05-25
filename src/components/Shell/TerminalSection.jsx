import React from "react";
import { KFontText } from "./KFontText";

export const TerminalSection = ({ testInput, setTestInput, ratio, spacing, getCharStyle }) => (
  <div className='card terminal-section'>
    <div className="terminal-wrap">
      <input 
        type="text" 
        maxLength={12}
        value={testInput}
        onChange={(e) => setTestInput(e.target.value.toUpperCase())}
        className="terminal-input"
        placeholder="Enter Signature"
      />
      <div className="terminal-output" style={{ gap: `${spacing}px` }}>
        {testInput.split("").map((char, idx) => {
          const style = getCharStyle(char);
          const classNames = [
            style.isRing ? 'number-0' : '',
            style.isShiny ? 'shiny-o' : '',
            style.isFighter ? 'fighter-k' : '',
            style.isPure ? 'pure-i' : ''
          ].filter(Boolean).join(' ');

          return (
            <div key={idx} style={{ width: `${60 * ratio}px` }} className={classNames}>
              <KFontText text={char} height={60} color={style.color} />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);