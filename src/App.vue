<template>
  <div id="app">
    <PixabayImages />
  </div>
</template>

<script>
import PixabayImages from './components/PixabayImages.vue'

export default {
  name: 'App',
  components: {
    PixabayImages
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
