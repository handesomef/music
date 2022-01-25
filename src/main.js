import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import lazyPlugin from 'vue3-lazy'//图片懒加载
import defaultSrc from './assets/images/default.png' //vue3-lazy引入默认图片
import loadingDirective from './components/Base/Loading/directive.js' //引入自定义指令v-loading
import NoResultDirective from './components/Base/NoResult/directive.js'

import {load,saveAll} from './assets/js/array-store';
import {FAVORITE_KEY,PLAY_KEY} from './assets/js/constant';
import {processSongs} from './service/song';

const favoriteSongs = load(FAVORITE_KEY)
if(favoriteSongs.length){
    processSongs(favoriteSongs).then((songs)=>{
        store.commit('setFavoriteList', songs)
        saveAll(songs, FAVORITE_KEY)
    })
}
const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).directive('loading', loadingDirective).directive('no-result', NoResultDirective).use(lazyPlugin, {
    loading: defaultSrc
}).mount('#app')

