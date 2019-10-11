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
  }
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
