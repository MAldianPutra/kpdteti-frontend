<template>
  <v-main>
    <header>
      <main-appbar></main-appbar>
    </header>
    <body>
      <v-row>
        <v-col
            cols="3"
            md="10"
            class="pa-5"
            offset-md="1"
        >
          <v-sheet
            rounded
            class="mx-auto pa-1"
            max-width="800"
            outlined
            color="cyan darken-2">
          <v-card
            class="mx-auto pa-7"
            outlined
            elevation="0"
          >
            <v-card-title
            class="justify-center">PUBLICATION CLASSIFICATION FORM
            </v-card-title>
            <form @submit="postPublication" method="post">

<!--          input title    -->
              <v-text-field
                  class="pb-2"
                  v-model="publicationTitle"
                  :error-messages="titleErrors"
                  color="cyan darken-2"
                  outlined
                  label="Publication Title"
                  required
              ></v-text-field>
<!--            end of input title  -->

<!--           input author-->
              <v-col
              cols="13"
              sm="13"
              md="13">
                <v-autocomplete
                    class="pb-2"
                    v-model="authorId"
                    :items="authors"
                    outlined
                    :error-messages="authorErrors"
                    chips
                    small-chips
                    color="cyan darken-2"
                    label="Publication Author"
                    multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="remove(data.item)"
                    >
<!--                      <v-avatar left>-->
<!--                        <v-img :src="data.item.avatar"></v-img>-->
<!--                      </v-avatar>-->
                     {{ data.item.authorName}}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
<!--                    <template v-else>-->
<!--                      <v-list-item-avatar>-->
<!--                        <img :src="data.item.avatar">-->
<!--                      </v-list-item-avatar>-->
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.authorName"></v-list-item-title>
                      </v-list-item-content>
                    </template>
<!--                  </template>-->
                </v-autocomplete>
              </v-col>
<!--        end of input author -->

<!--        input date-->
              <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="publicationDate"
                      :error-messages="publicationDateErrors"
                      color="cyan darken-2"
                      label="Publication Date"
                      required
                      outlined
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="publicationDate"
                    @input="menu = false"
                ></v-date-picker>
              </v-menu>
<!--        end of input date -->

              <v-text-field
                  class="pb-2"
                  v-model="publicationPublisher"
                  :error-messages="PublisherErrors"
                  color="cyan darken-2"
                  outlined
                  label="Publication Publisher"
                  required
              ></v-text-field>

<!--        input abstract-->
              <v-textarea
                  class="pb-2"
                  v-model="publicationDescription"
                  :error-messages="abstractErrors"
                  color="cyan darken-2"
                  required
                  outlined
                  name="input-7-4"
                  label="Abstract"
              ></v-textarea>
<!--        end of input abstract-->

<!--        file input -->
                <v-file-input
                    v-model="savePDF"
                    class="pb-2"
                    required
                    outlined
                    color="cyan darken-2"
                    accept="file/*"
                    label="File input"
                ></v-file-input>
<!--        end of input file -->

<!--            <router-link :to="{name : 'classification steps'}">-->
              <v-btn
                  coloru="cyan darken-2"
                  class="mr-4"
                  @click="submit"

              >
                submit
              </v-btn>
<!--            </router-link>-->
              <v-btn
                  text
                  color="cyan darken-2"
                  @click="clear">
                clear
              </v-btn>
            </form>
          </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </body>
  </v-main>
</template>

<script>
import MainAppbar from '@/components/MainAppbar';
import { validationMixin } from 'vuelidate';
import {required} from 'vuelidate/lib/validators';
import axios from "axios";

export default {
  name: "PostPublicationPage",
  mixins: [validationMixin],

  validations: {
    publicationTitle: {required},
    authorId: {required},
    publicationDate: {required},
    publicationPublisher: {required},
    publicationDescription: {required},
    savePDF: {required},
  },

  components: {
    MainAppbar
  },

  data: () => ({
    authors: null,
    publicationTitle: '',
    authorId: '',
    publicationDate: '',
    publicationPublisher: '',
    publicationDescription: '',
    savePDF: false,
    userId: ''
  }),

  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.publicationTitle.$dirty) return errors
      !this.$v.publicationTitle.required && errors.push('title is required.')
      return errors
    },
    publisherErrors() {
      const errors = []
      if (!this.$v.publicationPublisher.$dirty) return errors
      !this.$v.publicationPublisher.required && errors.push('publisher is required.')
      return errors
    },
    authorErrors() {
      const errors = []
      if (!this.$v.authorId.$dirty) return errors
      !this.$v.authorId.required && errors.push('Author is required.')
      return errors
    },
    publicationDateErrors() {
      const errors = []
      if (!this.$v.publicationDate.$dirty) return errors
      // !this.$v.year.yearFormat && errors.push('Must be right format for year.')
      !this.$v.publicationDate.required && errors.push('date is required.')
      return errors
    },
    PublisherErrors() {
      const errors = []
      if (!this.$v.publicationPublisher.$dirty) return errors
      !this.$v.publicationPublisher.required && errors.push('publisher is required.')
      return errors
    },
    abstractErrors() {
      const errors = []
      if (!this.$v.publicationDescription.$dirty) return errors
      !this.$v.publicationDescription.required && errors.push('abstract is required.')
      return errors
    },
  },

  methods: {
    postPublication() {
      axios.post('http://localhost:8081/kpdteti/api/publications', {
        publicationTitle: 'Improving Data Quality and Data Governance Using \n' +
            'Master Data Management: A Review',
        authorId: 'Ir. Paulus Insap Santosa, M.Sc., Ph.D',
        publicationDate: '2021-09-03',
        publicationPublisher: 'DTETI',
        publicationDescription: 'Master data management (MDM) is a method of \n' +
            'maintaining, integrating, and harmonizing master data to ensure \n' +
            'consistent system information. The primary function of MDM is \n' +
            'to control master data to keep it consistent, accurate, current, \n' +
            'relevant, and contextual to meet different business needs across \n' +
            'applications and divisions. MDM also affects data governance, \n' +
            'which is related to establishing organizational actors’ roles, \n' +
            'functions, and responsibilities in maintaining data quality. Poor \n' +
            'management of master data can lead to inaccurate and incomplete \n' +
            'data, leading to lousy stakeholder decision-making. This article is \n' +
            'a literature review that aims to determine how MDM improves the \n' +
            'data quality and data governance and assess the success of MDM \n' +
            'implementation. The review results show that MDM can \n' +
            'overcome data quality problems through the MDM process \n' +
            'caused by data originating from various scattered sources. MDM \n' +
            'encourages organizations to improve data management by \n' +
            'adjusting the roles and responsibilities of business actors and \n' +
            'information technology (IT) staff documented through data \n' +
            'governance. Assessment of the success of MDM implementation \n' +
            'can be carried out by organizations to improve data quality and \n' +
            'data governance by following the existing framework.',
        savePDF: true,
        userId: 'usr-335930d7-026c-453b-9fb5-7d4fc112e3c6'
      })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    },
    // getAuthors(data){
    //   this.authors = data
    // },
    remove(item) {
      const index = this.authors.indexOf(item.authorName)
      if (index >= 0) this.authors.splice(index, 1)
    },
    submit() {
      // this.$v.$touch()
      console.log(this.authorId)
      // this.showSteps = false
    },
    clear() {
      this.$v.$touch()
      this.publicationTitle = ''
      this.authorId = ''
      this.publicationDate = ''
      this.publicationPublisher = ''
      this.publicationDescription = ''
      this.savePDF = false
    }
  },

  async mounted() {
    try {
      const res = await axios
          .get("http://localhost:8081/kpdteti/api/authors/all")
      this.authors= res.data
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
</style>
