import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemonBasicInfo:{}
  },
  getters: {
  },
  mutations: {
    async basicInfo(state,data){
      state.pokemonBasicInfo=await data;
    }

  },
  actions: {
    async fetchUrl(webos,url) {
      const response = await fetch(url);
      console.log(response.status);
        if (response.status != 200) {
          return({code:"Error"})
        } else {
          return(response.json());
        }
    }

  },
  modules: {
  }
})
