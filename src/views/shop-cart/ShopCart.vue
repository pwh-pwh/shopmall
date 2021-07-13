<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="cart-bar">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
    <toast message="我是message"/>
  </div>
</template>

<script>
import CartList from "@/views/shop-cart/childComps/CartList";
import CartBottomBar from "@/views/shop-cart/childComps/CartBottomBar";
import Toast from "@/components/common/toast/Toast";

import NavBar from "@/components/common/navbar/NavBar";
import { mapGetters } from "vuex"
export default {
  name: "ShopCart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Toast
  },
  computed: {
    ...mapGetters(['cartLength','getCartList'])

  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
.shop-cart {
height: 100vh;
}
</style>
