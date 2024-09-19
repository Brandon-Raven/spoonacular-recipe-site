<template>
    <div style="display:none !important;" id="wheel-container" class="d-flex justify-content-center">
      <div class="spinner-border green-wheel" role="status"></div>
    </div>
    <section class="vh-form gradient-custom">
        <div class="container py-4 h-100" id= "recipe-card-body" style="display: none;">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-12">
                    <div id="form-container" class="card text-black" style="border-radius: 1rem;background-color: #f2f2f2;">
                        <div class="container recipe-card-body">
                              <div class="row">
                                <div class="col-sm justify-content-center align-self-center m-5">
                                  <img :src="recipe_details.image" alt="Recipe Image" style="width: 40%; border:solid thin black; border-radius: 1rem;">
                                </div>
                              </div>
                              <div class="row" style="width:60%; margin-left:20%; margin-right:20%;">
                                <div class="col-sm justify-content-center align-self-center">
                                  <h1 id="card-text" class="recipe-title" style="text-align: center;">{{recipe_details.title}}</h1>
                                  <h4 id="card-text" class="health-info">Health Info</h4>
                                    <ul>
                                        <li v-if="recipe_details.vegetarian">
                                            Vegetarian
                                        </li>
                                        <li v-if="recipe_details.vegan">
                                            Vegan
                                        </li>
                                        <li v-if="recipe_details.dairyFree">
                                            Dairy Free
                                        </li>
                                        <li v-if="recipe_details.glutenFree">
                                            Gluten Free
                                        </li>
                                    </ul>
                                  <h4 id="card-text" class="ingredients" >Ingredients</h4>
                                    <ul>
                                        <li v-for="ingredient in Object.keys(ingredients)" v-bind:key="ingredient" > {{ ingredient }} - {{ ingredients[ingredient].amount }} {{ ingredients[ingredient].unit }}</li>
                                    </ul>
                                  <h4 id="card-text" class="instructions">Cooking Instructions</h4>
                                  <div v-html="recipe_details.instructions "></div>

                                </div>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

import axios from "axios";
import { recipe_details_endpoint } from '@/js_utils/urls.js';

export default {
  name: 'RecipeCard',
  data: function(){
    return {
        spoonacular_api_key: "", //PLACE SPOONACULAR API KEY HERE
        recipe_details: [],
        ingredients: {}
    }
  },
  methods : {
    getRecipeDetails (){
        document.getElementById("wheel-container").style.display = "flex";

        const config = {
            headers:{
                "x-api-key": this.spoonacular_api_key
            }
        };

        // Perform profile/ API request to get courier and hub info
        axios.get(recipe_details_endpoint.concat(this.$route.query.id).concat("/information"), config)
            .then(res => {
                document.getElementById("wheel-container").style.cssText = "display:none !important";
                document.getElementById("recipe-card-body").style.display = "block";
                this.recipe_details = res.data;

                for (let i = 0; i < this.recipe_details.extendedIngredients.length; i++) {
                    this.ingredients[this.recipe_details.extendedIngredients[i].name] = {
                        "amount": this.recipe_details.extendedIngredients[i].amount,
                        "unit": this.recipe_details.extendedIngredients[i].unit
                    }
                } 

            }).catch(error=>{
                console.log(error)
            })
        }
  },
  mounted(){
    this.getRecipeDetails();
  }
  
}
</script>
