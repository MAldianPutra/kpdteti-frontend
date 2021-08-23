import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/DashboardPage.vue';

Vue.use(VueRouter);

const Klasifikasi= { template:'<p>Klasifikasi!</p>'};
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
        path: '/klasifikasi',
        name: 'klasifikasi publikasi',
        component: () => import(/*webpackChunkName: "klasifikasi publikasi" */'../views/PostPublicationPage')
    },
    {
        path: '/klasifikasi',
        component: Klasifikasi
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
        component: () => import(/* webpackChunkName: "about" */ '../views/PublicationDetailPage.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
