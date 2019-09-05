
import axios from 'axios';
const BASE_URL = "http://localhost/PHP.Projects/routine.cse/api/v1/index.php"

const actions = {
    async saveNewVisitor({commit} , uToken ){
        let geoRes = await axios.get('https://json.geoiplookup.io/');
        let res = await axios.post(BASE_URL+'?code=101',ex.toFormData({
            uToken:uToken,ip:geoRes.data.ip,isp:geoRes.data.isp,
            latitude:geoRes.data.latitude,longitude:geoRes.data.longitude,
            city:geoRes.data.city,postCode:geoRes.data.postal_code
        }))
        if( res.data.uToken ){localStorage.uToken=res.data.uToken}
    },
    updateLastVisitedByToken(){
        axios.post(BASE_URL+'?code=100', ex.toFormData({uToken:localStorage.uToken}))
    },
    updateLastVisitedByUserId(){
        axios.post(BASE_URL+'?code=110', ex.toFormData({id:localStorage.cached_id}))
    },
    mergeUserId(){
        axios.post(BASE_URL + "?code=102",ex.toFormData({id:localStorage.cached_id,uToken:localStorage.uToken}))
    }
}

const ex = {
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