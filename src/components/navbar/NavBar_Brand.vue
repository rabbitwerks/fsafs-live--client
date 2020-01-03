<template>
  <div class="navbar--brand fxbx a-ctr spc-bt f1">
    <h1>{{ text }}</h1>
    <p v-if="isLoggedIn">Welcome, {{ name | capitalize }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Myself',
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style scoped>
p {
  margin-right: 1rem;
}
</style>
