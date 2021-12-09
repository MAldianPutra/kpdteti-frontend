<template>
  <div>
    <main-appbar></main-appbar>
    <div id="heroSection">
      <section class="firstSection">
        <v-container >
<!--          <div style="{backgroundImage: url('~@/assets/annie-spratt-5cFwQ-WMcJU-unsplash.jpg')}">-->
<!--          </div>-->
          <pre class="tab1"></pre>
          <h1>Welcome to KP-DTETI!</h1><br>
          <h1>DTETIs Classification Publication System</h1><br>
<!--          <p>KP-DTETI adalah sistem klasifikasi hasil publikasi.<br>-->
<!--            Sistem ini-->
<!--            dapat digunakan oleh mahasiswa,dosen dan tenaga pendidik DTETI FT UGM.</p>-->
          <pre class="tab1"></pre>
          <h1> </h1>
          <div class="item">
            <v-container>
              <v-row>
                <v-col
                cols="12"
                sm="2"
               >
                  <v-select
                      :items="items"
                      solo
                      dense
                      label="Search Type"
                      v-model="searchBySelect">
                  </v-select>
                </v-col>
                <v-col
                cols="12"
                sm="4">
                  <v-text-field
                      hide-details
                      solo
                      dense
                      v-model="searchOnly"
                      label="Search Publication"
                  ></v-text-field>
                    <v-btn
                        class="mt-1"
                    @click="search">Search</v-btn>
                </v-col>
                </v-row>

            </v-container>
<!--            <router-link-->
<!--            to="/classification"-->
<!--            tag="v-btn">-->
<!--            <v-btn-->
<!--                rounded-->
<!--                color="teal darken-2"-->
<!--                dark-->
<!--                elevation="2"-->
<!--            >-->
<!--             <span>Klasifikasi</span>-->
<!--            </v-btn>-->
<!--            </router-link>-->
          </div>
        </v-container>
      </section>
    </div>
<!--    <v-btn @click="menujuHalamanLain()"></v-btn>-->
<!--    <div id="buttonSection">-->
<!--      </div>-->
    <div id="topicSection">
      <pre>
      <h1>Cari Hasil Publikasi Berdasarkan Topik</h1>
      </pre>
      <v-container
          class="grey lighten-5 py-0 my-0">
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
                color="teal darken-2"
            >
              {{ topic.topicName }}
            </v-card>
           </router-link>
          </v-col>
        </v-row>
<!--        <v-row-->
<!--        v-for="n in 2"-->
<!--        :key="n">-->
<!--          <v-col-->
<!--          v-for="k in 5"-->
<!--          :key="k">-->
<!--            <v-card-->
<!--                class="pa-4"-->
<!--                outlined-->
<!--                rounded-->
<!--                color="cyan darken-2"-->
<!--                v-for="topic in Topics"-->
<!--                :key="topic.id"-->
<!--            >-->
<!--              {{ topic.Name }}-->
<!--&lt;!&ndash;              {{ k }} of {{ n + 2 }}&ndash;&gt;-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--        </v-row>-->
      </v-container>
              <!--        <v-container class="grey lighten-5">-->
<!--          <v-layout>-->
<!--            <v-row-->
<!--                v-for="k in 3"-->
<!--                :key="k"-->
<!--                :class="k === 1 ? 'mb-6' : ''"-->
<!--            >-->
<!--              <template v-for="n in 11">-->
<!--                <v-col :key="n">-->
<!--                  <v-card-->
<!--                      class="pa-7"-->
<!--                      outlined-->
<!--                      color="cyan darken-4"-->
<!--                      rounded-->
<!--                  >-->
<!--                  </v-card>-->
<!--                </v-col>-->
<!--                <v-responsive-->
<!--                    v-if="n === 5"-->
<!--                    :key="`width-${n}`"-->
<!--                    width="100%"-->
<!--                ></v-responsive>-->
<!--              </template>-->
<!--            </v-row>-->
<!--          </v-layout>-->
<!--        </v-container>-->

    </div>
<!--   <h1>Ini dashboard</h1>-->
    <MainFooter></MainFooter>
  </div>

</template>

<script>
  import MainAppbar from '@/components/MainAppbar.vue';
  import MainFooter from '@/components/MainFooter';
  import axios from "axios";
  // import topicData from '@/json/db.json';

  export default {
    name: "DashboardPage",
    components: {
      MainFooter,
      MainAppbar
    },
    data:()=>({
      searchOnly:'',
      items: ['AUTHOR', 'TOPIC', 'TITLE'],
        // Topics: topicData,
        Topics: [],
    }),
    methods: {
      showTopic(data) {
        this.Topics = data
      },
      search(){
        this.$router.push(`/publication/${this.searchBySelect}/${this.searchOnly}`)
          // axios
          // .get(`http://localhost:8081/kpdteti/api/publications/search?searchKey=${this.searchOnly}&searchType=${this.searchBySelect}`)
          //     .then((response) =>{

                  // console.log(response.data)})
                  // handle success
                  // this.showTopic(response.data))
              // this.Topics(response.data))
              // .catch((error) =>
                  // handle error
                  // console.log(error.response))

        },
    },
    async mounted() {
        axios
        .get("http://localhost:8081/kpdteti/api/topics/all")
            .then((response) =>
                // handle success
                this.showTopic(response.data))
            // this.Topics(response.data))
            .catch((error) =>
                // handle error
                console.log(error))

      },
      // methods: {
      //   menujuHalamanLain(id) {
      //     this.$router.push(`dashboard/detail/${id}`)
      //   }
      // }
  }
</script>

<style scoped>
  .firstSection{
    background: url('../assets/annie-spratt-5cFwQ-WMcJU-unsplash.jpg');
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
