
import uuidv4 from "uuid/v4";
import router from '../../routes'

const state = {

    /** Booleans */
    isSidebarCollapsed:false,
    isSignedIn : false ,
    isLoading : true ,
    signupModal : false,

    /** Strings */
    theme : 'dark' , 
    viewType : 'table' ,
    uToken : '',

    /** Objects */
    userData:{},

}

const getters = {

    isSidebarCollapsed: state => state.isSidebarCollapsed,
    isSignedIn : state => state.isSignedIn,
    isLoading : state => state.isLoading,
    signupModal : state => state.signupModal,

    userId : state => state.userData.id,
    userName : state => state.userData.name,
    userEmail : state => state.userData.email,
    userLevel : state => state.userData.level,
    userTerm : state => state.userData.term,
    userSection : state => state.userData.section

}

const mutations = {
    /** Stoping and starting loading */
    startLoading : state => state.isLoading = true,
    stopLoading : state => state.isLoading = false,

    setUserData : ( state , data ) => state.userData = data ,

    /** Showing and hiding signupModal */
    showSignup : state => state.signupModal = true,
    hideSignup : state => state.signupModal = false,

    onSignedIn : ( state , data ) => {
        /** setting isSigned in true */
        state.isSignedIn = localStorage.isSignedIn = true ;
        /** saving signed Id as cached */
        localStorage.cached_id = data.id;
        /** Saving user Datas */
        state.userData = data;
        sessionStorage.userData = JSON.stringify(data);
        /** pushing the router to profile */
        router.push('/me');
    },

    onQuickSignedin: ( state , data ) => {
        state.userData = data;
        sessionStorage.userData = JSON.stringify(data);
        router.push('/me')
    },

    onClickLogout: state => {

        state.isSignedIn = false;
        state.userData = {}

        sessionStorage.clear();
        localStorage.removeItem('cached_id');
        localStorage.isSignedIn = false;

        router.push("/");
    },

    onclickSidebarToggler( state ){
        state.isSidebarCollapsed = !state.isSidebarCollapsed;
        localStorage.isSidebarCollapsed = state.isSidebarCollapsed;
    },
    onCreateApp: state  => {
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
    }
}

const actions = {
    async onCreateApp( { commit , dispatch } ){

        /** Fixing Usage Tokon */
        if( localStorage.uToken !== undefined )
            state.uToken = localStorage.uToken
        else{
            let uToken = uuidv4();
            localStorage.uToken = state.uToken = uToken ;
            dispatch('saveNewVisitor', uToken );
        }

        await commit( 'onCreateApp' );


        /** Fixing userDatas */
        if( localStorage.isSignedIn === 'true' && localStorage.cached_id ){
            if( sessionStorage.userData ){
                commit('setUserData' , JSON.parse(sessionStorage.userData) );
                if( ex.diffInSec(new Date(sessionStorage.lastVisited)) > 60 ){
                    sessionStorage.lastVisited = new Date();
                    dispatch('updateLastVisitedByUserId');
                }
            }else{
                dispatch('quickSignin')
            }
        }else if(sessionStorage.lastVisited === undefined){
            sessionStorage.lastVisited = new Date();
            dispatch('updateLastVisitedByToken');
        }else if( ex.diffInSec(new Date(sessionStorage.lastVisited)) > 60 ){
            sessionStorage.lastVisited = new Date();
            dispatch('updateLastVisitedByToken');
        }

        state.isLoading = false;
    }
}

const ex = {
    getLocalStorage(){
        return localStorage
    },
    diffInSec( date ){
        return Math.round((new Date().getTime()-date.getTime())/(1000))
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
    state , getters , mutations , actions 
}