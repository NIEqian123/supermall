export function debounce(func,delay){
  let timer = null
  return function( ...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date,fmt){
  //1获取年份

  // y+  1个或者多个y
  // y?  0个或者1个y
  //y*    0个或者多个y

  if(/(y+)/.test(fmt)){
    // substr(2) 从左往右截取2位
    fmt= fmt.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  //2、
  let o ={

    // 转换后的月份从0开始
    "M+":date.getMonth()+1,
    "d+":date.getDate(),
    "h+":date.getHours(),
    "m+":date.getMinutes(),
    "s+":date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k]+'';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str){
  return ('00'+str).substr(str.length)
}
