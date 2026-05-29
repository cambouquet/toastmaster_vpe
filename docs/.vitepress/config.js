import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const isProd = process.env.VITE_DOCS_PROD === 'true';

const publicSidebar = [
  {
    text: 'Mission Briefing',
    items: [
      { text: 'The Vision', link: '/guide/introduction' },
      { text: 'Legal & Licensing', link: '/guide/legal' },
      { text: 'Trademark Guide', link: '/guide/trademark' }
    ]
  }
];

const techSidebar = [
  {
    text: 'Core Directives',
    items: [
      { text: 'Project Setup', link: '/guide/setup' },
      { text: 'Coding Standards', link: '/guide/coding-standards' }
    ]
  },
  {
    text: 'Architecture',
    items: [
      { text: 'Domain Model', link: '/architecture/domain-model' },
      { text: 'Authentication', link: '/architecture/auth' },
      { text: 'AI Services', link: '/architecture/ai-agents' }
    ]
  }
];

export default withMermaid(
  defineConfig({
    title: "K App // UNLOCK YOUR POTENTIAL",
    description: "A fun and simple way to grow, learn, and play",
    base: '/briefing/',
    srcExclude: isProd ? [
      'guide/setup.md', 
      'guide/coding-standards.md',
      'architecture/**',
      'reference/**'
    ] : [],
    themeConfig: {
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
        { icon: 'github', link: 'https://github.com/toastmaster-vpe' }
      ],
      footer: {
        message: isProd ? 'K-PROPRIETARY Signal' : 'INTERNAL System Specs',
        copyright: 'Copyright © 2077 // K App'
      }
    },
    mermaid: {
      // theme: 'dark' is default
    }
  })
)
