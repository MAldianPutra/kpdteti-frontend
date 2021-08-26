import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/DashboardPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/home',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/classification',
        name: 'publication classification',
        component: () => import(/*webpackChunkName: "publication classification" */'../views/PostPublicationPage')
    },
    {
      path: '/author-profile',
      name: 'author profile',
      component: () => import(/* webpackChunkName: "author profile" */'../views/AuthorProfilePage.vue')
    },
    {
        path: '/publication',
        name: 'publication',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "publication" */ '../views/PublicationDetailPage.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
