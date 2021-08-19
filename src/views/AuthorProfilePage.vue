<template>
  <v-app>
    <v-content>
      <main-appbar></main-appbar>
      <v-card
          class="mx-auto"
          max-width="800"
          elevation="2"
      >
        <v-avatar
        color="warning lighten-2"
        rounded
        size="80"
        ></v-avatar>
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline mb-7">
              AUTHOR
            </div>
            <div class="text-overline mb-1">
              TOPICS
            </div>
            <v-card-actions>
              <v-row
                  justify="space-around"
                  align="center">
                <v-chip
                  class="ma-2"
                  color="warning lighten-2">
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="warning lighten-2">
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="warning lighten-2">
                </v-chip>
              </v-row>
            </v-card-actions>
            <v-list-item-title>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-card
          class="mx-auto"
      max-width="800"
      elevation="2">
        <v-card-title>
          PUBLICATION
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="search"
          single-line
          hide-details></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="publication"
            :items-per-page="2"
            class="elevation-1"
        ></v-data-table>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import MainAppbar from '@/components/MainAppbar'

export default {
  name: "AuthorProfilePage",
  components: {
    MainAppbar,
  }
}
</script>

<style scoped>

</style>
