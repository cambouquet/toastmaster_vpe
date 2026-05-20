import React from 'react';
import { CLUB_MEMBERS } from '../../models/Members';
import { MemberCard } from './MemberCard';
import './MemberRegistry.scss';

export const MemberRegistry = () => {
  return (
    <div className="member-registry-screen">
      <header className="registry-header">
        <h1 className="glitch-text" data-text="MEMBER_DATABASE_V1.0">
          MEMBER_DATABASE_V1.0
        </h1>
        <div className="stats-bar">
          ACTIVE_NODES: {CLUB_MEMBERS.length} | SYNC_STATUS: OPTIMAL
        </div>
      </header>
      
      <div className="members-grid">
        {CLUB_MEMBERS.map(member => (
          <MemberCard key={member} name={member} />
        ))}
      </div>
    </div>
  );
};
