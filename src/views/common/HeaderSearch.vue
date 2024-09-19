<template>
    <nav class="navbar navbar-light" style="background-color: #F5F7FA;">
        <a class="navbar-brand" id="header-title"><i class="fa-solid fa-spoon"></i> Spoonacular Recipes <i class="fa-solid fa-spoon fa-flip-horizontal"></i> </a>

        <form class="form-inline navbar-form navbar-form-header">
            <input class="form-control mr-sm-2 navbar-input" type="search" placeholder="Search Recipes" aria-label="Search Recipes" v-model="search_term">
            <button class="btn btn-success my-2 my-sm-0 navbar-submit" type="submit" v-on:click="getRecipes">Search</button>
        </form>
    </nav>
</template>

<script>
import axios from "axios";
import { search_recipes_endpoint } from '@/js_utils/urls.js';

export default {
  name: 'Header',
  components: {
  },
  data: function(){
    return {
        search_term: "",
        spoonacular_api_key: "", //PLACE SPOONACULAR API KEY HERE
        recipes: [],
        page: 1,
        perPage: 6,
        pages: [],
        count: 1
    }
  },
  methods : {
    getRecipes: function(e){
      e.preventDefault();

      document.getElementById("results-display").style.cssText = "display:none";
      document.getElementById("wheel-container").style.display = "flex";

      const config = {
          headers:{
              "x-api-key": this.spoonacular_api_key
          }
      };

      // Perform profile/ API request to get courier and hub info
      axios.get(search_recipes_endpoint.concat("?query=").concat(this.search_term).concat("&number=50"), config)
          .then(res => {
              document.getElementById("wheel-container").style.cssText = "display:none !important";
              document.getElementById("results-display").style.cssText = "display:block";
              this.recipes = res.data.results;

              this.$emit('newResults', this.recipes)


          }).catch(error=>{
              console.log(error)
          })
      
      
    },
  }
  
}


</script>