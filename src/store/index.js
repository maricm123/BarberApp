import Vue from 'vue'
import Vuex from 'vuex'
import firebaseConfig from '../main'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import bookings from "../store/bookings";
import bookingsSanja from "../store/bookingsSanja";
    


firebase.initializeApp({
    apiKey: "AIzaSyD4hgo5TXVq0wi7Qri5xYBL_U8SfXM6rJA",
    authDomain: "sanjamuskistudio.firebaseapp.com",
    projectId: "sanjamuskistudio",
    storageBucket: "sanjamuskistudio.appspot.com",
    messagingSenderId: "940162101609",
    appId: "1:940162101609:web:7b36c2671f3fd5dc5d0df8",
    measurementId: "G-HSZ5Z840PV"
  });

const state = {
    db: firebase.firestore()
};

export const db = firebase.firestore()


export default new Vuex.Store({
    state,
    modules: {
        bookings: bookings,
        bookingsSanja: bookingsSanja,
        // user: user
    },
    actions: {
        init: function (context) {
            return new Promise(resolve => {
                context.dispatch('bookings/getReservations').then(() => resolve());
                context.dispatch('bookingsSanja/getReservationsSanja').then(() => resolve());
            })
        }
    }
})