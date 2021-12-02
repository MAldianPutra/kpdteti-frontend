<template>
  <div>
    <v-container>
      <v-img
          max-height="40"
          max-width="40"
          class="mr-3"
          :src="require('../img/Asset1.svg')"
      ></v-img>
      <v-row>
        <v-col>
          <p>KP-DTETI</p><br>
<!--          <p>Klasifikasi Publikasi DTETI</p>-->
        </v-col>
      </v-row>
      <v-card
      class="mx-auto">
        <v-card-title>Login</v-card-title>
        <form>
            <v-text-field
            v-model="form.email"
            label="Email"
            filled
            rounded>
            </v-text-field>
            <v-text-field
            v-model="form.password"
            label="Password"
            filled
            rounded></v-text-field>
            <v-btn @click="submit">Login</v-btn>
        </form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { mapActions } from 'vuex'
import {required,minLength} from 'vuelidate/lib/validators';
export default {
  name: "LoginPage",
  mixins: [validationMixin],

  data: () => ({
    form: {
      email: '',
      password: '',
    }}),

  validations:{
    email:{required},
    password:{required, minLength: minLength(5)}
  },

  methods: {
    ...mapActions(["login"]),
    submit(){
      console.log('login page', this.form)
      this.login({userEmail: this.form.email, userPassword: this.form.password})}
  }
}

</script>

<style scoped>

</style>
