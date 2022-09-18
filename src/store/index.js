import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemonBasicInfo:{},
    pokemonSpecies:{},
  },
  getters: {
    valorEnEspañol(state){
      let meh= state.pokemonSpecies;
      console.log(meh)
      // espValues=await state.pokemonSpecies.flavor_text_entries.filter((value)=>value.language.name==="es");
      // console.log(espValues);
      // return espValues;
    }
  },
  mutations: {
    async basicInfo(state,data){
      state.pokemonBasicInfo=await data;
    },
    async speciesInfo(state,data){
      state.pokemonSpecies=await data;
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
