<template>
  <HeaderNoSearch/>

  <h4 id="returnButton" @click="handleClick"> <i class="fa-solid fa-arrow-left-long"></i> Return to Search Recipes</h4>
  <RecipeCard />

</template>

<script>
import HeaderNoSearch from '@/views/common/HeaderNoSearch.vue'
import RecipeCard from '@/views/common/RecipeCard.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderNoSearch,
    RecipeCard

  },
  methods : {
    handleClick (){
        history.back()
         document.body.style.backgroundImage = "url('https://www.shutterstock.com/image-photo/fresh-clean-vegetables-being-put-600nw-1678756072.jpg')"; 
    }
  },
}

</script>

