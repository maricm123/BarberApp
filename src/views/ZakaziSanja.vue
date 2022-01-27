<template>
  <div>

    <h1 class="subtitle">Izaberi datum</h1>
    <div class="datepicker-container">
      <div class="datepicker-center">
        <datepicker
          @change="updateDate"
          v-model="date"
          :lowerLimit="new Date()"
          :upperLimit="new Date(new Date().getTime()+(3*24*60*60*1000))"
          />
      </div>
    </div><br>
    <h1 class="title">{{date.toLocaleDateString()}} </h1>
  <div class="float-container">
    <div class="float-child"> 
      <div class="first">

    <div v-if="user">
    <div class="datepicker-container">
      <div class="datepicker-center">
        <datepicker
          @change="updateDate"
          v-model="date"
          :lowerLimit="new Date()"
          
          />
      </div>
    </div>
    </div>
    

  <div v-if="date !== null">

    <div class="modal" v-if="showBookingModalSanja">
    <div class="modal-content">
      <div class="card">
                    <div class="card-content">
                        <br>
                        <p><strong>Popuni formu tvojim podacima </strong></p>

                        <br>
                        <p>Datum: {{date.toLocaleDateString()}}</p>
                        <p>Vreme: {{newBookingSanja.fixture.hour}}:{{ ('0'+newBookingSanja.fixture.minutes).slice(-2)}}</p>
                        
                        <br>
                            
                        
                            <input required placeholder="Ime i prezime" v-model="state.newBookingSanja.name" type="text"><br>
                            <span style="font-size: 11px" v-if="v$.newBookingSanja.name.$error">
                              {{ v$.newBookingSanja.name.$errors[0].$message }}
                            </span> 
                        
                            <input required type="email" placeholder="Email" 
                                     v-model="state.newBookingSanja.email"> <br>
                            <span style="font-size: 11px" v-if="v$.newBookingSanja.email.$error">
                              {{ v$.newBookingSanja.email.$errors[0].$message }}
                            </span> 

                            <input required type="text" placeholder="Telefon"
                                     v-model="state.newBookingSanja.phone" ><br>
                            <span style="font-size: 11px" v-if="v$.newBookingSanja.phone.$error">
                              {{ v$.newBookingSanja.phone.$errors[0].$message }}
                            </span> 
                            
                            
                          <br>
                        <button @click="doBookingSanja()" class="button is-primary" 
                                v-bind:class="{'is-loading': isBookingSanja}">Rezerviši
                        </button>

                        <div class="card m-3">

                            <button class="zatvori" @click="closeModal">Zatvori</button>
                        </div>
                      </div>    
                    </div>
                </div>
        </div>
  </div>
    <br> <br>
    <!-- <h1 class="title">{{date.toLocaleDateString()}} </h1> -->
    <div v-if="isOpenOnDate" class="columns is-multiline" style="margin: 2em">
        <div v-for:="fixture in calendar" class="column is-2">
            <div class="fixture" @click="showModalSanja(fixture)"
                  v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}">
                {{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}
            </div>
        </div>
        
    </div>
    <div v-else-if="isSaturday" class="columns is-multiline" style="margin: 2em">
        <div v-for:="fixture in calendarSaturday" class="column is-2">
            <div class="fixture" @click="showModalSanja(fixture)"
                  v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}">
                {{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}
            </div>
    
        </div>
    </div>
    
    <div v-else>
        <br><br>
        <h1 class="subtitle has-text-danger">Neradni dan</h1>
    </div>

    </div>
    </div>

    <!-- <h1 class="subtitle">Izaberi datum</h1>
    <div class="datepicker-container">
      <div class="datepicker-center">
        <datepicker
          @change="updateDate"
          v-model="date"
          :lowerLimit="new Date()"
          :upperLimit="new Date(new Date().getTime()+(3*24*60*60*1000))"
          />
      </div>
    </div> -->


</div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import Datepicker from 'vue3-datepicker'
import scheduleSanja from "../config/scheduleSanja";
import {mapState, mapActions} from 'vuex';
import firebase from 'firebase/compat/app'
import auth from 'firebase/compat/auth'
import {onBeforeMount} from 'vue';
import {required, email, minLength, helpers, maxLength, numeric} from '@vuelidate/validators'
import {reactive,  computed} from 'vue'

export default {
  name: 'Zakazi',
  components: {
    Datepicker
  },
  
  data() {
    let date = new Date();
    date.setHours(12, 0, 0);
    return {
      v$: useValidate(),
      
        newBookingSanja: {
            name: '',
            phone: '',
            email: '',
            fixture: {}
        },
        isBookingSanja: false,
        showBookingModalSanja: false,
        date: date,
        scheduleSanja: scheduleSanja.hours,
        scheduleSaturdaySanja: scheduleSanja.hoursSaturday,      
    }
  },
  setup() {
    const state = reactive({
      newBookingSanja: {
            name: '',
            phone: '',
            email: ''
            
        },
    })
    const rules = computed(()=>{
      return {
        newBookingSanja: {
            name: {required:helpers.withMessage("Ime je obavezno polje", required)},
            phone: {required:helpers.withMessage("Telefon je obavezno polje", required),
                    minLength:helpers.withMessage("Neispravno unet broj telefona", minLength(9)),
                    maxLength:helpers.withMessage("Neispravno unet broj telefona", maxLength(11)),
                    numeric:helpers.withMessage("Ne sme sadrzati slova", numeric)},
            email: {required:helpers.withMessage("Email je obavezno polje", required), email:helpers.withMessage("Email nije ispravno unet", email)},
      }
      }
    })
    const v$ = useValidate(rules, state)

    return {
        state,
        v$,
    }
  },
  methods: {
            ...mapActions('bookingsSanja', ['createSanja', 'getReservationsSanja']),
            

            
            doBookingSanja: function () {    
                this.v$.$validate()
                if (!this.v$.$error) {
                  alert("Uspesno ste izvrsili rezervaciju"
                  )
                  this.isBookingSanja = true;
                  let date = new Date(this.date.toDateString() + ' 12:00:00');
                  date.setHours(this.newBookingSanja.fixture.hour, this.newBookingSanja.fixture.minutes, 0);
                  let payload = {
                      name: this.state.newBookingSanja.name,
                      phone: this.state.newBookingSanja.phone,
                      email: this.state.newBookingSanja.email,
                      date: date
                  };
                  this.createSanja(payload).then(code => {
                      this.generatedCode = code;
                      this.showBookingModalSanja = false;
                      this.isBookingSanja = false; 
                      this.getReservationsSanja();
                  });
                }else {
                  alert("Molimo Vas unesite ispravno podatke")
                }
              
            },
            showModalSanja: function (fixture) {
                if (fixture.isBooked) return;
                this.newBookingSanja = {
                    name: '',
                    phone: '',
                    email: '',
                    fixture: fixture
                };
                this.showBookingModalSanja = true;
            },
            updateDate: function (date) {
              let newDate = new Date(date);
                newDate.setHours(12);
                this.date = newDate;
                
            },
            closeModal() {
              this.showBookingModalSanja = !this.showBookingModalSanja;
              
            },
            
        },
  
  computed: {
    ...mapState('bookingsSanja', ['reservationsSanja']),
    isOpenOnDate() {
        return scheduleSanja.openingDays.includes(this.date.getDay());
    },
    user() {
        return firebase.auth().currentUser;
        },
    isSaturday() {
        return scheduleSanja.saturday.includes(this.date.getDay());
        
    },
    calendarSanja: function () {
            let calendar = [];
            this.scheduleSanja.forEach(hour => {
                let date = new Date(this.date.toDateString() + ' 12:00:00');
                date.setHours(hour.hour, hour.minutes, 0);
                if (date >= new Date()) {
                    let reservation = this.reservationsSanja.filter(x => {
                        return x.date.seconds === (date.getTime() / 1000)
                    });
                    calendar.push({
                        hour: hour.hour,
                        minutes: hour.minutes,
                        isBooked: reservation.length === 1
                    });
                }
            });
            return calendar;
        },
    calendarSaturdaySanja: function () {
            let calendarSaturday = [];
            this.scheduleSaturdaySanja.forEach(hour => {
                let date = new Date(this.date.toDateString() + ' 12:00:00');
                date.setHours(hour.hour, hour.minutes, 0);
                if (date >= new Date()) {
                    let reservation = this.reservationsSanja.filter(x => {
                        return x.date.seconds === (date.getTime() / 1000)
                    });
                    calendarSaturday.push({
                        hour: hour.hour,
                        minutes: hour.minutes,
                        isBooked: reservation.length === 1
                    });
                }
            });
            return calendarSaturdaySanja;
        }
      
    },
    created() {
        this.getReservationsSanja();
    },
    
    
    

  }

</script>

<style lang = "scss" scoped>
/* HALF */

.float-container {
    border: 3px solid #fff;
    padding: 20px;
}

.float-child {
    width: 50%;
    float: left;
    padding: 20px;
    position: relative;
}  


/* DATE PICKER */
.datepicker-container{
  text-align:center;
  z-index: -10;
  
}
.datepicker-center{
  display:inline-block;
  margin:0 auto;
  /* z-index: 100; */
}
/* .nav {
  margin: auto;
  margin-top: 40px;
  margin-bottom: -150px;
  position: relative;
  z-index: 100;
  width: 50vw;
  min-width: 320px;
  height: 200px;
}

.nav h2 {
  border-radius: 2px;
  
  background: rgb(0, 0, 0);
  height: 50px;
  text-transform: uppercase;
  color: ivory;
  font-weight: 200;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 20px -2px rgba(0,0,0,.35);
  transition: all .4s;
}

.nav:hover h2{
  transform: translateY(-2px);
  box-shadow: 2px 2px 5px -1px rgba(0,0,0,.35);
 }
.nav:hover:active h2{
  transform: translateY(10px);
  box-shadow: 0px -1px 2px 0px rgba(0,0,0,.35);
 }

#toggle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  opacity: 0;
  cursor: pointer;
  height: 60px;
}


.nav ul {
  position: relative;
  list-style: none;
  overflow: hidden;
  text-align: right;
  margin-bottom: 22px;
  text-align: center;
  transition: all .4s ease-out;
  height: 500%;
  
}
.nav ul li {
  border-radius: 2px;
  position: relative;
  display: inline-block;
  margin-left: 35px;
  line-height: 1.5;
  width: 100%;
  margin: 0;
  margin-bottom: 25px;
  background: rgb(0, 0, 0);
  transition: background 3s;
  box-shadow: 2px 2px 10px -2px rgba(0,0,0,.35);
}

.nav ul a {
  display: block;
  color: ivory;
  /* text-transform: uppercase; */
  /* font-size: 18px;
  font-weight: 200;
  text-decoration: none;
  transition: color .3s;
} */

#toggle:checked ~ul {
  height: 0%;
}





.subtitle {
  margin-top: 30px;
  margin-bottom: 20px;
}
/* VREME  */


.fixture {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    height: 30px;
    width: 200px;
    justify-content: center;
    justify-items: center;
    margin: 7px;
    border-radius: 20px;
}
.booked {
    background-color: #f3dddd;
    cursor: not-allowed;
    border: black 5px;
}
.free {
    cursor: pointer;
    background-color: #000000;
    color: white;
    
    
}

/* MODAL */
.card {
  input {
    padding: 10px;
    margin: 4px;
    height: 7px;
  }
}

.modal {
  position: fixed;
  z-index: 9998;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      text-align: center;
    }
    button {
      align-self: center;
    }
  }
  
}
</style>