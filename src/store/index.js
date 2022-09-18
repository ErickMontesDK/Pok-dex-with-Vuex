import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemonBasicInfo:{},
    pokemonSpecies:{},
    pokemonEvolutions:{}
  },
  getters: {
    async basicInfo(state){
      const info= await state.pokemonBasicInfo;
      const basic={
        name: info.name,
        id: info.id,
        height: info.height/10,
        weight: info.weight/10,
        types:[],
        stats: info.stats,
      }
      const types=await state.pokemonBasicInfo.types
      types.forEach((type)=>{basic.types.push(type.type.name)})
      
      return basic; 
    }
  },
  mutations: {
    async basicInfo(state,data){
      state.pokemonBasicInfo=await data;
    },
    async speciesInfo(state,data){
      state.pokemonSpecies=await data;
    },
    async evolutionInfo(state,data){
      state.pokemonEvolutions=await data;
    }

  },
  actions: {
    fetchUrl({commit},url) {
      fetch(url).then((response) => {
        return response.json();

      }).then((data) => {
        commit('basicInfo',data);
        return fetch(data.species.url);

      }).then((response)=>{
        return response.json();

      }).then((speciesInfo)=>{
        commit('speciesInfo',speciesInfo);
        return fetch(speciesInfo.evolution_chain.url);

      }).then((response)=>{
        return response.json();

      }).then((evolutionChain)=>{
        commit('evolutionInfo',evolutionChain);

      }).catch((error) => {
        console.log(error);
        const empty={};
        commit('basicInfo',empty);
        commit('speciesInfo',empty);
        commit('evolutionInfo',empty);
      });
    }

  },
  modules: {
  }
})
