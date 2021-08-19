<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-card
        class="mx-auto"
    max-width="800"
    outlined
    elevation="2">
      <v-card-title>KLASIFIKASI HASIL PUBLIKASI</v-card-title>
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
  </v-content>
</template>

<script>
import MainAppbar from '@/components/MainAppbar';
export default {
  name: "PostPublicationPage",
  components: {
    MainAppbar
  }
}
</script>

<style scoped>

</style>
