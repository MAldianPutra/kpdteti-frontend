<template>
  <div
  id="body">
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
    <h1>Publication List by Topic</h1>
<!--    <h2>Topic:{{topic.topicName}}</h2>-->
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="search"
          single-line
          hide-details
          max-width="400"></v-text-field>
      <v-data-table
          :headers="headers"
          :items="publications"
          :loading="loading"
          item-key="publicationId"
          :items-per-page="15"
          class="elevation-1"
          :search="search"
          @click:row="showPublication"
      >
      </v-data-table>
<!--        <v-container fluid>-->
<!--          <v-row>-->
<!--          <v-col-->
<!--          cols="12"-->
<!--          v-for="publication in publications"-->
<!--          :key="publication.publicationId">-->
<!--          <router-link-->
<!--          style="text-decoration: none; color: inherit;"-->
<!--          :to="{name: 'publication profile',params:{id:publication.publicationId}}">-->
<!--          <v-card-->
<!--              class="mx-auto"-->
<!--              outlined-->
<!--              max-width="1000"-->
<!--              elevation="4"           >-->
<!--          <v-list-->
<!--          three-line>-->
<!--            <v-list-item-->
<!--            color="cyan darken-2">-->
<!--              <v-list-item-content>-->
<!--                <p-->
<!--                style="font-size: larger">{{publication.publicationTitle}}</p>-->
<!--                <v-divider></v-divider>-->
<!--                <p-->
<!--                class="mb-2 mt-1"-->
<!--                style="color: #00897B">Authors: </p>-->
<!--                <v-card-content-->
<!--               v-for="author in publication.authorDto"-->
<!--               :key="author.authorId"-->
<!--                style="color: #00897B;font-size: medium">{{author.authorName}}</v-card-content>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--          </v-card>-->
<!--          </router-link>-->
<!--          </v-col>-->
<!--          </v-row>-->
<!--        </v-container>-->
    </v-container>
<!--    <div class="text-center">-->
<!--      <v-container>-->
<!--        <v-row justify="center">-->
<!--          <v-col cols="8">-->
<!--            <v-container class="max-width">-->
<!--              <v-pagination-->
<!--                  v-model="computedPagination.currentpages"-->
<!--                  class="my-4"-->
<!--                  :length="computedPagination.lengthpages"-->
<!--                  @input="next"-->
<!--              ></v-pagination>-->
<!--            </v-container>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </div>-->
  </v-content>
  </div>
</template>

<script>
import MainAppbar from "@/components/MainAppbar.vue";
import axios from "axios";

export default {
  name: "PublicationByTopicPage",
  props: ['id'],
  components: {
    MainAppbar,
  },
  data: () => ({
    publications: [],
    // topic:[],
    search:"",
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'publicationTitle',
      },
      {text: 'Author', value: 'authorName'},
    ],
    // pagination:{
    //   lengthpages:0,
    //   currentpages:0
    // },
  }),
  computed: {
    // computedPagination() {
    //   return this.pagination
    // }
  },
  methods: {
    showPublications(data) {
      this.publications = data
    },
    // showTopic(data){
    //   this.topic = data
    // },
    showPublication(value){
      this.$router.push(`/home/publication-profile/${value.publicationId}`)
      console.log(value)
    },
    // async next(page){
    //   try {
    //     const res = await axios
    //         .get(`http://localhost:8081/kpdteti/api/topics/publications?topicId=${this.$route.params.id}&page=${page - 1}`)
    //     await this.$nextTick()
    //     this.publications = res.data
    //     this.pagination.currentpages = page
    //     // console.log(res.data)
    //   }catch(error){
    //     // handle error
    //     console.log(error)
    //   }
    // },
    // showTopics(data){
    //   this.topics = data
    // },
    // showAnotherPublications(){
    //   this.$router.push({name:'publication topic', params: {id: '[topicId]'}});
    // },
  },
mounted() {
  // let links = [
  //   `http://localhost:8081/kpdteti/api/topics/publications?topicId=${this.$route.params.id}`
  //    `http://localhost:8081/kpdteti/api/topics?topicId=${this.$route.params.id}`
  // ]
  //
  // axios
  //     .all(links.map((link) => axios.get(link)))
  //     .then((data) => {
  //            const publicationData = response.data.map(data => {
  //            const {publicationId,publicationTitle,  authorDto} = data
  //            const authorName = authorDto.map(author => author.authorName).reduce((prev,cur) => prev + ', ' + cur)
  //            return {publicationId, publicationTitle, authorName}
  //          })
  //         //        this.showPublications(publicationData)})
  //           this.showPublications(publicationData.data)
  //           this.showTopic(data[1].data)
  //           console.log(data[0].data)
  //           console.log(data[1].data)
  //         }
  //     ).catch((error) =>
  //     //         // handle error
  //     console.log(error))
// },


  axios
      .get(`http://localhost:8081/kpdteti/api/topics/publications?topicId=${this.$route.params.id}`)
      .then((response) => {
        const publicationData = response.data.map(data => {


          const {publicationId, publicationTitle, authorDto} = data

          const authorName = authorDto.map(author => author.authorName).reduce((prev, cur) => prev + ', ' + cur)

          return {publicationId, publicationTitle, authorName}
        })
        this.showPublications(publicationData)
      })
      .catch((error) =>
          // handle error
          console.log(error))
},
      // this.publications = res.data
      // this.pagination.currentpages = 1
      // this.pagination.lengthpages = res.data[0]?.numberOfPage
      // console.log(res.data)

    // try {
    //   const res = await axios
    //       .get(`http://localhost:8081/kpdteti/api/topics/publications?topicId=${this.$route.params.id}`)
    //           // handle success
    //           this.showPublications(res.data)
    //       // this.publications(res.data)
    //       // console.log(res.data)
    //   }catch(error) {
    //           // handle error
    //           console.log(error)
    //     // console.log(this.$route.params.id)
    //   }
}
</script>

<style scoped>
#body{
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/v880-kul-11.jpg");
}
</style>
