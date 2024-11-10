import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(VueCookies, { expires: '1h' })

app.mount('#app')
