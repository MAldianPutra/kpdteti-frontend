    <template>
      <v-footer
          dark
          padless
          class="mt-16"
      >
        <v-card
            flat
            max-width="100%"
            tile
            class="teal darken-1 white--text text-center"
        >
          <v-card-text>
            <v-container>
              <div class="d-flex justify-center">
                <div>
                  <v-img
                                          max-height="80"
                                          max-width="80"
                                          position="center"
                                          class="mx-4"
                                          :src="require('../assets/Logo DTETI Fix Grey-01.png')"
                                      ></v-img>
                </div>
                <div>
                                    <v-img
                                        max-height="40"
                                        max-width="40"
                                        class="mx-4"
                                        :src="require('../img/Asset1.svg')"
                                    ></v-img>
                </div>
              </div>
            </v-container>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            reti is a system for DTETI publication product's repositories and also do the classification to publication into topics.
            The publications will be classified into 10 labels.
            Not only classification, user also can see about author's profile and also download the publications.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>reti</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </template>


<script>
export default {
  name: "MainFooter",
}
</script>

<style scoped>

</style>
