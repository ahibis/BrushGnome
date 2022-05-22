import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
loadFonts()

createApp(App)
  .use(vuetify,{},false,'bootstrap3')
  .use(createPinia())
  .mount('#app')

