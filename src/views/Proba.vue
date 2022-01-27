<template>
<div>
  <!-- <o-table :data="data" :columns="columns"></o-table> -->
  <div v-for="item in reservations" :key="item.id">
      {{item}}
  </div>
</div>
</template>

<script>
import {db} from '../store/index'
import firebase from 'firebase/compat/app'

  export default {
    name: "Proba",
    data() {
      return {
        
        reservations: [
            
        ],
        // columns: [
        //   {
        //     field: 'telefon',
        //     label: 'Telefon',
        //   },
        //   {
        //     field: 'ime',
        //     label: 'Ime',
        //   },
        //   {
        //     field: 'Email',
        //     label: 'Email'
        //   },
        //   {
        //     field: 'date',
        //     label: 'Date',
            
        //   },
          
        // ]
      }
    },

    firestore() {
        let bookingsRef = db.collection("details").where('date', '>', new Date());
            let bookings = bookingsRef.get();
            let reservations = [];
            bookings.docs.forEach(function (doc) {
                let detail = doc.data();
                reservations.push({
                    name: detail.name,
                    phone: detail.phone,
                    email: detail.email,
                    date: new Date(detail.date.seconds * 1000).toLocaleString(),
                    code: detail.code
                });
            });
    }
  }
</script>