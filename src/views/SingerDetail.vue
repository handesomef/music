<template>
  <div class="singer-detail">
    <MusicList
      :songs="songs"
      :loading="loading"
      :title="title"
      :pic="pic"
    />
  </div>
</template>

<script>
import { getSingerDetail } from "../service/singer";
import { SINGER_KEY } from "../assets/js/constant";
import createDetailComponent from '../assets/js/create-detail-component'
export default createDetailComponent(SINGER_KEY,getSingerDetail)
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>