import {firebaseAction} from 'vuexfire'
import firebase from 'firebase/compat/app'

export default {
    namespaced: true,
    state: {
        reservationsSanja: [],
        nextReservationsSanja: [],
    },
    getters: {},
    mutations: {
        setReservationsSanja: function (state, data) {
            state.reservationsSanja = data;
        },
        setNextReservationsSanja: function (state, data) {
            state.nextReservationsSanja = data;
        }
    },
    actions: {
        async getReservationsSanja({rootState, commit}) {
            let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
            let bookingsRef = rootState.db.collection("bookingsSanja").where('date', '>', yesterday);
            let bookings = await bookingsRef.get();
            let reservationsSanja = [];
            bookings.docs.forEach(function (doc) {
                reservationsSanja.push(doc.data());
            });
            commit('setReservationsSanja', reservationsSanja);
        },
        async getNextReservationsSanja({rootState, commit}) {
            let bookingsRef = rootState.db.collection("detailsSanja").where('date', '>', new Date());
            let bookings = await bookingsRef.get();
            let reservationsSanja = [];
            bookings.docs.forEach(function (doc) {
                let detail = doc.data();
                reservationsSanja.push({
                    name: detail.name,
                    phone: detail.phone,
                    email: detail.email,
                    date: new Date(detail.date.seconds * 1000).toLocaleString(),
                    code: detail.code
                });
            });
            commit('setNextReservationsSanja', reservationsSanja);
        },
        async createSanja({rootState}, booking) {
            let code = (booking.date.getTime() / 1000) + Math.floor((Math.random() * 10) + 1).toString();
            let minimal = {date: booking.date, code: code};
            await rootState.db.collection('bookingsSanja').add(minimal);
            booking.code = code;
            await rootState.db.collection('detailsSanja').add(booking);
            return code;
        },
        async cancelSanja({rootState, dispatch}, booking) {
            let bookingRef = await firebase.firestore().collection('bookingsSanja').where('code', '==', booking.code).get();
            let idBooking = bookingRef.docs[0].id;
            await firebase.firestore().collection('bookingsSanja').doc(idBooking).delete()
            let detailRef = await firebase.firestore().collection('detailsSanja').where('code', '==', booking.code).get();
            let id = detailRef.docs[0].id;
            await firebase.firestore().collection('detailsSanja').doc(id).delete()
            if (!firebase.auth().currentUser.email) {
                await dispatch('user/logout', {}, {root: true})
            }
        }
    }
}

