import Login from "@/views/auth/Login";
import Index from "@/views/posts/Index";

import middleware from './middleware';

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: middleware.guest,
    },
    {
        path: '/posts',
        name: 'posts',
        component: Index,
        beforeEnter: middleware.user
    },
];