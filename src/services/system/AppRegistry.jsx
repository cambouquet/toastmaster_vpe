import React from 'react';
import { KIcon } from '../../components/Shell/KIcon';

const C = '#00bac4';
const R = '#ff0055';

export const APPS = {
  'launcher': { id: 'launcher', name: 'SYSTEM HUB', Icon: (p) => <KIcon char="H" color={C} {...p} />, color: C, hasChat: false, public: true },
  'arcade': { id: 'arcade', name: 'GAMES', Icon: (p) => <KIcon char="G" color="#ffaa00" {...p} />, color: '#ffaa00', hasChat: false, public: true },
  'academy': { id: 'academy', name: 'ACADEMY', Icon: (p) => <KIcon char="A" color="#fcee0a" {...p} />, color: '#fcee0a', hasChat: false, public: true },
  'nexus': { id: 'nexus', name: 'NEXUS TREE', Icon: (p) => <KIcon char="N" color="#00ffaa" {...p} />, color: '#00ffaa', hasChat: true, public: true },
  'health-lab': { id: 'health-lab', name: 'HEALTH', Icon: (p) => <KIcon char="V" color="#ff0044" {...p} />, color: '#ff0044', hasChat: false, public: true },
  'sanctuary': { id: 'sanctuary', name: 'SANCTUARY', Icon: (p) => <KIcon char="S" color="#bd00ff" {...p} />, color: '#bd00ff', hasChat: false, public: true },
  'soul-link': { id: 'soul-link', name: 'SOUL LINK', Icon: (p) => <KIcon char="L" color="#0088ff" {...p} />, color: '#0088ff', hasChat: false, public: true },
  'workspace': { id: 'workspace', name: 'MEETINGS', Icon: (p) => <KIcon char="M" color="#ffffff" {...p} />, color: '#ffffff', hasChat: true, public: true },
  'identity-lab': { id: 'identity-lab', name: 'IDENTITY', Icon: (p) => <KIcon char="I" color={R} {...p} />, color: R, hasChat: false, public: true },
  'guide': { id: 'guide', name: 'ZENITH', Icon: (p) => <KIcon char="Z" color="#00ffaa" {...p} />, color: '#00ffaa', hasChat: false, public: true }
};

export const getAppInfo = (appId) => APPS[appId] || APPS['launcher'];



