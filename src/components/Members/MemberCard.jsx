import React, { useState } from "react";
import { PATHWAYS } from "../../constants/pathways";
import { PathwayNode } from "./PathwayNode";
import { DeleteButton } from "../shared/DeleteButton";
export const MemberCard = ({ member, onEdit, onDelete }) => {
  const { id, name, enrolled = [], status } = member, [edit, setEdit] = useState(false);
  const up = (u) => onEdit({ id, updates: u });
  const setP = (i, u) => { const n = [...enrolled]; n[i] = { ...n[i], ...u }; up({ enrolled: n }); };
  const addP = (n) => up({ enrolled: [...enrolled, { name: n, level: 1, projects: 0 }] });
  const delP = (i) => up({ enrolled: enrolled.filter((_, idx) => idx !== i) });
  return (
    <div className={`member-card ${status.toLowerCase()} ${edit ? "edit" : ""}`} onClick={() => setEdit(!edit)}>
      <DeleteButton onDelete={() => onDelete(id)} className="purge-btn" />
      <div className={`status-indicator ${status.toLowerCase()}`} onClick={e => { e.stopPropagation(); up({ status: status === "ONLINE" ? "AWAY" : "ONLINE" }); }}>{status === "STDBY" ? "AWAY" : status}</div>
      <div className="member-info">
        {edit ? <input autoFocus className="name-in" value={name} onClick={e => e.stopPropagation()} onChange={e => up({ name: e.target.value.toUpperCase() })} /> : <span className="name">{name?.toUpperCase()}</span>}
        <div className="enrolled-list" onClick={e => e.stopPropagation()}>
          {enrolled.map((p, i) => <PathwayNode key={p.name} item={p} onUpdate={(u) => setP(i, u)} onRemove={() => delP(i)} />)}
          <PathwayNode isNew available={PATHWAYS.filter(p => !enrolled.find(e => e.name === p))} onUpdate={addP} />
        </div>
      </div>
    </div>
  );
};
