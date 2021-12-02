<template>
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
      <h1>Publication List</h1>
<!--      <v-card class="rounded-pill" outlined>-->
<!--        <v-card-text>-->
<!--          <span style="color: red">Hello <span style="color: aqua"> -> Hai</span></span>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--      <v-row>-->
<!--      <v-col-->
<!--      cols="5"-->
<!--      sm="5">-->
<!--        <v-select-->
<!--            color="amber darken-2"-->
<!--        v-model="value"-->
<!--        :items="items"-->
<!--        attach-->
<!--        chips-->
<!--        label="TOPICS"-->
<!--        outlined>-->
<!--        </v-select>-->

      <v-container fluid>
        <v-data-iterator
            :items="publications"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar
                dark
                color="cyan darken-2"
                class="mb-1"
            >
              <v-text-field
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
              ></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-spacer></v-spacer>
                <v-select
                    v-model="sortBy"
                    flat
                    solo-inverted
                    hide-details
                    :items="keys"
                    prepend-inner-icon="mdi-magnify"
                    label="Sort by"
                ></v-select>
                <v-spacer></v-spacer>
                <!--              <v-btn-toggle-->
                <!--                  v-model="sortDesc"-->
                <!--                  mandatory-->
                <!--              >-->
                <!--                <v-btn-->
                <!--                    large-->
                <!--                    depressed-->
                <!--                    color="blue"-->
                <!--                    :value="false"-->
                <!--                >-->
                <!--                  <v-icon>mdi-arrow-up</v-icon>-->
                <!--                </v-btn>-->
                <!--                <v-btn-->
                <!--                    large-->
                <!--                    depressed-->
                <!--                    color="blue"-->
                <!--                    :value="true"-->
                <!--                >-->
                <!--                  <v-icon>mdi-arrow-down</v-icon>-->
                <!--                </v-btn>-->
                <!--              </v-btn-toggle>-->
              </template>
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
                  v-for="item in props.publications"
                  :key="item.publicationTitle"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
              >
                <router-link :to="{name : 'Publication Profile' }">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.publicationTitle }}
                  </v-card-title>

                  <v-divider></v-divider>

<!--                  <v-list dense>-->
<!--                    <v-list-item-->
<!--                        v-for="(key, index) in filteredKeys"-->
<!--                        :key="index"-->
<!--                    >-->
<!--&lt;!&ndash;                      <v-list-item-content :class="{ 'blue&#45;&#45;text': sortBy === key }">&ndash;&gt;-->
<!--&lt;!&ndash;                      </v-list-item-content>&ndash;&gt;-->
<!--                      <v-list-item-content-->
<!--                          class="align-end"-->
<!--                          :class="{ 'blue&#45;&#45;text': sortBy === key }"-->
<!--                      >-->
<!--                        {{ item.topicName }}-->
<!--                      </v-list-item-content>-->
<!--                      <v-list-item-content-->
<!--                          class="align-end"-->
<!--                          :class="{ 'blue&#45;&#45;text': sortBy === key }"-->
<!--                      >-->
<!--                        {{ item.authorName }}-->
<!--                      </v-list-item-content>-->
<!--                    </v-list-item>-->
<!--                  </v-list>-->
                </v-card>
               </router-link>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row
                class="mt-2"
                align="center"
                justify="center"
            >
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      dark
                      text
                      color="primary"
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>

              <span
                  class="mr-4
            grey--text"
              >
            Page {{ page }} of {{ numberOfPages }}
          </span>
              <v-btn
                  fab
                  dark
                  color="cyan darken-2"
                  class="mr-1"
                  @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                  fab
                  dark
                  color="cyan darken-2"
                  class="ml-1"
                  @click="nextPage"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-container>
  </v-content>
</template>

<script>
import MainAppbar from "@/components/MainAppbar.vue";
import axios from "axios";

export default {
  name: "PublicationDetailPage",
  components: {
    MainAppbar,
  },
  data: () => ({
    itemsPerPageArray: [10, 15, 20],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 10,
    sortBy: 'name',
    keys: [
      'title',
      'parentTopic',
      'topic',
      'author',
      'date',
    ],
    publications: []
  }),
  computed: {
    numberOfPages() {
      return Math.ceil(this.publications.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'title')
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    setPublications(data) {
      this.publications = data
    }
  },
  async mounted(){
  try {
    const res = await axios
        .get("http://localhost:8081/kpdteti/api/publications/all")
    this.publications = res.data
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}
}
</script>
<style>

</style>
