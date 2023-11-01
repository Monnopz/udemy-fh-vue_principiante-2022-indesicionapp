<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- con v-bind se manda una expresion de js y se puede reducir a solo : -->
  <!-- <Counter v-bind:start="15"/> -->
  <!-- <Counter :start="105"/> -->
  <Indecision />
</template>

<script>
// en un import, la arroba (@) indica la carpeta src
// import Counter from '@/components/Counter.vue';
import Indecision from '@/components/Indecision.vue'

export default {
  name: 'App',
  components: {
    // Counter,
    Indecision
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
