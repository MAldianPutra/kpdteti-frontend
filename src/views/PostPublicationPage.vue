<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-row>
      <v-col
          cols="3"
          md="10"
          class="pa-5"
          offset-md="1"
      >
    <v-card
        class="mx-auto"
    max-width="800"
    outlined
    elevation="2">
      <v-card-title
      class="justify-center">KLASIFIKASI HASIL PUBLIKASI</v-card-title>
        <form>
          <v-text-field
              v-model="title"
              :error-messages="titleErrors"
              label="Publication Title"
              required
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="author"
              :error-messages="authorErrors"
              label="Author Name"
              required
              @input="$v.author.$touch()"
              @blur="$v.author.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="year"
              :error-messages="yearErrors"
              label="Year of Publication"
              required
              @input="$v.year.$touch()"
              @blur="$v.year.$touch()"
          ></v-text-field>
          <v-textarea
              outlined
              name="input-7-4"
              label="Abstract"
          ></v-textarea>
            <v-file-input
                accept="file/*"
                label="File input"
            ></v-file-input>
          <v-btn
              class="mr-4"
              @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
        </form>
    </v-card>
      </v-col>
      </v-row>
    <v-divider></v-divider>
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
                    :complete="e6>1"
                    step="1">Pre-Processing</v-stepper-step>
                  <v-stepper-content step="1">
                    <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="300px"></v-card>
                    <v-btn
                        color="primary"
                        @click="e6 = 2"
                    >
                      Continue
                    </v-btn>
                  </v-stepper-content>
                  <v-stepper-step
                    :complete="e6>2"
                    step="2">Classification</v-stepper-step>
                  <v-stepper-content step="2">
                    <v-card
                        color="grey lighten-1"
                        class="mb-12"
                        height="200px"></v-card>
                    <v-btn
                        color="primary"
                        @click="e6 = 3"
                    >
                      Continue
                    </v-btn>
                  </v-stepper-content>
                  <v-stepper-step
                      step="3">Result</v-stepper-step>
                    <v-stepper-content step="3">
                      <v-card
                          color="grey lighten-1"
                          class="mb-12"
                          height="200px"></v-card>
                      <v-btn
                          color="primary"
                          @click="e6 = 1"
                      >
                        Continue
                      </v-btn>
                    </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import MainAppbar from '@/components/MainAppbar';
export default {
  name: "PostPublicationPage",
  components: {
    MainAppbar
  },
  data () {
    return {
      e6:1,
    }
  },
}
</script>

<style scoped>

</style>
