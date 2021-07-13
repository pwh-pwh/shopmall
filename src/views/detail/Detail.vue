<template>
  <div id="detail">
    <detail-nav-bar class="bar" @itemClick="itemClick" ref="bar"/>
    <scroll class="scroll-height" ref="scroll"
    @scroll="contentScroll"
    :probe-type="3">
      <detail-swiper :top-images="topImages" @topImagesLoad="topImagesLoad"/>
      <detail-base-info :goods="goods" ref="good"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-img-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramsInfo" @ParamimgLoad="ParamimgLoad" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="toTop" v-show="isShow"/>
    <detail-bottom @toCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail,GoodsInfo,Shop,GoodsParams,getRecommend} from "@/network/detail";

import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import GoodsList from "@/components/content/goods/GoodsList";

import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailImgInfo from "@/views/detail/childComps/DetailImgInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottom from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import {itemListenerMixin,backTopMixin} from "@/common/mixin"
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getTopY: null,
      currentIndex: 0
    }
  },
  created() {
    this.iid = this.$route.params.id
    getDetail(this.iid).then(res => {
      // console.log(res.data.result);
      this.topImages = res.data.result.itemInfo.topImages
      this.goods = new GoodsInfo(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo.services)
      this.shopInfo = new Shop(res.data.result.shopInfo)
      this.detailInfo=res.data.result.detailInfo
      const data = res.data.result
      this.paramsInfo=new GoodsParams(data.itemParams.info, data.itemParams.rule || {})
      // console.log(this.paramsInfo);
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }

    })
    getRecommend().then(res => {
      // console.log(res.data.data)
      this.recommends=res.data.data.list
      this.recommends.forEach(e => {
        // console.log(e)
      })

    })
    this.getTopY = debounce(() => {
      this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      })
    },300)
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImgInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottom
  },
  mounted() {

  },
  methods: {
    addToCart() {
      // console.log("addToCart");
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product);
      // this.$store.commit("addCart",product)
      this.$store.dispatch("addCart",product).then((res) =>{
        console.log(res);
      })
    },
    topImagesLoad() {
      // console.log("Detail refresh");
      this.$refs.scroll.refresh()
    },
    imgLoad() {
      this.$refs.scroll.refresh()
      // console.log("detailImgInfo refresh");
      this.getTopY()

    },
    ParamimgLoad() {
      this.$refs.scroll.refresh()
    },
    itemClick(index) {
      this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      })
      // console.log("***" + this.themeTopYs[index]);
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    contentScroll(position) {
      // console.log(position);
      for (let i = 0; i < this.themeTopYs.length-1; i++) {
        if((i!==this.currentIndex) && ((-position.y)>=this.themeTopYs[i]&&(-position.y)<this.themeTopYs[i+1])){
          this.currentIndex=i
          console.log("currentIndex: "+i)
          this.$refs.bar.currentIndex=i
        }
      }
      this.judgeIsshow(position)
    }
  },
  destroyed() {
    this.$bus.$off("imgLoad",this.newRefresh)
  },
  mixins: [itemListenerMixin,backTopMixin]
}
</script>

<style scoped>
.bar {
  position: relative;
  z-index: 9;
  background-color: #fff;

}
#detail{
  width: 100%;
  height: 100%;
  z-index: 8;
  background-color: #fff;
}
/* BScroll固定高度和区域 */
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  /*overflow: hidden;*/
  width: 100%;
  background-color: #ffffff;
  z-index: 8;
}

</style>
