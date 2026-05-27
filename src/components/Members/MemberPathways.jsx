import React from "react";
import { PathwayNode } from "./PathwayNode";
import { SKILL_TRACKS } from "../../constants/pathways";

export const MemberPathways = ({ enrolled, setP, addP, delP }) => (
  <div className="enrolled-list" onClick={e => e.stopPropagation()}>
    {enrolled.map((p, i) => (
      <PathwayNode key={p.name} item={p} onUpdate={(u) => setP(i, u)} onRemove={() => delP(i)} />
    ))}
    <PathwayNode isNew available={SKILL_TRACKS.filter(p => !enrolled.find(e => e.name === p))} onUpdate={addP} />
  </div>
);