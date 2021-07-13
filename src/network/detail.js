import {request} from "@/network/request";

export function getDetail(iid) {
  return  request({
    url: '/detail',
    params: {
      iid: iid
    }
  })
}
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class GoodsInfo {
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discountDesc=itemInfo.discountDesc
    this.columns=columns
    this.realPrice=itemInfo.lowNowPrice
    this.services=services

  }
}
export class Shop {
  constructor(shopInfo) {
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.name=shopInfo.name
    this.logo=shopInfo.shopLogo
    this.goodsCount=shopInfo.cGoods
    this.score=shopInfo.score
  }
}
// 尺寸数据
export class GoodsParams {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
