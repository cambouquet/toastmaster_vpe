import React from "react";
import { DeleteButton } from "../shared/DeleteButton";

export const MemberCardHeader = ({ status, title, role, canEdit, isVpe, up, cycleRole, onDelete, id }) => (
  <>
    <div className="card-header-left">
      <div className={`status-pill ${status.toLowerCase()} ${canEdit ? 'clickable' : ''}`} onClick={e => { e.stopPropagation(); if (canEdit) up({ status: status === "ONLINE" ? "AWAY" : "ONLINE" }); }}></div>
      <div className={`role-badge ${role.toLowerCase()} ${isVpe ? 'clickable' : ''}`} onClick={cycleRole}>{title}</div>
    </div>
    {isVpe && <DeleteButton onDelete={() => onDelete(id)} className="purge-btn" />}
  </>
);