import React from 'react';
import { MemberCard } from './MemberCard';
import './MemberRegistry.scss';

export const MemberRegistry = ({ members, onAction, currentUser }) => {
  const isAdmin = currentUser?.role === 'ADMIN';

  const addMember = () => {
    const name = prompt("Enter Member Name:");
    if (!name) return;
    onAction('addMember', {
      id: Date.now().toString(),
      name: name.toUpperCase(),
      role: 'MEMBER',
      title: 'MEMBER',
      enrolled: [],
      status: 'ONLINE'
    });
  };

  const visibleMembers = members.filter(m => {
    // Admin sees everyone
    if (isAdmin) return true;
    // Don't show Admin to others
    if (m.role === 'ADMIN') return false;
    // Don't show Guests to others
    return m.role !== 'GUEST';
  });

  return (
    <div className="member-registry-screen">
      <header className="registry-header">
        <div className="header-left">
          <h1 className="glitch-text" data-text="MEMBERS">
            MEMBERS
          </h1>
          <button className="add-member-btn" onClick={addMember}>+</button>
        </div>
      </header>
      
      <div className="members-grid">
        {visibleMembers.map(member => (
          <MemberCard 
            key={member.id} 
            member={member} 
            onEdit={(updates) => onAction('editMember', updates)}
            onDelete={(id) => onAction('deleteMember', id)}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};
