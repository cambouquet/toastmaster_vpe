import React from 'react';
import { KIcon } from '../../components/Shell/KIcon';

const C = '#00bac4';
const R = '#ff0055';

export const APPS = {
  'launcher': { id: 'launcher', name: 'SYSTEM HUB', Icon: (p) => <KIcon char="H" color={C} {...p} />, color: C, hasChat: false, public: true },
  'workspace': { id: 'workspace', name: 'WORKSPACE', Icon: (p) => <KIcon char="W" color={C} {...p} />, color: C, hasChat: true, public: true },
  'font-lab': { id: 'font-lab', name: 'FONT LAB', Icon: (p) => <KIcon char="F" {...p} />, color: R, hasChat: false, public: false },
  'identity-lab': { id: 'identity-lab', name: 'IDENTITY LAB', Icon: (p) => <KIcon char="I" {...p} />, color: R, hasChat: false, public: true },
  'k-app': { id: 'k-app', name: 'K APP', Icon: (p) => <KIcon char="K" {...p} />, color: R, hasChat: true, public: false }
};

export const getAppInfo = (appId) => APPS[appId] || APPS['launcher'];



