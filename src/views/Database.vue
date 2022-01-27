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
      <v-container>
        <v-col>
          <v-btn>Add Data</v-btn>
          <v-row>
              <v-card
              class="mt-5">
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
                    :items="topic"
                    :search="search"
                    item-key="topicId"
                    :items-per-page="5"
                    class="elevation-1"
                >
<!--                  <template v-slot:item.delete="props">-->
<!--                    <v-btn class="" color="error">-->
<!--                      <v-icon>mdi-delete</v-icon>-->
<!--                    </v-btn>-->
<!--                  </template>-->
                </v-data-table>
              </v-card>
          </v-row>
        </v-col>
      </v-container>
    </v-container>
  </v-content>

</template>

<script>
import MainAppbar from '@/components/MainAppbar.vue';
import axios from 'axios';

export default {
  name: "Database",
  components:{
    MainAppbar,
  },
  data:()=>({
      search: '',
      topic: [],
      headers: [
        {text: 'Name',
          align: 'start',
          sortable: false,
          value: 'topicName'},
        // {text:'',value:'action'}
      ],

  }),
  methods:{
    showTopic(data) {
      this.topic=data
    }
  },
  async mounted() {
    axios
        .get("http://localhost:8081/kpdteti/api/topics/all")
        .then((response) =>
            // handle success
            this.showTopic(response.data))
        .catch((error) =>
            // handle error
            console.log(error))
  },
}
</script>

<style scoped>

</style>