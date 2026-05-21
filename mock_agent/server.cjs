const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const PERSISTENCE_FILE = path.join(__dirname, 'state_persistence.json');

// Initialize persistence file if it doesn't exist
if (!fs.existsSync(PERSISTENCE_FILE)) {
  fs.writeFileSync(PERSISTENCE_FILE, JSON.stringify({ members: [] }, null, 2));
}

app.get('/api/state', (req, res) => {
  const data = JSON.parse(fs.readFileSync(PERSISTENCE_FILE, 'utf8'));
  res.json(data);
});

app.post('/api/state', (req, res) => {
  fs.writeFileSync(PERSISTENCE_FILE, JSON.stringify(req.body, null, 2));
  res.json({ status: 'success' });
});

const MOCK_ARTIFACT = {
  type: 'meeting_update',
  data: {
    theme: 'Neon Horizons',
    date: '2026-06-12',
    location: 'Sector 7G',
    wordOfTheDay: 'Ephemeral'
  }
};

app.post('/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const messages = [
    "Initializing neural uplink...",
    "Scanning meeting parameters...",
    "I have updated the meeting artifacts for you.",
    `ARTIFACT_JSON:${JSON.stringify(MOCK_ARTIFACT)}`
  ];

  for (const msg of messages) {
    res.write(`data: ${msg}\n\n`);
    await new Promise(r => setTimeout(r, 800));
  }
  res.end();
});

app.listen(PORT, () => console.log(`Mock Agent running on port ${PORT}`));