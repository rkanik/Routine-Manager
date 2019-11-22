
import API from "../../js/axios"

const state = {

   searchRoutine: null,
   searchAvailableSections:[],

   studentsRoutine: null,

   //{value: 'none', text: "Select your section"}
   availableSections: [],
   courseSuggestions:[],

   fullSlots: ["08:30-10:00", "10:00-11:30", "11:30-01:00", "01:00-02:30", "02:30-04:00", "04:00-05:30"],
   shortSlots: ["08:30", "10:00", "11:30", "01:00", "02:30", "04:00"],
   fullDays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
   shortDays: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
   assocDays: { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' }

}

const getters = {

   searchRoutine: state => state.searchRoutine,
   studentsRoutine: state => state.studentsRoutine,

   fullSlots: state => state.fullSlots,
   assocDays: state => state.assocDays,
   fullDays: state => state.fullDays,

   availableSections: state => state.availableSections,
   courseSuggestions: state => state.courseSuggestions
}

const mutations = {

   setState: (state, payload) => {
      state[payload.state] = payload.data
   },
   setAvailableSections(state, payload) {
      state.availableSections = payload
   },
   resetAvailableSections: (state) => {
      state.availableSections = [];
   },
   tabToTable( state , payload ) {
      state[payload.state] = _.tabToTable(payload.data)
   }
}

const actions = {
   async fetchRoutine({ commit, rootState }, payload) {
      rootState.global.rootLoader = true
      if (payload.level !== 'none' && payload.term !== 'none' && payload.section !== "") {
         payload.section = payload.section.toUpperCase()
         let res = await API.get(`routine/lts/${payload.level}/${payload.term}/${payload.section}`)
         res.data !== null ? commit('setState', { state: 'searchRoutine', data: _.tabToTable(res.data) })
            : commit('setState', { state: 'searchRoutine', data: null })
      } else {
         commit('pushError', {
            title: "Incomplete field error!",
            message: "Enter select an option or enter course"
         }, { root: true })
      }
      rootState.global.rootLoader = false
   },
   async advancedFetchRoute({ commit, rootState }, payload) {
      rootState.global.rootLoader = true
      let res = await API.post(`routine/codes/${payload.section}`,[payload.code.toUpperCase()])
      res.data !== null ? commit('setState', { state: 'searchRoutine', data: _.tabToTable(res.data) })
         : commit('setState', { state: 'searchRoutine', data: null })
      rootState.global.rootLoader = false
   },
   async fetchStudentsRoutine({ commit, rootState }, lts) {
      rootState.global.rootLoader = true
      let res = await API.get(`routine/lts/${lts.level}/${lts.term}/${lts.section}`)
      res.data !== null ? (commit('setState', { state: 'studentsRoutine', data: _.tabToTable(res.data) }),
         sessionStorage.setItem("studentsRoutine", JSON.stringify(res.data)))
         : commit('setState', { state: 'studentsRoutine', data: null })
      rootState.global.rootLoader = false
   },
   async fetchAvailableSections({ commit, rootState }, payload) {
      rootState.global.rootLoader = true;let res = null
      if (payload.code) {res = await API.get(`routine/available-sections/code/${payload.code}`)}
      else { res = await API.get(`routine/available-sections/${payload.level}/${payload.term}`) }
      await commit("resetAvailableSections");
      commit("setAvailableSections", res.data);
      rootState.global.rootLoader = false
   },
   async fetchCourseSuggestions({commit,state},key) {
      let res = await API.get(`/course/suggestion/code-or-title/${key}`)
      state.courseSuggestions = res.data
   }
}

const _ = {
   dayOfWeek() {
      return state.fullDays[new Date().getDay()]
   },
   pushEmptyRoutine(routine) {
      return routine[this.dayOfWeek()] = [{ Title: 'There is no class today!', m: 'Enjoy your day' }]
   },
   tabToTable(routine) {
      //if (routine[this.dayOfWeek()][0].m) { delete routine[this.dayOfWeek()] }
      for (let day in routine) {
         let temp = routine[day]; routine[day] = [];
         let c = 0; while (c < 6) { routine[day].push(''); c++ }
         temp.forEach(r => {
            let i = state.fullSlots.indexOf(r.slot);
            routine[day].splice(i, 1, r);
         })
      }
      return routine
   },
   tableToTab(routine) {
      for (let day in routine) { routine[day] = routine[day].filter(r => r !== '') }
      if (routine[this.dayOfWeek()] === undefined) { this.pushEmptyRoutine(routine) }
      return routine
   }
}

export default {
   namespaced: true, state, mutations, getters, actions
}