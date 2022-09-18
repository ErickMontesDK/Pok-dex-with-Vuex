<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div class="hello">
    <input v-model="pokemon" type="text" placeholder="Nombre o número de pókemon">
    <button @click="getInfo">sss</button>
  </div>
  <span>Pokemon name: {{pokemon}}</span><br>
  <span>Number: {{$store.state.pokemonBasicInfo.id}}</span><br>
  <span>Types:
    <li v-for="typePok in $store.state.pokemonBasicInfo.types">
      {{typePok.type.name}}
    </li>
  </span>
  <span>Height: {{$store.state.pokemonBasicInfo.height/10}} m</span><br>
  <span>Weight: {{$store.state.pokemonBasicInfo.weight}} kg</span><br>
  <span>
    stats:
    <li v-for="stat in $store.state.pokemonBasicInfo.stats">
    {{stat.stat.name}}--> {{stat.base_stat}}
    </li>
  </span>
  <span>Habitat: {{$store.state.pokemonSpecies.habitat}} </span><br>
  <span>Variaciones: 
    <li v-for="variation in $store.state.pokemonSpecies.varieties">
      {{variation.pokemon.name}}-->{{variation.pokemon.url}}
    </li>  
  </span><br>
  <!-- <span>Entry: {{$store.state.pokemonSpecies.flavor_text_entries}} </span><br> -->
  <!-- <span>Nickname: {{$store.state.pokemonSpecies.genera[5].genus}} </span><br> -->
  {{entry}}
  
  
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  
  },
  props: {
    msg: String
  },
  data(){
    return {
      pokemon:"jolteon",
      entry:"",
    }  
  },
  methods:{
    
  },
  computed:{
    async getInfo(){
      let urlPokemon=`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`;
      
      console.log(urlPokemon);
      const basicInfoPok= await this.$store.dispatch('fetchUrl',urlPokemon);
      const speciesUrl= basicInfoPok.species.url;

      this.$store.commit('basicInfo',basicInfoPok);
      const speciesInfoPok= await this.$store.dispatch('fetchUrl',speciesUrl);
      this.$store.commit('speciesInfo',speciesInfoPok);

      const entry= await this.$store.getters.valorEnEspañol;
      this.entry=entry;

    },
  }
}
</script>

<style scoped>
.home{
  height: 100%;
}
</style>
