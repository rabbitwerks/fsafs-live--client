<template>
  <div class="view register--outer fxbx j-ctr">
    <div class="register--inner">
      <div class="view-header">
        <h1>Register</h1>
      </div>
      <div class="content--outer">
        <form
          method="POST"
          class="content--inner">

          <div class="name--input-group fxbx fg2">
            
            <Input-Base 
              @updateValue="(value) => newUser.firstName = value"
              type="text"
              id="firstName"
              label="First Name"
              autocomplete="true"
            />

            <Input-Base 
              @updateValue="(value) => newUser.lastName = value"
              type="text"
              id="lastName"
              label="Last Name"
              autocomplete="true"
            />
          </div>

          <div class="username--input-group fxbx fg2">

            <Input-Base 
              @updateValue="(value) => newUser.username = value"
              type="text"
              id="username"
              label="Username"
              autocomplete="true"
            />

            <div class="input--group">
              <label 
                for="userClass" 
                class="input--label"
                  >User Class
              </label>
              <select 
                v-model="newUser.userClass"
                class="input--text"
                id="userClass">

                <option value="html">HTML | htmlyte</option>
                <option value="css">CSS | cssissist</option>
                <option value="js">JS | javascriptioneer</option>
                <option value="ang">ANG | angularifier</option>
                <option value="react">REACT | reactamugurons</option>
                <option value="vue">VUE | vueitronikist</option>
                <option value="node">NODE | noderonemy</option>

              </select>
            </div>
          </div>

          <div class="email--input-group fxbx fg2">

            <Input-Base 
              @updateValue="(value) => newUser.email = value"
              type="email"
              id="email"
              label="Email"
              autocomplete="true"
            />

            <Input-Base 
              @updateValue="(value) => newUser.emailConfirm = value"
              type="email"
              id="emailConfirm"
              label="Confirm Email"
              autocomplete="true"
            />

          </div>

          <div class="password--input-group fxbx fg2">

            <Input-Base 
              @updateValue="(value) => newUser.pass = value"
              type="password"
              id="pass"
              label="Password"
              autocomplete="true"
            />

            <Input-Base 
              @updateValue="(value) => newUser.passConfirm = value"
              type="password"
              id="passConfirm"
              label="Confirm Password"
              :disabled="newUser.pass.length < 6"
              autocomplete="true"
            />

          </div>

          <div class="actions--panel fxbx">
            <input 
              @click.prevent="attemptRegistration"
              type="submit" 
              value="Register!" 
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

const registerSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  userClass: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co.uk', 'io', 'tech']} })
});

export default {
  components: {
    'Input-Base': Input_Base,
  },
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        username: '',
        userClass: 'vue',
        email: '',
        emailConfirm: '',
        pass: '',
        passConfirm: '',
      }
    }
  },
  methods: {
    attemptRegistration() {
      const { firstName, lastName, username, userClass, email, emailConfirm, pass, passConfirm } = this.newUser;

      if (
        firstName &&
        lastName &&
        username &&
        userClass &&
        email &&
        emailConfirm &&
        pass &&
        passConfirm
      ) {
        if (email === emailConfirm) {
          if (pass === passConfirm) {
            const validatedNewUser = {
              firstName,
              lastName,
              username,
              userClass,
              email,
              password: pass,
            }
            // joi validation 
            registerSchema.validateAsync(validatedNewUser)
              .then(result => {
                this.$store.dispatch('registerUser_ACTION', result)
                .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          } else {
            console.log('passwords do not match')
          }
        } else {
          console.log('emails do not match')
        }
      } else {
        // missing input field(s)
        console.log('all fields are required')
      }
    }
  }
}
</script>

<style scoped>
.register--inner {
  width: 70%;
  margin-top: 4rem;
}
</style>
