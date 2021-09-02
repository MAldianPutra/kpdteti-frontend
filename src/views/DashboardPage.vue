<template>
  <div>
    <main-appbar></main-appbar>
    <div id="heroSection">
      <section>
        <v-container class="firstSection">
          <div style="{backgroundImage: url('~@/assets/jjj.png')}">
          </div>
          <pre class="tab1"></pre>
          <h1>Selamat Datang di KP-DTETI!</h1><br>
          <h1>Sistem Klasifikasi Hasil Publikasi DTETI</h1><br>
<!--          <p>KP-DTETI adalah sistem klasifikasi hasil publikasi.<br>-->
<!--            Sistem ini-->
<!--            dapat digunakan oleh mahasiswa,dosen dan tenaga pendidik DTETI FT UGM.</p>-->
          <pre class="tab1"></pre>
          <h1>Untuk Memulai Klasifikasi klik button di bawah ini!</h1>
          <div class="item">

            <router-link
            to="/classification"
            tag="v-btn">
            <v-btn
                rounded
                color="cyan darken-2"
                dark
                elevation="2"
            >
             <span>Klasifikasi</span>
            </v-btn>
            </router-link>
          </div>
        </v-container>
      </section>
    </div>
<!--    <div id="buttonSection">-->
<!--      </div>-->
    <div id="topicSection">
      <pre class="tab2">
      <h1>Cari Hasil Publikasi Berdasarkan Topik</h1>
      </pre>
      <v-container class="grey lighten-5">
        <v-row>
          <v-col
             v-for="topic in topics"
             :key="topic.id"
          >
            <v-card
                class="pa-4"
                outlined
                rounded
                color="cyan darken-2"
            >
              {{Topics.Name}}
<!--              {{ k }} of {{ n + 2 }}-->
            </v-card>
          </v-col>
        </v-row>
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
  </div>

</template>

<script>
  import MainAppbar from '@/components/MainAppbar.vue';
  import axios from "axios";

  export default {
  name: "DashboardPage",
  components: {
      MainAppbar
    },
    data(){
    return{
      topics: []
      }
    },
    methods: {
    setTopics(data){
      this.topics = data
      }
    },mounted() {
      axios
      .get('http://localhost:3000/Topics')
          .then(function (response){
            this.setTopics(response.data);
          })
          .catch(function (error) {console.log(error);
          })
    }
  };
</script>

<style scoped>
  .firstSection{
    background: url('../assets/bakg_research.jpg');
    background-size: cover;
    height:250%;
    width: 100%;
    word-wrap: normal;
  }

  .firstSection>h2{
    font-size: 30px;
  }

  .tab1, .tab2{
    tab-size:2;
  }
</style>
