import uuidv4 from "uuid/v4";
import router from "../../routes";
import cookies from "../../js/cookies";

const state = {
    sidebar: "expanded",
    theme: "light",
    accent: "teal",

    signedIn: "false",
    user_token:"",

    rootLoader:false,
    errors: []
};

const getters = {
    sidebar: state => state.sidebar,
    theme: state => state.theme,
    modalTheme:state=> state.theme==='dark'?"d-28":'light-grey',
    accent: state => state.accent,
    signedIn: state => (state.signedIn === "true" ? true : false),
    rootLoader: state => state.rootLoader,
    errors: state => state.errors
};
const mutations = {
    setSidebar(state, payload) {
        state.sidebar = localStorage.sidebar = payload;
    },
    syncLocalStorage(state, payload) {
        payload.forEach(key =>
            localStorage[key]
                ? (state[key] = localStorage.getItem(key))
                : localStorage.setItem(key, state[key])
        );
    },
    syncCookies(state, payload) {
        payload.forEach(key => {
            if (cookies.hasCookie(key)) state[key] = cookies.getCookie(key)
        });
    },
    pushError(state, error) {
        state.errors.push(error);
    },
    async deleteError(state, b) { },
    async deleteErrors(state) {
        const sleep = () => {
            return new Promise((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        };
        await sleep();
        state.errors.shift();
    },
    setGlobalState: (state, payload) => {
        state[payload.state] = payload.data;
    }
};

const actions = {
    onCreateApp({ commit }) {
        commit("syncLocalStorage", ["sidebar", "theme", "accent"]);
        commit("syncCookies", ["signedIn", "user_token"]);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
