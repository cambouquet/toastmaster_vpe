import React from 'react';
import './MeetingProgram.scss';

export const MeetingProgram = ({ state }) => {
  const { roles } = state;
  
  const segments = [
    { time: "19:00", label: "MEETING START", detail: "Sergeant-at-Arms" },
    { time: "19:05", label: "TOASTMASTER OPENING", detail: roles.toastmaster || "TBD" },
    { time: "19:15", label: "PREPARED SPEECHES", detail: `${roles.speakers?.filter(s => s.name).length || 0} Speakers` },
    { time: "19:45", label: "TABLE TOPICS", detail: roles.topicsMaster || "TBD" },
    { time: "20:00", label: "EVALUATIONS", detail: roles.genEvaluator || "TBD" },
    { time: "20:20", label: "REPORTS & AWARDS", detail: "Timer / Grammarian" },
    { time: "20:30", label: "ADJOURN", detail: "Closing" },
  ];

  return (
    <div className="card meeting-program">
      <label>MISSION PROGRAM</label>
      <div className="program-timeline">
        {segments.map((s, i) => (
          <div key={i} className="timeline-item">
            <span className="time">{s.time}</span>
            <div className="marker" />
            <div className="content">
              <span className="label-text">{s.label}</span>
              <span className="detail-text">{s.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
