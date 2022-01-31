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
              color="amber lighten-1">
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
              @click="$router.push('/database/publications')">
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
          <v-dialog
              v-model="dialogSubmit"
              max-width="600px">

                <template v-slot:activator="{ on }">
                  <v-col
                      class="mt-2">
                    <v-row>
                       <v-btn v-on="on">Add Data</v-btn>
                    </v-row>
                  </v-col>
                </template>


            <v-card
                class="mx-auto pa-7"
                outlined
                elevation="0">
              <v-card-title>Input Author</v-card-title>
              <form>
                <v-text-field
                    v-model="authorName"
                    color="cyan darken-2"
                    outlined
                    label="Author's Name"
                    required></v-text-field>
                <v-text-field
                    v-model="authorEmail"
                    color="cyan darken-2"
                    outlined
                    label="Email"
                    required></v-text-field>
                <v-text-field
                    v-model="authorFaculty"
                    color="cyan darken-2"
                    outlined
                    label="Faculty"
                    required></v-text-field>
                <v-text-field
                    v-model="authorUniversity"
                    color="cyan darken-2"
                    outlined
                    label="University"
                    required></v-text-field>
              </form>
              <v-card-actions>
                <!--                <v-btn color="primary" text @click="dialogDelete = false">No</v-btn>-->
                <v-btn color="primary" text @click="submitForm">Submit</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>

          <v-row>
            <v-card
                class="mt-5 mx-auto">
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
                  :items="author"
                  :search="search"
                  item-key="authorId"
                  :items-per-page="10"
                  class="elevation-1"
              >
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
          </v-row>
        </v-col>
      </v-container>
    </v-container>
  </v-content>


</template>

<script>
import MainAppbar from '@/components/MainAppbar.vue';
import axios from 'axios';
import {required} from 'vuelidate/lib/validators';

export default {
  name: "AuthorDatabase",
  components:{
    MainAppbar,
  },

  validations: {
    authorName: {required},
    authorEmail: {required},
    authorFaculty: {required},
    authorUniversity: {required},
  },
  data:()=>({
    search: '',
    dialogDelete:false,
    dialogSubmit:false,
    itemToDelete:{},
    author: [],
    authorName:'',
    authorEmail:'',
    authorFaculty:'',
    authorUniversity:'',
    headers: [
      {text: 'Name',
        align: 'start',
        sortable: false,
        value: 'authorName'},
      {text: 'Email',
        value: 'authorEmail'},
      {text: 'Faculty',
        value: 'authorFaculty'},
      {text: 'University',
        value: 'authorUniversity'},
      {
        text:'Action',
        value:'actions',
        sortable:false
      },
      // {text:'',value:'action'}
    ],

  }),
  methods:{
    showAuthor(data) {
      this.author=data
    },
    deleteData() {
      console.log('deleteData', this.itemToDelete)
      axios
          .delete(`http://localhost:8081/kpdteti/api/admin/authors?authorId=${this.itemToDelete.authorId}`);
      const index = this.author.indexOf(this.itemToDelete)
      this.author.splice(index, 1)
      this.dialogDelete = false
    },
    showDialog(item) {
      this.itemToDelete = item
      this.dialogDelete = !this.dialogDelete
    },
    async submitForm(){
      try{
        const data ={
          authorName: this.authorName,
          authorEmail: this.authorEmail,
          authorFaculty: this.authorFaculty,
          authorUniversity:this.authorUniversity,
        }

        const response = await axios.post('http://localhost:8081/kpdteti/api/admin/authors', data)
        console.log(response)
      }catch (error) {
        console.log(error)
      }
    },
  },
  async mounted() {
    axios
        .get("http://localhost:8081/kpdteti/api/authors/all")
        .then((response) =>
            // handle success
            this.showAuthor(response.data))
        .catch((error) =>
            // handle error
            console.log(error))
  },
}
</script>

<style scoped>

</style>
