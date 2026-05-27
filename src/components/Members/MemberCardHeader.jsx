import React from "react";
import { DeleteButton } from "../shared/DeleteButton";

export const MemberCardHeader = ({ status, title, role, canEdit, isOrganizer, up, cycleRole, onDelete, id }) => (
  <>
    <div className="card-header-left">
      <div className={`status-pill ${status.toLowerCase()} ${canEdit ? 'clickable' : ''}`} onClick={e => { e.stopPropagation(); if (canEdit) up({ status: status === "ONLINE" ? "AWAY" : "ONLINE" }); }}></div>
      <div className={`role-badge ${role.toLowerCase()} ${isOrganizer ? 'clickable' : ''}`} onClick={cycleRole}>{title}</div>
    </div>
    {isOrganizer && <DeleteButton onDelete={() => onDelete(id)} className="purge-btn" />}
  </>
);