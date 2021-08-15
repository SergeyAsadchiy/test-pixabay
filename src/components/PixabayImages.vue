<template>
  <div class="container">
    <div class="actions">
      <div class="actions__filter">
        <input placeholder="Filter text" @keyup="setFilterText"/>
      </div>
      <div class="actions__sort">
        <button @click="sortByLikes">Sort by likes</button>
        <button @click="sortByComments">Sort by comments</button>
        <!--<button @click="saveImages">Save Images</button>-->
      </div>
    </div>
    <div v-if="images" class="wrap-cards">
      <div class="cards">
        <div v-for="(image, index) in filteredImages" :key="image.id + '_' + index" class="image-card">
          <div class="image-card__image">
            <a :href="image.pageURL" target="_blank">
              <img :src="image.previewURL" alt="image"/>
            </a>
          </div>
          <div class="image-card__tags">
            <div v-for="(tag, tagIndex) in getImageTags(image.tags)" :key="image.id + '_' + tag + '_' + tagIndex" class="tag" @click="changeTag(tag)">
              {{tag}}
            </div>
          </div>
          <div class="image-card__options">
            <div>Likes: {{image.likes}}</div>
            <div>Comments: {{image.comments}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import debounce from 'debounce'

export default {
  name: 'PixabayImages',
  props: {},
  data () {
    return {
      images: {},
      filterText: '',
      sortedByLikesDirect: '',
      sortedByCommentsDirect: ''
    }
  },

  mounted(){
    this.getImages()
  },

  methods: {
    ...mapActions(['getImagesFromPixabay', 'setImagesObject']),

    async getImages(){
      const params = {
        q: 'cats',
        imageType: 'all',
        perPage: 100
      }
      this.images = await this.getImagesFromPixabay(params)
    },
    getImageTags(tagsString = ''){
      return tagsString.split(',')
    },
    sortByLikes(){
      if (this.sortedByLikesDirect === 'up') {
        this.images.hits.sort(((a, b) => { return a.likes - b.likes }));
        this.sortedByLikesDirect = 'down'
      } else {
        this.images.hits.sort(((a, b) => { return b.likes - a.likes }));
        this.sortedByLikesDirect = 'up'
      }
    },
    sortByComments(){
      if (this.sortedByCommentsDirect === 'up') {
        this.images.hits.sort(((a, b) => { return a.comments - b.comments }));
        this.sortedByCommentsDirect = 'down'
      } else {
        this.images.hits.sort(((a, b) => { return b.comments - a.comments }));
        this.sortedByCommentsDirect = 'up'
      }
    },
    setFilterText: debounce(function(e){
      this.filterText = e.target.value
    }, 300),
    changeTag(tag){
      console.log(tag)

      // todo:: task #12
      // this.saveImages()
    }

    /*
    saveImages(){
      // this.images.hits = this.filteredImages
      this.setImagesObject({ data: this.images} )
    },*/
  },
  computed: {
    filteredImages() {
      if (!this.filterText) {
        return this.images.hits
      }
      return this.images.hits.filter(e => {
        return e.tags.includes(this.filterText)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .container {
    max-width: 1200px;
    margin: 20px auto 0;

    .actions {
      display: flex;
      justify-content: space-between;
      padding: 10px ;
      margin: 0 0 10px 1%;
      border-radius: 3px;
      background-color: #bfbfbf;

      &__filter input {
        padding: 0 5px;
        border-radius: 5px;
        height: 25px;
      }

      &__sort button {
        margin-left: 10px;
        padding: 0 10px;
        height: 25px;
      }
    }

    .wrap-cards {
      height: calc(100vh - 100px);
      overflow-y: auto;

      .cards {
        display: flex;
        flex-wrap: wrap;

        .image-card {
          display: flex;
          flex-direction: column;
          flex: 0 0 23%;
          min-width: 250px;
          margin: 1%;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;

          &__image {
            max-width: 100%;
            margin-bottom: 20px;
            height: 250px;
            overflow: hidden;
            border-radius: 5px 5px 0 0;

            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }

          &__tags {
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            flex: 1 1 auto;
            padding: 0 10px;
            max-width: 100%;

            .tag {
              background-color: #03BBD8;
              border-radius: 10px;
              color: white;
              padding: 2px 8px;
              margin-right: 5px;
              margin-bottom: 5px;
              height: 22px;
            }
          }

          &__options {
            display: flex;
            margin-bottom: 20px;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 15px;
          }
        }
      }
    }
  }
</style>
