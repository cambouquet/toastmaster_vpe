import DefaultTheme from 'vitepress/theme'
import SplashIntro from './SplashIntro.js'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('SplashIntro', SplashIntro)
  }
}
