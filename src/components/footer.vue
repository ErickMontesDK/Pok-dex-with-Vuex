<template>
    <div class="container-fluid footer">
        <div class="text">
            <p>Pokedex realizada para mi</p>
            <p>Hecho por Erick Montes Bedolla</p>
        </div>
        <img src="./../assets/murcielago.png">
    </div>
</template>

<script>
    export default {
        name:"footer"
    }
</script>

<style scoped>

.footer{
    background-color:var(--color-black); ;
    height: 170px;

    margin:0px;
    padding:2em 3em 2em 3em;

    position:absolute;
    bottom: 0px;
    display:flex;
    justify-content:space-between;
    align-items:flex-start;

    color:var(--color-white); 
}
.text{
    height: 55%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
p{
    font-family: var(--font-secundary) !important;
}
p:first-child{
    font-size: 1.5rem;
}
img{
    width:100px;
}
</style>