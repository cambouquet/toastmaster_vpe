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
    title: "REAL-LIFE MMO",
    description: "Cyber-Noir Meeting Management Documentation",
    base: isProd ? '/briefing/' : '/',
    srcExclude: isProd ? [
      'guide/setup.md', 
      'guide/coding-standards.md',
      'architecture/**',
      'reference/**'
    ] : [],
    themeConfig: {
      siteTitle: 'REAL-LIFE MMO',
      logo: '/logo-k.svg',
      nav: isProd ? [
        { text: 'Vision', link: '/guide/introduction' },
        { text: 'Legal', link: '/guide/legal' }
      ] : [
        { text: 'User Guide', link: '/guide/introduction' },
        { text: 'Tech Specs', link: '/guide/setup' }
      ],
      sidebar: isProd ? publicSidebar : [...publicSidebar, ...techSidebar],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/toastmaster-vpe' }
      ],
      footer: {
        message: isProd ? 'K-PROPRIETARY Vitrine' : 'INTERNAL Mission Specs',
        copyright: 'Copyright © 2077 REAL-LIFE MMO'
      }
    },
    mermaid: {
      // theme: 'dark' is default
    }
  })
)
