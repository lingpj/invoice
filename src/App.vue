<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  font-family: Tahoma, Arial, Roboto, "Droid Sans", "Helvetica Neue",
    "Droid Sans Fallback", "Heiti SC", sans-self;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: auto; /* auto | scroll */
  -webkit-overflow-scrolling: touch;
}
/deep/ * {
  font-size: 0.14rem;
}
</style>
