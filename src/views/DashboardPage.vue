<template>
  <div>
    <main-appbar></main-appbar>
<!--    <Notification></Notification>-->
    <div id="heroSection">
      <section class="firstSection">
        <v-container>
          <pre class="tab1"></pre>
<!--          <h1>Welcome to KP-DTETI!</h1><br>-->
<!--          <h1>DTETIs Classification Publication System</h1><br>-->
<!--          <p>KP-DTETI adalah sistem klasifikasi hasil publikasi.<br>-->
<!--            Sistem ini-->
<!--            dapat digunakan oleh mahasiswa,dosen dan tenaga pendidik DTETI FT UGM.</p>-->
          <pre class="tab1"></pre>
          <h1> </h1>
          <div class="item">
            <v-container
            class="mx-4 px-4">
              <v-row
              justify="center">
                <v-col
                cols="12"
                sm="2"
               >
                  <v-select
                      :items="items"
                      solo
                      dense
                      v-model="searchType"
                      label="Search Type">
                  </v-select>
                </v-col>
                <v-col
                cols="12"
                sm="4">
                  <v-text-field
                      hide-details
                      solo
                      dense
                      v-model="searchKey"
                      label="Search Publication"
                  ></v-text-field>
                </v-col>
                <v-col
                cols="1">
                    <v-btn
                        class="mt-1"
                    @click="search">Search</v-btn>
                </v-col>

                </v-row>
            </v-container>
      <h1>Search Your Publications by Topics</h1>
          </div>
        </v-container>
      </section>
    </div>


    <div id="topicSection">
      <v-container
          class="grey lighten-5 py-0 my-0 mt-6">
        <v-row justify="center">
          <v-col
              cols="12"
              md="4"
              v-for="topic in Topics"
              :key="topic.topicId">
           <router-link
               style="text-decoration: none; color: inherit;"
               :to="{name: 'publication topic',params:{id:topic.topicId}}">
            <v-card
                class="pa-4"
                outlined
                rounded-xl
                color="teal lighten-1"
            >
              {{ topic.topicName }}
            </v-card>
           </router-link>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <MainFooter></MainFooter>
  </div>

</template>

<script>
  import MainAppbar from '@/components/MainAppbar.vue';
  import MainFooter from '@/components/MainFooter';
  // import Notification from "@/components/Notification";
  import axios from "axios";

  export default {
    name: "DashboardPage",
    components: {
      MainFooter,
      MainAppbar,
      // Notification
    },
    data:()=>({
      searchKey:'',
      searchType: '',
      items: ['AUTHOR', 'TOPIC', 'TITLE'],
        // Topics: topicData,
        Topics: [],
    }),
    methods: {
      showTopic(data) {
        this.Topics = data
      },
      search(){
        if(this.searchKey !== "") {
          this.$router.push(`/publication/${this.searchKey}`)
        } else {
          this.searchKey = "all"
          this.$router.push(`/publication/${this.searchKey}`)
        }},
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
  .firstSection{
    background: url('../assets/jjj.png');
    box-shadow: 0px 0px 20px grey;
    opacity:0.9;
    background-size: cover;
    height:500%;
    width: 100vw;
    word-wrap: normal;
  }

  .firstSection>h2{
    font-size: 30px;
  }

  .tab1{
    tab-size:1;
  }
</style>
