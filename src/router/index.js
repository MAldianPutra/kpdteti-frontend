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
        path: '/classification',
        name: 'publication classification',
        component: () => import(/*webpackChunkName: "publication classification" */'../views/PostPublicationPage'),
        meta: { requiresAuth: true }
    },
    {
      path: '/author',
      name: 'author',
      component: () => import(/* webpackChunkName: "author profile" */'../views/AuthorList.vue')
    },
    {
        path: '/publication/:searchKey',
        name: 'publication',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "publication" */ '../views/PublicationDetailPage.vue'),
    },
    {
        path: '/classification/steps/:id',
        name: 'classification steps',
        component: () => import(/* webpackChunkName: "classification steps" */'../views/ClassificationSteps.vue'),
    },
    {
        path: '/publication/publication-profile/:id',
        name: 'publication profile',
        component: () => import(/* webpackChunkName: "publication profile" */'../views/PublicationProfile.vue'),
    },
    {
        path: '/home/publication-profile/:id',
        name: 'publication profile',
        component: () => import(/* webpackChunkName: "publication profile" */'../views/PublicationProfile.vue'),
    },
    {
        path: '/home/publication-topic/:id',
        name: 'publication topic',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/PublicationByTopicPage.vue'),
    },
    {
        path: '/author/author-profile/:id',
        name: 'author profile',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/AuthorProfilePage.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/RegisterPage.vue'),
    },
    {
        path: '/register/admin',
        name: 'register admin',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/RegisterPageAdmin.vue'),
    },
    {
        path: '/database/topics',
        name: 'topic database',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/Database.vue'),
    },
    {
        path: '/database/authors',
        name: 'authors database',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/AuthorDatabase.vue'),
    },
    {
        path: '/database/publications',
        name: 'publications database',
        component: () => import(/* webpackChunkName: "publication topic" */'../views/PublicationDatabase.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (to.matched.some(value => value.meta.requiresAuth)) {
        if (!user && !user.token) {
            next({
                path: '/login',
            });
        } else {
            next();
        }
    } else if (to.path === '/login' && !!user && !!user.token) {
        next({
            path: '/home',
            replace: true,
        });
    } else {
        next();
    }
});

export default router;
