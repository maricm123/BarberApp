<template>
  <div class="modal-overlay">
    <div class="modal">
      
      <h6>Pravila zakazivanja</h6>
      <p>-Odaberi datum-</p>
      <p>-Odaberi vreme kod kog frizera želiš-</p>
      <p>-Popuni odgovarajuća polja svojim informacijama-</p>
      <p>-Ukoliko želiš da otkažeš, nazovi na broj +381691303083-</p>
      <div class="close" @click="$emit('close-modal')">
      <button class="btn">zatvori</button>
      </div>
    </div>
   
    
  </div>
  
</template>

<script>
  export default {
}
</script>



<style scoped>

.btn {
    background-color: black;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #141212da;
  
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  cursor: pointer;
  
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 20px;
  margin: 20px 0;
}


</style>