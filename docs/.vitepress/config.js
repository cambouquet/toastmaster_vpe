import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { getThemeConfig } from './themeConfig'

const isProd = process.env.VITE_DOCS_PROD === 'true';

export default withMermaid(
  defineConfig({
    title: "K App // UNLOCK YOUR POTENTIAL",
    description: "A fun and simple way to grow, learn, and play",
    base: '/briefing/',
    srcExclude: isProd ? [
      'guide/setup.md', 'guide/coding-standards.md',
      'architecture/**', 'reference/**'
    ] : [],
    themeConfig: getThemeConfig(isProd),
    mermaid: {},
    vite: {
      build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          output: { manualChunks: { 'mermaid-vendor': ['mermaid'] } }
        }
      }
    }
  })
)
