
import db from "../../firebase/firebaseInit";

const actions = {
    async firebaseSignupUser({commit,dispatch},signupData){
        signupData.createdAt = new Date();
        await db.collection('users').doc().set(signupData);
        localStorage.cached_id = signupData.id;
        await dispatch('quickSignin');
        commit('setSignedIn');
        commit('hideSignup');
    },
    async signinUser( { commit , dispatch } , id ){
        commit('startLoading');
        let res = await db.collection('users').where('id' , '==' , id ).get() ;
        if( !res.empty ){
            let data = ex.basicUserData(res.docs[0].data());
            commit('initUserRoutine',data);
            await commit('onSignedIn',data);
            commit('stopLoading');dispatch('updateLastVisitedByUserId');
        }else{
            sessionStorage.temp_id = id;
            commit('showSignup');commit('stopLoading');
        }
    },
    async quickSignin( { commit , dispatch }){
        commit('startLoading');
            let res = await db.collection('users').where('id','==',localStorage.cached_id).get() ;
            let data = ex.basicUserData(res.docs[0].data());
            commit('initUserRoutine',data);
            commit( 'onQuickSignedin' , data );
            dispatch( 'updateLastVisitedByUserId');
        commit( 'stopLoading' );
    }
}

const ex = {
    basicUserData(data){
        return {id:data.id,name:data.name,email:data.email,
            level:data.level,term:data.term,section:data.section,
            codes:data.codes,uToken:data.uToken,
        }
    }
}

export default {
    actions
}