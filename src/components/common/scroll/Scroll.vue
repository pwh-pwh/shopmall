<template>
  <div class="wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      pullUpLoad:  this.pullUpLoad,
      scrollY: true,
      scrollbar: true,
      probeType: this.probeType
    })
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })
    if(this.pullUpLoad===true){
      this.scroll.on('pullingUp',() => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    }


  },
  methods: {
    refresh() {
      console.log("running refresh");
      this.scroll.refresh()
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
