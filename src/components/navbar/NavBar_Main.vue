<template>
  <div class="navbar--outer fxbx">
    <NavBar--Brand 
      text="FSAFS"
      :name="user.firstName"
      :isLoggedIn="isLoggedIn"
    />
    <div
      v-if="!isLoggedIn"
      class="logged-out fxbx"
    >
      <NavBar--Item
        text="Login"
        route="login"
      />
      <NavBar--Item
        text="Register"
        route="register"
      />
    </div>
    <div
      v-else
      class="logged-in fxbx"
    >
    <!-- TODO: add user name cmp -->
      <NavBar--Item 
        text="Dashboard"
        route="dashboard"
      />
      <NavBar--Logout 
        text="Logout"
        route="login"
      />
    </div>
  </div>
</template>

<script>
import NavBar_Brand from './NavBar_Brand.vue';
import NavBar_Item from './NavBar_Item.vue';
import NavBar_Logout from './NavBar_Logout.vue';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    'NavBar--Brand': NavBar_Brand,
    'NavBar--Item': NavBar_Item,
    'NavBar--Logout': NavBar_Logout,
  }
};
</script>

<style scoped>
.navbar--outer {
  height: 4rem;
  padding-left: 1rem;
  background-color: var(--nav-bg-color);
  border-bottom: var(--border-size) var(--border-color);
}
</style>
