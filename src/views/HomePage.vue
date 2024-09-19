<template>
  <ul style="list-style: none;padding-left: 0;">
    <li v-if="count === 1">
      <HeaderNoSearch />
    </li>
    <li v-else>
      <HeaderSearch v-on:newResults="updateValues" />
    </li>
  </ul>

  <div id="recipes-search">
    <form class="form-inline navbar-form navbar-form-home">
        <input class="form-control mr-sm-2 navbar-input" type="search" placeholder="Search Recipes" aria-label="Search Recipes" v-model="search_term">
        <button class="btn btn-success my-2 my-sm-0 navbar-submit" type="submit" v-on:click="getRecipes">Search</button>
    </form>
  </div>

  <div style="display:none !important;" id="wheel-container" class="d-flex justify-content-center">
      <div class="spinner-border green-wheel" role="status"></div>
  </div>

  <div class="container" id="results-display">
    <div class="row">
      <div class="col-md-4" v-for="recipe in displayedRecipes" :key="recipe.id">
        <section class="vh-form gradient-custom">
            <div class="container py-4 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-12">
                        <div id="form-container" class="card text-black" style="border-radius: 1rem;background-color: #f2f2f2; font-size: 1vmax;">

                            <div class="container card-body" @click="handleClick(recipe.id)">
                              <div class="row">
                                <div class="col-sm align-self-center">
                                  <img :src="recipe.image" style="width: 100%; border:solid thin black; border-radius: 1rem;">
                                </div>
                                <div class="col-sm align-self-center">
                                  <p id="card-text">{{recipe.title}}</p>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
    <!--     Loop through the pages array to display each page number       -->
    <div class="clearfix btn-group col-md-5 paginator-buttons">
      <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> <i class="fa-solid fa-arrow-left-long"></i> </button>
      <button type="button" class="btn btn-sm btn-outline-secondary paginator-segments" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
      <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> <i class="fa-solid fa-arrow-right-long"></i> </button>
    </div>
  </div>
</template>

<script>
import HeaderNoSearch from '@/views/common/HeaderNoSearch.vue'
import HeaderSearch from '@/views/common/HeaderSearch.vue'

import axios from "axios";
import { search_recipes_endpoint } from '@/js_utils/urls.js';

export default {
  name: 'HomePage',
  components: {
    HeaderNoSearch,
    HeaderSearch

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

      document.body.style.backgroundImage = "none"; 

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
              document.getElementById("recipes-search").style.cssText = "display:none !important";
              
              this.displayHeaderSearch();
              this.recipes = res.data.results;


          }).catch(error=>{
              console.log(error)
          })
      
      
    },
    setPages () {
      let numberOfPages = Math.ceil(this.recipes.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (recipes) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  recipes.slice(from, to);
    },
    displayHeaderSearch: function(){
    	this.count --
    },
    updateValues (recipes){
      this.page = 1;
      this.pages = []
      this.recipes = recipes;
      
    },
    handleClick (recipe_id){
      this.$router.push({ name: 'recipe-details', query: { id: recipe_id  }})
    }
  },
  watch: {
    recipes () {
      this.setPages();
    }
  },
  computed: {
    displayedRecipes () {
      return this.paginate(this.recipes);
    }
  },
}

</script>