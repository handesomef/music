import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default function (wrapperRef, options, emit) {
    const scroll = ref(null);
    onMounted(() => {
        const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
            observeDOM: true,
            ...options
        })
        if (options.probeType == 3) {
            scrollVal.on('scroll', (pos) => {
                emit('scroll', pos)
            })
        }
    })
    onUnmounted(() => {
        scroll.value.destroy()
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
    return scroll
}