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
                    color="teal lighten-2"
                    class="mb-12">
                  <v-card-title
                  style="font-size: medium">Step 1 : Pre-processing Text</v-card-title>
                  <v-btn
                  icon
                  @click="show=!show">
                    <v-icon
                    style="position: relative">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>
                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text
                      style="font-size: 11px;text-align: justify">{{ publication.classificationDto.classificationReport.symbolRemovedText}}</v-card-text>
                    </div>
                  </v-expand-transition>
                  </v-card>

                  <v-card
                  color="teal lighten-2"
                  class="mb-12">
                  <v-card-title
                  style="font-size: medium">Step 2 : Lemmatized Text</v-card-title>
                  <v-btn
                      icon
                      @click="showStep2=!showStep2">
                    <v-icon
                        style="position: relative">{{ showStep2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>
                  <v-expand-transition>
                    <div v-show="showStep2">
                      <v-divider></v-divider>

                      <v-card-text
                          style="font-size: 11px;text-align: justify">{{ publication.classificationDto.classificationReport.lemmatizedText }}</v-card-text>
                    </div>
                  </v-expand-transition>
                  </v-card>

<!--                  <v-card-->
<!--                  color="teal lighten-2"-->
<!--                  class="mb-12">-->
<!--                  <v-card-title-->
<!--                  style="font-size: medium">Step 3 : Lemmatized Text</v-card-title>-->
<!--                  <v-btn-->
<!--                      icon-->
<!--                      @click="showStep3=!showStep3">-->
<!--                    <v-icon-->
<!--                        style="position: relative">{{ showStep3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>-->
<!--                  <v-expand-transition>-->
<!--                    <div v-show="showStep3">-->
<!--                      <v-divider></v-divider>-->

<!--                      <v-card-text-->
<!--                          style="font-size: 11px;text-align: justify">{{ publication.classificationDto.classificationReport.lemmatizedText }}</v-card-text>-->
<!--                    </div>-->
<!--                  </v-expand-transition>-->
<!--                  </v-card>-->
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
                    color="teal lighten-2"
                    class="mb-12"
                    height="100%">
                  <v-card-title
                  style="font-size: small"
                  class="mb-0">Probability of Computer System Organization Topic</v-card-title>
                  <v-card-text
                  class="mb-0">
                  {{publication.classificationDto.predictProbability["probability(0)"] }}</v-card-text>
                  <v-card-title
                      style="font-size: small"
                  class="mb-0">Probability of Networks Topic</v-card-title>
                  <v-card-text
                  class="mb-0">
                    {{publication.classificationDto.predictProbability["probability(1)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Software and Its Engineering Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(2)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Theory of Computation Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(3)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Mathematics of Computing Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(4)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Information System Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(5)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Security and Privacy Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(6)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Human-centered Computing Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(7)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Computing Methodologies Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(8)"]}}</v-card-text>
                  <v-card-title
                      style="font-size: small">Probability of Applied Computing Topic</v-card-title>
                  <v-card-text>
                    {{publication.classificationDto.predictProbability["probability(9)"]}}</v-card-text>
                </v-card>
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
                    height="300px">
                 <v-list>
                   <v-list-item>
                     <v-col
                     >
                     <v-list-item-title
                     class="mb-4"
                     style="text-align: left">Topic List</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 0 : Computer System Organization </v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 1 : Networks</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 2 : Software and Its Engineering</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 3 : Theory of Computation</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 4 : Mathematics of Computing</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 5 : Information System</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 6 : Security and Privacy</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 7 : Human-centered Computing</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 8 : Computing Methodologies</v-list-item-title>
                     <v-list-item-title
                     class="mb-2"
                     style="text-align: left">Label 9 : Applied Computing</v-list-item-title>
                     </v-col>
                   </v-list-item>
                 </v-list>
                </v-card>
                <v-card
                    color="grey lighten-1"
                    class="mb-12 mt-8"
                    height="100px">
                  <v-card-title
                  style="font-size: medium">Topic of the Publication is </v-card-title>
                  <p
                  style="font-size: medium;color: rgba(17,147,97,0.89)">
                  Label {{publication.classificationDto.predictResults}}</p>
                </v-card>
                <v-btn
                    class="white--text"
                    color="teal darken-1"
                    @click="done"
                >
                 Done
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
// import { Doughnut } from 'vue-chartjs';
export default {
  name: "ClassificationSteps",
  // extends:Doughnut,
  // props:[
  //     chartdata:{
  //   type : Object,
  //   default: null
  //   },
  //   options :{
  //   type : Object,
  //   default: null
  //   },
  // ],
  components:{
    MainAppbar,
  },

  data:() => ({
      publication:[],
      e6:1,
      showSteps : true,
      show:false,
      showStep2:false,
      showStep3:false,
  }),

  filters:{
      percent(probability) {
        if (probability < 1) {
          return probability * 100 + "%";
        }
        return 0;
      }
  },
  methods:{
    done(){
      this.$router.push(`/home`)
    },
  },
  async mounted(){
    try {
      const response = await axios.get('http://localhost:8081/kpdteti/api/publications?publicationId=' + this.$route.params.id)
      console.log(response.data)
      this.publication = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

</script>

<style scoped>
</style>
