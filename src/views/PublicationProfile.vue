<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-card
        class="mx-auto"
        max-width="950"
        elevation="2">
      <v-card-subtitle>
        <p class="font-weight-light">PUBLICATION TITLE</p>
      </v-card-subtitle>
      <v-card-title></v-card-title>
      <v-card-text>
      </v-card-text>
      <v-divider
          inset
          width="800"></v-divider>
      <v-card-subtitle>ABSTRACT</v-card-subtitle>
    </v-card>
  </v-content>
</template>

<script>
import MainAppbar from "@/components/MainAppbar";
export default {
  name: "PublicationProfile",
  components:{
    MainAppbar,
  }
}
</script>

<style scoped>

</style>