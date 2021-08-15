import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import connect from '../connect.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imagesObject: {}
  },
  mutations: {
    SET_IMAGES (state , payload) {
      state.imagesObject = payload.data
      console.log(' mutation SET_IMAGES:', state.imagesObject)
    },
  },
  actions: {
    async getImagesFromPixabay({dispatch}, params){
      const config = {
        method: 'GET',
        url: 'https://pixabay.com/api/',
        params: {
          "key": connect.pixabayApiKey,
          "q": params.q,
          "image_type": params.imageType,
          "per_page": params.perPage
        }
      }
      try {
        const res = await axios(config);
        const images = res?.data || {};
        dispatch('setImagesObject', { data: images })
        return images || {}
      } catch (e) {
        console.log(e)
        return {}
      }
    },
    setImagesObject({commit}, payload){
      commit('SET_IMAGES', payload)
    }
  },
  modules: {},
});
