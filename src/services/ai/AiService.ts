import { Message } from '../../models/Message';

export interface AiService {
  sendMessage(text: string): Promise<string>;
}
