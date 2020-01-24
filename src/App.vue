<template>
  <div id="app">
    <!-- navbar -->
    <NavBar--Main />
    <router-view/>
  </div>
</template>

<script>
import NavBar_Main from './components/navbar/NavBar_Main.vue';

export default {
  components: {
    'NavBar--Main': NavBar_Main,
  },
  mounted() {
    fetch('https://fsafs-backend.now.sh/auth/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://fsafs-backend.now.sh',
      },
      credentials: 'include',
    })
      .then(response => response.json())
        // TODO: set user result in Vuex store.
      .then(result => this.$store.dispatch('verifiedUser_CookieLogin_ACTION', result))
      .catch(err => console.log(err));
  },
};
</script>

<style>
@import url('./assets/css/flexbox-util.css');
@import url('./assets/css/main.css');

#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color-main);
  background-color: var(--app-bg-color);
}

</style>
