
import uuidv4 from "uuid/v4";
import cookies from "../../js/cookies"
import API from "../../js/axios"
import axios from "axios"
import router from "../../routes/"

const state = {
   signup: false,
   tempId: null,
   editCourse: false,
   studentData: null,
   dataLoaded: false
}

const getters = {
   signup: state => state.signup,
   tempId: state => state.tempId,
   editCourse: state => state.editCourse,
   studentId: state => state.studentData !== null ? state.studentData.student_id : null,
   studentName: state => state.studentData !== null ? state.studentData.name : null,
   studentEmail: state => state.studentData !== null ? state.studentData.email : null,
   studentLevel: state => state.studentData !== null ? state.studentData.level : null,
   studentTerm: state => state.studentData !== null ? state.studentData.term : null,
   studentSection: state => state.studentData !== null ? state.studentData.section : null,
   noOfCourses: state => state.studentData !== null ? state.studentData.noOfCourses : null,
   noOfDays: state => state.studentData !== null ? state.studentData.noOfDays : null,
   isDataLoaded: state => state.dataLoaded
}

const mutations = {
   setState: (state, payload) => {
      state[payload.state] = payload.data
   }
}

const actions = {
   async onCreateUser({ dispatch, rootState }) {
      if (cookies.hasCookie('signedIn') && cookies.getCookie('signedIn') === 'true') {
         if (cookies.hasCookie("user_token")) {
            dispatch('signinWithToken', cookies.getCookie('user_token'))
         }
      }
      else if (!cookies.hasCookie("user_token")) { dispatch('signupNew') }
      if (rootState.global.signedIn === 'false') { router.push("/", (err) => { }) }
      await API.patch(`users/update-last-visited/${cookies.getCookie("user_token")}`, { date: Date.now() })
   },
   async onSignedIn({ commit, state, rootState }, payload) {
      rootState.global.signedIn = 'true'
      cookies.setCookie('signedIn', true, 7)
      cookies.setCookie("user_token", payload.info.user_token, 1000)
      state.tempId = null, state.studentData = payload.info
      await commit("routines/tabToTable", { state: "studentsRoutine", data: payload.routine }, { root: true })
      await commit("setTeacherState", { state: 'studentsTeacher', data: payload.teachers }, { root: true })
      //router.push("/me").catch(err => { })
      state.dataLoaded = true

   },
   async SigninUser({ dispatch, rootState }, student_id) {
      rootState.global.rootLoader = true
      let res = (await API.get(`/users/signin/${student_id}`)).data
      if (res.status === 404) { dispatch("initSignUp", student_id) }
      else { dispatch("onSignedIn", res.data) }
      rootState.global.rootLoader = false
   },
   async signinWithToken({ dispatch, rootState }, user_token) {
      rootState.global.rootLoader = true
      let res = (await API.get(`users/signin/${user_token}`)).data
      if (res.status === 200) { dispatch("onSignedIn", res.data) }
      rootState.global.rootLoader = false
   },
   signOut({ commit, rootState }) {
      rootState.global.rootLoader = true
      cookies.setCookie('signedIn', false, -1)
      commit("setGlobalState", { state: "signedIn", data: "false" }, { root: true });
      if (router.currentRoute.path === "/me") { router.push("/").catch(_ => { }) }
      rootState.global.rootLoader = false
   },
   async forceSignup({ dispatch, state }, payload) {
      let data = { ...await _.getIpLocation(), ...payload }
      let res = (await API.post(`users/signup/${data.user_token}?ref=force`, data)).data
      if (res.status === 200) { dispatch("SigninUser", payload.student_id); state.signup = false }
   },
   async signup({ dispatch, state, rootState }, payload) {
      rootState.global.rootLoader = true
      let res = (await API.post(`users/signup/${cookies.getCookie("user_token")}`, payload)).data
      if (res.status === 200) { dispatch("SigninUser", payload.student_id); state.signup = false }
      else if (res.status === 409) { dispatch('forceSignup', payload) }
      rootState.global.rootLoader = false
   },
   async signupNew() {
      let data = await _.getIpLocation()
      cookies.setCookie("user_token", data.user_token);
      await API.post("users", data);
   },
   async initSignUp({ commit }, payload) {
      commit("setState", { state: "signup", data: true });
      commit("setState", { state: "tempId", data: payload });
   }
};

const _ = {
   async getIpLocation() {
      let ppRes = await axios.get("https://ipapi.co/json/")
      return {
         user_token: uuidv4(), ip: ppRes.data.ip, isp: ppRes.data.org, city: ppRes.data.city,
         postal: ppRes.data.postal, latitude: ppRes.data.latitude, longitude: ppRes.data.longitude
      }
   }
}

export default {
   namespaced: true, state, mutations, getters, actions
}