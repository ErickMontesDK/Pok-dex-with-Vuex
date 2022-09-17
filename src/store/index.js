import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemonBasicInfo:{}
  },
  getters: {
  },
  mutations: {
    async info(state,data){
      const info=await data;
      state.pokemonBasicInfo=info;
    }

  },
  actions: {
    async fetchUrl({commit},url) {
      const response = await fetch(url);
        if (response.status != 200) {
          commit('info',{code:"Error"})
        } else {
          commit('info',response.json());
        }
    }

  },
  modules: {
  }
})
