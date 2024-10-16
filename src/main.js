import { createApp } from 'vue'

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import axios from 'axios'
import adminRouter from './router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import 'bootstrap-icons/font/bootstrap-icons.css'
// import { createPinia } from 'pinia'

// const pinia = createPinia()


createApp(App).use(adminRouter, axios).component('VueDatePicker', VueDatePicker).mount('#app')