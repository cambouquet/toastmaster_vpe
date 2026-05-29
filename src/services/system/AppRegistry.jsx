import React from 'react';
import { KIcon } from '../../components/Shell/KIcon';

const C = '#00bac4', R = '#ff0055', Y = '#fcee0a', G = '#00ffaa', B = '#0088ff', P = '#bd00ff', O = '#ffaa00';
const a = (id, name, char, color, chat = false, isPublic = false) => ({ 
  id, name, char, Icon: (p) => <KIcon char={char} color={color} {...p} />, color, hasChat: chat, public: isPublic 
});

export const APPS = {
  'academy': a('academy', 'ACADEMY', 'A', Y), 'bazaar': a('bazaar', 'BAZAAR', 'B', O),
  'citadel': a('citadel', 'CITADEL', 'C', C), 'dojo': a('dojo', 'DOJO', 'D', R),
  'echo': a('echo', 'ECHO', 'E', B, true), 'flux': a('flux', 'FLUX', 'F', G),
  'arcade': a('arcade', 'GAMES', 'G', O, false, true), 'launcher': a('launcher', 'HUB', 'H', C, false, true),
  'identity': a('identity', 'IDENTITY', 'I', R, false, true), 'jukebox': a('jukebox', 'JUKEBOX', 'J', P),
  'koin': a('koin', 'KOIN', 'K', Y), 'soul-link': a('soul-link', 'LINK', 'L', B),
  'workspace': a('workspace', 'MEETINGS', 'M', '#fff', true, true), 'nexus': a('nexus', 'NEXUS', 'N', G, true),
  'oracle': a('oracle', 'ORACLE', 'O', Y), 'pulse': a('pulse', 'PULSE', 'P', R),
  'quest': a('quest', 'QUEST', 'Q', O), 'relay': a('relay', 'RELAY', 'R', B, true),
  'sanctuary': a('sanctuary', 'SANCTUARY', 'S', P), 'terminal': a('terminal', 'TERMINAL', 'T', '#fff'),
  'uplink': a('uplink', 'UPLINK', 'U', C), 'health': a('health', 'VITALITY', 'V', R),
  'wild': a('wild', 'WILD', 'W', G), 'xray': a('xray', 'X-RAY', 'X', C),
  'yield': a('yield', 'YIELD', 'Y', Y), 'guide': a('guide', 'ZENITH', 'Z', G, false, true)
};

export const getAppInfo = (i) => APPS[i] || APPS['launcher'];



