import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import VueAwesomePaginate from "vue-awesome-paginate";

import "@/css/header.css"
import "@/css/home_page.css"
import "@/css/recipe_card.css"
import "vue-awesome-paginate/dist/style.css";

library.add(fas)
dom.watch();

const app = createApp(App)

app.use(router, VueAwesomePaginate)

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
