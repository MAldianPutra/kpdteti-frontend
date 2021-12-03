<template>
  <v-app>
    <v-content>
      <main-appbar></main-appbar>
        <v-col>
        <v-card
            class="mx-auto"
            max-width="800"
            elevation="2"
        >
          <v-avatar
          color="warning lighten-2"
          rounded
          size="80"
          class="mt-2"
          ></v-avatar>
          <p class="text-overline mb-1">AUTHOR</p>
          <v-list>
              <v-list-item-title
              class="mb-2">{{authors.authorName}}</v-list-item-title>
              <v-list-item-title>{{authors.authorEmail}}</v-list-item-title>
              <v-list-item-title>{{authors.authorFaculty}}</v-list-item-title>
              <v-list-item-title>{{authors.authorUniversity}}</v-list-item-title>
          </v-list>
        </v-card>
        </v-col>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <v-row>
        <v-col>
        <v-card
            class="mx-auto"
        max-width="800"
        elevation="2">
          <v-card-title>
            PUBLICATION
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details></v-text-field>
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="publications"
              item-key="publicationId"
              :items-per-page="2"
              class="elevation-1"
          ></v-data-table>
        </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import MainAppbar from '@/components/MainAppbar';
import axios from "axios";

export default {
  name: "AuthorProfilePage",
  components: {
    MainAppbar,
  },
  data:()=>({
    authors:[],
    // return:{
    //   search:'',
    //   headers: [
    //     {
    //       text: 'Title',
    //       align: 'start',
    //       sortable: false,
    //       value: 'title',
    //     },
    //     { text: 'Publication Date', value: 'date' },
    //     { text: 'Topic', value: 'topic' },
    //   ],
    //   publications:[
    //     {
    //       title:this.publicationTitle,
    //       date:this.publicationDate,
    //       topic:this.Topic,
    //     }
    //   ]}
  }),
  computed:{

  },
  methods:{
    showAuthorProfile(data){
      this.authors = data
    },
    showPublicationList(data){
      this.publications = data
    }
  },
  async mounted(){
    let link = [
      `http://localhost:8081/kpdteti/api/authors?authorId=${this.$route.params.id}`,
      `http://localhost:8081/kpdteti/api/authors/publications?authorId=${this.$route.params.id}`
    ]
    try{
      axios.all(link.map((link) => axios.get(link)))
      .then((data) => {this.showAuthorProfile(data[0].data),this.showPublicationList(data[1].data),console.log(data[0].data)}
      );}
    catch (error){
      console.log(error)
    }
  },
}
</script>

<style scoped>

</style>
