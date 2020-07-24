import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from "./directives/tooltip.directive"
import messagePlugin from '@/utils/message.plagin'
import Loader from "./components/app/Loader";
import Paginate from 'vuejs-paginate'

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'



Vue.config.productionTip = false


Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.use(messagePlugin, {})
Vue.use(Vuelidate)
Vue.directive('tooltip', tooltipDirective)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)

firebase.initializeApp({
  apiKey: "AIzaSyC8IGguQLm99TZcBie-S5UcvuPRGutUzH8",
  authDomain: "rkra-crm.firebaseapp.com",
  databaseURL: "https://rkra-crm.firebaseio.com",
  projectId: "rkra-crm",
  storageBucket: "rkra-crm.appspot.com",
  messagingSenderId: "715431576388",
  appId: "1:715431576388:web:47f617df4e9a9fb2eb8d11"
})
let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


