<template>
  <div class="sidebar bgSecondary tSecondary" v-bind:class="{collapsed:isSidebarCollapsed}">
    <div class="menu-toggler p-3">
      <div class="circle" @click="onclickSidebarToggler()">
        <s-toggler class="toggler" v-bind:data="{color:theme}"/>
      </div>
    </div>
    <div class="gap"></div>
    <ul class="router-link-group">
      <router-link tag="li" to="/">
        <img src="../../assets/svg/dashboard.svg" class="icon">
        <p class="">Home</p>
      </router-link>
      <router-link tag="li" to="/me" v-if="isSignedIn">
        <img src="../../assets/svg/profile.svg" class="icon">
        <p class="">My profile</p>
      </router-link>
      <router-link tag="li" to="/emptyroom">
        <img src="../../assets/svg/emptyroom.svg" class="icon">
        <p class="">Empty rooms</p>
      </router-link>
      <router-link tag="li" to="/teacher">
        <img src="../../assets/svg/teacher.svg"  class="icon">
        <p class="">Teacher</p>
      </router-link>
      <router-link tag="li" to="/qs">
        <img src="../../assets/svg/dashboard.svg" class="icon">
        <p class="">Qustions</p>
      </router-link>
      <hr>
      <router-link tag="li" to="/settings">
        <img src="../../assets/svg/settings.svg" class="icon">
        <p class="">Settings</p>
      </router-link>
    </ul>
  </div>
</template>

<script>

import Toggler from "../icons/SvgToggler";

import { mapMutations , mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  components:{
    's-toggler':Toggler
  },
  data(){
    return{
      theme:'light'
    }
  },
  methods:{
    ...mapMutations(['onclickSidebarToggler'])
  },
  computed:{
    ...mapGetters(['isSidebarCollapsed','isSignedIn'])
  }
}

</script>

<style lang="scss" scoped>
  .sidebar{
    width: 14rem;
    height: 100vh;transition: width 0.3s ease-in-out;
    box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
  }
  .menu-toggler{
    transition: padding 0.2s ease-in-out;
    .circle{
      border-radius: 50%;
      overflow: hidden;
      height: 2.8rem;
      width: 2.8rem;
      padding: 0.5rem;
      padding-left: 0.7rem;
      cursor: pointer;
      transition: padding , width , border-radius 0.2s ease-in;
      transition-delay: 0s;
      .toggler{
        height: 1.5rem;
        width: 1.5rem;
      }
    }
    .circle:hover{
      background-color: #313131;
    }
  }
  .gap{
    width: 100%;
    height: 4rem;
  }

  .router-link-group{
    padding: 0;
    li{
      cursor: pointer;
      padding: 0.5rem 1.2rem;
      display: grid;overflow: hidden;
      border-left: 4px solid #212121;
      grid-template-columns: min-content auto;
      transition: background-color 0.3s,border-color 0.3s;
      .icon{
        width: 0.9rem;
        margin-top: 0.3rem;
        transition: width 0.2s ease-in-out;
        opacity: 0.7;
      }
      p{
        color:#bdbdbd;
        min-width: 12rem;
        padding: 0;margin: 0;
        margin-left: 1.4rem;
        user-select: none;
        font-size: 1em;
      }
    }
    li:hover{
      background-color: #313131;
      border-color: #313131;
    }
  }

  .collapsed{
    width: 4rem;
    .menu-toggler{
      padding-left: 0 !important;
      padding-right: 0 !important;
      .circle{
        border-radius: 0;
        width: 100%;
        padding-left: 1.1rem;
        transition-delay: 0.3s;
      }
    }
    .router-link-group{
      li{
        .icon{
          width: 1.2rem;
        }
      }
    }
  }
</style>