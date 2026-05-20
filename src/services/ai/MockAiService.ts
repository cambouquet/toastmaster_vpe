import { AiService } from './AiService';
import { CollabResponse } from '../../models/Collaboration';

export class MockAiService implements AiService {
  async processInput(text: string): Promise<CollabResponse> {
    const input = text.toLowerCase();
    if (input.includes('theme')) {
      const themeMatch = text.match(/theme (will be|is) (.*)/i);
      const theme = themeMatch ? themeMatch[2] : "Planning";
      return { 
        subtitle: `Set theme to "${theme}". Let's fill the roles now.`,
        newState: { theme, status: 'planning' }
      };
    }
    return { subtitle: `Processing: ${text}` };
  }

  async handleUiAction(action: string, value: any): Promise<CollabResponse> {
    if (action === 'theme') {
      return { 
        subtitle: `Got it. The theme is now set to ${value}.`, 
        newState: { theme: value } 
      };
    }
    return { subtitle: `Updated ${action}`, newState: { [action]: value } };
  }
}
