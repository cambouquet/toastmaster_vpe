import React from 'react';
import { MemberCard } from './MemberCard';
import { AppHeader } from '../shared/AppHeader';
import './MemberRegistry.scss';

export const MemberRegistry = ({ members, onAction, currentUser }) => {
  const isAdmin = currentUser?.role === 'ADMIN';
  const isOfficer = currentUser?.role === 'ORGANIZER' || currentUser?.role === 'ADMIN' || currentUser?.title === 'LEAD HOST';
  const visible = members.filter(m => isAdmin || (m.role !== 'ADMIN' && m.role !== 'GUEST'));

  return (
    <div className="member-registry-screen">
      <AppHeader title="IDENTITY REGISTRY" status="stable">
        {isOfficer && (
          <button className="add-member-btn cyber-plus" onClick={() => onAction('ADD_MEMBER_REQUEST')}>
            <span className="btn-glitch" />
            <span className="btn-label">+ ADD_IDENTITY</span>
          </button>
        )}
      </AppHeader>
      <div className="members-grid">{visible.map(m => (
          <MemberCard key={m.id} member={m} onEdit={(u) => onAction('editMember', u)}
            onDelete={(id) => onAction('deleteMember', id)} currentUser={currentUser} />
        ))}</div>
    </div>
  );
};
