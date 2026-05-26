import React from 'react';
import { KIcon } from '../../components/Shell/KIcon';

const C = '#00bac4';
const R = '#ff0044';

export const APPS = {
  'toastmaster': { id: 'toastmaster', name: 'TOASTMASTER', Icon: (p) => <KIcon char="T" color={C} {...p} />, color: C, hasChat: true },
  'font-lab': { id: 'font-lab', name: 'FONT LAB', Icon: (p) => <KIcon char="F" {...p} />, color: R, hasChat: false },
  'identity-lab': { id: 'identity-lab', name: 'IDENTITY LAB', Icon: (p) => <KIcon char="I" {...p} />, color: R, hasChat: false },
  'mission-control': { id: 'mission-control', name: 'MISSION CONTROL', Icon: (p) => <KIcon char="M" {...p} />, color: R, hasChat: true }
};

export const getAppInfo = (appId) => APPS[appId] || APPS['toastmaster'];



