import React from 'react';
import { EditableCard } from '../shared/EditableCard';
import './MissionControl.scss';

export const MissionControl = ({ state }) => {
  return (
    <div className="workspace-screen mission-control">
      <header className="registry-header">
        <h1 className="glitch-text" data-text="IDENTITY LAB">IDENTITY LAB</h1>
      </header>
      
      <div className="workspace-grid">
        <EditableCard label="GLOBAL UPLINK" value="ACTIVE NODE // 1024" />
        <EditableCard label="SYSTEM IDENTITY" value="LIBERATION.K" />
        
        <div className="card security-section">
          <label>SECURITY LOGS</label>
          <div className="status-grid">
            <div className="status-box err">
              <span className="box-lbl">NODE 08</span>
              <span className="box-val">BRUTE FORCE DETECTED</span>
            </div>
            <div className="status-box ok">
              <span className="box-lbl">NODE 77</span>
              <span className="box-val">SUCCESS</span>
            </div>
          </div>
        </div>

        <div className="card telemetry-section">
          <label>TELEMETRY</label>
          <div className="status-grid">
            <div className="status-box hi">
              <span className="box-lbl">RANK</span>
              <span className="box-val">ELITE // LVL 42</span>
            </div>
            <div className="status-box">
              <span className="box-lbl">SYNC</span>
              <span className="box-val">100% NEURAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};