import { createRouter, createWebHistory } from "vue-router";
import Home from '../tambo/component/home.component.vue'
import Sales from '../tambo/component/salesView.component.vue'
import NewStore from '../tambo/component/createStore.component.vue'
import NotFound from '../shared/pages/the.response-error.component.vue'
const routes = [
    { path: "/", component: Home },
    { path: '/commerce/store-sales/new', component: Sales },
    { path: '/commerce/stores/new', component: NewStore },
    { path: '/:pathMatch(.*)*', name:'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
