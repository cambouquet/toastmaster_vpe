const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express(), PORT = 3001;
app.use(cors()); app.use(express.json());
const FILE = path.join(__dirname, 'state_persistence.json');
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ members: [] }));

app.get('/api/state', (req, res) => res.json(JSON.parse(fs.readFileSync(FILE, 'utf8'))));
app.post('/api/state', (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2)); res.json({ status: 'success' });
});

const ARTIFACT = { type: 'meeting_update', data: { theme: 'Neon Horizons', date: '2026-06-12', location: 'Sector 7G', wordOfTheDay: 'Ephemeral' } };
app.post('/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const msgs = ["Initializing neural uplink...", "Scanning meeting parameters...", "I have updated the meeting artifacts for you.", `ARTIFACT_JSON:${JSON.stringify(ARTIFACT)}`];
  for (const msg of msgs) {
    res.write(`data: ${msg}\n\n`); await new Promise(r => setTimeout(r, 800));
  }
  res.end();
});
app.listen(PORT, () => console.log(`Mock Agent running on port ${PORT}`));