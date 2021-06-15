import {request} from "./request"
export function getCategory(iid){
  return request({
    url:"/category",
    // params:{
    //   iid
    // }
  })
}

export function getSubcategory(mailKey){
  return request({
    url:"/subcategory",
    params:{
      mailKey
    }
  })
}

export function getCategoryDetail(miniWallKey,type){
  return request({
    url:"/subcategory/detail",
    param:{
      miniWallKey,
      type
    }
  })
}
