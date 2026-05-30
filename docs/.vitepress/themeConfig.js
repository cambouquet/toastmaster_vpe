import { publicSidebar, techSidebar } from './sidebars';

export const getThemeConfig = (isProd) => ({
  siteTitle: 'K App',
  logo: '/logo-k.svg',
  nav: isProd ? [
    { text: 'The Journey', link: '/guide/introduction' },
    { text: 'Legal', link: '/guide/legal' }
  ] : [
    { text: 'Journey Guide', link: '/guide/introduction' },
    { text: 'System Specs', link: '/guide/setup' }
  ],
  sidebar: isProd ? publicSidebar : [...publicSidebar, ...techSidebar],
  socialLinks: [
    { icon: 'github', link: 'https://github.com/k-app-tech' }
  ],
  footer: {
    message: isProd ? 'K-PROPRIETARY Signal' : 'INTERNAL System Specs',
    copyright: 'Copyright © 2077 // K App'
  }
});
