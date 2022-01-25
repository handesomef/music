<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import userScroll from './userScroll'
export default {
    props:{
        click:{
            type:Boolean,
            default:true
        },
        probeType:{
          type:Number,
          default:0
        }
    },
  emits: ['scroll'],
  setup(props,{emit}) {
    const rootRef = ref(null);
    const scroll = userScroll(rootRef,props,emit);
    return{
        rootRef,
        scroll
    }
  },
};
</script>

<style>
</style>