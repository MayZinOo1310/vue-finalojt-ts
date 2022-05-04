import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id : 1,
    users: [] as any
  },
  mutations: {
    userRegister: (state, user) => {
      state.users.push(user),
      state.id = state.users.length,
      state.id++
    },
  },
  actions: {
    createUser(context, user) {
      context.commit("userRegister", user)
    }
  }
})
