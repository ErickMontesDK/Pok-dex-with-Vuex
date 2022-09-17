<template>
  <div class="hello">
    <button @click="getInfo">sss</button>
    {{sprites}}
    {{types}}
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      sprites:{
        default:null,
        female:null,
        shiny:null,
      },
      types:null
    }  
  },
  computed:{
    async getInfo(){
      this.$store.dispatch('fetchUrl',"https://pokeapi.co/api/v2/pokemon/gengar");

      this.sprites.default=await this.$store.state.pokemonBasicInfo.sprites.front_default;
      this.sprites.female=await this.$store.state.pokemonBasicInfo.sprites.female;
      this.sprites.shiny=await this.$store.state.pokemonBasicInfo.sprites.front_shiny;

      const typesCollect=[];
      await this.$store.state.pokemonBasicInfo.types.forEach((type)=>{typesCollect.push(type.type.name)});

      this.types=await typesCollect;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
