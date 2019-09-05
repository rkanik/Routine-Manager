
import db from "../../firebase/firebaseInit";

const actions = {
    async signinUser( { commit , dispatch } , id ){
        commit('startLoading');
        let res = await db.collection('users').where('id' , '==' , id ).get() ;
        if( !res.empty ){
            let data = ex.basicUserData(res.docs[0].data());
            await commit('onSignedIn',data);
            commit( 'stopLoading' )
            /** Merging Userid with uToken */
            dispatch('mergeUserId');

        }else{commit('showSignup');commit('stopLoading')}
    },
    async quickSignin( { commit , dispatch }){
        commit('startLoading');
            let res = await db.collection('users').where('id','==',localStorage.cached_id).get() ;
            dispatch( 'updateLastVisitedByUserId');
            commit( 'onQuickSignedin' , ex.basicUserData(res.docs[0].data()) );
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