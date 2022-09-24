<template>
  <div>
    <div class="float-container">
      <router-link class="float-child" id="link" :to="{ name: 'AdminSanja' }">Sanja</router-link>

      <router-link class="float-child" id="link" :to="{ name: 'AdminBojana' }">Bojana</router-link>

      <div>
        <button style="margin-bottom: 3%" @click="signOut()">Odjavi se</button>
      </div>
    </div>
  </div>
</template>               

<script>
import firebase from "firebase/compat/app";
import { mapActions, mapState } from "vuex";
import { db } from "../store/index";

export default {
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          });
        });
    }
  }
};
</script>
<style lang = "scss" scoped>
@import "http://fonts.googleapis.com/css?family=Montserrat:300,400,700";
.float-container {
  margin-top: 10%;
  font-size: 30px;
  padding: 20px;
}

.float-child {
  width: 50%;
  float: left;
  padding: 90px;
  border: 4px solid rgb(0, 0, 0);
  text-decoration: none;
  color: black;
}

button {
  margin-top: 10%;
}

@media screen and (max-width: 800px) {
  .float-container {
    margin-top: 10%;
    font-size: 20px;
  }

  .float-child {
    text-align: center;
    border: 4px solid rgb(0, 0, 0);
    text-decoration: none;
    color: black;
    padding: 20px;
  }
}
</style>

