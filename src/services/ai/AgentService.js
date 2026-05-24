export class AgentService {
  static async streamFromMockAgent(text, onStream) {
    try {
      const res = await fetch('http://localhost:3001/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
      if (!res.ok) return { subtitle: `Agent Error: ${res.status}` };
      const reader = res.body.getReader(), dec = new TextDecoder();
      let last = { subtitle: "Connecting..." };
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const lines = dec.decode(value).split('\n');
        for (const l of lines) {
          if (l.startsWith('data: ')) {
            const d = l.slice(6).trim();
            if (d.startsWith('ARTIFACT_JSON:')) last.newState = JSON.parse(d.slice(14)).data;
            else { last.subtitle = d; if (onStream) onStream(last); }
          }
        }
      }
      return last;
    } catch (e) { return { subtitle: "Agent Offline. Error 404." }; }
  }
}