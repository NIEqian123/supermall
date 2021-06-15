import Toast from "./Toast"

const obj = {}
// install函数在执行时候，默认将Vue传进来
obj.install = function(Vue){
  // console.log("执行了obj的install函数")
  // 下边这一行不对，因为在install执行时候，Toast里边的函数可能还没有挂载，所以拿不到
  // document.body.appendChild(Toast.$el);

  //1创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2\new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastConstructor()
  //3\将组件对象，手动挂载在一个元素上
  toast.$mount(document.createElement('div'));
  //4\toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //将toast对象放在原型上，其他地方就可以通过this.$toast拿到该对象
  Vue.prototype.$toast = toast;
}
  export default obj
