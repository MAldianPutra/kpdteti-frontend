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
              class="pl-5"
              @click="$router.push('/database/topics')">
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
              class="mx-auto"
              @click="$router.push('/database/authors')">
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
              class="mx-auto"
          color="amber lighten-1">
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

      <v-col
      class="mt-3">
          <v-row>
            <v-btn
              @click="$router.push('/classification')">Add Data
            </v-btn>
            </v-row>
      </v-col>

          <v-row>
            <v-col>
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
                      :items="publication"
                      :search="search"
                      item-key="publicationId"
                      :items-per-page="10"
                      class="elevation-1"
                  >
                    <router-link
                        style="text-decoration: none; color: inherit;"
                        :to="{name: 'publication profile',params:{id:publication.publicationId}}">
                    </router-link>
<!--                    <template v-slot:[`item.topicDto`]="{ item }">-->
<!--                      <div v-for="topic in item.topicDto" :key="topic.id">-->
<!--                        {{ topic.topicName }}-->
<!--                      </div>-->
<!--                    </template>-->

                    <template
                        v-slot:item.actions="{item}">
                      <v-icon
                          @click="showDialog(item)">mdi-delete</v-icon>
                    </template>
                  </v-data-table>

                  <v-dialog
                      v-model="dialogDelete"
                      max-width="600px">

                    <v-card>
                      <v-card-title>Are You Sure You Want To Delete This Data?</v-card-title>
                      <v-card-text>If You Choose To Delete, Data Will Be Permanently Deleted</v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" text @click="dialogDelete = false">No</v-btn>
                        <v-btn color="primary" text @click="deleteData()">Yes</v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>

                </v-card>
            </v-col>
          </v-row>
      </v-container>
  </v-content>


</template>

<script>
import MainAppbar from '@/components/MainAppbar.vue';
import axios from 'axios';

export default {
  name: "PublicationDatabase",
  components:{
    MainAppbar,
  },
  data:()=>({
    search: '',
    dialogDelete:false,
    dialogSubmit:false,
    itemToDelete:{},
    publication: [],
    headers: [
      {text: 'Name',
        align: 'start',
        sortable: false,
        value: 'publicationTitle'},
      {text: 'Author',
        align:'start',
        value: "authorName"},
      {text: 'Topic',
        align: 'start',
        value: "topicName"},
      {
        text:'Action',
        value:'actions',
        sortable:false
      },
    ],

  }),
  methods:{
    showPublication(data) {
      this.publication=data
    },
    deleteData() {
      console.log('deleteData', this.itemToDelete)
      axios
          .delete(`http://localhost:8081/kpdteti/api/admin/topics?topicId=${this.itemToDelete.publicationId}`);
      const index = this.publication.indexOf(this.itemToDelete)
      this.publication.splice(index, 1)
      this.dialogDelete = false
    },
    showDialog(item) {
      this.itemToDelete = item
      this.dialogDelete = !this.dialogDelete
    },
  },
  async mounted() {
    axios
        .get("http://localhost:8081/kpdteti/api/publications/all")
        .then((response) =>{
            // handle success
            const publicationData = response.data.map(data => {
              const {publicationTitle, topicDto, authorDto} = data

              const authorName = authorDto.map(author => author.authorName).reduce((prev,cur) => prev + ', ' + cur)

              return {publicationTitle, topicName: topicDto[0].topicName, authorName}
            })
            this.showPublication(publicationData)})
        .catch((error) =>
            // handle error
            console.log(error))
  },
}
</script>

<style scoped>

</style>
