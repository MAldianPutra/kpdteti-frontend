    <template>
      <v-footer
          dark
          padless
      >
        <v-card
            flat
            max-width="100%"
            tile
            class="teal darken-1 white--text text-center"
        >
          <v-card-text>
            <v-container>
              <v-col>
                <v-row
                    class="mx-md-auto"
                >
                  <v-img
                      max-height="80"
                      max-width="80"
                      position="center"
                      class="mx-4"
                      :src="require('../assets/Logo DTETI Fix Grey-01.png')"
                  ></v-img>
                  <v-img
                      max-height="40"
                      max-width="40"
                      class="mx-4"
                      :src="require('../img/Asset1.svg')"
                  ></v-img>
                 </v-row>
              </v-col>
            </v-container>
<!--            <v-btn-->
<!--                v-for="icon in icons"-->
<!--                :key="icon"-->
<!--                class="mx-4 white&#45;&#45;text"-->
<!--                icon-->
<!--            >-->
<!--              <v-icon size="24px">-->
<!--                {{ icon }}-->
<!--              </v-icon>-->
<!--            </v-btn>-->
          </v-card-text>

          <v-card-text class="white--text pt-0">
            KP-DTETI is a system to help user to do a classification for publication's products.
            Publication's will be classified into 38 label's that user can choose.
            Not only classification, user also can see about author's profile and finding publications.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>KP-DTETI</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </template>


<script>
export default {
  name: "MainFooter",
  data:()=> ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style scoped>

</style>
