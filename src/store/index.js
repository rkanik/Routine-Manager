import Vue from 'vue'
import Vuex from 'vuex'

/** Modules */
import users from './modules/users';
import routines from './modules/routines';
import global from "./modules/global"
import teacher from "./modules/teacher"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { global, routines, users, teacher},

})
