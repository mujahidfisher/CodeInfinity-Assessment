import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import css from "./assets/Style/style.css";

createApp(App).use(store).use(css).use(router).mount('#app')
