import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '../../service/song'
import Lyric from 'lyric-parser'

export default function ({ songReady,
    currentTime }) {
    const currentLyric = ref(null)
    const currentLineNum = ref(0)
    const lyricScrollRef = ref(null)
    const lyricListRef = ref(null)
    const playingLyric = ref('')
    const pureMusicLyric = ref('')

    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong)

    watch(currentSong, async (newSong) => {
        if (!newSong.url || !newSong.id) return
        stopLyric()
        currentLyric.value = null
        currentLineNum.value = 0
        pureMusicLyric.value=""
        playingLyric.value = ""

        let lyric = await getLyric(newSong)
        store.commit('addSongLyric', {
            lyric,
            song: newSong
        })

        currentLyric.value = new Lyric(lyric, handler)
        const hasLyric = currentLyric.value.lines.length
        if(hasLyric){
            if (songReady.value) {
                playLyric()
            }
        }else{
            playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
             
        }
        

    })
    function playLyric() {
        const currentLyricVal = currentLyric.value
        if (currentLyricVal) {
            currentLyricVal.seek(currentTime.value * 1000)
        }

    }
    function stopLyric() {
        const currentLyricVal = currentLyric.value
        if (currentLyricVal) {
            currentLyricVal.stop()
        }

    }
    function handler({ lineNum, txt }) {
        currentLineNum.value = lineNum
        playingLyric.value = txt
        const scrollComp = lyricScrollRef.value
        const listEl = lyricListRef.value

        if (!listEl) {
            return
        }
        if (lineNum > 5) {
            const lineEl = listEl.children[lineNum - 5]
            scrollComp.scroll.scrollToElement(lineEl, 1000)
        } else {
            scrollComp.scroll.scrollTo(0, 0, 1000)
        }
    }

    return {
        currentLyric,
        currentLineNum,
        playLyric,
        stopLyric,
        lyricScrollRef,
        lyricListRef,
        pureMusicLyric,
        playingLyric
    }
}