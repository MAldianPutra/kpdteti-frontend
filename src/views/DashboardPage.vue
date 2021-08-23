<template>
  <div>
    <main-appbar></main-appbar>
    <div id="heroSection">
      <section>
        <v-container class="firstSection">
          <div style="{backgroundImage: url('~@/assets/jjj.png')}">
          </div>
          <h1>Selamat Datang di KP-DTETI!</h1><br>
          <p>KP-DTETI adalah sistem klasifikasi hasil publikasi.<br>
            Sistem ini
            dapat digunakan oleh mahasiswa,dosen dan tenaga pendidik DTETI FT UGM.</p>
          <pre class="tab1"></pre>
          <h2>Untuk Memulai Klasifikasi klik button di bawah ini!</h2>
          <div class="item">

            <router-link
            to="/klasifikasi"
            tag="v-btn">
            <v-btn
                rounded
                color="teal darken-1"
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
          <v-layout>
            <v-row no-gutters>
              <template v-for="n in 10">
                <v-col :key="n">
                  <v-card
                      class="pa-2"
                      outlined
                      tile
                  >
                  </v-card>
                </v-col>
                <v-responsive
                    v-if="n === 4"
                    :key="`width-${n}`"
                    width="100%"
                ></v-responsive>
              </template>
            </v-row>
          </v-layout>
        </v-container>

    </div>
<!--   <h1>Ini dashboard</h1>-->
  </div>

</template>

<script>
  import MainAppbar from '@/components/MainAppbar.vue';

  export default {
  name: "DashboardPage",
  components: {
      MainAppbar
    },
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
