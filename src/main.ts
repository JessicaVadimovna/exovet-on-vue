import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import VueSmoothScroll from 'vue3-smooth-scroll'

const app = createApp(App)
app.use(router)
app.use(VueSmoothScroll)
app.mount('#app')
