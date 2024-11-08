import { createApp } from 'vue'

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import adminRouter from './router';
import VueDatePicker from '@vuepic/vue-datepicker'; 
import '@vuepic/vue-datepicker/dist/main.css'
import { createPinia } from 'pinia'

import 'bootstrap-icons/font/bootstrap-icons.css'
 
const pinia = createPinia()


createApp(App).use(adminRouter).use(pinia).component('VueDatePicker', VueDatePicker).mount('#app')