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
              <p class="text-left text--secondary pb-0 mb-0 mt-2" >KP-DTETI</p>
              <p class="py-0 my-0 mb-2 text--secondary" style="font-size: 10px">Sistem Klasifikasi Publikasi DTETI</p>
            </v-toolbar-title>
          </v-row>
        </v-container>
      </v-app-bar>
    </v-card>
    <v-sheet
        rounded
        class="mx-auto mt-7 pa-1"
        max-width="510"
        outlined
        color="teal darken-2">
      <v-card
          class="mx-auto pa-7"
          max-width="500"
          outlined
          elevation="0">
        <v-card-title
        class="justify-center">Register</v-card-title>
        <form>
          <v-text-field
              v-model="form.email"
              label="Email"
              rules=""
              filled
              rounded></v-text-field>
          <v-text-field
              v-model="form.username"
              label="Username"
              filled
              rounded></v-text-field>
          <v-text-field
              v-model="form.password"
              label="Password"
              filled
              rounded></v-text-field>
          <v-btn
              color="teal darken-2"
              @click="submit">Register</v-btn>
        </form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import axios from "axios";
export default {
  name: "RegisterPage",
  mixins: [validationMixin],

  data: () => ({
    form: {
      email: '',
      username: '',
      password: '',
    }}),

  validations: {
    email:{required},
    password:{required, minLength: minLength(5)}
  },

  methods: {
    async submit(){
      try {
        const data = {
          userName: this.form.username,
          userEmail: this.form.email,
          userPassword: this.form.password
        }

        const response = await axios.post('http://localhost:8081/kpdteti/api/auth/user', data)
        console.log(response)

        if(response.status === 200) {
          this.$router.push('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style scoped>

</style>
