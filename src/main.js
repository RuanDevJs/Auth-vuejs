import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import state from "./store";

createApp(App).use(router).use(state).mount('#app')
