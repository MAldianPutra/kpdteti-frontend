<template>
  <div>
    <v-container>
      <v-img>
        max-height="40"
        max-width="40"
        class="mr-3"
        :src="require('../img/Asset1.svg')"
      </v-img>
      <v-row>
        <v-col>
          <p>KP-DTETI</p>
        </v-col>
      </v-row>
      <v-card>
        <v-card-title>Register</v-card-title>
        <form>
          <p>Name</p>
          <v-text-field
              v-model="name"
              filled
              rounded></v-text-field>
          <p>E-mail</p>
          <v-text-field
              v-model="email"
              rules=""
              filled
              rounded></v-text-field>
          <p>Username</p>
          <v-text-field
              v-model="username"
              filled
              rounded></v-text-field>
          <p>Password</p>
          <v-text-field
              v-model="password"
              filled
              rounded></v-text-field>
          <v-btn
              type="submit"
          >Login</v-btn>
        </form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RegisterPage"
}
</script>

<style scoped>

</style>
