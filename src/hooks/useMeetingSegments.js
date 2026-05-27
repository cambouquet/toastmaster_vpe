export const useMeetingSegments = (roles) => {
  return [
    { label: "START", member: "Sgt-at-Arms" },
    { label: "OPENING", member: roles.toastmaster },
    { label: "INTRO", member: `Timer: ${roles.timer}` },
    { label: "INTRO", member: `Ah-Counter: ${roles.ahCounter}` },
    { label: "INTRO", member: `Grammarian: ${roles.grammarian}` },
    ...(roles.speakers || []).map(s => ({ label: "SPEECH", member: s.name })),
    { label: "TOPICS", member: roles.topicsMaster },
    { label: "TOPIC 1", member: "Participant 1" },
    { label: "TOPIC 2", member: "Participant 2" },
    { label: "TOPIC 3", member: "Participant 3" },
    ...(roles.speakers || []).map(s => ({ label: "EVAL", member: s.evaluator })),
    { label: "REPORT", member: `Timer: ${roles.timer}` },
    { label: "REPORT", member: `Ah-Counter: ${roles.ahCounter}` },
    { label: "REPORT", member: `Grammarian: ${roles.grammarian}` },
    { label: "GEN EVAL", member: roles.genEvaluator },
    { label: "ADJOURN", member: "Closing" },
  ];
};
