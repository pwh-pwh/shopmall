export default {
  addCount(state,payload) {
    console.log("addCount");
    payload.count++
  },
  addToCart(state,payload) {
    console.log("addToCart");
    payload.checked=true
    state.cartList.push(payload)
  }
}
