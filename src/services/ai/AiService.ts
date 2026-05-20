import { CollabResponse } from '../../models/Collaboration';

export interface AiService {
  processInput(text: string): Promise<CollabResponse>;
  handleUiAction(action: string, value: any): Promise<CollabResponse>;
}
