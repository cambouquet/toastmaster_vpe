import React, { useState } from 'react';
import './MeetingProgram.scss';

export const MeetingProgram = ({ state, onAction }) => {
  const { roles } = state;
  const active = state.activeSegment || 0;
  const isOrganizer = state.currentUser?.role === 'ORGANIZER' || state.currentUser?.role === 'ADMIN';
  const [collapsed, setCollapsed] = useState({});

  const groups = [
    { title: 'OPENING', items: [
      { id: 'start', time: "19:00", label: "START", detail: "Logistics" },
      { id: 'opening', time: "19:05", label: "OPENING", detail: roles.host },
      { id: 'intro-timer', time: "19:08", label: "INTROS", detail: `Timekeeper: ${roles.timer}` },
      { id: 'intro-ah', time: "19:10", label: "INTROS", detail: `Reviewer: ${roles.reviewer}` },
      { id: 'intro-gram', time: "19:12", label: "INTROS", detail: `Scribe: ${roles.scribe}` }
    ]},
    { title: 'SPEECHES', items: (roles.speakers || []).map(s => ({ 
      id: `speech-${s.id}`, time: "19:15", label: "SPEECH", detail: `${s.name}` 
    }))},
    { title: 'TOPICS', items: [
      { id: 'tt-intro', time: "19:40", label: "INTRO", detail: roles.speaker },
      { id: 'tt-1', time: "19:42", label: "T1", detail: "Participant 1" },
      { id: 'tt-2', time: "19:45", label: "T2", detail: "Participant 2" },
      { id: 'tt-3', time: "19:48", label: "T3", detail: "Participant 3" }
    ]},
    { title: 'EVALS & REPORTS', items: [
      ...(roles.speakers || []).map(s => ({ 
        id: `eval-${s.id}`, time: "20:00", label: "EVAL", detail: `${s.evaluator}` 
      })),
      { id: 'timer-rep', time: "20:15", label: "REPORT", detail: `Timekeeper` },
      { id: 'ah-rep', time: "20:17", label: "REPORT", detail: `Reviewer` },
      { id: 'gram-rep', time: "20:20", label: "REPORT", detail: `Scribe` },
      { id: 'gen-eval', time: "20:25", label: "GEN EVAL", detail: roles.observer },
      { id: 'end', time: "20:30", label: "ADJOURN", detail: "Closing" }
    ]}
  ];

  let globalIdx = 0;

  return (
    <div className="card meeting-program">
      <label>MISSION PROGRAM</label>
      <div className="program-groups">
        {groups.map(g => {
          const isCol = collapsed[g.title];
          const groupItems = g.items.map((s) => {
            const currentIdx = globalIdx++;
            const recordedTime = state[`time-${currentIdx}`];
            const canClick = isOrganizer || roles.host === state.currentUser?.name;
            return (
              <div key={s.id} className={`timeline-item ${canClick ? 'clickable' : ''} ${active === currentIdx ? 'active' : ''}`}
                   onClick={canClick ? () => onAction('activeSegment', currentIdx) : null}>
                <span className="time">{recordedTime || s.time}</span>
                <div className="marker" />
                <div className="content">
                  <span className="label-text">{s.label}</span>
                  <span className="detail-text">{s.detail}</span>
                </div>
              </div>
            );
          });
          
          return (
            <div key={g.title} className="prog-g">
              <div className="g-h" onClick={() => setCollapsed({ ...collapsed, [g.title]: !isCol })}>
                {g.title} <span className="g-t">{isCol ? '⊕' : '⊖'}</span>
              </div>
              {!isCol && <div className="g-c">{groupItems}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
