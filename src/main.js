import { createApp } from 'vue';
import App from './App.vue';
import VueLuckyCanvas from '@lucky-canvas/vue'
import router from "@/router";


const app = createApp(App);
app.use(router);
app.use(VueLuckyCanvas);
app.mount('#app')
