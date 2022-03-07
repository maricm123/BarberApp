<template>
<div>
      <h2 class="subtitle">Rezervacije</h2>
        <table class="rwd-table" style="background-color: black; border: 1px solid white">
            <thead style="background-color: black; border: 1px solid white">
                <tr style="border: 1px solid white">
                    <th>
                        Ime i prezime
                    </th>
                    <th>
                        Telefon
                    </th>
                    <th>
                        Datum
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reservation in nextReservations" v-bind:key="reservation.id">
                    <td>{{reservation.name}}</td>
                    <td>{{reservation.phone}}</td>
                    <td>{{reservation.date}}</td>
                    <td>{{reservation.email}}</td>
                    <td><button
                            @click="cancelReservation(reservation.code)" class="button is-danger">Otkaži
                    </button></td>
                </tr>
            </tbody>
            
        </table>

      <div>
          <button style="margin-bottom: 3%" @click="signOut()">Odjavi se</button>
      </div>
</div>
</template>               

<script>
    import firebase from 'firebase/compat/app'
    import {mapActions, mapState} from 'vuex';
    import {db} from '../store/index'

    export default {
        name: "adminNekoDrugi",
        data() {         
            return {
                nextReservations: [],
            }
        },
        methods: {
            watcher() {
                db.collection('details').onSnapshot((querySnapshot) => {
                    this.nextReservations = [];
                    querySnapshot.forEach(function(doc){
                        this.nextReservations.push(doc);
                    })
                })
            },

            async cancelReservation(doc) {
                if(confirm('Jesi li siguran?')) { 
                    let bookingRef = await db.collection('bookings').where('code', '==', doc).get();
                    let idBooking = bookingRef.docs[0].id;
                    await db.collection('bookings').doc(idBooking).delete()
                    let detailRef = await db.collection('details').where('code', '==', doc).get();
                    let id = detailRef.docs[0].id;
                    await db.collection('details').doc(id).delete();
                    this.watcher();
                    this.readData();
                }else {

                }
            },
            readData() {
                db.collection("details").where('date', '>', new Date()).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let detail = doc.data();
                    this.nextReservations.push({
                    name: detail.name,
                    phone: detail.phone,
                    date: new Date(detail.date.seconds * 1000).toLocaleString(),
                    code: detail.code,
                    email: detail.email
                        });
                    });
                });
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                    this.$router.replace({
                        name: "Login"
                        });
                    });
                },
        },
        created() {
            this.readData();
        }
    }
</script>
<style scoped>

@import "http://fonts.googleapis.com/css?family=Montserrat:300,400,700";
.rwd-table {
  margin: 1em 0;
  min-width: 300px;
  border: 1px solid white;
}
.rwd-table tr {
  border-top: 1px solid rgb(0, 0, 0);
  border: 1px solid rgb(255, 255, 255);
}
.rwd-table th {
  display: none;
}
.rwd-table td {
  display: block;
}
.rwd-table td:first-child {
  padding-top: .5em;
}
.rwd-table td:last-child {
  padding-bottom: .5em;
}
.rwd-table td:before {
  /* content: attr(data-th) ": "; */
  font-weight: bold;
  width: 6.5em;
  display: inline-block;
}
@media (min-width: 480px) {
  .rwd-table td:before {
    display: none;
  }
}
.rwd-table th, .rwd-table td {
  text-align: left;
}
@media (min-width: 480px) {
  .rwd-table th, .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child, .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child, .rwd-table td:last-child {
    padding-right: 0;
  }
}

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: rgb(0, 0, 0);
  background: #eee;
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495E;
}

.rwd-table {
  background: #34495E;
  color: #fff;
  border-radius: .4em;
  overflow: hidden;
  width: 100%;
}
.rwd-table tr {
  border-color: #46627f;
}
.rwd-table th, .rwd-table td {
  margin: .5em 1em;
}
@media (min-width: 480px) {
  .rwd-table th, .rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th, .rwd-table td:before {
  color: rgb(255, 255, 255);
}
</style>

