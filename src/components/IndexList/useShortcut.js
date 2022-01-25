import { computed, ref } from 'vue'
export default function (props, groupRef) {
    const scrollRef = ref(null)
    const shortcutList = computed(() => {
        return props.data.map((currentValue) => {
            return currentValue.title
        })

    })
    const touch = {}
    function onShortcutTouchStart(e) {
        touch.y1 = e.touches[0].pageY
        const anchorIndex = parseInt(e.target.dataset.index)
        touch.anchorIndex = anchorIndex
        scroll(anchorIndex)
    }
    function onShortcutTouchMove(e){
        touch.y2 = e.touches[0].pageY
        const delta = (touch.y2 - touch.y1)/18 | 0
        const anchorIndex = delta+touch.anchorIndex
        scroll(anchorIndex)
    }
    function scroll(index){
        if(isNaN(index)){
            return
        }
        index =Math.max(0,Math.min(shortcutList.value.length-1,index)) 
        const targetEl = groupRef.value.children[index]
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetEl, 0)
    }
    return {
        shortcutList,
        scrollRef,
        onShortcutTouchStart,
        onShortcutTouchMove
    }
}