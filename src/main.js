import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import App from './App.vue'
import router from './ui/router'
import './ui/assets/main.css';
import { useAuthStore } from './application/stores/AuthStore';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false || 'none',
            cssLayer: false
        }
    }
});

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Button', Button)

const authStore = useAuthStore()
authStore.loadToken()

if (!authStore.token) {
    authStore.login().catch(error => {
        console.error('Automatic login failed:', error);
    });
}

app.mount('#app')
