<template>
  <div>
    <div class="columns is-gapless is-multiline is-desktop" id="prvi">
      <div class="column is-half">
        <section>
          <span>
            <i class="fa fa-map-marker"></i>
          </span>
          <span>
            Kosančić Ivana 24 21000,
            Novi Sad
          </span>
        </section>
        <section>
          <span>
            <i class="fa fa-phone"></i>
          </span>
          <span>+381 69 130 3083</span>
          <br />
        </section>
        <!-- <section>
    <span><i class="fa fa-envelope"></i></span>
    <span>sanja@gmail.com</span>
        </section>-->
      </div>
      <hr class="title-underline" style="background: blue;" />
      <br />
      <h1>Pronadjite nas putem mape</h1>
      <div class="column is-half">
        <br />
        <br />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.716561553213!2d19.8321287204532!3d45.253524047464715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b1116198fb1f9%3A0x905e1e97f3793e79!2sSanja%20M%20Mu%C5%A1ki%20Studio!5e0!3m2!1ssr!2srs!4v1639141851877!5m2!1ssr!2srs"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer";

export default {
  name: "ONama",
  components: {
    Footer
  }
};
</script>

<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"; */
iframe {
  width: 100%;
}

#prvi {
  padding: 40px;
  text-align: center;
}

h1 {
  font-size: 25px;
  font-weight: 300;
}

section {
  font-size: 30px;
  padding: 20px;
}

@media screen and (max-width: 800px) {
  iframe {
    width: 100%;
  }
}
</style>