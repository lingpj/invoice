<template>
  <div class='container'>
    
    <div id="codeDiv" style="display: none;"></div>
    <p class="title">{{$route.query.title}}</p>
<div id="qrcode"></div> 
  </div>
</template>

<script>
import Api from '@/api/invoice'
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  name: '',
  components:{},
  data () {
    return {
    }
  },

  mounted(){
    document.title = this.$route.query.title

        var self = this;
      var qrcode = new QRCode("codeDiv", {
        text: `http://dropdbandescape.parkwing.cn/codiv/authorize/info/${self.$route.query.id}`, // 二维码地址,
        render: "canvas",  //渲染方式指定canvas方式
        width: 200,
        height: 200,
        typeNumber:-1,//计算模式
        colorDark : "#000000",   
        colorLight : "#ffffff",   
        correctLevel : QRCode.CorrectLevel.H  
    });
    var canvas=document.getElementsByTagName('canvas')[0];
    var img = this.convertCanvasToImage(canvas);
    var qrcode = document.getElementById('qrcode')
    qrcode.appendChild(img)

    //   var self = this;
    //   document.getElementById("qrcode").innerHTML = "";
    //   let qrcode = new QRCode("qrcode", {
    //     width: 200,
    //     height: 200,
    //     text: `http://dropdbandescape.parkwing.cn/codiv/authorize/info/${self.$route.query.id}`, // 二维码地址
    //     colorDark: "#000",
    //     colorLight: "#fff"
    //   });


     Api.getAppInfo({
        url: location.origin
      }).then(res=>{
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature,// 必填，签名
            jsApiList: ['onMenuShareTimeline',
              'onMenuShareAppMessage','showAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
          });
          wx.ready(function() {
            wx.showAllNonBaseMenuItem();
            // var shareUrl = window.location.href
            var shareUrl =window.location.href
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            var obj = {
              title: self.$route.query.title, // 分享标题
              desc: '', // 分享描述
              link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
            }
            wx.onMenuShareTimeline(obj);
            wx.onMenuShareAppMessage(obj)
          });
      })
     
  },
  methods: {
      convertCanvasToImage(canvas){
          //新建Image对象
            var image = new Image();  
            // canvas.toDataURL 返回的是一串Base64编码的URL
            image.src = canvas.toDataURL("image/png");  
            return image;  
      },
  }
}
</script>

<style lang='less' scoped>
 .container{
     width: 100vw;
     height: 100vh;
      padding-top: .5rem;
     -webkit-touch-callout :default;
     .title{
       font-size: .2rem;
       text-align: center;
       font-weight: bold;
     }
     #qrcode{
    padding-top: .5rem;
     width: 100vw;
     height: 100vh;
     text-align: center;
    // display: flex;
    // justify-content: center;
    z-index: 9999999;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout : default;
  }
 }
</style>
