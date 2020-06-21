<template>
  <div class="container">
    <mt-button style="margin:.1rem;width:calc(100% - .2rem)" type="primary" size="large" @click="popupVisible = true">选择园区/车辆</mt-button>
    <mt-popup v-model="popupVisible" :closeOnClickModal="false" position="bottom">
      <group title="选择园区">
        <radio
          :options="[ {key: '1594',value: '华新园'}, {    key: '1595',value: '虹桥园'}]"
          v-model="parkId"
        ></radio>
      </group>
       <group title="选择车辆">
        <radio
          :options="carList"
          v-model="car"
        ></radio>
      </group>
      <mt-button style="margin:.2rem;width:calc(100% - .4rem)" type="primary" size="large" @click="parkAndPlateChange">确定</mt-button>
    </mt-popup>
    <ul
      v-infinite-scroll="loadMoreHandle"
      infinite-scroll-immediate-check="false"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      ref="ul"
    >
    <p v-if="invoiceList.length<1" class="tx-c">暂无数据</p>
      <li v-for="(item,index) in invoiceList" :key="index" @click="invoiceClickHandle(item,index)">
        <div>
          <Icon type="waiting-circle"></Icon>
          {{ item.bill_month ?item.bill_month :fmtDate(item.create_date )}}
          <x-icon
            style="float:right"
            type="ios-checkmark-outline"
            v-if="checkedIndexList.indexOf(index) >-0.5"
          ></x-icon>
        </div>
        <div>
          账单编号:
          <span class="blue">{{item.kt_order_number || item.credit_payment_id}}</span>
        </div>
        <div v-if="isTempPark">
          进场时间:
          <span class="blue">{{fmtDate(item.enyry_time)}}</span>
        </div>
        <div v-if="isTempPark">
          出场时间:
          <span class="blue">{{fmtDate(item.pay_time)}}</span>
        </div>
        <div v-if="isTempPark">
          停车时长:
          <span class="blue">{{item.elapsed_time}}分钟</span>
        </div>
        <div v-if="!isTempPark">
          累计停车次数:
          <span class="blue">{{item. parkcount}}次</span>
        </div>
        <div>
          停车费用:
          <span class="blue">{{(item.payable || item.pay_money)  / 100}}元</span>
        </div>
        <!-- <div>
          <x-icon type="ios-checkmark-outline" v-if="checkedIndexList.indexOf(index) >-0.5"></x-icon>
        </div>-->
      </li>
    </ul>
    <footer>
      <p>
        <span class="orange">{{checkedIndexList.length}}</span> 个账单，共
        <span class="orange">{{totalMoney}}</span> 元
      </p>
      <div>
        <check-icon :value.sync="currentCheck">本页全选</check-icon>
        <check-icon :value.sync="allCheck">全部全选</check-icon>
        <div
          class="nextStep"
          @click="nextStepHandle"
          :class="{ active:checkedIndexList.length >0 }"
        >下一步</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Api from "@/api/invoice";
import hideShare from '@/core/WXConfig'
import { MessageBox, Toast } from "mint-ui";
import { Icon, CheckIcon,Group, Cell, Radio } from "vux";
export default {
  name: "",
  components: { Icon, CheckIcon ,Group, Cell, Radio },
  data() {
    return {
      invoiceList: [],
      checkedIndexList: [],
      pageSize: 5,
      totalMoney: 0,
      currentCheck: false,
      allCheck: false,
      isTempPark: true,
      useCount: -1,
      openInvoiceCount: -1,
      popupVisible:false,
      parkId:localStorage.getItem('parkId'),
      car:localStorage.getItem('plateNo'),
      carList:[]
    };
  },

  watch: {
    // 车辆
    car(){
      localStorage.setItem('plateNo',this.car)
    },
    // 园区
    parkId(){
      localStorage.setItem('parkId',this.parkId)
    },
    // 全选
    allCheck() {
      
      this.checkedIndexList = this.allCheck
        ? this.invoiceList.map((item, index) => index)
        : [];
      this.getTotalMoney();
    },
    // 本页全选
    currentCheck() {
     
      if (this.currentCheck) {
        this.checkedIndexList = [];
        Array.from(this.$refs.ul.children).forEach((ele, index) => {
          if (this.checkVisible(ele)) {
            this.checkedIndexList.push(index);
          }
        });
      } else {
        Array.from(this.$refs.ul.children).forEach((ele, index) => {
          if (this.checkVisible(ele)) {
            if (this.checkedIndexList.includes(index)) {
              var i = this.checkedIndexList.indexOf(index)
              this.checkedIndexList.splice(i, 1);
            } 
            // else {
            //   this.checkedIndexList.push(index);
            // }
          }
        });
      }
      this.getTotalMoney();
    }
  },
  mounted() {
    
    hideShare()
    this.isTempPark = this.$route.query.sourceFrom == 1;
    localStorage.setItem('parkingType',this.$route.query.sourceFrom==1 ? 2 : 1)
    this.getInvoiceList();
    this.getCarInfo()
    alert("由于系统因素，当前每月每人可开1次电子发票；如需再开发票，请与物业联系开具纸质发票事宜。谢谢!");
  },
  methods: {
    parkAndPlateChange(){
      this.popupVisible = false;
      this.checkedIndexList = []
      this.currentCheck = false
      this.allCheck = false
      this.getInvoiceList()
    },
    // 载入更多
    loadMoreHandle() {
      this.pageSize += 3;
      this.getInvoiceList();
    },
    fmtDate(val) {
      return new Date(val * 1).format("yyyy-MM-dd hh:mm:ss");
    },
    // 查询车辆
    getCarInfo(){
      // 获取车辆信息
      Api.getCarInfo({
        mobile:localStorage.getItem('mobile')
      }).then(res=>{
        this.carList = res.data.map(item =>{
          return {
            key:item.plate_no,
            value:item.plate_no,
          }
        })  || []
      })
    },
    // 获取列表
    getInvoiceList() {
      var func = Api.getCreditParkRecord;
      if (this.isTempPark) {
        func = Api.getTempPark;
      }
      func({
        plateno: localStorage.getItem('plateNo'),
        page: 1,
        limits: this.pageSize,
        parkid: localStorage.getItem('parkId'),
      }).then(res => {
        this.invoiceList = res.data.list;
      });
    },
    // 点击选中
    invoiceClickHandle(item, index) {
      var aIndex = this.checkedIndexList.indexOf(index);
      if (aIndex > -0.5) {
        this.checkedIndexList.splice(aIndex, 1);
      } else {
        this.checkedIndexList.push(index);
      }
      this.getTotalMoney();
    },
    // 选中总金额
    getTotalMoney() {
      this.totalMoney = 0;
      this.checkedIndexList.forEach(item => {
        this.totalMoney += (this.invoiceList[item].payable || this.invoiceList[item].pay_money) / 100;
      });
    },
    // 下一步
    nextStepHandle() {
      if (this.checkedIndexList.length < 1) {
        return;
      }
      Api.limit({
        mobile: localStorage.getItem("mobile"),
        parkid:localStorage.getItem('parkId'),
        status: "1"
      }).then(res => {
        if (res.data.openInvoiceCount && res.data.openInvoiceCount >=1 ) {
          alert("由于系统因素，当前每月每人可开1次电子发票；如需再开发票，请与物业联系开具纸质发票事宜。谢谢!");
        } else{
          var list = this.checkedIndexList.map(
            item => this.invoiceList[item]
          );
          localStorage.setItem("invoiceList", JSON.stringify(list));
          this.$router.push("/writeInvoice");
        }
      });
    },
    checkVisible(elm) {
      var rect = elm.getBoundingClientRect();
      //获取当前浏览器的视口高度，不包括工具栏和滚动条
      //document.documentElement.clientHeight兼容 Internet Explorer 8、7、6、5
      var viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );
      //bottom top是相对于视口的左上角位置
      //bottom大于0或者top-视口高度小于0可见
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/css/vars.less";
.container {
  .blue {
    color: @anchor-color;
    float: right;
  }
  ul {
    padding-bottom: 0.9rem;
  }
  li {
    background-color: #fff;
    //  padding: 10px;
    margin: 10px;
    border-radius: 10px;
    & > div {
      padding: 10px 10px;
      //  border-bottom: 1px solid #eee;
    }
    & > div:first-child {
      border-bottom: 1px solid #eee;
    }
    // & > div:last-child {
    //   border-top: 1px solid #eee;
    // }
  }
  .tx-c{
    text-align: center;
  }

  footer {
    padding: 0.05rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    height: 0.9rem;
    background-color: rgb(250, 250, 250);
    & > div {
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      & > * {
        flex: 1;
      }
    }
  }
}
/deep/ .weui-icon-waiting-circle {
  color: @anchor-color;
}
/deep/ .vux-x-icon-ios-checkmark-outline {
  fill: @anchor-color;
}
/deep/ .nextStep {
  background-color: lightgray;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 0.1rem;
}
.orange {
  color: orange;
  font-size: 0.2rem;
  // font-weight: bold;
}
/deep/ .mint-popup {
  width: 100%;
}
/deep/ .vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: orange;
}
.active {
  background-color: lighten(@anchor-color, 20%);
  color: #fff;
}
/deep/ .activeLi {
  background-color: lighten(@anchor-color, 40%) !important;
}
</style>
