import { AiService } from './AiService';

export class MockAiService implements AiService {
  async sendMessage(text: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`VPE Bot: I received "${text}". How can I help you with Toastmasters?`);
      }, 1000);
    });
  }
}
