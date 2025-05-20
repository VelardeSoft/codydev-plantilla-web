import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import i18n from './traslate/i18n.js'
import router from "./routes/router.js";

import Button from 'primevue/button';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('pv-button', Button);
app.use(router)
app.use(i18n)
app.mount('#app');