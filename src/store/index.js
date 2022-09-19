import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemonBasicInfo:{},
    pokemonSpecies:{},
    pokemonEvolutions:{},
    pokemonRegion:"",
    allVariantsEvol:[],
    allVariantsUrl:[],
    status:false,
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
    variants(state){
      return state.allVariantsEvol;
    },
    urlVariants(state){
      return state.allVariantsUrl;
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
      const evolInfo = await data;
      const Evolutions=[];
      const NumberOfSpecies=Object.keys(evolInfo).length;

      state.pokemonEvolutions=evolInfo;

      const sendEvolutions=function(route){
        if(route.length !=0){
          const Variations=route.map((variation)=>variation.species.name);
          Evolutions.push(Variations);
          
          sendEvolutions(route[0].evolves_to);
        }
        
      };
      
      if (NumberOfSpecies==0){
        state.allVariantsEvol=[];
      }else{
        const evolDirection=evolInfo.chain;
        Evolutions.push([evolDirection.species.name]);
        
        sendEvolutions(evolDirection.evolves_to);
      }

      state.allVariantsEvol=Evolutions;
    },
    async region(state,data){
      state.pokemonRegion=await data;
    },
    async urlImg(state,data){
      state.allVariantsUrl=await data;
    },
    status(state,data){
      state.status= data;
    }
    
  },
  actions: {
    fetchUrl({commit,state,dispatch},url) {
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
        return dispatch('SearchImg',state.allVariantsEvol);

      }).then((response)=>{
        return response;

      }).then((urlsObj)=>{
        commit('urlImg', urlsObj.urls);
        commit('status',true);
        
      }).catch((error) => {
        const empty={};
        commit('basicInfo',empty);
        commit('speciesInfo',empty);
        commit('evolutionInfo',empty);
      });
    },
    SearchImg({commit},array){
      const urls=[];

      array.forEach((evolution) =>{
        const evolutions=[];

        evolution.forEach((variant)=>{
          const url=`https://pokeapi.co/api/v2/pokemon/${variant}`

          fetch(url).then((response)=>{
            return response.json();

          }).then((data)=>{
            evolutions.push(data.sprites.front_default);

          }).catch((error)=>{
            evolutions.push("error en imagen");

          })
        })
        urls.push(evolutions);
        
        
      }
      );
      return {urls};
    },

  },
  modules: {
  }
})
