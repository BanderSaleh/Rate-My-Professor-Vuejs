import { createApp } from 'vue'
import Vue from "vue";
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");

createApp(App).use(router).mount('#app')
