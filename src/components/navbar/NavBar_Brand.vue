<template>
  <div class="navbar--brand fxbx a-ctr f1">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    }
  }
}
</script>
