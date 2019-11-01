import cookie from 'cookie';

import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

function verifyAuth(next, fallbackRoute) {
  const cookies = cookie.parse(document.cookie);

  if (cookies.token) {
    console.log('you are authorized to view this route, congrats!');
    next();
  } else {
    next(fallbackRoute);
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        verifyAuth(next, '/login');
      },
    },
  ],
});
