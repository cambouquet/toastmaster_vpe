export class AgentService {
  static async streamFromMockAgent(text, onStream) {
    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        return { subtitle: `Agent Error: ${response.status}` };
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let lastResult = { subtitle: "Connecting..." };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data.startsWith('ARTIFACT_JSON:')) {
              const artifact = JSON.parse(data.slice(14));
              lastResult.newState = artifact.data;
            } else {
              lastResult.subtitle = data;
              if (onStream) onStream(lastResult);
            }
          }
        }
      }
      return lastResult;
    } catch (err) {
      return { subtitle: "Agent Offline. Error 404." };
    }
  }
}