import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-type"

export default
{
   //mutations 唯一的目的是修改state中的状态
    //mutations 中的每个方法尽可能完成的事情比较单一
    [ADD_COUNTER](state,payload){
      payload.count ++
    },
    [ADD_TO_CART](state,payload){
      payload.checked = true;
      state.cartList.push(payload)
    }
   
}
