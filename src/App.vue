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
  </div>
</template>

<script>

/** Components */
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";

export default {
  name:"app",
  components:{
    'side-bar':Sidebar,
    'c-header':Header
  },
  created(){
    this.$store.dispatch('onCreateApp');
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
