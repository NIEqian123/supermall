import {request} from "./request";

export function getHomeMultidata() {
  //getHomeMultidata函数的返回值是request的返回值，request的返回值是一个promise，所以调用时可以用.then 
  return request({
    url:"/home/multidata"

  })
}

export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  })
}
