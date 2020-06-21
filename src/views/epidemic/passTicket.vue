<template>
  <div class='container'>
   <div class="passTicketBox" :key="index" v-for="(item,index) in pageData">
         <p class="name" :style="{left:isiOS ?'1.3rem':'1.5rem'}">{{(item.park || '') +'-'+ (item.companyname || '')}}</p>
         <p class="code" :style="{left:isiOS ?'2.8rem':'3rem'}">{{item.code }}</p>
         <p class="username" :style="{left:isiOS ?'4.8rem':'4.9rem'}">{{item.v_name}}<br><br>{{countTime}}</p>
         <img class="headimg" :style="{left:isiOS ?'4.8rem':'4.9rem'}" :src="item.people_url" alt="">
        <img class="passTicket" src="../../assets/img/passTicket.jpg" alt="">
   </div>
   <div style="text-align:center;line-height:1rem;font-size: .2rem;" v-if="pageData.length <1">暂无任何信息
       <img style="vertical-align: middle;  
       width: .2rem;" src="../../assets/img/fail.png" alt="">
   </div>
  </div>
</template>

<script>
import hideShare from "@/core/WXConfig";
import { Toast } from "mint-ui";
import API from '@/api/epidemic'
export default {
  name: '',
  components:{},
  data () {
    return {
        pageData:[],
        countTime:new Date().format('hh:mm:ss SSS')
    }
  },
  computed:{
      openid(){
        return this.$route.query.token || ''   
      },
      companyid(){
          return this.$route.query.companyid || '' 
      },
      isAndroid(){
           var u = navigator.userAgent;
           console.log('>>>>>',u)
          return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      },
      isiOS(){
           var u = navigator.userAgent;
          return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      },
      
  },
  mounted(){
      
    console.log(this.isAndroid,this.isiOS)
     this.getInfo()
     hideShare()
     var self = this
     setInterval(() => {
        self.countTime = new Date().format('hh:mm:ss S')
     }, 10 * Math.random() + 20);
  },
  methods: {
      getInfo(){
          API.getUserInfo({
              openid:this.openid,
              companyid:this.companyid,
              limit:10,
              page:1
          }).then(res=>{
              if(res.list){
                  if(res.list.length >0){
                      this.pageData = res.list.filter(element => {
                          if(element.status == 1){
                              return true
                          }
                          return false
                      });
                      if(this.pageData.length<1){
                          Toast('暂无任何信息')
                      }else{
                          this.pageData = [this.pageData[0]]
                      }
                  }else{
                      Toast('暂无任何信息')
                  }
              }else{
                      Toast('暂无任何信息')
              }
          })
      }
  }
}
</script>

<style lang='less' scoped>
 .container{
     background-color: rgb(98,197,229);
     .passTicketBox{
         position: relative;
         color: #fff;
          width: 100vh;
         height: 100vw;
         transform: rotateZ(90deg) ;
          transform-origin:1.875rem 1.875rem;
          background-color: rgb(98,197,229);
         .username{
             position: absolute;
             top: 3rem;
             left: 4.8rem;
             color: #fff;
             width: 1.5rem;
             text-align: center;
             font-size: .16rem;
         }
         .name{
             position: absolute;
             left: 1.3rem;
             top: 1.85rem;
             width: 3rem;
            text-overflow:ellipsis;
            white-space: nowrap;
             overflow: hidden;
             font-size: .16rem;
         }
         .code{
             position: absolute;
             top: .38rem;
             left: 2.8rem;
             font-size: .16rem;
         }
         .headimg{
             position: absolute;
             top: .9rem;
             left: 4.8rem;
             width: 1.5rem;
             height:2rem ;
         }
     }
     .passTicket{
        // width: 100%;
        height: 100vw;
        
        
     }
 }
</style>
