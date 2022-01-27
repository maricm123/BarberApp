import * as Vue from 'vue'
import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {firestorePlugin} from 'vuefire'

const firebaseConfig = {
    apiKey: "AIzaSyD4hgo5TXVq0wi7Qri5xYBL_U8SfXM6rJA",
    authDomain: "sanjamuskistudio.firebaseapp.com",
    projectId: "sanjamuskistudio",
    storageBucket: "sanjamuskistudio.appspot.com",
    messagingSenderId: "940162101609",
    appId: "1:940162101609:web:7b36c2671f3fd5dc5d0df8",
    measurementId: "G-HSZ5Z840PV"
  };

firebase.initializeApp(firebaseConfig);


createApp(App).use(store).use(router).use(firestorePlugin).mount('#app')
