import Vuex from "vuex"
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: null,
        userID: null,
        userEmail: null,
        teamName: "Select a team"
    },
    mutations: {
        registerUser(state, user){
            state.username = user.data.username;
            state.userEmail = user.data.email;
            state.userID = user.data._id
        },
        signout(state) {
            state.username = null,
            state.userEmail = null,
            state.userID = null
        },
        updateTeam(state, name) {
         state.teamName = name
        }
    },
    actions: {
        // put asynchronous functions that can call one or more mutation functions
    },
    plugins: [createPersistedState()]
})


