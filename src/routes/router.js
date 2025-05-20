import { createRouter, createWebHistory } from "vue-router";
import Name from '../eventify/component/name.vue'
import Home from '../eventify/component/home.vue'
import NotFound from '../shared/pages/the.response-error.component.vue'
const routes = [
    { path: "/", component: Home },
    { path: '/register', component: Home },
    { path: '/login', component: Name },
    { path: '/:pathMatch(.*)*', name:'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
