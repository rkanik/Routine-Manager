
const state = {
   studentsTeacher : null
}

const getters = {
   studentsTeacher: state => state.studentsTeacher
}

const mutations = {
   setTeacherState: (state, payload) => {
      state[payload.state] = payload.data
   }
}

const actions = {
   fetchTeacher({ commit }, initial) {
      console.log(initial);
   }
}

export default {
   state , getters , mutations , actions
}