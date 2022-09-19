<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div class="hello">
    <input v-model="pokemon" type="text" placeholder="Nombre o número de pókemon">
    <button @click="getInfo">sss</button>
  </div>
  <span>Pokemon name: {{$store.getters.basicInfo.name}}</span><br>
  <span>Number: {{$store.getters.basicInfo.id}}</span><br>
  <span>Types:
    <li v-for="typeOf in $store.getters.basicInfo.types">
      {{typeOf.type.name}}
    </li>
  </span>
  <span>Height: {{$store.getters.basicInfo.height/10}} m</span><br>
  <span>Weight: {{$store.getters.basicInfo.weight/10}} kg</span><br>
  <span>
    stats:
    <li v-for="stat in $store.getters.basicInfo.stats">
    {{stat.stat.name}}--> {{stat.base_stat}}
    </li>
  </span>
  <span v-if="$store.getters.speciesInfo.habitat">Habitat: {{$store.getters.speciesInfo.habitat.name}} </span><br>
  <span>Variaciones: 
    <li v-for="variation in $store.getters.speciesInfo.varieties">
      {{variation.pokemon.name}}-->{{variation.pokemon.url}}
    </li>  

  </span><br>
  <span>Entry: {{$store.getters.entryEsp}} </span><br>
  <span>Nickname: {{$store.getters.nicknameEsp}} </span><br>
  <span>Regíon: {{$store.getters.regionInfo}} </span><br>
  <li v-for="evol in $store.getters.variants">
      <span v-for="variant in evol"><span>{{variant}}</span><br></span>
  </li> 
  <li v-for="evol in $store.state.allVariantsUrl">
      <span v-for="variant in evol"><span>{{variant}} </span><br></span>
  </li> 
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
      pokemon:"charmander",
      infos:{},
    }  
  },
  methods:{
    getInfo(){
      let urlPokemon=`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`;
      this.$store.dispatch('fetchUrl',urlPokemon);
    },
    
  },
  computed:{
     
  }
}
</script>

<style scoped>
.home{
  height: 100%;
}
</style>
