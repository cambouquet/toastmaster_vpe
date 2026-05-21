import React, { useState } from "react";
const ICON = <svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2,0,0,0,8,21H16A2,2,0,0,0,18,19V7H6V19Z" /></svg>;
export const DeleteButton = ({ onDelete, className = "" }) => {
  const [conf, setConf] = useState(false);
  return (
    <div className={`delete-ctrl ${className} ${conf ? "conf" : ""}`} onMouseLeave={() => setConf(false)}>
      {conf && <span className="conf-t" onClick={(e) => { e.stopPropagation(); onDelete(); }}>SURE?</span>}
      <button className="del-btn" onClick={(e) => { e.stopPropagation(); if (conf) onDelete(); else setConf(true); }}>
        {conf ? "!" : ICON}
      </button>
    </div>
  );
};
