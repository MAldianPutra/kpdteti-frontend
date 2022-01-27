import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* eslint-disable no-extra-boolean-cast */
    user: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user"))
        : null,
  },
  getters: {
    /* eslint-disable no-extra-boolean-cast */
    isLoggedIn: ({ user }) => !!user && !!user.token,
    isLoggedInAsAdmin: ({ user }) => !!user && !!user.token && user.isAdmin
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload
    },
    DELETE_USER: (state) => {
      state.user = null
    }
  },
  actions: {
    async login({ commit }, payload) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
            "http://localhost:8081/kpdteti/api/auth/login",
            { ...payload },
            config
        );
        const user = response.data;
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(user));
        commit("SET_USER", user);

        router.push("/");
        // dispatch('addNotification');
      } catch (error) {
        console.log("[ Login ]", error);
      }
    },
    logout({commit}) {
      localStorage.removeItem('user')
      commit('DELETE_USER')
    }
  },
  modules: {
  },
});
