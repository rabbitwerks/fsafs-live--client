<template>
  <div class="view login--outer fxbx j-ctr">
    <div class="login--inner">
      <div class="view-header">
        <h1>Login</h1>
      </div>
      <div class="content--outer">
        <form
          method="POST"
          class="content--inner">

          <div class="username--input-group fxbx fg2">

            <Input-Base
              @updateValue="(value) => loginCreds.username = value"
              type="text"
              id="username"
              label="Username"
              autocomplete="true"
            />

            <Input-Base
              @updateValue="(value) => loginCreds.password = value"
              type="password"
              id="pass"
              label="Password"
              autocomplete="true"
            />

          </div>

            
          <div class="actions--panel fxbx">
            <input
              @click.prevent="attemptLogin"
              type="submit"
              value="Login!"
              class="btn cta--primary"
            />
          </div>

        </form>
      </div>
    </div>
    
  </div>
</template>

<script>
import Input_Base from '../components/shared/Input_Base.vue';
import Joi from '@hapi/joi';

const loginSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

export default {
  components: {
    'Input-Base': Input_Base,
  },
  data() {
    return {
      loginCreds: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    attemptLogin() {
      if (this.loginCreds.username && this.loginCreds.password) {

        loginSchema.validateAsync(this.loginCreds)
          .then(validatedCreds => {
            this.$store.dispatch('attemptLogin_ACTION', validatedCreds)
          })
          .catch(err => console.log(err));

      } else {
        console.log('Please fill in all the fields.')
      }
    }
  }
}
</script>

<style scoped>
.login--inner {
  width: 70%;
  margin-top: 4rem;
}
</style>
