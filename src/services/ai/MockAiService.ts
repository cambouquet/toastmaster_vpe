import { AiService } from './AiService';
import { CollabResponse } from '../../models/Collaboration';

export class MockAiService implements AiService {
  async processInput(text: string): Promise<CollabResponse> {
    if (text.toLowerCase().includes('meeting')) {
      return { 
        subtitle: "Initializing meeting planner. What's the theme?",
        newState: { status: 'planning', roles: { speakers: [] } }
      };
    }
    return { subtitle: `Processing: ${text}` };
  }

  async handleUiAction(action: string, value: any): Promise<CollabResponse> {
    return { subtitle: `Updated ${action}`, newState: { [action]: value } };
  }
}
