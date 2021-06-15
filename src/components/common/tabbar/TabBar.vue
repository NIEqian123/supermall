<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tab-bar {
  /* 让其按照flex布局 水平分布 */
  display: flex;
  background-color: #f6f6f6;
  /* 居于底部 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 让导航栏和内容中间有过度阴影 */
  /* x偏移量 y偏移量  模糊程度 阴影颜色  透明度0.8*/
  /* x偏移量为正，阴影会往右；y偏移量为正，阴影往下 */
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}

</style>
