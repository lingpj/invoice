import Api from '@/api/invoice'
export default ()=>{
    // 获取App信息
    Api.getAppInfo({
        url: location.origin
      }).then(res=>{
        localStorage.setItem('appId',res.appId)
        localStorage.setItem('nonceStr',res.nonceStr)
        localStorage.setItem('signature',res.signature)
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature,// 必填，签名
            jsApiList: [
                'hideMenuItems'
            ],
        });
        wx.ready(function() {
            WeixinJSBridge.call('hideOptionMenu');
        });
      })

     
}