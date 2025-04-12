
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import 'wc-waterfall'
import { Toast } from 'vant';
import lazy from './directives/lazy'
import slidein from './directives/slidein'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast)
app.directive('lazy', lazy);
app.directive('slide-in' , slidein)
app.mount('#app')
