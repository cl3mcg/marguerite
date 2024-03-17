// import './styles/reset.css';
import './styles/fonts.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'

const app = createApp(App);
app.use(PrimeVue, { unstyled: true })
app.use(createPinia());

import Router from './routes/router.js'
app.use(Router);

app.mount('#app');