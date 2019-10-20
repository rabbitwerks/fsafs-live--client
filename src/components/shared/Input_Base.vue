<template>
  <div class="input--group">
    <label 
      :for="id" 
      class="input--label"
        >{{ label }}
    </label>
    <input
      v-model="value"
      @input="updateValue"
      :type="type"
      :id="id"
      :disabled="disabled"
      :autocomplete="autocomplete"
      class="input--text"
      required
    >
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: [String, Boolean],
      default: true,
    }
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    updateValue() {
      this.$emit('updateValue', this.value);
    }
  }
}
</script>

<style scoped>

.input--label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: .25rem;
}

.input--text {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
  display: block;
  width: 100%;
  height: 2rem;
  padding-left: .25rem;
  border: var(--border-size) var(--font-color-main);
  border-radius: 3px;
}

.input--text:disabled {
  background-color: #646464;
}
</style>
