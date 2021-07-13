import Vue from "vue"
import Vuex from "vuex"
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters"
//安装插件
Vue.use(Vuex)
//创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store
