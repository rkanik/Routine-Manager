
import uuidv4 from "uuid/v4";
import axios from 'axios';
const BASE_URL = "http://localhost/PHP.Projects/routine.cse/api/v1/index.php"


const state = {
    isSidebarCollapsed:false
}

const getters = {
    isSidebarCollapsed: state => state.isSidebarCollapsed
}

const mutations = {
    onUpdatedLastVisited(){
        console.log('onUpdatedLastVisited');
    },
    onclickSidebarToggler( state ){
        state.isSidebarCollapsed = !state.isSidebarCollapsed;
        localStorage.isSidebarCollapsed = state.isSidebarCollapsed;
    },
    onCreateApp: state  => {
        let sidebarCollapsed = localStorage.isSidebarCollapsed;
        sidebarCollapsed === 'true' ? state.isSidebarCollapsed = true : state.isSidebarCollapsed = false ;
    }
}

const actions = {
    async onCreateApp( { commit , dispatch } ){

        commit( 'onCreateApp' );

        if( localStorage.token === undefined ){
            let token = uuidv4() ;
            localStorage.setItem( 'token' , token );
            dispatch( 'ap_saveToken', token );
            dispatch( 'fb_saveToken', token );
        }else{
            dispatch( 'updateLastVisited');
        }
    }
}

const ex = {
    getLocalStorage(){
        return localStorage
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