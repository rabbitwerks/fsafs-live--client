<template>
  <div 
    @click="logout"
    class="navbar--item pointer fxbx spc-ctr">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    }
  },
  methods: {
    logout() {
      document.cookie = `token= ; expires= ${Date.now() - 100000000}`
      if (this.$route.name !== this.route) {
        this.$store.dispatch('logout_ACTION')
        this.$router.push(this.route)
          .catch(err => console.log(err));
      }
    }
  },
}
</script>

<style scoped>
.navbar--item {
  width: 8rem;
  border-left: var(--border-size) var(--border-color);
}

span {
  font-weight: 400;
}
</style>
