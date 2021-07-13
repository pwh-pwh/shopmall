<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-item v-for="(item,index) in getCartList" :key="index" :product="item"/>

  </scroll>
</div>
</template>

<script>
import CartItem from "@/views/shop-cart/childComps/CartItem";

import { mapGetters } from "vuex"
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(['getCartList'])
  },
  components: {
    Scroll,
    CartItem
  },
  activated() {
    console.log('activated');
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 50px);
}
.content {
  height: 100%;
}
</style>
