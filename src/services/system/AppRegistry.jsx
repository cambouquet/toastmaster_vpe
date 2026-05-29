import React from 'react';
import { KIcon } from '../../components/Shell/KIcon';

const C = '#00bac4';
const R = '#ff0055';

export const APPS = {
  'launcher': { id: 'launcher', name: 'SYSTEM HUB', Icon: (p) => <KIcon char="H" color={C} {...p} />, color: C, hasChat: false, public: true },
  'workspace': { id: 'workspace', name: 'MEETINGS', Icon: (p) => <KIcon char="M" color="#ffffff" {...p} />, color: '#ffffff', hasChat: true, public: true },
  'nexus': { id: 'nexus', name: 'NEXUS TREE', Icon: (p) => <KIcon char="N" color="#fcee0a" {...p} />, color: '#fcee0a', hasChat: true, public: true },
  'academy': { id: 'academy', name: 'ACADEMY', Icon: (p) => <KIcon char="A" {...p} />, color: C, hasChat: false, public: true },
  'arcade': { id: 'arcade', name: 'ARCADE', Icon: (p) => <KIcon char="G" {...p} />, color: C, hasChat: false, public: true },
  'soul-link': { id: 'soul-link', name: 'SOUL LINK', Icon: (p) => <KIcon char="S" {...p} />, color: '#ff00ff', hasChat: false, public: true },
  'sanctuary': { id: 'sanctuary', name: 'SANCTUARY', Icon: (p) => <KIcon char="P" {...p} />, color: '#00ffaa', hasChat: false, public: true },
  'kids-verse': { id: 'kids-verse', name: 'KIDS VERSE', Icon: (p) => <KIcon char="K" {...p} />, color: '#ffaa00', hasChat: false, public: true },
  'identity-lab': { id: 'identity-lab', name: 'IDENTITY', Icon: (p) => <KIcon char="I" {...p} />, color: R, hasChat: false, public: true }
};

export const getAppInfo = (appId) => APPS[appId] || APPS['launcher'];



