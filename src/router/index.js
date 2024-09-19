import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import RecipeDetailsView from '../views/RecipeDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipe-details',
      name: 'recipe-details',
      component: RecipeDetailsView
    }

  ]
})

export default router
