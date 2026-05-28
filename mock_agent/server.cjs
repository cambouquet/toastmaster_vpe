const couchbase = require('couchbase');
const express = require('express');
const cors = require('cors');
const app = express(), PORT = 3001;
let col;
async function initCB() {
  const cluster = await couchbase.connect(process.env.CB_URL || 'couchbase://127.0.0.1', {
    username: process.env.CB_USER || 'admin', password: process.env.CB_PASSWORD || 'password',
  });
  col = cluster.bucket('k-app').defaultCollection();
}
app.use(cors()); app.use(express.json());
app.get('/api/state', async (req, res) => {
  try { res.json((await col.get('state')).content); } catch (e) { res.json({ members: [] }); }
});
app.post('/api/state', async (req, res) => {
  await col.upsert('state', req.body); res.json({ status: 'success' });
});
app.post('/api/waitlist', async (req, res) => {
  let list = []; try { list = (await col.get('waitlist')).content; } catch (e) {}
  list.push({ email: req.body.email, timestamp: new Date().toISOString() });
  await col.upsert('waitlist', list); res.json({ status: 'success' });
});

const ARTIFACT = { type: 'meeting_update', data: { theme: 'Neon Horizons' } };
app.post('/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  const msgs = ["Initializing neural uplink...", `ARTIFACT_JSON:${JSON.stringify(ARTIFACT)}`];
  for (const msg of msgs) {
    res.write(`data: ${msg}\n\n`); await new Promise(r => setTimeout(r, 800));
  }
  res.end();
});
initCB().then(() => {
  app.listen(PORT, () => console.log(`Mock Agent running on port ${PORT}`));
}).catch(() => app.listen(PORT, () => console.log(`Mock Agent (Fallback) on ${PORT}`)));