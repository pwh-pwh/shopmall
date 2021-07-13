<template>
<div class="check-bottom" :class="{checked: isChecked}">
  <img src="~assets/img/cart/tick.svg" alt="">
</div>
</template>

<script>
export default {
  name: "CheckBottom",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
.check-bottom {
  border-radius: 50%;
  border: 2px solid rebeccapurple;
}
.checked {
  background-color: orchid;
  border-color: orchid;
}
</style>
