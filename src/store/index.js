import  { createStore } from "vuex";
import http from "../services/http";

export default createStore({
    state: {
        user: {
            email: "",
            username: "",
            password: ""
        },
        isAuth: false,
        loadingUser: true
    },
    mutations: {
        CHANGE_USER(state, payload){
            state.user = payload;
        },
        CHANGE_AUTH(state, payload){
            state.isAuth = payload;
        },
        CHANGE_LOADING_USER(state, payload){
            state.loadingUser = payload;
        },
    },
    actions: {
        authenticate({ commit }, payload){
            commit("CHANGE_USER", payload);
            commit("CHANGE_AUTH", true);
            window.localStorage.setItem('_auth', payload.id);
        },
        signOut({commit}){
            commit("CHANGE_USER", {});
            commit("CHANGE_AUTH", false);
            window.localStorage.removeItem('_auth');
        },
        async getUserById({ commit }){
            commit('CHANGE_LOADING_USER', true);
            const id = window.localStorage.getItem('_auth');
            const res = await http.find(id);
            
            if(res){
                commit("CHANGE_USER", res);
                commit("CHANGE_AUTH", true);
                commit('CHANGE_LOADING_USER', false);
                window.localStorage.setItem('_auth', res.id);
            }
        }
    }
})