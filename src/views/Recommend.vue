<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend-list">
          <h1 v-show="!loading" class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedAlbum" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Slider from "../components/Base/Slider/Slider.vue";
import Scroll from "../components/Base/Scroll/Scroll.vue";
import { getRecommend } from "../service/recommend";
import { ALBUM_KEY } from "../assets/js/constant";
import storage from "good-storage";
export default {
  components: {
    Slider,
    Scroll,
  },
  data() {
    return {
      sliders: null, //轮播图数据
      albums: null, //热门歌单数据
      loadingText: "正在载入",
      selectedAlbum: null,
    };
  },
  computed: {
    loading() {
      return !this.sliders && !this.albums;
    },
  },
  async created() {
    let result = await getRecommend();
    this.sliders = result.sliders;
    this.albums = result.albums;
  },
  methods: {
    selectItem(album) {
      this.selectedAlbum = album;
      storage.session.set(ALBUM_KEY, album);
      this.$router.push({
        path: `/recommend/${album.id}`,
      });
    },
  },
};
</script>

<style lang="scss">
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>