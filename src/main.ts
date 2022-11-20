import {createApp} from 'vue'
import './common/style.pcss'
import App from './App.vue'
import router from "./common/router";
import {createPinia} from "pinia";

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');
