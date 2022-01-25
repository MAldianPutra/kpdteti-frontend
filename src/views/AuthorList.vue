<template>
  <div id="body">
  <v-content>
    <main-appbar></main-appbar>
    <v-container>
      <h1>Author List</h1>
      <v-row>
        <v-col
        cols="12"
        v-for="author in authors"
        :key="author.authorName">
          <router-link style="text-decoration: none; color: inherit;"
                       :to="{name: 'author profile',params:{id:author.authorId}}">
              <v-card
                  class="mx-auto"
                  outlined
                  max-width="700"
                  elevation="4"
                  >
                <v-list>
                  <v-list-item>
                    <v-avatar
                        color="teal">
                      <v-icon
                          dark>
                        mdi-account-circle
                      </v-icon>
                      <!--                      <v-img></v-img>-->
                    </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                        v-text="author.authorName"></v-list-item-title>
      <!--                  <v-card-title></v-card-title>-->
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
              </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <MainFooter></MainFooter>
  </v-content>
  </div>
</template>

<script>
import MainAppbar from "@/components/MainAppbar.vue";
import MainFooter from "@/components/MainFooter";
import axios from "axios";


export default {
  name: "AuthorList",
  components: {
    MainAppbar,
    MainFooter,
  },
  data:()=>({
    authors: [],
  }),
method:{
    // authorProfile(){
    //   this.$router.push({name:'author profile',params:{}})
    // }
  // sortAuthors(authors){
  //   return _.orderBy(authors, 'authorName', 'asc');
  // }
},
//   computed:{
//     sortAuthors(){
//       return this.authors
//           .filter(author => author.authorName.toLowerCase().match(this.search.toLowerCase()))
//           .sort((a, b) => {
//             if (a.authorName < b.authorName)
//               return -1;
//             if (a.authorName > b.authorName)
//               return 1;
//             return 0;
//           });
//     },
//   },
  async mounted() {
    try {
      const res = await axios
          .get("http://localhost:8081/kpdteti/api/authors/all")
      this.authors = res.data
      // console.log(res.data)
    }catch(error){
      // handle error
      console.log(error)
    }
  },
}

    // itemsPerPageArray: [10, 15, 20],
    // search: '',
    // filter: {},
    // sortDesc: false,
    // page: 1,
    // itemsPerPage: 10,
    // sortBy: 'name',
    // keys: [
    //   // 'Name',
    //   // 'Calories',
    //   // 'Fat',
    //   // 'Carbs',
    //   // 'Protein',
    //   // 'Sodium',
    //   // 'Calcium',
    //   // 'Iron',
    // ],
    // authors: []
    //   // {
    //   //   name: 'Frozen Yogurt',
    //   //   calories: 159,
    //   //   fat: 6.0,
    //   //   carbs: 24,
    //   //   protein: 4.0,
    //   //   sodium: 87,
    //   //   calcium: '14%',
    //   //   iron: '1%',
    //   // },
    //   // {
    //   //   name: 'Ice cream sandwich',
    //   //   calories: 237,
    //   //   fat: 9.0,
    //   //   carbs: 37,
    //   //   protein: 4.3,
    //   //   sodium: 129,
    //   //   calcium: '8%',
    //   //   iron: '1%',
    //   // },
    //   // {
    //   //   name: 'Eclair',
    //   //   calories: 262,
    //   //   fat: 16.0,
    //   //   carbs: 23,
    //   //   protein: 6.0,
    //   //   sodium: 337,
    //   //   calcium: '6%',
    //   //   iron: '7%',
    //   // },
    //   // {
    //   //   name: 'Cupcake',
    //   //   calories: 305,
    //   //   fat: 3.7,
    //   //   carbs: 67,
    //   //   protein: 4.3,
    //   //   sodium: 413,
    //   //   calcium: '3%',
    //   //   iron: '8%',
    //   // },
    //   // {
    //   //   name: 'Gingerbread',
    //   //   calories: 356,
    //   //   fat: 16.0,
    //   //   carbs: 49,
    //   //   protein: 3.9,
    //   //   sodium: 327,
    //   //   calcium: '7%',
    //   //   iron: '16%',
    //   // },
    //   // {
    //   //   name: 'Jelly bean',
    //   //   calories: 375,
    //   //   fat: 0.0,
    //   //   carbs: 94,
    //   //   protein: 0.0,
    //   //   sodium: 50,
    //   //   calcium: '0%',
    //   //   iron: '0%',
    //   // },
    //   // {
    //   //   name: 'Lollipop',
    //   //   calories: 392,
    //   //   fat: 0.2,
    //   //   carbs: 98,
    //   //   protein: 0,
    //   //   sodium: 38,
    //   //   calcium: '0%',
    //   //   iron: '2%',
    //   // },
    //   // {
    //   //   name: 'Honeycomb',
    //   //   calories: 408,
    //   //   fat: 3.2,
    //   //   carbs: 87,
    //   //   protein: 6.5,
    //   //   sodium: 562,
    //   //   calcium: '0%',
    //   //   iron: '45%',
    //   // },
    //   // {
    //   //   name: 'Donut',
    //   //   calories: 452,
    //   //   fat: 25.0,
    //   //   carbs: 51,
    //   //   protein: 4.9,
    //   //   sodium: 326,
    //   //   calcium: '2%',
    //   //   iron: '22%',
    //   // },
    //   // {
    //   //   name: 'KitKat',
    //   //   calories: 518,
    //   //   fat: 26.0,
    //   //   carbs: 65,
    //   //   protein: 7,
    //   //   sodium: 54,
    //   //   calcium: '12%',
    //   //   iron: '6%',
    //   // },
    // ]
  // }),
  // computed: {
  //   numberOfPages () {
  //     return Math.ceil(this.items.length / this.itemsPerPage)
  //   },
  //   filteredKeys () {
  //     return this.keys.filter(key => key !== 'Name')
  //   },
  // },
  // methods: {
  //   nextPage () {
  //     if (this.page + 1 <= this.numberOfPages) this.page += 1
  //   },
  //   formerPage () {
  //     if (this.page - 1 >= 1) this.page -= 1
  //   },
  //   updateItemsPerPage (number) {
  //     this.itemsPerPage = number
  //   },
    // setAuthor(data){
    //   this.author=data
    // }
    // },
  // }

</script>

<style scoped>
#body{
  background: url("../assets/v880-kul-11.jpg");
}
</style>