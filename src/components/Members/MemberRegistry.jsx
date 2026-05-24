import React from 'react';
import { MemberCard } from './MemberCard';
import { AppHeader } from '../shared/AppHeader';
import './MemberRegistry.scss';

export const MemberRegistry = ({ members, onAction, currentUser }) => {
  const isAdmin = currentUser?.role === 'ADMIN';
  const visible = members.filter(m => isAdmin || (m.role !== 'ADMIN' && m.role !== 'GUEST'));

  return (
    <div className="member-registry-screen">
      <AppHeader app="TOASTMASTER" title="MEMBERS">
        <button className="add-member-btn" onClick={() => onAction('ADD_MEMBER_REQUEST')}>+</button>
      </AppHeader>
      <div className="members-grid">{visible.map(m => (
          <MemberCard key={m.id} member={m} onEdit={(u) => onAction('editMember', u)}
            onDelete={(id) => onAction('deleteMember', id)} currentUser={currentUser} />
        ))}</div>
    </div>
  );
};
