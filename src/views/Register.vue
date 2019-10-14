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
            <div class="input--group">
              <label 
                for="firstName" 
                class="input--label"
                  >First Name
              </label>
              <input
                v-model="newUser.firstName"
                type="text"
                id="firstName"
                class="input--text"
                required
              >
            </div>
            <div class="input--group">
              <label 
                for="lastName" 
                class="input--label"
                  >Last Name
              </label>
              <input
                v-model="newUser.lastName"
                type="text"
                id="lastName"
                class="input--text"
                required
              >
            </div>
          </div>

          <div class="username--input-group fxbx fg2">
            <div class="input--group">
              <label 
                for="username" 
                class="input--label"
                  >Username
              </label>
              <input
                v-model="newUser.username"
                type="text"
                id="username"
                class="input--text"
                required
              >
            </div>
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
            <div class="input--group">
              <label 
                for="email" 
                class="input--label"
                  >Email
              </label>
              <input
                v-model="newUser.email"
                type="email"
                id="email"
                class="input--text"
                required
              >
            </div>
            <div class="input--group">
              <label 
                for="emailConfirm" 
                class="input--label"
                  >Confirm Email
              </label>
              <input
                v-model="newUser.emailConfirm"
                type="email"
                id="emailConfirm"
                class="input--text"
                required
              >
            </div>
          </div>

          <div class="password--input-group fxbx fg2">
            <div class="input--group">
              <label 
                for="pass" 
                class="input--label"
                  >Password
              </label>
              <input
                v-model="newUser.pass"
                type="password"
                id="pass"
                class="input--text"
                required
              >
            </div>
            <div
              class="input--group">
              <label 
                for="passConfirm" 
                class="input--label"
                  >Confirm Password
              </label>
              <input
                :disabled="newUser.pass.length < 5"
                v-model="newUser.passConfirm"
                type="password"
                id="passConfirm"
                class="input--text"
                required
              >
            </div>
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
                fetch(`http://localhost:1337/auth/register`, {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify(validatedNewUser),
                })
                  .then(response => response.json())
                  .then(data => {
                    localStorage.setItem('user', JSON.stringify(data.addedUser));
                    localStorage.setItem('token', data.token)
                  })
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
.view-header {
  padding-bottom: .5rem;
  margin-bottom: 1rem;
  border-bottom: var(--border-size) var(--font-color-main);
}
</style>
