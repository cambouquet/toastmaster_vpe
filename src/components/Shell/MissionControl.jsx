import React from 'react';
import { EditableCard } from '../shared/EditableCard';
import { AppHeader } from '../shared/AppHeader';
import './MissionControl.scss';

export const MissionControl = ({ state }) => {
  return (
    <div className="workspace-screen mission-control">
      <AppHeader title="IDENTITY LAB" />
      
      <div className="workspace-grid">
        <EditableCard label="SYSTEM IDENTITY" value={state.currentUser?.name || 'GUEST_USER'} />
        <EditableCard label="ACCESS LEVEL" value={state.currentUser?.role || 'UNAUTHORIZED'} />
        <EditableCard label="UPLINK STATUS" value={state.offline ? 'DISCONNECTED' : 'ENCRYPTED SYNC'} />

        <div className="card security-section">
          <label>SECURITY MONITOR</label>
          <div className="status-grid">
            <div className="status-box err">
              <span className="box-lbl">NODE 08</span>
              <span className="box-val">INTRUSION DETECTED</span>
            </div>
            <div className="status-box ok">
              <span className="box-lbl">NODE 77</span>
              <span className="box-val">FIREWALL ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="card telemetry-section">
          <label>NEURAL TELEMETRY</label>
          <div className="status-grid">
            <div className="status-box hi">
              <span className="box-lbl">SYNC RATE</span>
              <span className="box-val">99.8% STABLE</span>
            </div>
            <div className="status-box">
              <span className="box-lbl">LATENCY</span>
              <span className="box-val">24MS // TOKYO_01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};