export const state = () => ({
    authenticated: false
})

export const actions = {
    login ({ commit }, payload) {
        if (payload.name && payload.password) {
            commit('login', true)
            return true
        }
    },
    logout ({ commit }) {     
        console.log('iuashisdhifhsdiu')   
        commit('login', false)
    }
}

export const mutations = {
    login (s, value) {
        s.authenticated = value
    }
}

export const getters = {
    loggedin: (s) => {
        return s.authenticated
    }
}
  