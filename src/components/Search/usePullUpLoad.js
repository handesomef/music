import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/slide'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)

export default function (requestData, preventPullUpLoad) {
    const rootRef = ref(null)
    const scroll = ref(null)
    const isPullUpLoad = ref(false)

    onMounted(() => {
        const scrollVal = scroll.value = new BScroll(rootRef.value, {
            pullUpLoad: true,
            click: true,
            observeDOM: true,
        })

        scrollVal.on('pullingUp', pullingUpHandler)

        async function pullingUpHandler() {
            if (preventPullUpLoad.value) {
                scrollVal.finishPullUp()
                return
            }

            isPullUpLoad.value = true
            await requestData()
            scrollVal.finishPullUp()
            scrollVal.refresh()
            isPullUpLoad.value = false
        }
    })
    onUnmounted(() => {
        scroll.value.destroy()
    })

    onActivated(() => {
        scroll.value.enable()
        scroll.value.refresh()
    })

    onDeactivated(() => {
        scroll.value.disable()
    })

    return {
        rootRef,
        isPullUpLoad,
        scroll
    }
}