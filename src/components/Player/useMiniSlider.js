import { ref, computed, watch, nextTick, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'


BScroll.use(Slide)

export default function () {
    const sliderWrapperRef = ref(null)
    const slide = ref(null)

    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const playList = computed(() => store.state.playList)
    const currentIndex = computed(() => store.state.currentIndex)
    const currentSong = computed(() => store.getters.currentSong)

    const sliderShow = computed(() => {
        return !fullScreen.value && !!playList.value
    })

    onMounted(() => {
        let slideVal
        watch(sliderShow, async (newSliderShow) => {
            if (newSliderShow) {
                await nextTick()
                if (!slideVal) {
                    slideVal = slide.value = new BScroll(sliderWrapperRef.value, {
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        momentum: false,
                        bounce: false,
                        probeType: 2,
                        slide: {
                            autoplay: false,
                            loop: true
                        }
                    })
                    slideVal.on('slidePageChanged', (page) => {
                        store.commit('setCurrentIndex', page.pageX)
                    })
                } else {
                    slideVal.refresh()
                }

                slideVal.goToPage(currentIndex.value, 0, 0)
            }

        })

        watch(currentIndex, (newCurrentIndex) => {
            if (slideVal && sliderShow.value) {
                slideVal.goToPage(newCurrentIndex, 0, 0)
            }

        })

        watch(playList, async (newList) => {

            if (slideVal && sliderShow.value && newList.length) {
                await nextTick()
                slideVal.refresh()
            }
        })

    })
    onUnmounted(() => {
        if (slide.value) {
            slide.value.destroy()
        }
    })
    onActivated(() => {
        slide.value.enable()
        slide.value.refresh()
    })

    onDeactivated(() => {
        slide.value.disable()
    })

    return {
        sliderWrapperRef,
        slide
    }
}