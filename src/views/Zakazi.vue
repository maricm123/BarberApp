<template>
  <div>
    <div class="save-btn">
      <button
        style="background-color: black"
        @click="showModalNew = true"
      >pogledaj ovde kako da zakažeš termin</button>
    </div>

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
    </div>
    <ModalNew v-show="showModalNew" />

    <ModalNew v-show="showModalNew" @close-modal="showModalNew = false" />
    <br />
    <br />
    <h1 id="title" class="title">Datum: {{date.toLocaleDateString()}}</h1>

    <br />
    <br />

    <div class="split left">
      <div v-if="user">
        <div class="datepicker-container">
          <div class="datepicker-center">
            <datepicker @change="updateDate" v-model="date" :lowerLimit="new Date()" />
          </div>
        </div>
      </div>

      <!-- <img src="data:image/jpeg;base64,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" alt="" class="profileimage"> -->

      <h1>Sanja</h1>
      <div v-if="date !== null">
        <div class="modal" v-if="showBookingModalSanja">
          <div class="modal-content">
            <div class="card">
              <div class="card-content">
                <br />
                <p>
                  <strong>Popuni formu svojim podacima</strong>
                </p>

                <br />
                <p>Frizer: Sanja</p>
                <p>Datum: {{date.toLocaleDateString()}}</p>
                <p>Vreme: {{newBookingSanja.fixture.hour}}:{{ ('0'+newBookingSanja.fixture.minutes).slice(-2)}}</p>

                <br />
                <input
                  required
                  placeholder="Ime i prezime"
                  v-model="stateSanja.newBookingSanja.name"
                  type="text"
                />
                <br />
                <span
                  style="font-size: 11px"
                  v-if="vSanja$.newBookingSanja.name.$error"
                >{{ vSanja$.newBookingSanja.name.$errors[0].$message }}</span>

                <input
                  required
                  type="email"
                  placeholder="Email"
                  v-model="stateSanja.newBookingSanja.email"
                />
                <br />
                <span
                  style="font-size: 11px"
                  v-if="vSanja$.newBookingSanja.email.$error"
                >{{ vSanja$.newBookingSanja.email.$errors[0].$message }}</span>

                <input
                  required
                  type="text"
                  placeholder="Telefon"
                  v-model="stateSanja.newBookingSanja.phone"
                />
                <br />
                <span
                  style="font-size: 11px"
                  v-if="vSanja$.newBookingSanja.phone.$error"
                >{{ vSanja$.newBookingSanja.phone.$errors[0].$message }}</span>

                <br />
                <button
                  @click="doBookingSanja()"
                  class="button is-primary"
                  v-bind:class="{'is-loading': isBookingSanja}"
                >Rezerviši</button>

                <div class="card m-3">
                  <button class="zatvori" @click="closeModalSanja">Zatvori</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="this.weekNumber % 2 == 0">
        <div v-if="isOpenOnDate" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarFirstShiftSanja" class="column is-2">
            <div
              class="fixture"
              @click="showModalSanja(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
        <div v-if="isSaturdaySanja" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarFirstShiftSaturdaySanja" class="column is-2">
            <div
              class="fixture"
              @click="showModalSanja(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
      </div>

      <div v-if="this.weekNumber % 2 == 1">
        <div v-if="isOpenOnDate" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarSecondShiftSanja" class="column is-2">
            <div
              class="fixture"
              @click="showModalSanja(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
        <div v-if="isSaturdaySanja" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarSecondShiftSaturdaySanja" class="column is-2">
            <div
              class="fixture"
              @click="showModalSanja(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
      </div>

      <div v-if="isSunday">
        <h1 class="subtitle has-text-danger">Neradni dan</h1>
      </div>
    </div>

    <div class="split right">
      <div v-if="user">
        <div class="datepicker-container">
          <div class="datepicker-center">
            <datepicker @change="updateDate" v-model="date" :lowerLimit="new Date()" />
          </div>
        </div>
      </div>

      <!-- <img src="data:image/jpeg;base64,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" alt="" class="profileimage"> -->
      <h1>Bojana</h1>
      <div v-if="date !== null">
        <div class="modal" v-if="showBookingModal">
          <div class="modal-content">
            <div class="card">
              <div class="card-content">
                <br />
                <p>
                  <strong>Popuni formu svojim podacima</strong>
                </p>

                <br />
                <p>Frizer: Bojana</p>
                <p>Datum: {{date.toLocaleDateString()}}</p>
                <p>Vreme: {{newBooking.fixture.hour}}:{{ ('0'+newBooking.fixture.minutes).slice(-2)}}</p>

                <br />

                <input
                  required
                  placeholder="Ime i prezime"
                  v-model="state.newBooking.name"
                  type="text"
                />
                <br />
                <span
                  style="font-size: 11px"
                  v-if="v$.newBooking.name.$error"
                >{{ v$.newBooking.name.$errors[0].$message }}</span>

                <input required type="email" placeholder="Email" v-model="state.newBooking.email" />
                <br />
                <span
                  style="font-size: 11px"
                  v-if="v$.newBooking.email.$error"
                >{{ v$.newBooking.email.$errors[0].$message }}</span>

                <input required type="text" placeholder="Telefon" v-model="state.newBooking.phone" />
                <br />
                <span
                  style="font-size: 11px"
                  v-if="v$.newBooking.phone.$error"
                >{{ v$.newBooking.phone.$errors[0].$message }}</span>

                <br />
                <button
                  @click="doBooking()"
                  class="button is-primary"
                  v-bind:class="{'is-loading': isBooking}"
                >Rezerviši</button>

                <div class="card m-3">
                  <button class="zatvori" @click="closeModal">Zatvori</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="this.weekNumber % 2 == 1">
        <div v-if="isOpenOnDate" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarFirstShiftBojana" class="column is-2">
            <div
              class="fixture"
              @click="showModal(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
        <div v-if="isSaturday" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarFirstShiftSaturdayBojana" class="column is-2">
            <div
              class="fixture"
              @click="showModal(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
      </div>

      <div v-if="this.weekNumber % 2 == 0">
        <div v-if="isOpenOnDate" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarSecondShiftBojana" class="column is-2">
            <div
              class="fixture"
              @click="showModal(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
        <div v-if="isSaturday" class="columns is-multiline" style="margin: 2em">
          <div v-for:="fixture in calendarSecondShiftSaturdayBojana" class="column is-2">
            <div
              class="fixture"
              @click="showModal(fixture)"
              v-bind:class="{ 'booked': fixture.isBooked, 'free': !fixture.isBooked}"
            >{{fixture.hour}}:{{ ('0'+fixture.minutes).slice(-2)}}</div>
          </div>
        </div>
      </div>

      <div v-if="isSunday">
        <h1 class="subtitle has-text-danger">Neradni dan</h1>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ModalNew from "../components/ModalNew";
import useValidate from "@vuelidate/core";
import Datepicker from "vue3-datepicker";
import firstShiftBojana from "../config/firstShiftBojana";
import secondShiftBojana from "../config/secondShiftBojana";
import firstShiftSanja from "../config/firstShiftSanja";
import secondShiftSanja from "../config/secondShiftSanja";
import { mapState, mapActions } from "vuex";
import firebase from "firebase/compat/app";
import auth from "firebase/compat/auth";
import { onBeforeMount } from "vue";
import {
  required,
  email,
  minLength,
  helpers,
  maxLength,
  numeric
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Footer from "../components/Footer";

export default {
  name: "Zakazi",
  components: {
    Datepicker,
    ModalNew,
    Footer
  },

  data() {
    let date = new Date();
    date.setHours(12, 0, 0);
    return {
      showModalNew: false,
      v$: useValidate(),
      vSanja$: useValidate(),

      newBooking: {
        name: "",
        phone: "",
        email: "",
        fixture: {}
      },
      isBooking: false,
      showBookingModal: false,
      date: date,
      firstShiftSanja: firstShiftSanja.hours,
      firstShiftBojana: firstShiftBojana.hours,
      secondShiftSanja: secondShiftSanja.hours,
      secondShiftBojana: secondShiftBojana.hours,
      newBookingSanja: {
        name: "",
        phone: "",
        email: "",
        fixture: {}
      },
      isBookingSanja: false,
      showBookingModalSanja: false,
      date: date,
      firstShiftSaturdaySanja: firstShiftSanja.hoursSaturday,
      firstShiftSaturdayBojana: firstShiftBojana.hoursSaturday,
      secondShiftSaturdaySanja: secondShiftSanja.hoursSaturday,
      secondShiftSaturdayBojana: secondShiftBojana.hoursSaturday
    };
  },
  setup() {
    const state = reactive({
      newBooking: {
        name: "",
        phone: "",
        email: ""
      }
    });
    const stateSanja = reactive({
      newBookingSanja: {
        name: "",
        phone: "",
        email: ""
      }
    });
    const rules = computed(() => {
      return {
        newBooking: {
          name: {
            required: helpers.withMessage("Ime je obavezno polje", required)
          },
          phone: {
            required: helpers.withMessage(
              "Telefon je obavezno polje",
              required
            ),
            minLength: helpers.withMessage(
              "Neispravno unet broj telefona",
              minLength(9)
            ),
            maxLength: helpers.withMessage(
              "Neispravno unet broj telefona",
              maxLength(11)
            ),
            numeric: helpers.withMessage("Ne sme sadrzati slova", numeric)
          },
          email: {
            required: helpers.withMessage("Email je obavezno polje", required),
            email: helpers.withMessage("Email nije ispravno unet", email)
          }
        }
      };
    });
    const rulesSanja = computed(() => {
      return {
        newBookingSanja: {
          name: {
            required: helpers.withMessage("Ime je obavezno polje", required)
          },
          phone: {
            required: helpers.withMessage(
              "Telefon je obavezno polje",
              required
            ),
            minLength: helpers.withMessage(
              "Neispravno unet broj telefona",
              minLength(9)
            ),
            maxLength: helpers.withMessage(
              "Neispravno unet broj telefona",
              maxLength(11)
            ),
            numeric: helpers.withMessage("Ne sme sadrzati slova", numeric)
          },
          email: {
            required: helpers.withMessage("Email je obavezno polje", required),
            email: helpers.withMessage("Email nije ispravno unet", email)
          }
        }
      };
    });
    const v$ = useValidate(rules, state);
    const vSanja$ = useValidate(rulesSanja, stateSanja);

    return {
      state,
      stateSanja,
      v$,
      vSanja$
    };
  },
  methods: {
    ...mapActions("bookings", ["create", "getReservations"]),
    ...mapActions("bookingsSanja", ["createSanja", "getReservationsSanja"]),

    doBooking: function() {
      this.v$.$validate();
      if (!this.v$.$error) {
        alert(
          "Uspesno ste izvrsili rezervaciju, informacije su Vam poslate na mail."
        );
        this.isBooking = true;
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(
          this.newBooking.fixture.hour,
          this.newBooking.fixture.minutes,
          0
        );
        let payload = {
          name: this.state.newBooking.name,
          phone: this.state.newBooking.phone,
          email: this.state.newBooking.email,
          date: date
        };
        this.create(payload).then(code => {
          this.generatedCode = code;
          this.showBookingModal = false;
          this.isBooking = false;
          this.getReservations();
        });
        axios
          .get("https://emaildjangoapi.herokuapp.com/api/email/", {
            params: {
              receiver: this.state.newBooking.email,
              name: this.state.newBooking.name,
              frizer: "Bojana",
              datum: this.date.toDateString(),
              sat: this.newBooking.fixture.hour,
              minut: this.newBooking.fixture.minutes
            }
          })
          .then(() => {
            console.log(" success ");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Molimo Vas unesite ispravno podatke");
      }
    },
    showModal: function(fixture) {
      if (fixture.isBooked) return;
      this.newBooking = {
        name: "",
        phone: "",
        email: "",
        fixture: fixture
      };
      this.showBookingModal = true;
    },
    updateDate: function(date) {
      let newDate = new Date(date);
      newDate.setHours(12);
      this.date = newDate;
    },
    closeModal() {
      this.showBookingModal = !this.showBookingModal;
    },

    doBookingSanja: function() {
      this.vSanja$.$validate();
      if (!this.vSanja$.$error) {
        alert(
          "Uspesno ste izvrsili rezervaciju, informacije su Vam poslate na mail."
        );
        this.isBookingSanja = true;
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(
          this.newBookingSanja.fixture.hour,
          this.newBookingSanja.fixture.minutes,
          0
        );
        let payload = {
          name: this.stateSanja.newBookingSanja.name,
          phone: this.stateSanja.newBookingSanja.phone,
          email: this.stateSanja.newBookingSanja.email,
          date: date
        };
        this.createSanja(payload).then(code => {
          this.generatedCode = code;
          this.showBookingModalSanja = false;
          this.isBookingSanja = false;
          this.getReservationsSanja();
        });

        axios
          .get("https://emaildjangoapi.herokuapp.com/api/email/", {
            params: {
              receiver: this.stateSanja.newBookingSanja.email,
              name: this.stateSanja.newBookingSanja.name,
              frizer: "Sanja",
              datum: this.date.toDateString(),
              sat: this.newBookingSanja.fixture.hour,
              minut: this.newBookingSanja.fixture.minutes
            }
          })
          .then(() => {
            console.log(" success ");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Molimo Vas unesite ispravno podatke");
      }
    },
    showModalSanja: function(fixture) {
      if (fixture.isBooked) return;
      this.newBookingSanja = {
        name: "",
        phone: "",
        email: "",
        fixture: fixture
      };
      this.showBookingModalSanja = true;
    },
    closeModalSanja() {
      this.showBookingModalSanja = !this.showBookingModalSanja;
    }
  },

  computed: {
    ...mapState("bookings", ["reservations"]),
    ...mapState("bookingsSanja", ["reservationsSanja"]),

    weekNumber: function() {
      var date = new Date(this.date.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 4 - ((date.getDay() + 6) % 7));
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return (
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        )
      );
    },

    isOpenOnDate() {
      return firstShiftSanja.openingDays.includes(this.date.getDay());
    },
    isSunday() {
      return firstShiftSanja.closedDay.includes(this.date.getDay());
    },
    user() {
      return firebase.auth().currentUser;
    },
    isSaturday() {
      return firstShiftSanja.saturday.includes(this.date.getDay());
    },
    isSaturdaySanja() {
      return secondShiftSanja.saturday.includes(this.date.getDay());
    },
    calendarFirstShiftBojana: function() {
      let calendar = [];
      this.firstShiftBojana.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservations.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
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
    calendarSecondShiftBojana: function() {
      let calendar = [];
      this.secondShiftBojana.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservations.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
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
    calendarFirstShiftSanja: function() {
      let calendarSanja = [];
      this.firstShiftSanja.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservationsSanja.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
          });
          calendarSanja.push({
            hour: hour.hour,
            minutes: hour.minutes,
            isBooked: reservation.length === 1
          });
        }
      });
      return calendarSanja;
    },
    calendarSecondShiftSanja: function() {
      let calendarSanja = [];
      this.secondShiftSanja.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservationsSanja.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
          });
          calendarSanja.push({
            hour: hour.hour,
            minutes: hour.minutes,
            isBooked: reservation.length === 1
          });
        }
      });
      return calendarSanja;
    },

    calendarSecondShiftSaturdaySanja: function() {
      let calendarSaturday = [];
      this.secondShiftSaturdaySanja.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservationsSanja.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
          });
          calendarSaturday.push({
            hour: hour.hour,
            minutes: hour.minutes,
            isBooked: reservation.length === 1
          });
        }
      });
      return calendarSaturday;
    },
    calendarFirstShiftSaturdaySanja: function() {
      let calendarSaturday = [];
      this.firstShiftSaturdaySanja.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservationsSanja.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
          });
          calendarSaturday.push({
            hour: hour.hour,
            minutes: hour.minutes,
            isBooked: reservation.length === 1
          });
        }
      });
      return calendarSaturday;
    },
    calendarSecondShiftSaturdayBojana: function() {
      let calendarSaturday = [];
      this.secondShiftSaturdayBojana.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservations.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
          });
          calendarSaturday.push({
            hour: hour.hour,
            minutes: hour.minutes,
            isBooked: reservation.length === 1
          });
        }
      });
      return calendarSaturday;
    },
    calendarFirstShiftSaturdayBojana: function() {
      let calendarSaturday = [];
      this.firstShiftSaturdayBojana.forEach(hour => {
        let date = new Date(this.date.toDateString() + " 12:00:00");
        date.setHours(hour.hour, hour.minutes, 0);
        if (date >= new Date()) {
          let reservation = this.reservations.filter(x => {
            return x.date.seconds === date.getTime() / 1000;
          });
          calendarSaturday.push({
            hour: hour.hour,
            minutes: hour.minutes,
            isBooked: reservation.length === 1
          });
        }
      });
      return calendarSaturday;
    }
  },

  created() {
    this.getReservations();
    this.getReservationsSanja();

    // var date = new Date();
    // if(this.weekNumber != null) {
    //   console.log(this.weekNumber)

    // }else {
    //   console.log("NISAM")
    // }
  },
  mounted: function() {
    window.setInterval(() => {
      this.getReservations(), this.getReservationsSanja();
    }, 7000);
  }
};
</script>

<style lang = "scss" scoped>
/* HALF */

.footer {
  margin-top: 45%;
}

.split {
  height: 100%;
  width: 50%;
  /* position: absolute; */
}

.right {
  right: 0;
  float: right;
  /* background-color: #000000; */
}

.left {
  left: 0;
  float: left;
}

/* DATE PICKER */
.datepicker-container {
  text-align: center;
  z-index: -10;
}
.datepicker-center {
  display: inline-block;
  margin: 0 auto;
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

#toggle:checked ~ ul {
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

/* Mobile responsive */

@media screen and (max-width: 800px) {
  .split {
    height: 100%;
    width: 50%;
    font-size: 15px;
  }
  .fixture {
    display: inline-block;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    height: 20px;
    width: 100px;
    justify-content: center;
    justify-items: center;
    margin: 7px;
    border-radius: 20px;
  }
  .title {
    font-size: 25px;
  }
}
</style>