<template>
  <div id="detailSwiper">
    <swiper>
      <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
        <img :src="item" alt="" @load="topImagesLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper"
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    topImagesLoad() {
      this.$emit("topImagesLoad")
    }
  }
}
</script>

<style scoped>
.swiper-item {
  height: 250px;
  overflow: hidden;
}
</style>
