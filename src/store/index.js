import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemonBasicInfo:{},
    pokemonSpecies:{},
    pokemonEvolutions:{},
    pokemonRegion:"",
  },
  getters: {
    basicInfo(state){
      return state.pokemonBasicInfo;
    },
    speciesInfo(state){
      return state.pokemonSpecies;
    },
    regionInfo(state){
      return state.pokemonRegion;
    },
    entryEsp(state){
      const lengthSpecies=Object.keys(state.pokemonSpecies).length;
      if (lengthSpecies==0){
        return 'Pókemon no encontrado'

      }else{
        const entryList=state.pokemonSpecies.flavor_text_entries;
        const entrysInEsp=entryList.filter((entry) => entry.language.name=="es");
        
        return entrysInEsp[0].flavor_text;
      }
    },
    nicknameEsp(state){
      const lengthSpecies=Object.keys(state.pokemonSpecies).length;
      if (lengthSpecies==0){
        return 'Pókemon no encontrado'
      }else{
        const nickList=state.pokemonSpecies.genera;
        const nickInEsp=nickList.filter((entry) => entry.language.name=="es");
        
        return nickInEsp[0].genus;
      }
    },
    evolutionChain(state){
      const Evolutions=[];

      const sendEvolutions=function(route){
        if(route.length !=0){
          const Variations=route.map((variation)=>variation.species.name);
          console.log(Variations);
          Evolutions.push(Variations);
          sendEvolutions(route[0].evolves_to);
        }
      };

      const lengthSpecies=Object.keys(state.pokemonEvolutions).length;
      if (lengthSpecies==0){
        return []
      }else{
        const evolInfo=state.pokemonEvolutions.chain;
        Evolutions.push([evolInfo.species.name]);
        
        sendEvolutions(evolInfo.evolves_to);
      }
      return Evolutions;
    },
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
    },
    async region(state,data){
      state.pokemonRegion=await data;
    }
  },
  actions: {
    fetchUrl({commit,state},url) {
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
        return fetch(state.pokemonSpecies.generation.url);

      }).then((response)=>{
        return response.json();

      }).then((regionInfo)=>{
        commit('region',regionInfo.main_region.name);

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
