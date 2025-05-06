import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css';
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(TDesign)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
