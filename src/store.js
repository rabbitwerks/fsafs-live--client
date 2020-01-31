/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import API_URL from './API_URL';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {
      _id: '',
      username: '',
      userClass: '',
      firstName: '',
      lastName: '',
      email: '',
    },

  },
  mutations: {
    updateStore_userLoggedIn_MUTA(state, payload) {
      console.log(payload);
      if (payload.message) return;
      const { user } = payload;
      state.user = user;
      state.isLoggedIn = true;

      router.push('/dashboard');
    },
    logout_MUTA(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    attemptLogin_ACTION({ commit }, payload) {
      fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
        .then(result => result.json())
        .then(data => commit('updateStore_userLoggedIn_MUTA', data))
        .catch(err => console.log(err));
    },

    registerUser_ACTION({ commit }, payload) {
      fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => commit('updateStore_userLoggedIn_MUTA', data));
    },

    verifiedUser_CookieLogin_ACTION({ commit }, payload) {
      commit('updateStore_userLoggedIn_MUTA', payload);
    },

    logout_ACTION({ commit }) {
      commit('logout_MUTA');
    }
  },
});
