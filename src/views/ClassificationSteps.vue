<template>
  <v-content>
  <main-appbar></main-appbar>
    <div id="classificationSteps" >
      <v-row>
        <v-col
            cols="3"
            md="10"
            class="pa-5"
            offset-md="1">
          <v-card
              class="mx-auto"
              outlined
              max-width="800">
            <v-card-title
                class="justify-center">CLASSIFICATION STEPS</v-card-title>
            <v-stepper
                v-model="e6"
                vertical>
              <v-stepper-step
                  color="amber darken-2"
                  :complete="e6>1"
                  step="1">Pre-Processing</v-stepper-step>
              <v-stepper-content step="1">
                <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="300px"></v-card>
                <v-btn
                    class="white--text"
                    color="teal darken-1"
                    @click="e6 = 2"
                >
                  Continue
                </v-btn>
              </v-stepper-content>
              <v-stepper-step
                  color="amber darken-2"
                  :complete="e6>2"
                  step="2">Classification</v-stepper-step>
              <v-stepper-content step="2">
                <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="200px"></v-card>
                <v-btn
                    class="white--text"
                    color="teal darken-1"
                    @click="e6 = 3"
                >
                  Continue
                </v-btn>
                <v-btn
                    text
                    class="white--text"
                    color="teal darken-1"
                    @click="e6 = 1"
                >
                  Back
                </v-btn>
              </v-stepper-content>
              <v-stepper-step
                  color="amber darken-2"
                  step="3">Result</v-stepper-step>
              <v-stepper-content step="3">
                <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="200px"></v-card>
                <v-btn
                    class="white--text"
                    color="teal darken-1"
                    @click="e6 = 1"
                >
                  Continue
                </v-btn>
                <v-btn
                    text
                    class="white--text"
                    color="teal darken-1"
                    @click="e6 = 2"
                >
                  Back
                </v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-content>
</template>

<script>
import MainAppbar from "@/components/MainAppbar";
import axios from "axios";
export default {
  name: "ClassificationSteps",

  components:{
    MainAppbar,
  },

  data(){
    return{
      e6:1,
      showSteps : true,
    }
  },

  mounted(){
    axios.get('http://localhost:8081/kpdteti/api/publications?publicationId=' + this.$route.params.id)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error){
        console.log(error);
    });
  }
}

</script>

<style scoped>

</style>
