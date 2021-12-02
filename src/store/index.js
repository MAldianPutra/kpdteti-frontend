import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* eslint-disable no-extra-boolean-cast */
    token: !!localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
        : null,
    user: null
  },
  getters: {
    /* eslint-disable no-extra-boolean-cast */
    isLoggedIn: ({token}) => !!token
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    DELETE_TOKEN: (state) => {
      state.token = null
    },
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
        const { token, ...user } = response.data;
        console.log(response.data)
        localStorage.setItem("token", JSON.stringify(token));
        commit("SET_TOKEN", token);
        commit("SET_USER", user);

        router.push("/");
      } catch (error) {
        console.log("[ Login ]", error);
      }
    },
    logout({commit}) {
      localStorage.removeItem('token')
      commit('DELETE_TOKEN')
      commit('DELETE_USER')
    }
  },
  modules: {
  },
});
