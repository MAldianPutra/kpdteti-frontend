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
                  <v-data-table
                  :headers="headers"
                  :items="items"
                  class="elevation-1">
                  </v-data-table>
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
                  step="3">Result
              </v-stepper-step>
              <v-stepper-content step="3">
                <v-card
                    color="grey lighten-1"
                    class="mb-12 mt-8"
                    height="100px">
                  <v-card-title
                  style="font-size: medium">Topic of the Publication is </v-card-title>
                  <p
                  style="font-size: medium;color: rgba(17,147,97,0.89)"> {{publication.topicDto[0].topicName}}</p>
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
  components:{
    MainAppbar,
  },

  data:() => ({
      publication:[],
      items:[],
      headers:[
        {
          text:'Topic Name',
          align:'start',
          sortable:false,
          value:'topicName',
        },
        {
          text:'Probability',
          value:'probability',
        }
      ],
      e6:1,
      showSteps : true,
      show:false,
      showStep2:false,
      showStep3:false,
  }),

  methods:{
    done(){
      this.$router.push(`/`)
    },
    showProbabilityData(data){
      this.items = data
    },
    showPublication(data){
      this.publication = data
    }
  },
  async mounted(){
    axios
        .get(`http://localhost:8081/kpdteti/api/publications?publicationId=` + this.$route.params.id)
        .then((response) =>{
          // handle success
          this.showPublication(response.data)

          const probabilityData = Object.entries(response.data.classificationDto.topicProbability).map(t => {
            const [topicName, probability] = t
            return {
              topicName,
              probability
            }
          }).sort((a, b) => b.probability - a.probability)


          this.showProbabilityData(probabilityData)})

        .catch((error) =>
            // handle error
            console.log(error))
  }
}

</script>

<style scoped>
</style>
