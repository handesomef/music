<template>
  <Header />
  <Tab />
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <router-view :style="viewStyle" name="user" v-slot="{ Component }">
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <Player />
</template>

<script>
import Header from "@/components/Header/Header";
import Tab from "@/components/Tab/Tab";
import Player from "@/components/Player/Player";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    Tab,
    Player,
  },
  computed: {
    ...mapState(["playList"]),
    viewStyle() {
      const bottom = this.playList.length ? "60px" : "0";
      return {
        bottom,
      };
    },
  },
};
</script>
