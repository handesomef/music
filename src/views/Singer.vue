<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger" />
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from "../service/singer";
import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";
import IndexList from "../components/IndexList/IndexList.vue";
export default {
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  methods: {
    selectSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
      this.selectedSinger = singer;
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
  },
  components: { IndexList },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
};
</script>

<style lang="scss">
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>