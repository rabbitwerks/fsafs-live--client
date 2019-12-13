import Vue from 'vue';

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: (el) => {
    // Focus the element
    el.focus()
  }
})

Vue.directive('color', {
  inserted: (el) => {
    el.style.backgroundColor = '#B4DA55';
  }
})

Vue.directive('flex', {
  inserted: (el, binding) => {
    console.log(binding)
    el.style.flex = binding.value;
  },
  componentUpdated:(el, binding) => {
    el.style.flex = binding.value;
  }
})

Vue.directive('model', {
  bind: (el) => {
    console.log('hello world')
  },
  componentUpdated: (el, binding) => {
    console.log(el.value);
  }
})
