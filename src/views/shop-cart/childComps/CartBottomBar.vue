<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-bottom class="check-bottom" :is-checked="isSelectAll"/>
    <span>全选</span>
  </div>
  <div class="countPrice">
    合计价格:{{totalPrice}}
  </div>
  <div class="cal">
    去计算： {{totalNum}}
  </div>
</div>
</template>

<script>
import CheckBottom from "@/components/content/checkBottom/CheckBottom";
import { mapGetters } from "vuex"
export default {
  name: "CartBottomBar",
  components: {
    CheckBottom
  },
  computed: {
    ...mapGetters(['getCartList']),
    totalPrice() {
      return this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) => {
        return item.price*item.count+preValue
      },0)
    },
    totalNum() {
      return this.getCartList.filter(item => {
         return  item.checked
      }).length
    },
    isSelectAll() {
      console.log("isSelectAll");
      return !(this.getCartList.filter(item =>!item.isChecked).length)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 40px;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  width: 80px;
}
.check-bottom {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.countPrice {
flex: 1;
}
.cal{
  background-color: #ce4d4d;
  width: 100px;
  text-align: center;
}
</style>
