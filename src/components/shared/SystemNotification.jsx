import React from 'react';
import './SystemNotification.scss';

export const SystemNotification = ({ notifications, onDismiss }) => (
  <div className="notification-tray">
    {notifications.map(n => (
      <div key={n.id} className={`notification-item ${n.type}`} onClick={() => onDismiss(n.id)}>
        <div className="notif-bar" />
        <span className="notif-msg">{n.msg}</span>
      </div>
    ))}
  </div>
);
