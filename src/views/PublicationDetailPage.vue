<template>
  <div id="body">
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
      <h1>Publication List</h1>
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
          :pagination.sync="pagination"
          :loading="loading"
          item-key="publicationId"
          :items-per-page="15"
          class="elevation-1"
          :search="search"
          @click:row="showPublicationProfile"
      >
      </v-data-table>
    </v-container>
  </v-content>
  </div>
</template>

<script>
import MainAppbar from "@/components/MainAppbar.vue";
import axios from "axios";

export default {
  name: "PublicationDetailPage",
  components: {
    MainAppbar,
  },
  data: () => ({
    search: '',
    publications: [],
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'publicationTitle',
      },
      {text: 'Author', value: 'authorName'},
      {text: 'Topic', value: 'topicName'},
    ]
  }),

  methods: {
    // nextPage() {
    //   if (this.page + 1 <= this.numberOfPages) this.page += 1
    // },
    // formerPage() {
    //   if (this.page - 1 >= 1) this.page -= 1
    // },
    // updateItemsPerPage(number) {
    //   this.itemsPerPage = number
    // },
    setPublications(data) {
      this.publications = data.map(p => {
        let topicName = ''
        for (let i = 0; i < p.topicDto.length; i++) {
          if (i === 0) {
            topicName += p.topicDto[i].topicName
          } else {
            topicName += ', ' + p.topicDto[i].topicName
          }
        }
        let authorName = ''
        for (let i = 0; i < p.authorDto.length; i++) {
          if (i === 0) {
            authorName += p.authorDto[i].authorName
          } else {
            authorName += ', ' + p.authorDto[i].authorName
          }
        }
        return {
          ...p,
          topicName,
          authorName
        }
      })
    },
    showPublicationProfile(value){
      this.$router.push(`/home/publication-profile/${value.publicationId}`)
      console.log(value)
    },
  },
  async mounted() {
    try {
      if (!this.$route.params.searchKey || !this.$route.params.selectType){
        const res = await axios
            .get("http://localhost:8081/kpdteti/api/publications/all")
        this.setPublications(res.data)
        console.log(res.data)
      } else{
        const res = await axios
            .get(`http://localhost:8081/kpdteti/api/publications/search?searchKey=${this.$route.params.searchKey}&searchType=${this.$route.params.selectType}`)
        this.setPublications(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  },
}
// ||!this.$route.params.page

</script>
<style>
#body{
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/v880-kul-11.jpg");
}
</style>
