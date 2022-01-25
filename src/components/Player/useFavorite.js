import { computed } from 'vue'
import { useStore } from 'vuex'
import { save, remove } from '../../assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'
export default function () {
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)
    const maxLen = 100

    function getFavoriteIcon(song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
      }

    function toggleFavorite(song) {
        let list
        if (isFavorite(song)) {
            list = remove(song, FAVORITE_KEY, compare, maxLen)  
        } else {
            list = save(song, FAVORITE_KEY, compare)
        }
        store.commit('setFavoriteList', list)
        function compare(item) {
            return item.id == song.id
        }
    }

    function isFavorite(song) {
        return favoriteList.value.findIndex((item) => {
            return item.id == song.id
        }) > -1
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}