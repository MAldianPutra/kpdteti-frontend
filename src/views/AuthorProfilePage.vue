<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-sheet
    >
      <v-avatar
      color="warning lighten-2"
      rounded
      size="80"
      ></v-avatar>
    </v-sheet>
    Author Page
  </v-content>

</template>

<script>
import MainAppbar from '@/components/MainAppbar'

export default {
  name: "AuthorProfilePage",
  components: {
    MainAppbar,
  }
}
</script>

<style scoped>

</style>
