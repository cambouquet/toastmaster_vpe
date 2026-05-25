import { Logo } from '../../components/Shell/Logo';
import { ToastmasterLogo } from '../../components/Shell/ToastmasterLogo';
import { TypeFoundryLogo } from '../../components/Shell/TypeFoundryLogo';

export const APPS = {
  'toastmaster': {
    id: 'toastmaster',
    name: 'TOASTMASTER',
    Icon: ToastmasterLogo,
    themeColor: '#00bac4',
    secondaryColor: '#ffffff'
  },
  'font-lab': {
    id: 'font-lab',
    name: 'FONT LAB',
    Icon: TypeFoundryLogo,
    themeColor: '#ff0044',
    secondaryColor: '#ffffff'
  },
  'identity-lab': {
    id: 'identity-lab',
    name: 'IDENTITY LAB',
    Icon: Logo,
    themeColor: '#ff0044',
    secondaryColor: '#ffffff'
  },
  'mission-control': {
    id: 'mission-control',
    name: 'MISSION CONTROL',
    Icon: Logo,
    themeColor: '#ff0044',
    secondaryColor: '#ffffff'
  }
};

export const getAppInfo = (appId) => APPS[appId] || APPS['toastmaster'];
