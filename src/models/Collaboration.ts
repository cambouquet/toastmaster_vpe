export interface MeetingState {
  date?: string;
  theme?: string;
  roles: {
    toastmaster?: string;
    grammarian?: string;
    timer?: string;
    speakers: string[];
  };
  status: 'planning' | 'confirmed';
}

export interface CollabResponse {
  subtitle: string;
  newState?: Partial<MeetingState>;
}
