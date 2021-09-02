<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
      <h1>Publication List</h1>
      <v-chip
          outlined
          color="amber darken-2"
      >TOPICS</v-chip>
      <v-row>
      <v-col
      cols="5"
      sm="5">
        <v-select
            color="amber darken-2"
        v-model="value"
        :items="items"
        attach
        chips
        label="TOPICS"
        outlined>
        </v-select>
        <List></List>
      </v-col>
      </v-row>
    </v-container>
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
import MainAppbar from "@/components/MainAppbar.vue";
import List from "@/components/List.vue";
export default {
  name : "PublicationDetailPage",
  components :{
    List,
    MainAppbar,
  },
}
</script>
<style>

</style>
