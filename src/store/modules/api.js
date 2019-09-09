
import uuidv4 from "uuid/v4";
import axios from 'axios';
const BASE_URL = "http://localhost/PHP.Projects/routine.cse/api/v1/index.php"

const actions = {
    async apiSignupUser({commit},id){
        let geoRes = await axios.get('https://json.geoiplookup.io/');
        let data = ex.formattedUserData(geoRes);
        console.log(localStorage.uToken);
        data.id = id;data.uToken = localStorage.uToken;
        console.log(data);
        let res = await axios.post(BASE_URL+"?code=120",ex.toFormData(data))
        console.log(res.data);
        if( res.data ){if( res.data.message === 'TOKEN_EXIST'){
            data.uToken = uuidv4();axios.post(BASE_URL+"?code=120",ex.toFormData(data))
            localStorage.uToken = data.uToken;
        }}
    },
    async saveNewVisitor(){
        let geoRes = await axios.get('https://json.geoiplookup.io/');
        let res = await axios.post(BASE_URL+'?code=101',ex.toFormData(ex.formattedUserData(geoRes)))
        if(res.data){if(res.data.uToken){
            localStorage.uToken=res.data.uToken}
        }
    },
    updateLastVisitedByToken(){
        axios.post(BASE_URL+'?code=100', ex.toFormData({uToken:localStorage.uToken}))
    },
    async updateLastVisitedByUserId({commit}){
        let res = await axios.post(BASE_URL+'?code=110', ex.toFormData({id:localStorage.cached_id}))
        commit('setuToken',res.data.uToken);
    }
}

const ex = {
    formattedUserData(geoRes){
        return {ip:geoRes.data.ip,isp:geoRes.data.isp,
            latitude:geoRes.data.latitude,longitude:geoRes.data.longitude,
            city:geoRes.data.city,postCode:geoRes.data.postal_code}
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
    actions 
}