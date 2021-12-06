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
            <form >

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
                    v-model="authorIds"
                    :items="authors"
                    outlined
                    :error-messages="authorErrors"
                    chips
                    small-chips
                    color="cyan darken-2"
                    label="Publication Author (DTETI Lecturer)"
                    item-text="authorName"
                    item-value="authorId"
                    multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                        v-bind="data.attrs"
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
                    <template>
                      <v-list-item-content v-text="data.item.authorName"></v-list-item-content>
                    </template>
<!--                    <template v-else>-->
<!--                      <v-list-item-avatar>-->
<!--                        <img :src="data.item.avatar">-->
<!--                      </v-list-item-avatar>-->
<!--                      <v-list-item-content>-->
<!--                        <v-list-item-title v-html="data.item.authorName"></v-list-item-title>-->
<!--                      </v-list-item-content>-->
<!--                    </template>-->
                  </template>
                </v-autocomplete>
              </v-col>
<!--        end of input author -->

<!--              input other author-->
              <v-text-field
                  class="pb-2"
                  v-model="otherAuthors"
                  :error-messages="otherErrors"
                  color="cyan darken-2"
                  outlined
                  label="Another Author (Non DTETI Lecturer)"
                  required
              ></v-text-field>
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
                  v-model="publicationAbstract"
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
                    v-model="publicationPDF"
                    ref="upload"
                    type="file"
                    @change="onUploadFiles"
                    class="pb-2"
                    required
                    outlined
                    color="cyan darken-2"
                    accept=".pdf"
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
import { mapState } from 'vuex';
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
    otherAuthors:{required},
    publicationDate: {required},
    publicationPublisher: {required},
    publicationDescription: {required},
    publicationPDF: {required},
  },

  components: {
    MainAppbar
  },

  data: () => ({
    authors: [],
    publicationTitle: '',
    authorIds: [],
    otherAuthors:[],
    publicationDate: '',
    publicationPublisher: '',
    publicationAbstract: '',
    publicationPDF: null,
    topicId:[],
    userId: ''
  }),

  computed: {
    ...mapState(['user']),
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
    // otherErrors() {
    //   const errors = []
    //   if (!this.$v.otherAuthors.$dirty) return errors
    //   !this.$v.otherAuthors.required && errors.push('publisher is required.')
    //   return errors
    // },
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
    remove(item) {
      const index = this.authors.indexOf(item.authorId)
      if (index >= 0) this.authors.splice(index, 1)
    },
    onUploadFiles() {
    },
    async submit() {
      try {
      const data = {
          publicationTitle: this.publicationTitle,
          authorIds: this.authorIds,
          otherAuthors: this.otherAuthors.split(",").map(name => name.trim()),
          publicationDate: this.publicationDate,
          publicationPublisher: this.publicationPublisher,
          publicationAbstract: this.publicationAbstract,
          userId: this.user.userId
      }

      const response = await axios.post('http://localhost:8081/kpdteti/api/xpath/publications', data)
      console.log(response)

      if(response.status === 200) {
        let formData = new FormData()
        formData.append('file', this.publicationPDF)

        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        };
        const uploadResponse = await axios.post(`http://localhost:8081/kpdteti/api/publications/upload?id=${response.data.publicationId}`, formData, config)
        console.log(uploadResponse)

        if(uploadResponse.status === 200) {
          this.$router.push(`/classification/steps/${response.data.classificationDto.classificationId}`);
        }
      }
      } catch (error) {
        console.log(error)
      }
    },
    clear() {
      this.$v.$touch()
      this.publicationTitle = ''
      this.authorIds = ''
      this.otherAuthors = ''
      this.publicationDate = ''
      this.publicationPublisher = ''
      this.publicationAbstract = ''
      this.publicationPDF = false
    }
  },

  async mounted() {
    try {
      const res = await axios
          .get("http://localhost:8081/kpdteti/api/authors/all")
      this.authors= res.data
    } catch (error) {
      console.log(error)
    }
  }
}

</script>

<style scoped>
</style>
