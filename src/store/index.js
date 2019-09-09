import Vue from 'vue'
import Vuex from 'vuex'

/** Modules */
import ui from './modules/ui';
import api from "./modules/api";
import firebase from "./modules/firebase";
import routines from './modules/routines';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    ui , api , firebase , routines 
  }
})
