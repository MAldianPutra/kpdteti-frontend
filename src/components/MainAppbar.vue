<template>
  <v-app-bar
      app
      color="#16697A"
      elevation="3"
      dark
      flat
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
  >
    <v-img
        max-height="30"
        max-width="30"
        class="mr-3"
        :src="require('../img/Asset1.svg')"
    ></v-img>
    <v-toolbar-title class="text-uppercase secondary--text">
      kp-dteti
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
        v-for="(menu, index) in menus"
        :key="index"
        text
        class="secondary--text hidden-sm-and-down"
        router :to="menu.route"
    >
      <span>{{ menu.title }}</span>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
            target="_blank"
            text
            icon
            v-on="on"
            class="secondary--text hidden-md-and-up"
        >
          <font-awesome-icon icon="ellipsis-v"></font-awesome-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(menu, index) in menus"
            :key="index"
            router :to="menu.route"
        >
          <v-list-item-title>
            <router-link :to="menu.route">
              {{ menu.title }}
            </router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { title: 'Home', route: '/home' },
        { title: 'Classification', route: '/classification' },
        { title: 'Publication', route: '/publication' },
        { title: 'Author', route: '/author-profile' },
        { title: 'Account', route: '/account' },
        { title: 'Logout', route: '/logout' },
      ],
    };
  },
  methods: {
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
</style>
