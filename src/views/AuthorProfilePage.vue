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
              :pagination.sync="pagination"
              :loading="loading"
              item-key="publicationId"
              :items-per-page="2"
              class="elevation-1"
              :search="search"
              @click:row="showPublicationProfile"
          >
<!--            <template slot=[items] slot-scope="props">-->
<!--                          <td  @click="$route.push(`/home/publication-profile/${props.item.publicationId}`)">{{ props.item.publicationTitle }}</td>-->
<!--                          <td class="text-xs-right">{{ props.item.publicationDate }}</td>-->
<!--                          <td class="text-xs-right">{{ props.item.topicDto.topicName }}</td>-->
<!--                        </template>-->
          </v-data-table>

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
      search: '',
      publications:[],
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'publicationTitle',
        },
        {text: 'Publication Date', value: 'publicationDate'},
        {text: 'Topic', value: 'topicName'},
      ]

    //   ]}
  }),
  // created() {
  //   axios.get(`http://localhost:8081/kpdteti/api/authors/publications?authorId=${this.$route.params.id}`)
  // .then(response=>{
  //   this.publications=response.data;
  //   console.log(this.publications)
  // })
  // .catch(function (error) {
  //     console.log(error);
  //   });
  // },
  // computed:{
  //   headers(){
  //     return
  //   }
  // },
  methods:{
    showPublicationProfile(value){
      this.$router.push(`/home/publication-profile/${value.publicationId}`)
      console.log(value)
    },
    showAuthorProfile(data){
      this.authors = data
    },
    showPublicationList(data){
      this.publications = data.map(p => {
        let topicName = ''
        for(let i = 0; i < p.topicDto.length; i++) {
          if(i === 0) {
            topicName += p.topicDto[i].topicName
          } else {
            topicName += ', ' + p.topicDto[i].topicName
          }

        }

        return {
          ...p,
          topicName
        }
      })
    }
  },
  async mounted(){
    // try{
    //   const res = await axios
    //   .get(`http://localhost:8081/kpdteti/api/authors?authorId=${this.$route.params.id}`)
    //   this.showAuthorProfile(res.data)
    //   console.log(res.data)
    // }catch(error){
    //   console.log(error)
  //   // }
  // },
    let links = [
      `http://localhost:8081/kpdteti/api/authors?authorId=${this.$route.params.id}`,
      `http://localhost:8081/kpdteti/api/authors/publications?authorId=${this.$route.params.id}`
    ]
    try{
      axios.all(links.map((link) => axios.get(link)))
      .then((data) => {
        this.showAuthorProfile(data[0].data)
        this.showPublicationList(data[1].data)
        console.log(data[0].data)
        console.log(data[1].data)
      }
      );}
    catch (error){
      console.log(error)
    }
  },
}
</script>

<style scoped>

</style>