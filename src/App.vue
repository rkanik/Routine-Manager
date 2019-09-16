<template>
  <div id="app" class="teal" :class="{'dark':settingBools.theme==false,'light':settingBools.theme==true}">
    <div class="main-row">
      <div class="main-col-left">
        <side-bar />
      </div>
      <div class="main-col-right bgPrimary">
        <div class="c-header">
          <c-header />
        </div>
        <div class="router-view">
          <router-view />
        </div>
      </div>
    </div>
    <div class="modals">
      <modal-signup v-if="signupModal" />
      <modal-editcourse v-if="editCourseModal" :courses='getUserCourses'/>
    </div>
  </div>
</template>

<script>
/** Components */
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import SignupModal from "./components/modals/SignupModal";
import EditCourseModal from "./components/Profile/EditCourse"
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    "side-bar": Sidebar,
    "c-header": Header,
    "modal-signup": SignupModal,
    'modal-editcourse':EditCourseModal
  },
  created() {
    this.$store.dispatch("onCreateApp");
  },
  computed: {
    ...mapGetters(["signupModal",'editCourseModal', "settingBools",'getUserCourses'])
  }
};
</script>

<style lang='scss'>
@import url("https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700&display=swap");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900&display=swap");
@import "./assets/scss/scrollbar.scss";
@import "./assets/scss/themes.scss";

body {
  margin: 0;
}
#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/** Components Styles */
.main-row {
  display: grid;
  grid-template-columns: min-content auto;
  .main-col-right {
    position: relative;
  }
}
</style>
