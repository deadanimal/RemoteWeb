import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import './assets/main.css'
import './assets/bootstrap.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
