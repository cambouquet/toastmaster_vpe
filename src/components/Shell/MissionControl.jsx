import React from 'react';
import './MissionControl.scss';

export const MissionControl = ({ state }) => (
  <div className="mission-control">
    <div className="mc-header-row">
      <div className="mc-title">MISSION CONTROL // IDENTITY_LAB</div>
      <div className="mc-status-bit"><span className="pulse" /> KERNEL_ESTABLISHED</div>
    </div>
    <div className="mc-grid">
      <div className="mc-card telemetry">
        <div className="lbl">GLOBAL UPLINK</div>
        <div className="val hi">ACTIVE</div>
        <div className="stats">
          <div className="stat"><span className="l">NODES</span><span className="v">1,024</span></div>
          <div className="stat"><span className="l">TRAFFIC</span><span className="v">84 GB/S</span></div>
        </div>
      </div>
      <div className="mc-card user-profile">
        <div className="lbl">USER RANK</div>
        <div className="val">ELITE ARCHITECT</div>
        <div className="sub">LEVEL 42</div>
      </div>
      <div className="mc-card alerts">
        <div className="lbl">SECURITY LOGS</div>
        <div className="log err">> BRUTE FORCE DETECTED (NODE 08)</div>
        <div className="log ok">> HANDSHAKE SUCCESS (NODE 77)</div>
      </div>
    </div>
    <div className="mc-main-visual">
      <div className="hex-grid" />
      <div className="core-sync">SYSTEM IDENTITY: LIBERATION_K</div>
    </div>
  </div>
);