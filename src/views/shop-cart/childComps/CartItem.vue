<template>
<div class="shop-item">
  <div class="item-selector">
    <check-bottom :is-checked="product.checked" @click.native="checkClick"/>
  </div>
  <div class="item-img">
    <img :src="product.image" alt="">
  </div>
  <div class="item-info">
    <div class="item-title">{{product.title}}</div>
    <div class="item-desc">{{product.desc}}</div>
    <div class="info-bottom">
      <div class="item-price left">¥{{product.price}}</div>
      <div class="item-count right">x{{product.count}}</div>
    </div>
  </div>
</div>
</template>

<script>
import CheckBottom from "@/components/content/checkBottom/CheckBottom";
export default {
  name: "CartItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckBottom
  },
  methods: {
    checkClick() {
      this.product.checked=!this.product.checked
    }
  }
}
</script>

<style scoped>
.shop-item{
width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img{
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info{
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-desc, .item-title{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom{
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-price{
  color: orange;
}
.item-count{}
.left{}
.right{}
</style>
