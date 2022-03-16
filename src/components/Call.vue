<template>
    <div id="mybutton">
           <a href="tel:+381691303083"> <img src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/black_webpict08_1484337066-1.png" alt="" class="profileimage"> </a>
    </div>

</template>

<script>

export default {

    name: "Call",
    setup() {
		return {
            
		}
	}
}
</script>   

<style scoped>
@media screen and (min-width:800px) {
    .fa-phone {
    display: none;
    }

    #mybutton {
    display: none;
    }
}

@media screen and (max-width:800px) {
    img {
        border-radius: 40%;
        cursor: pointer;
        background-color: #f3dddd;
        
        width: 11%;
        float: right;
        
    }

    #mybutton {
        
        position: fixed;
        bottom: 18px;
        right: 18px;
        
    }
 
}


</style>