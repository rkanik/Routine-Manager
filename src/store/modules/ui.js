
import uuidv4 from "uuid/v4";
import router from '../../routes'

const state = {

    /** Booleans */
    isSidebarCollapsed: false,
    isSignedIn: false,
    isLoading: true,
    signupModal: false,editCourseModal:false,
    settingBools: { theme: false, sidebar: false, ramadan: false, cardView: false, accent: 'teal' },
    accents: ['teal', 'orange'],

    /** Strings */
    theme: 'dark',
    viewType: 'table',
    uToken: '',
    sfExpanded: 'Expand',

    /** Objects */
    userData: {},

}

const getters = {

    isSidebarCollapsed: state => state.isSidebarCollapsed,
    isSignedIn: state => state.isSignedIn,
    isLoading: state => state.isLoading,
    signupModal: state => state.signupModal,
    editCourseModal : state => state.editCourseModal,
    viewType: state => state.viewType,
    sfExpanded: state => state.sfExpanded,
    settingBools: state => state.settingBools,

    userId: state => state.userData.id,
    userName: state => state.userData.name,
    userEmail: state => state.userData.email,
    userLevel: state => state.userData.level,
    userTerm: state => state.userData.term,
    userSection: state => state.userData.section,
    getUserCourses : state => ex.getFormattedCourses(state.userData.courses),
    noOfCourses : state => state.userData.courses.length
}

const mutations = {
    /** Stoping and starting loading */
    startLoading: state => state.isLoading = true,
    stopLoading: state => state.isLoading = false,
    setSignedIn: state => state.isSignedIn = localStorage.isSignedIn = true,
    setUserData: (state, data) => state.userData = data,
    setuToken: (state, token) => localStorage.uToken = token,
    /** Showing and hiding signupModal */
    showSignup: state => state.signupModal = true,
    hideSignup: state => { state.signupModal = false, sessionStorage.removeItem('temp_id') },
    /** Showing and hiding Edit Course Modal */
    showEditCourse : state => state.editCourseModal =true,
    hideEditCourse : state => state.editCourseModal = false ,
    setViewType: (state, type) => { state.viewType = localStorage.viewType = type },
    onClickSFormExpand: (state) => { state.sfExpanded === 'Expand' ? state.sfExpanded = 'Collapse' : state.sfExpanded = 'Expand' },

    onCreateProfile: state => { if (!state.isSignedIn) { router.push('/') } },

    onSignedIn: (state, data) => {
        /** setting isSigned in true */
        state.isSignedIn = localStorage.isSignedIn = true;
        /** saving signed Id as cached */
        localStorage.cached_id = data.id;
        /** Saving user Datas */
        state.userData = data;
        sessionStorage.userData = JSON.stringify(data);
        /** pushing the router to profile */
        router.push('/me');
    },

    onChangeSwitch: (state, data) => {
        let isChecked = data.$event.target.checked;
        switch (data.name) {
            case 'sidebar':
                isChecked ? state.settingBools.sidebar = state.isSidebarCollapsed = true :
                    state.settingBools.sidebar = state.isSidebarCollapsed = false
                break;
            case "theme":
                isChecked ? state.settingBools.theme = true : state.settingBools.theme = false

                break;
            default:
                break;
        }
        ex.updateLocalSettingBools(state.settingBools)
    },

    onChangeAccent: (state, accent) => {
        let doc = document.getElementById('app');
        state.accents.forEach(acnt=>{if(doc.classList.contains(acnt)){doc.classList.remove(acnt)}})
        doc.classList.add(accent);
    },

    onQuickSignedin: (state, data) => {
        state.userData = data; sessionStorage.userData = JSON.stringify(data); router.push('/me')
    },

    onClickLogout: state => {

        state.isSignedIn = false;
        state.userData = {}

        sessionStorage.clear();
        localStorage.removeItem('cached_id');
        localStorage.isSignedIn = false;

        router.push("/");
    },

    onclickSidebarToggler(state) {
        state.isSidebarCollapsed = state.settingBools.sidebar = !state.isSidebarCollapsed;
        localStorage.isSidebarCollapsed = state.isSidebarCollapsed;
        ex.updateLocalSettingBools(state.settingBools);
    },
    updateLocalCourses : ( state , courses ) => {
        state.userData.courses = courses;
        sessionStorage.userData = JSON.stringify( state.userData );
    },
    onCreateApp: state => {

        /** Fixing theme*/
        localStorage.theme !== undefined ?
            state.theme = localStorage.theme :
            localStorage.theme = state.theme = 'dark';
        /** Fixing Sidebar Collapsed or not */
        localStorage.isSidebarCollapsed !== undefined ?
            localStorage.isSidebarCollapsed === 'true' ?
                state.isSidebarCollapsed = true :
                state.isSidebarCollapsed = false :
            localStorage.isSidebarCollapsed = false;
        /** Fixing isSigned in */
        localStorage.isSignedIn !== undefined ?
            localStorage.isSignedIn === 'true' ?
                state.isSignedIn = true :
                state.isSignedIn = false :
            state.isSignedIn = localStorage.isSignedIn = false;
        /** Fixing view type of routine */
        localStorage.viewType !== undefined ?
            state.viewType = localStorage.viewType :
            localStorage.viewType = state.viewType = 'table';
        /** Fixing Local Setting booleans */
        localStorage.settingBools !== undefined ?
            state.settingBools = JSON.parse(localStorage.settingBools) :
            ex.updateLocalSettingBools(state.settingBools)
    }
}

const actions = {
    async onCreateApp({ commit, dispatch }) {

        /** Fixing Usage Tokon */
        if (localStorage.uToken !== undefined )
            state.uToken = localStorage.uToken
        else {
            let uToken = uuidv4().toUpperCase();
            localStorage.uToken = state.uToken = uToken;
            dispatch('saveNewVisitor');
        }

        await commit('onCreateApp');
        commit('routineOnCreateApp');


        /** Fixing userDatas */
        if (localStorage.isSignedIn === 'true' && localStorage.cached_id) {
            if (sessionStorage.userData) {
                commit('setUserData', JSON.parse(sessionStorage.userData));
                if (ex.diffInSec(new Date(sessionStorage.lastVisited)) > 60) {
                    sessionStorage.lastVisited = new Date();
                    dispatch('updateLastVisitedByUserId');
                }
            } else {
                dispatch('quickSignin')
            }
        }

        if (sessionStorage.lastVisited === undefined) {
            sessionStorage.lastVisited = new Date();
            dispatch('updateLastVisitedByToken');
        } else if (ex.diffInSec(new Date(sessionStorage.lastVisited)) > 60) {
            sessionStorage.lastVisited = new Date();
            dispatch('updateLastVisitedByToken');
        }

        state.isLoading = false;
    }
}

const ex = {
    getFormattedCourses( courses ){
         return courses.map(course =>{return{code:course.split('(')[0],section:course.split('(')[1].split(')')[0]}})
    },
    updateLocalSettingBools(data) {
        localStorage.settingBools = JSON.stringify(data)
    },
    getLocalStorage() {
        return localStorage
    },
    diffInSec(date) {
        return Math.round((new Date().getTime() - date.getTime()) / (1000))
    },
    toFormData(obj) {
        var form_data = new FormData();
        for (var key in obj) {
            form_data.append(key, obj[key]);
        }
        return form_data;
    }
}

export default {
    state, getters, mutations, actions
}