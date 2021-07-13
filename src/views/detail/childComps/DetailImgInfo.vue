<template>
  <div class="img-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">
        {{detailInfo.desc}}
      </div>
      <div class="end"></div>
    </div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="key">
        {{item.key}}
      </div>
      <div class="img-list" v-for="(i,id) in item.list" :key="id">
        <img :src="i" alt="" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImgInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      if(++this.count===this.imgCount){
        this.$emit("imgLoad")
        this.count=0
      }
    }
  },
  data() {
    return {
      count: 0,
      imgCount: 0
    }
  },
  watch: {
    detailInfo() {
      this.imgCount = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.img-info {
  background-color: #fff;
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc{
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}

.key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.img-list img {
  width: 100%;
}

</style>
