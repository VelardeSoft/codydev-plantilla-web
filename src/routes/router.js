import { createRouter, createWebHistory } from "vue-router";
import NotFound from '../shared/pages/the.response-error.component.vue'

const routes = [
    { path: "/", component: NotFound },
    { path: '/register', component: NotFound },
    { path: '/login', component: NotFound },
    { path: '/:pathMatch(.*)*', name:'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
