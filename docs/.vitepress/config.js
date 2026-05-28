import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: "Mission Control",
    description: "Cyber-Noir Meeting Management Documentation",
    themeConfig: {
      siteTitle: 'MISSION CONTROL',
      logo: '/logo-k.svg',
      nav: [
        { text: 'Guide', link: '/guide/introduction' },
        { text: 'Architecture', link: '/architecture/domain-model' },
        { text: 'Guidelines', link: '/guide/coding-standards' }
      ],
      sidebar: [
        {
          text: 'Core Directives',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
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
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/toastmaster-vpe' }
      ],
      footer: {
        message: 'Released under the K-PROPRIETARY Signal.',
        copyright: 'Copyright © 2077 Mission Control'
      }
    },
    mermaid: {
      // theme: 'dark' is default
    }
  })
)
