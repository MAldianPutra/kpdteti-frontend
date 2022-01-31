<template>
  <div id="body">
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
      <h1>Author List</h1>
      <v-row>
        <v-col
        cols="12"
        v-for="author in authors"
        :key="author.authorName">
          <router-link style="text-decoration: none; color: inherit;"
                       :to="{name: 'author profile',params:{id:author.authorId}}">
              <v-card
                  class="mx-auto"
                  outlined
                  max-width="700"
                  elevation="4"
                  >
                <v-list>
                  <v-list-item>
                    <v-avatar
                        color="teal">
                      <v-icon
                          dark>
                        mdi-account-circle
                      </v-icon>
                      <!--                      <v-img></v-img>-->
                    </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                        v-text="author.authorName"></v-list-item-title>
      <!--                  <v-card-title></v-card-title>-->
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
              </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                  v-model="computedPagination.currentpages"
                  class="my-4"
                  :length="computedPagination.lengthpages"
                  @input="next"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <MainFooter></MainFooter>
  </v-content>
  </div>
</template>

<script>
import MainAppbar from "@/components/MainAppbar.vue";
import MainFooter from "@/components/MainFooter";
import axios from "axios";


export default {
  name: "AuthorList",
  components: {
    MainAppbar,
    MainFooter,
  },
  data:()=>({
    authors: [],
    pagination:{
      lengthpages:0,
      currentpages:0
    },
  }),
  computed: {
    computedPagination() {
      return this.pagination
    }
  },
methods:{
    async next(page){
      try {
        const res = await axios
            .get(`http://localhost:8081/kpdteti/api/authors/all?page=${page - 1}`)
        await this.$nextTick()
        this.authors = res.data
        this.pagination.currentpages = page
        // console.log(res.data)
      }catch(error){
        // handle error
        console.log(error)
      }
    },
},
  async mounted() {
    try {
      const res = await axios
          .get("http://localhost:8081/kpdteti/api/authors/all?page=0")
      this.authors = res.data
      this.pagination.currentpages = 1
      this.pagination.lengthpages = res.data[0]?.numberOfPage
      // console.log(res.data)
    }catch(error){
      // handle error
      console.log(error)
    }
  },
}

</script>

<style scoped>
#body{
  background: url("../assets/v880-kul-11.jpg");
}
</style>