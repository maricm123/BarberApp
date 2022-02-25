<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name: 'Zakazi'}"> SanjaM </router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                  
                    <router-link  class="link" :to="{ name: 'Zakazi'}">Zakaži</router-link>
                    <router-link class="link" :to="{ name: 'Cenovnik' }">Cenovnik</router-link>
                    <router-link class="link" :to="{ name: 'Kontakt' }">Kontakt</router-link>
                </ul>
                
            </div>
        </nav>
        <!-- <h3 @click="toggleMobileNav" class="menu-icon" v-show="mobile">menu </h3> -->
        <svg width="27" height="34" style="color: black; width: 37px" viewBox="0 0 24 24" v-show="mobile" @click="toggleMobileNav" class="menu-icon">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 5.75H19.25"></path>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 18.25H19.25"></path>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12H19.25"></path>
        </svg>
        
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav" id="template">
               
                <router-link @click="linkToggle()" class="link" :to="{ name: 'Zakazi'}">Zakaži</router-link>
                <router-link @click="linkToggle()" class="link" :to="{ name: 'Cenovnik' }">Cenovnik</router-link>
                <router-link @click="linkToggle()" class="link" :to="{ name: 'Kontakt' }">Kontakt</router-link>
            </ul>
        </transition>

        
    </header>     
</template>



<script>

// import menuIcon from '../assets/Icons/vue-js-hamburger-menu-icon.png';
import { mdiMenu } from '../assets/Icons/menu.png';
import firebase from "firebase/app"
import "firebase/auth"

export default {
    name: 'navigation',
    components: {
        mdiMenu
        
    },
    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null  
        };
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return; 
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
            var menu = document.getElementById("menu-icon");
            // var template = document.getElementById("template");
            template.addEventListener('click', function(event){
              menu.classList.remove('active');
            })
        },
        linkToggle() {
          this.mobileNav = !this.mobileNav;
            var menu = document.getElementById("menu-icon");
            var template = document.getElementById("template");
            template.addEventListener('click', function(event){
              menu.classList.remove('active');
            })
            
        }
    }
}
</script>


<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    
    padding: 25px 0;
    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      ul {
        margin-right: 32px;
        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
    }
    .mobile-user-menu {
      margin-right: 40px;
    }
  }
  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    // width: auto;
  }
  .mobile-nav {
    z-index: 1000;
    
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>