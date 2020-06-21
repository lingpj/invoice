<template>
  <div class="container"></div>
</template>

<script>
import Api from '@/api/invoice'
import hideShare from '@/core/WXConfig'
export default {
  name: "",
  components: {},
  data() {
    return {};
  },

  mounted() {
    hideShare()
     console.log('当前url:',window.location.href)
    // 1、如果token不存在，去回调地址
    // 2、如果token本地不一致，去绑定
    // 3、如果一致，获取用户信息保存
    if (window.location.href.indexOf("?") > -1) {
      var token = decodeURIComponent(window.location.href.split("?")[1].slice(6));
      // 读取缓存
      console.log('现在token:',token)
      console.log('以前token:',localStorage.getItem('openId'))
      if((localStorage.getItem('openId')== token)){
        // 获取用户基本信息
        Api.getUserInfo({
            mobileOrOpenId:localStorage.getItem('openId')
        }).then(res=>{
            console.log('用户信息：',res.data)
            if(res.data){
                localStorage.setItem('mobile',res.data.mobile)
                this.$router.push('/invoiceGroup')
            }else{
              this.$router.push('/validate')
            }
        })
      }else{
        localStorage.setItem('openId',token)
        this.$router.push('/validate')
      }
    } else {
      window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx370f9adc4b3fb077&redirect_uri=http%3a%2f%2fdropdbandescape.parkwing.cn%2finvoice%2fauthorize%2finvoice&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    }
  },
  methods: {}
};
</script>
 