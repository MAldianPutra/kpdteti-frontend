<template>
  <div
  id="body">
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
    <h1>Publication List by Topic</h1>
      <v-text
      style=""></v-text>
<!--    <h2>Topic:{{topic.topicParentName}}</h2>-->
        <v-container fluid>
          <v-row>
          <v-col
          cols="12"
          v-for="publication in publications"
          :key="publication.publicationId">
          <router-link
          style="text-decoration: none; color: inherit;"
          :to="{name: 'Publication Profile',params:{id:publication.publicationId}}">
          <v-card
              class="mx-auto"
              outlined
              max-width="1000"
              elevation="4"
              >
          <v-list
          three-line>
            <v-list-item
            color="cyan darken-2">
              <v-list-item-content>
                <p
                style="font-size: larger">{{publication.publicationTitle}}</p>
                <v-divider></v-divider>
                <p
                class="mb-2 mt-1"
                style="color: #00897B">Authors: </p>
                <v-card-content
               v-for="author in publication.authorDto"
               :key="author.authorId"
                style="color: #00897B;font-size: medium">{{author.authorName}}</v-card-content>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          </v-card>
          </router-link>
          </v-col>
          </v-row>
        </v-container>
    </v-container>
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
    // topics: [],
    // itemsPerPageArray: [10, 15, 20],
    // search: '',
    // filter: {},
    // sortDesc: false,
    // page: 1,
    // itemsPerPage: 10,
    // subTopics: 'name',
    // keys: [
    //   'Name',
    //   'Calories',
    //   'Fat',
    //   'Carbs',
    //   'Protein',
    //   'Sodium',
    //   'Calcium',
    //   'Iron',
    // ],
    // topics: [
    //   '1','2','3'
    // ]
  }),
  computed: {
    // numberOfPages () {
    //   return Math.ceil(this.items.length / this.itemsPerPage)
    // },
    // filteredKeys () {
    //   return this.keys.filter(key => key !== 'Name')
    // },
  },
  methods: {
    showPublications(data) {
      this.publications = data
    },
    // showTopics(data){
    //   this.topics = data
    // },
    showAnotherPublications(){
      this.$router.push({name:'publication topic', params: {id: '[topicId]'}});
    },
    // showPublicationProfile(){
    //   this.$router.push({name:'publication profile', params: {id: '[publicationId]'}});
    // }
    //   nextPage () {
    //     if (this.page + 1 <= this.numberOfPages) this.page += 1
    //   },
    //   formerPage () {
    //     if (this.page - 1 >= 1) this.page -= 1
    //   },
    //   updateItemsPerPage (number) {
    //     this.itemsPerPage = number
    //   },
  },
  async mounted(){
    try {
      const res = await axios
          .get(`http://localhost:8081/kpdteti/api/topics/publications?topicId=${this.$route.params.id}`)
              // handle success
              this.showPublications(res.data)
          // this.publications(res.data)
          // console.log(res.data)
      }catch(error) {
              // handle error
              console.log(error)
        // console.log(this.$route.params.id)
      }

  // async mounted() {
  //   let link = [
  //     `http://localhost:8081/kpdteti/api/topics/parents?topicParentId=${this.$route.params.id}`,
  //     `http://localhost:8081/kpdteti/api/topics/publications?topicId=${this.$route.params.id}`
  //   ]
  //   try {
  //         axios.all(link.map((link) => axios.get(link)))
  //         .then((data) => {this.showPublications(data[1].data),this.showTopics(data[0].data),console.log(data[0].data),console.log(data[1].data)}
  //         );}
  //     catch(error){
  //       //         // handle error
  //               console.log(error)
  //       //   // console.log(this.$route.params.id)
  //       }
      // const res = await axios
      //     .get(`http://localhost:8081/kpdteti/api/topics/publications?topicOrParentId=${this.$route.params.id}`)
      //         // handle success
      //         this.showPublications(res.data)
      //     // this.publications(res.data)
      //     // console.log(res.data)
      // }catch(error) {
      //         // handle error
      //         console.log(error)
      //   // console.log(this.$route.params.id)
      // }
      // try {
      // const res = await axios
      //     .get(`http://localhost:8081/kpdteti/api/topics/publications?topicOrParentId=${this.$route.params.id}`)
      //         // handle success
      //         this.showPublications(res.data)
      //     // this.publications(res.data)
      //     // console.log(res.data)
      // }catch(error) {
      //         // handle error
      //         console.log(error)
      //   // console.log(this.$route.params.id)
      // }

  },
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
