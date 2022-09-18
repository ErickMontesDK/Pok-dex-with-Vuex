<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div class="hello">
    <input v-model="pokemon" type="text" placeholder="Nombre o número de pókemon">
    <button @click="getInfo">sss</button>
  </div>
  <span>Pokemon name: {{info.name}}</span><br>
  <span>Number: {{info.id}}</span><br>
  <span>Types:
    <li v-for="typeOf in info.types">
      {{typeOf}}
    </li>
  </span>
  <span>Height: {{info.height}} m</span><br>
  <span>Weight: {{info.weight}} kg</span><br>
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
      info:{},
    }  
  },
  methods:{
    
  },
  computed:{
    async getInfo(){
      let urlPokemon=`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`;
      this.$store.dispatch('fetchUrl',urlPokemon);

      const info=await this.$store.getters.basicInfo
      console.log(info);
      this.info=await info;
    },
  }
}
</script>

<style scoped>
.home{
  height: 100%;
}
</style>
