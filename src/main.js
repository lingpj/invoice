// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';  // 引入mint-ui
import FastClick from 'fastclick'

import './assets/css/reset.css'
import './assets/css/nprogress.css'
import 'mint-ui/lib/style.css'
import NProgress from 'nprogress' //引入自定义css是为了覆盖掉默认的进度条的颜色
import './assets/js/rem'
import global from './core/global'
import VConsole from 'vconsole';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

  // var vConsole = new VConsole();
  // vConsole.setOption('maxLogNumber', 1000);
  // vConsole.showSwitch();
  // vConsole.switchPos ={
  //   x: 300, // right
  //   y: 10, // bottom
  // }
// Vue.use(global);
Vue.use(Mint);
NProgress.configure({
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: true, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})



// 移动端300延迟
// FastClick.attach(document.body)

// 开启/隐藏进度条
router.beforeEach((to, from , next) => {
  NProgress.start();
  document.title = to.meta.title
  next()
});
router.afterEach(() => {  
  NProgress.done()
})
Vue.config.productionTip = false

// 日期格式化拓展
Date.prototype.format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,                 //月份   
    "d+": this.getDate(),                    //日   
    "h+": this.getHours(),                   //小时   
    "m+": this.getMinutes(),                 //分   
    "s+": this.getSeconds(),                 //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
