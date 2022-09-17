<template>
  <div class="full container-fluid">
    <banner/>
    <div class="main container-fluid">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <router-view/>
    </div>
    
    <footers/>
  </div>
</template>

<script>
import banner from "./components/banner.vue";
import footers from "./components/footer.vue";

export default{
  components: {
    banner,footers
  }
}

</script>

<style>
.full{
  position:absolute;
  background-color: #42b983;
  min-height: 100%;
  min-width: 100%;
  padding: 0px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main{
  position:relative;
  background-color: aqua ;
  
}
.banner{
  /* position:absolute;
  top:0px; */
}
.footer{
  /* position:absolute;
  bottom:0px; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
router-view{
}


</style>
