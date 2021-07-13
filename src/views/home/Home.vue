<template>
  <div id="home" class="wrapper">
    <nav-bar><div slot="center" class="home-nav">
      购物街
    </div></nav-bar>
    <div class="con">
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
        <recommend-view :recommends="recommend"/>
        <feature-view/>
        <tab-control class="tab-control"
                     :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick" ref="tabControl"
                     />
        <goods-list :goods="showGoods"/>
      </scroll>
    </div>
<back-top @click.native="toTop" v-show="isShow"/>
  </div>
</template>

<script>

import {getHomeMultidata,getHomeGoods} from 'network/home';
import HomeSwiper from './homeComponents/HomeSwiper'
import RecommendView from "./homeComponents/RecommendView";
import FeatureView from "./homeComponents/FeatureView";

import {itemListenerMixin,backTopMixin} from "common/mixin"

import NavBar from "components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import { debounce } from "common/utils"
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isPositionFix: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin,backTopMixin]
  ,

  components: {
    HomeSwiper,
    RecommendView,
    NavBar,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    backTopMixin
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('sell')
    this.getHomeGoods('new')

  },
  mounted() {

    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on("imgLoad",() => {
      // console.log("...");
      // this.$refs.scroll.scroll.refresh()
      refresh()
    })

  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners=res.data.data.banner.list;
        this.recommend=res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res => {
        // console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.scroll.finishPullUp()
        this.$refs.scroll.scroll.refresh()
      })
    },
    tabClick(index){
      console.log(index);
      switch (index) {
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
        default:
          this.currentType='pop'
      }
      console.log(this.currentType);
    },
    contentScroll(position) {
      // console.log(position);
      this.judgeIsshow(position)
      this.isPositionFix = (-position.y) >= this.tabOffsetTop;
    },
    loadMore() {
      console.log("loadMore");
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop-40
    }
/*    debounce(func,delay) {
      let timer = null
      return function (...args) {
        if(timer!=null){
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this,args)
          // func(args)
            }
            ,delay
        )
      }
    }*/
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  activated() {
    console.log("activated");
    this.$refs.scroll.scroll.scrollTo(this.saveY)
  },
  deactivated() {
    console.log("deactivated");
    this.saveY = this.$refs.scroll.scroll.y
    this.$bus.$off("imgLoad",this.newRefresh)
  }

}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;

}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  /*position: sticky;*/
  position: relative;
  top: 0;
  z-index: 9;
}
.con{
  height: calc(100% - 44px - 49px);
  display: flex;
}
.content {
  /*overflow: hidden;*/
  flex: 1;
  height: 90vh;
  /*overflow: hidden;*/

}

</style>
