export const useMeetingSegments = (roles) => {
  return [
    { label: "START", member: "Logistics" },
    { label: "OPENING", member: roles.host },
    { label: "INTRO", member: `Timekeeper: ${roles.timer}` },
    { label: "INTRO", member: `Reviewer: ${roles.reviewer}` },
    { label: "INTRO", member: `Scribe: ${roles.scribe}` },
    ...(roles.speakers || []).map(s => ({ label: "SPEECH", member: s.name, title: s.title })),
    { label: "TOPICS", member: roles.speaker },
    { label: "TOPIC 1", member: "Participant 1" },
    { label: "TOPIC 2", member: "Participant 2" },
    { label: "TOPIC 3", member: "Participant 3" },
    ...(roles.speakers || []).map(s => ({ label: "EVAL", member: s.evaluator })),
    { label: "REPORT", member: `Timekeeper: ${roles.timer}` },
    { label: "REPORT", member: `Reviewer: ${roles.reviewer}` },
    { label: "REPORT", member: `Scribe: ${roles.scribe}` },
    { label: "GEN EVAL", member: roles.observer },
    { label: "ADJOURN", member: "Closing" },
  ];
};
