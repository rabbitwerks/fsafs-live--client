<template>
  <div class="navbar--outer fxbx">
    <NavBar--Brand text="FSAFS" />
    <NavBar--Item 
      text="Login" 
      route="login"
    />
    <NavBar--Item 
      text="Register"
      route="register"
    />
  </div>
</template>

<script>
import NavBar_Brand from './NavBar_Brand.vue';
import NavBar_Item from './NavBar_Item.vue';

export default {
  components: {
    'NavBar--Brand': NavBar_Brand,
    'NavBar--Item': NavBar_Item,
  }
};
</script>

<style scoped>
.navbar--outer {
  height: 4rem;
  padding-left: 1rem;
  background-color: rgb(47, 156, 156);
  border-bottom: var(--border-size) var(--border-color);
}
</style>
