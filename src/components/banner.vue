<template>
    <div class="container-fluid banner">
        Pokedex by Myself
    </div>
</template>

<script>
    export default {
        name:"banner"
    }
</script>

<style scoped>

.banner{
    background-color:var(--color-red) ;
    height: 100px;

    margin:0px;
    padding:0px;

    position:relative;
    display:flex;
    justify-content: center;
    align-items: center;

    color:var(--color-yellow);
    font-size:1.5rem;
    font-weight: bold;

}
</style>