import { createApp } from 'vue'

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css'
import adminRouter from './router';
 
// import 'bootstrap/dist/js/bootstrap.bundle'
// import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
// import { createPinia } from 'pinia'

 // const pinia = createPinia()


createApp(App).use(adminRouter).mount('#app')