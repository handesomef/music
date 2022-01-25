import { PLAY_MODE } from '@/assets/js/constant'
import { load } from '../assets/js/array-store'
import { FAVORITE_KEY, SEARCH_KEY, PLAY_KEY } from '../assets/js/constant'
export default {
    sequenceList: [], //播放列表
    playList: [],    //真实播放列表
    playing: false,  //播放状态
    playMode: PLAY_MODE.sequence, //播放模式
    currentIndex: 0,   //播放歌曲索引
    fullScreen: false,  //是否全屏
    favoriteList: [], //收藏歌曲列表
    searchHistory: load(SEARCH_KEY),
    playHistory: []
}