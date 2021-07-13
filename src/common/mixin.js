import { debounce } from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = () => {
      refresh()
    }
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on("imgLoad",this.newRefresh)
  }

}
export const backTopMixin = {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    toTop() {
      console.log("toTop");
      this.$refs.scroll.scroll.scrollTo(0,0)
    },
    judgeIsshow(position) {
      this.isShow = (-position.y) >= 1000;
    }
  }
}
