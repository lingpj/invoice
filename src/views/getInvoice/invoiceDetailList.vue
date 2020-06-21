<template>
  <div class="container">
    <ul
     
    >
      <li v-for="(item,index) in invoiceList" :key="index" >
        <div>
          <Icon type="waiting-circle"></Icon>
          {{fmtDate(item.create_date)}}
          <x-icon
            style="float:right"
            type="ios-checkmark-outline"
            v-if="checkedIndexList.indexOf(index) >-0.5"
          ></x-icon>
        </div>
        <div>
          账单编号:
          <span class="blue">{{item.kt_order_number}}</span>
        </div>
        <div>
          进场时间:
          <span class="blue">{{fmtDate(item.enyry_time)}}</span>
        </div>
        <div>
          出场时间:
          <span class="blue">{{fmtDate(item.pay_time)}}</span>
        </div>
        <div>
          停车时长:
          <span class="blue">{{item.elapsed_time}}分钟</span>
        </div>
        <div>
          停车费用:
          <span class="blue">{{item.payable / 100}}元</span>
        </div>
        <!-- <div>
          <x-icon type="ios-checkmark-outline" v-if="checkedIndexList.indexOf(index) >-0.5"></x-icon>
        </div>-->
      </li>
    </ul>
    <footer @click="$router.go(-1);">
      返回
    </footer>
  </div>
</template>

<script>
import hideShare from '@/core/WXConfig'
import Api from "@/api/invoice";
import { Icon, CheckIcon } from "vux";
export default {
  name: "",
  components: { Icon, CheckIcon },
  data() {
    return {
      invoiceList: [],
      checkedIndexList: [],
      pageSize: 5,
      totalMoney: 0,
      currentCheck: false,
      allCheck: false
    };
  },
 
   
  mounted() {
    hideShare()
      this.invoiceList  = JSON.parse(localStorage.getItem('invoiceList'))
  },
  methods: {
    
    fmtDate(val) {
      return new Date(val * 1).format("yyyy-MM-dd hh:mm:ss");
    },
     
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

  footer {
    position: fixed;
    bottom: .1rem;
    left: 0;
    width: 100%;
    z-index: 3;
    height: 0.5rem;
    line-height: .5rem;
    color: #fff;
    border-radius: .1rem;
    text-align: center;
    background-color: lighten(@anchor-color, 20%) !important;
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
