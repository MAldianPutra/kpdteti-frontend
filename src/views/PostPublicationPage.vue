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
            <form @submit.prevent="postPublication" method="post">

<!--          input title    -->
              <v-text-field
                  class="pb-2"
                  v-model="title"
                  :error-messages="titleErrors"
                  color="cyan darken-2"
                  outlined
                  label="Publication Title"
                  required
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
              ></v-text-field>
<!--            end of input title  -->

<!--           input author-->
              <v-col
              cols="13"
              sm="13"
              md="13">
                <v-autocomplete
                    class="pb-2"
                    v-model="author"
                    :items="authors"
                    outlined
                    chips
                    color="cyan darken-2"
                    label="Publication Author"
                    item-text="name"
                    item-value="name"
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
<!--                      {{ data.item.name }}-->
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
<!--                      <v-list-item-avatar>-->
<!--                        <img :src="data.item.avatar">-->
<!--                      </v-list-item-avatar>-->
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </template>
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
                      v-model="date"
                      :error-messages="publicationDateErrors"
                      color="cyan darken-2"
                      label="Publication Date"
                      required
                      outlined
                      prepend-icon="mdi-calendar"
                      readonly
                      @input="$v.date.$touch()"
                      @blur="$v.date.$touch()"
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    @input="menu = false"
                ></v-date-picker>
              </v-menu>
<!--        end of input date -->

<!--        input abstract-->
              <v-textarea
                  class="pb-2"
                  v-model="abstract"
                  :error-messages="abstractErrors"
                  color="cyan darken-2"
                  required
                  outlined
                  name="input-7-4"
                  label="Abstract"
                  @input="$v.abstract.$touch()"
                  @blur="$v.abstract.$touch()"
              ></v-textarea>
<!--        end of input abstract-->

<!--        file input -->
                <v-file-input
                    v-model="file"
                    class="pb-2"
                    required
                    outlined
                    color="cyan darken-2"
                    accept="file/*"
                    label="File input"
                ></v-file-input>
<!--        end of input file -->

            <router-link :to="{name : 'classification steps'}">
              <v-btn
                  coloru="cyan darken-2"
                  class="mr-4"
                  @click="submit"

              >
                submit
              </v-btn>
            </router-link>
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
    title: {required},
    author:{required},
    date: {required},
    abstract: {required},
    file: {required},
  },

  components: {
    MainAppbar
  },

  data: ()=> ({
    authors: [
      // {name: 'Adhistya Erna Permanasari'},
      // {name: 'Indriana Hidayah'},
      // {name: 'Teguh Barata Adji'},
      // {name: 'Oyas Wahyunggoro'},
      // {name: 'Paulus Insap Santosa'},
      // {name: 'Silmi Fauziati'},
      // {name: 'Sunu Wibirama'},
      // {name: 'Ridi Ferdiana'},
    ],
    title: '',
    author: '',
    date: '',
    abstract: '',
    file:null
  }),

  computed: {
  titleErrors () {
    const errors = []
    if (!this.$v.title.$dirty) return errors
    !this.$v.title.required && errors.push('title is required.')
    return errors
  },
    // authorErrors () {
    //   const errors = []
    //   if (!this.$v.author.$dirty) return errors
    //   !this.$v.author.required && errors.push('Author is required.')
    //   return errors
    // },
    publicationDateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      // !this.$v.year.yearFormat && errors.push('Must be right format for year.')
      !this.$v.date.required && errors.push('date is required.')
      return errors
    },
    abstractErrors () {
      const errors = []
      if (!this.$v.abstract.$dirty) return errors
      !this.$v.abstract.required && errors.push('abstract is required.')
      return errors
    },
  },

  methods:{
    postPublication(){
      this.axios.post("localhost:8081/kpdteti/api/xpath/publications",{
        title: this.title,
        author: this.author,
        date: this.date,
        abstract: this.abstract,
        file: this.file,
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    },
    getAuthors(data){
      this.authors = data
    },
    remove (item) {
      const index = this.author.indexOf(item.name)
      if (index >= 0) this.author.splice(index, 1)
    },
    submit(){
      this.$v.$touch()

      // this.showSteps = false
    },
    clear(){
      this.$v.$touch()
      this.title = ''
      this.author= ''
      this.date=''
      this.abstract=''
      this.file=null
    }
  },

  mounted(){
    axios
        .get("localhost:8081/kpdteti/api/publications")
        .then((response) =>
            // handle success
            this.getAuthors(response.data))
        .catch((error) =>
            // handle error
            console.log(error))
  }
}
</script>

<style scoped>
</style>
