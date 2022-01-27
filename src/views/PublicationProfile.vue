<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-row>
<!--      <v-col-->
<!--      cols="12"-->
<!--      md="4"-->
<!--    >-->
        <v-card
            class="mx-auto"
            max-width="1000"
            elevation="2">
<!--            <p class="font-weight-light">PUBLICATION TITLE</p>-->
          <v-card-title
          style="text-align: center">{{profiles.publicationTitle}}</v-card-title>
           <v-list>
             <v-list-item-title
                 v-for="author in profiles.authorDto"
                 :key="author.publicationId">{{author.authorName}}</v-list-item-title>
             <v-list-item-title>{{profiles.otherAuthors}}</v-list-item-title>
             <v-list-item-title>{{profiles.publicationDate}}</v-list-item-title>
           </v-list>
<!--          <a :href="profiles.publicationPath" download>-->
<!--            Download file-->
<!--          </a>-->
          <v-btn
          color="teal darken-2"
          @click="downloadFile(profiles.publicationTitle)">Download file
          </v-btn>
            <v-divider
                inset
                width="800"></v-divider>
            <v-card-subtitle>ABSTRACT</v-card-subtitle>
            <v-card-text
            style="text-align: justify"> {{profiles.publicationAbstract}}</v-card-text>
        </v-card>
<!--      </v-col>-->
    </v-row>
  </v-content>
</template>

<script>
import MainAppbar from "@/components/MainAppbar";
import axios from "axios";
import {saveAs} from 'file-saver';

export default {
  name: "PublicationProfile",
  props:['id'],
  components:{
    MainAppbar,
  },
  data(){
    return {
      profiles:[],
    }
  },
  methods:{
    downloadFile(title) {
      axios({
        url: `http://localhost:8081/kpdteti/api/publications/download?publicationId=${this.$route.params.id}`, // File URL Goes Here
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        saveAs(response.data, title + ".pdf");
        // let file = window.URL.createObjectURL(new Blob([res.data]));
        // let publicationUrl = document.createElement('x');
        // publicationUrl.href = file;
        // publicationUrl.setAttribute('download', 'file.pdf');
        // document.body.appendChild(publicationUrl);
        // publicationUrl.click();
      });
    },
  },
  async mounted(){
    // this.downloadFile();
    try {
      const res = await axios
          .get(`http://localhost:8081/kpdteti/api/publications?publicationId=${this.$route.params.id}`)
      // this.showProfile= res.data
      this.profiles=res.data
      // console.log(res.data)
    }catch(error){
      // handle error
      console.log(error)
    }
  },
}
</script>

<style scoped>

</style>
