<template>
  <v-content>
    <MainAppbar></MainAppbar>
    <v-container
        class="mx-auto"
        fluid
        style="max-height: 500px">
      <v-row
      class="pl-8">
        <v-col
        cols="3">
          <v-card
          class="pl-5">
            <v-avatar
            tile>
            <v-img
            src="../assets/search.png"
            height="40px"></v-img>
            </v-avatar>
            <v-card-title>Topics</v-card-title>
          </v-card>
        </v-col>
        <v-col
        cols="3">
          <v-card
          class="mx-auto">
            <v-avatar
            tile>
            <v-img
            src="../assets/writer.png"
            height="50px"
            class="mt-4"></v-img>
            </v-avatar>
            <v-card-title>Authors</v-card-title>
          </v-card>
        </v-col>
        <v-col
        cols="3">
          <v-card
          class="mx-auto">
            <v-avatar
            tile>
            <v-img
            src="../assets/application.png"
            height="50px"></v-img>
            </v-avatar>
            <v-card-title>Publications</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-card>
        <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-content>

</template>

<script>
import MainAppbar from '@/components/MainAppbar.vue';
export default {
  name: "Database",
  components:{
    MainAppbar,
  },
  data:()=>({
    search:'',
    headers:[

    ]
  }),
}
</script>

<style scoped>

</style>