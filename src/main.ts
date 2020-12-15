
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css' 
import '@/styles/index.scss' // global css
import store from './store'
import router from './router'
import "@/styles/mixin.scss";
import "@/styles/variables.scss";

import { registerIcons } from '@/icons' // icon
import '@/permission' // permission control
import {mockXHR} from "../mock"

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
   mockXHR()
}


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
registerIcons(app)
app.use(ElementPlus).use(store).use(router)
 router.isReady().then(() => app.mount('#app'))
