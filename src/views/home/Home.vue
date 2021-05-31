<template>
  <div id="home">
    <nav-bar><div slot="center" class="home-nav">
      购物街
    </div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommend"/>
    <feature-view/>
    <tab-control  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>

import {getHomeMultidata,getHomeGoods} from 'network/home';
import HomeSwiper from './homeComponents/HomeSwiper'
import RecommendView from "./homeComponents/RecommendView";
import FeatureView from "./homeComponents/FeatureView";



import NavBar from "components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
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
      currentType: 'pop'
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    NavBar,
    FeatureView,
    TabControl,
    GoodsList
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('sell')
    this.getHomeGoods('new')




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
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  /*height: 100vh;*/
  position: relative;
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
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 8;
}
</style>
