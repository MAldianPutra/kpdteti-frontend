<template>
  <div>
    <v-card class="overflow-hidden">
    <v-app-bar
        app
        color="white"
        scroll-target="#scrolling-techniques-7"
    >
    <v-container>
      <v-row>
        <v-img
            max-height="45"
            max-width="45"
            class="mr-3 mt-2"
            :src="require('../img/Asset1.svg')"
        ></v-img>
      <v-toolbar-title class="text-left" style="color: rgba(36,35,36,0.89)">
<!--        <v-row class="text&#45;&#45;secondary text-left">-->
          <p class="text-left text--secondary pb-0 mb-0 mt-2" >RETI</p>
<!--          <v-col class="text&#45;&#45;secondary text-left">-->
            <p class="py-0 my-0 mb-2 text--secondary" style="font-size: 10px">Sistem Klasifikasi Publikasi DTETI</p>
<!--          </v-col>-->
<!--        </v-row>-->
      </v-toolbar-title>
      </v-row>
    </v-container>
    </v-app-bar>
    </v-card>
<!--      <v-row>-->
<!--        <v-col>-->
<!--          <p>KP-DTETI</p><br>-->
<!--&lt;!&ndash;          <p>Klasifikasi Publikasi DTETI</p>&ndash;&gt;-->
<!--        </v-col>-->
<!--      </v-row>-->
    <v-sheet
        rounded
        class="mx-auto mt-7 pa-1"
        max-width="560"
        outlined
        color="teal darken-2">
      <v-card
          class="mx-auto pa-7"
          max-width="550"
          outlined
          elevation="0">
        <v-card-title
        class="justify-center">Login</v-card-title>
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
            type="password"
            filled
            rounded></v-text-field>
            <v-btn
                color="teal darken-2"
                @click="submit">Login</v-btn>
        </form>
        <p class="mt-4 mb-0 text--secondary"
        style="font-size: smaller">Don't Have Account?</p>
<!--        <router-link-->
<!--            class="mt-0 text&#45;&#45;secondary"-->
<!--            style="font-size: smaller" to="/register/admin">Click here to register as <strong>admin!</strong></router-link><br>-->
        <router-link
            class="mt-0 text--secondary"
            style="font-size: smaller" to="/register">Click here to register as <strong>user!</strong></router-link>
      </v-card>
    </v-sheet>
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
