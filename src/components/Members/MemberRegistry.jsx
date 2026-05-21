import React from 'react';
import { MemberCard } from './MemberCard';
import './MemberRegistry.scss';

export const MemberRegistry = ({ members, onAction }) => {
  return (
    <div className="member-registry-screen">
      <header className="registry-header">
        <h1 className="glitch-text" data-text="MEMBERS">
          MEMBERS
        </h1>
        <div className="stats-bar">
          ACTIVE MEMBERS: {members.length} &nbsp;|&nbsp; SYSTEM STATUS: OPTIMAL
        </div>
      </header>
      
      <div className="members-grid">
        {members.map(member => (
          <MemberCard 
            key={member.id} 
            member={member} 
            onEdit={(updates) => onAction('editMember', updates)}
            onDelete={(id) => onAction('deleteMember', id)}
          />
        ))}
      </div>
    </div>
  );
};
