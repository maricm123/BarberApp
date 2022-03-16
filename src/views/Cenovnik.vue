<template>
    <div>
<div class="event">
  
  <div class="info">
    <br />
    Šišanje
  </div>
  <div class="price">
    500 din
  </div>
  
</div>

<div class="event">
  
  <div class="info">
    <br />
    Šišanje mašinicom
  </div>
  <div class="price">
    400 din
  </div>
  
</div>
<div class="event">
  
  <div class="info">
    <br />
    Šišanje na nulu
  </div>
  <div class="price">
    300 din
  </div>
  
</div>
<div class="event">
  
  <div class="info">
    <br />
    Pranje kose
  </div>
  <div class="price">
    150 din
  </div>
  
</div>
<div class="event">
  
  <div class="info">
    <br />
    Uređivanje brade
  </div>
  <div class="price">
    200 din
  </div>
  
</div>
<div class="event">
  
  <div class="info">
    <br />
    Šišanje dece do 7 godina
  </div>
  <div class="price">
    400 din
  </div>
  
</div>
<div class="footer"> 
<Footer />
</div>
    </div>
</template>
<script>
import Footer from '../components/Footer'

export default {
  name: 'Cenovnik',
  components: {
    Footer
  }
}
</script>

<style scoped>

html {
    background: url(http://upload.robinbrons.com/u/1362757499.png);
}
body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}
.event {
  width: 300px;
  height: 80px;
  background: rgb(0, 0, 0);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 2px;
  margin: 50px;
  margin-left: 35%;
}
.event:before {
  content: '';
  display: block;
  width: 295px;
  height: 70px;
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 2px; 
  transform: rotate(2deg);
  position: relative;
  top: 12px;
  left: 2px;
  z-index: -1;
}
.event:after {
  content: '';
  display: block;
  width: 295px;
  height: 75px;
  background: rgb(0, 0, 0);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 2px; 
  transform: rotate(-2deg);
  position: relative;
  top: -136px;
  z-index: -2;  
}
.event > span {
  display: block;
  width: 30px;
  background: #232323;  
  position: relative;
  top: -55px;
  left: -15+px;
  
  /* Text */
  color: rgb(255, 255, 255);
  font-size: 10px;
  padding: 2px 7px;
  text-align: right;
}
.event > .info {
  display: inline-block;
  position: relative;
  top: -75px;
  left: 40px;
  
  /* Text */
  color: #ffffff;
  font-weight: 600;
  line-height: 25px;
}

.event > .price {
  /* display: inline-block; */
  width: 60px;
  position: relative;
  top: -85px;
  left: 12px; 
  
  /* Text */
  color: rgb(255, 255, 255);
  text-align: center;
  font-weight: 700;
}

@media screen and (max-width: 800px) {
  .event {
    margin-left: 4%;
  }
  
}
</style>