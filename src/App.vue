<template>
  <div id="app">
    <div class="main-row">
      <div class="main-col-left">
        <side-bar/>
      </div>
      <div class="main-col-right">
        <div class="c-header">
          <c-header/>
        </div>
        <div class="router-view">
          <router-view/>
        </div>
      </div>
    </div>
    <div class="modals">
      <modal-signup v-if="signupModal"/>
    </div>
  </div>
</template>

<script>

/** Components */
import Sidebar      from "./components/layouts/Sidebar";
import Header       from "./components/layouts/Header";
import SignupModal  from "./components/modals/SignupModal";
import { mapGetters } from 'vuex';

export default {
  name:"app",
  components:{
    'side-bar':Sidebar,
    'c-header':Header,
    'modal-signup':SignupModal
  },
  created(){
    this.$store.dispatch('onCreateApp');
  },
  computed:{
    ...mapGetters(['signupModal'])
  }
}
</script>

<style lang='scss'>

  @import url('https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700&display=swap');

  body{
    margin: 0;
  }

  #app {
    font-family: 'Quicksand', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #e0e0e0;
  }

  /** Components Styles */
  .main-row{
    display: grid;
    grid-template-columns: min-content auto;
    .main-col-right{
      position: relative;
      background-color: #171717;
    }
  }

</style>
