import { createRouter, createWebHistory } from 'vue-router';
import FormPage from './components/FormPage.vue';
import Lucky from './components/Lucky.vue';

const routes = [
    { path: '/', component: FormPage },
    { path: '/lucky', name: 'Lucky', component: Lucky, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
