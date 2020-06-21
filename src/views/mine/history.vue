<template>
  <div class='container'>
    <p v-if="invoiceList.length<1" class="none">暂无数据</p>
    <ul  v-infinite-scroll="loadMoreHandle" infinite-scroll-immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(item,index) in invoiceList" :key="index" >
        <div></div>
        <div>开票编号:<span class="blue">{{item.fpqqlsh}}</span></div>
        <div>创建时间:<span class="blue">{{fmtDate(item.createtime)}}</span></div>
        <div>&nbsp;<span class="blue" style="float:left">停车详情</span></div>
        <div>开票金额:<span class="blue">{{item.jshj}}元</span></div>
        <div>状态:<span class="blue">已完成</span></div>
        <div class="download">
          <span  @click="downloadHandle(index,item)">下载发票</span>
           <span v-clipboard:copy="item.url" v-clipboard:success="copyHandle">复制地址</span>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import hideShare from '@/core/WXConfig'
import Api from '@/api/invoice'
import {Icon} from 'vux'
export default {
  name: '',
  components:{Icon},
  data () {
    return {
      invoiceList:[],
      pageSize:5,
    }
  },

  mounted(){
    hideShare()
    this.getInvoiceList()
  },
  methods: {
    // 载入更多
    loadMoreHandle() {
      this.pageSize += 3
      this.getInvoiceList()
    },
    // 格式化时间
    fmtDate(val){
      return new Date(val*1).format('yyyy-MM-dd hh:mm:ss')
    },
    // 获取发票列表
    getInvoiceList(){
      Api.getSelfpayfee({
        "mobile": localStorage.getItem('mobile'),
        "page": 1,
        "limits": this.pageSize,
        "status": "1"
      }).then(res=>{
        this.invoiceList =res.data.list
      })
    },
    // 下载
    downloadHandle(index,item){
        console.log(index,item)
        window.open(item.url)
    },
    // 拷贝地址
    copyHandle(index,item){
        alert('复制成功')
    },
    
  }
}
</script>

<style lang='less' scoped>
@import '../../assets/css/vars.less';
 .container{
   .none{
     text-align: center;
     margin-top: .2rem;
   }
   .blue{
     color: @anchor-color;
     float: right;
   }
   li{
     background-color: #fff;
    //  padding: 10px;
     margin:10px;
     border-radius: 10px;
     &>div{
       padding: 10px 10px;
      //  border-bottom: 1px solid #eee;
     }
     &>div:first-child{
       
       border-bottom: 1px solid #eee;
     }
   }
   .active{
     box-shadow: 0 0 2px @anchor-color inset;
     border:1px solid  @anchor-color;
   }
   footer{
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     z-index: 3;
     height: 90px;
     background-color: rgb(250,250,250);
   }
   .download{
     display: flex;
     justify-content: space-between;
      border-top: 1px solid #eee;
       color: @anchor-color;
       border-bottom-left-radius: 10px;
       border-bottom-right-radius: 10px;
      //  background-color: rgb(59, 154, 192);
   }
 }
 /deep/ .weui-icon-waiting-circle{
   color: @anchor-color;
 }
</style>
