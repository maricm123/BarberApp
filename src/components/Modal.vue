<template>
  <div class="modal">
    <div class="modal-content">
      <div class="card">
                    <div class="card-content">
                        <p>We need some data to make a reservation </p>
                        <br>
                        <b-field message=" ">
                            <b-input required placeholder="Name" v-model="newBooking.name"></b-input>
                        </b-field>
                        <b-field message=" ">
                            <b-input required type="text" placeholder="Phone"
                                     v-model="newBooking.phone"></b-input>
                        </b-field>
                        <button @click="doBooking" :disabled="!isFormValid()" class="button is-primary"
                                v-bind:class="{'is-loading': isBooking}">Make reservation
                        </button>
                    </div>
                </div>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalMessage"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
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