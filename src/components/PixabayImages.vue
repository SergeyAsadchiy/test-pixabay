<template>
  <div class="container">
    <button @click="saveImages">save changes</button>
    <pre>{{images}}</pre>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PixabayImages',
  props: {},
  data () {
    return {
      images: {}
    }
  },
  methods: {
    ...mapActions(['getImagesFromPixabay', 'setImagesObject']),

    saveImages(){
      this.images = {}
      this.setImagesObject({ data: this.images} )
    }
  },
  async mounted(){
    this.images = await this.getImagesFromPixabay()
  }
}
</script>

<style lang="scss" scoped>
  .container{
    max-width: 1200px;
    margin: auto;
  }
</style>
