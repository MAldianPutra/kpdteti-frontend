<template>
  <v-card class="overflow-hidden">
  <v-app-bar
      app
      color="white"
      scroll-target="#scrolling-techniques-7"
  >
      <v-img
          max-height="40"
          max-width="40"
          class="mr-3"
          :src="require('../img/Asset1.svg')"
      ></v-img>
      <v-toolbar-title class="text-left" style="color: rgba(36,35,36,0.89)">
        <v-row class="text--secondary text-left">
          <v-col class="text--secondary text-left">
            <p class="text-left pb-0 mb-0" >KP-DTETI</p>
            <p class="py-0 my-0" style="font-size: 10px">Sistem Klasifikasi Publikasi DTETI</p>
          </v-col>
        </v-row>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          v-for="(menu, index) in menus"
          :key="index"
          text
          class="hidden-sm-and-down"
          router :to="menu.route"
      >
        <span style="color:rgba(36,35,36,0.89)">{{ menu.title }}</span>
      </v-btn>
    <v-btn v-if="$store.getters.isLoggedInAsAdmin" text class="hidden-sm-and-down"  @click="$router.push('/classification')">
      <span style="color:rgba(36,35,36,0.89)">Classification</span>
    </v-btn>
    <v-btn v-if="$store.getters.isLoggedInAsAdmin" text class="hidden-sm-and-down"  @click="$router.push('/database/topics')">
      <span style="color:rgba(36,35,36,0.89)">Database</span>
    </v-btn>
    <v-btn v-if="!$store.getters.isLoggedInAsAdmin" text class="hidden-sm-and-down" @click="$router.push('/author')">
      <span style="color:rgba(36,35,36,0.89)">Author</span>
    </v-btn>
    <v-btn v-if="$store.getters.isLoggedInAsUser || $store.getters.isLoggedInAsAdmin" text class="hidden-sm-and-down" @click="logout" >
      <span style="color:rgba(36,35,36,0.89)">Logout</span>
    </v-btn>
    <v-btn v-else text class="hidden-sm-and-down" @click="$router.push('/login')">
      <span style="color:rgba(36,35,36,0.89)" >Login</span>
    </v-btn>
  </v-app-bar>
    <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="100"
    >
    </v-sheet>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      menus: [
        { title: 'Home', route: '/home' },
      ],
    };
  },
  computed: {
    ...mapGetters(["isLoggedInAsUser"]),
    ...mapGetters(["isLoggedInAsAdmin"])
  },
  methods: {
    addNotification(){

    },
    ...mapActions(['logout']),
    redirectPage() {

    }
  }
};
</script>

<style>
  * {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
  }

  .Title{
    text-align: left;
  }

  .subTitle{
    font-size: small;
  }
</style>
