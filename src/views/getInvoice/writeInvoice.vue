<template>
  <div class="container">
    
    <p class="info">发票信息</p>
     <footer style="color:Red" @click="popupVisible = true" >请选择抬头列表</footer>
    <div class="inner-container">
      <Group>
        <Cell title="抬头类型：">
          <!-- <group> -->
          <radio title="title" :options="options" v-model="form.type"></radio>
          <!-- </group> -->
        </Cell>
        <div v-if="!isPerson">
          <Cell title="发票抬头：">
            <x-input :max="30" v-model="form.companytitle" placeholder="请填写发票抬头"></x-input>
          </Cell>
          <Cell title="税号：">
            <p class="detail">
              <x-input v-model="form.tax" :max="30" placeholder="请填写税号"></x-input>
            </p>
          </Cell>
          <Cell title="单位地址：">
            <x-input v-model="form.address" :max="30" placeholder="请填写地址"></x-input>
          </Cell>
          <!-- <Cell title="公司名称：">
            <x-input v-model="form.company" :max="30" placeholder="请填写公司名称"></x-input>
          </Cell> -->
          <Cell title="企业注册电话：">
            <x-input v-model="form.phone" :max="30" placeholder="请填写企业注册电话"></x-input>
          </Cell>
          <Cell title="开户银行：">
            <x-input v-model="form.bank" :max="30" placeholder="请填写开户银行"></x-input>
          </Cell>
          <Cell title="开户银行账号：">
            <x-input v-model="form.account" :max="30" placeholder="请填写开户银行账号"></x-input>
          </Cell>
          
          
        </div>
        <div v-else>
          <Cell title="姓名：">
            <x-input v-model="form.company" :max="30" placeholder="请填写个人姓名"></x-input>
          </Cell>
        </div>
        <Cell title></Cell>
      </Group>
      <Group>
        <Cell title="总金额：">
          <p class="detail">
            <span class="fl-l orange">{{totalMoney()}}元</span>
            <!-- <span class="fl-r" @click="lookDetailHandle">查看详情></span> -->
            <!-- <span>{{invoiceList.length}}个账单 &nbsp;&nbsp;</span> -->
          </p>
        </Cell>
      </Group>
    </div>
    <mt-popup v-model="popupVisible" :closeOnClickModal="false" position="bottom">
      <group title="选择抬头">
        <!-- <radio :options="[ {key: '1594',value: '华新园'}, {    key: '1595',value: '虹桥园'}]"></radio> -->
        <radio
          :options="taiTouList.map(item => {
          return {
            key: item.company || item.companytitle,
            value: (item.company || item.companytitle)+(item.type == '1' ?'(企业)':'(个人)') ,
          };
        })"
          v-model="taiTou"
        ></radio>
      </group>
      <mt-button
        style="margin:.2rem;width:calc(100% - .4rem)"
        type="primary"
        size="large"
        @click="certainHandle"
      >确定</mt-button>
    </mt-popup>
    <footer @click="addInvoiceMsg">开票</footer>
   
  </div>
</template>

<script>
import hideShare from "@/core/WXConfig";
import Api from "@/api/invoice";
import { Toast } from "mint-ui";
import { Group, Cell, Radio, XInput } from "vux";
export default {
  name: "",
  components: { Group, Cell, Radio, XInput },
  data() {
    return {
      options: ["企业单位", "个人/非企业单位"],
      form: {
        type: "企业单位",
        bank: "",
        account: "",
        address: "",
        phone: "",
        mobile: "",
        company: "",
        companytitle: "",
        tax: ""
      },
      invoiceList: [],
      isPerson: false,
      popupVisible: false,
      taiTouList: [], //抬头list，
      taiTou: ""
    };
  },
  watch: {
    "form.type"() {
      console.log(this.form.type)
      if (this.form.type == "企业单位") {
        this.isPerson = false;
      } else {
        this.isPerson = true;
      }
      if(this.form.company.length >4){
        this.form.company = ''
      }
    },
    popupVisible() {
      if (this.popupVisible) {
        this.getTaiTouList();
      }
    },
    taiTou() {
      var o = this.taiTouList.find(item => item.company == this.taiTou || item.companytitle == this.taiTou)
      console.log(this.taiTou,o,this.taiTouList);
      for(var k in this.form){
          this.form[k] = o[k] || this.form[k]
      } 
      this.form.type = this.form.type == '1' ? '企业单位' : '个人/非企业单位'
    }
  },
  mounted() {
    hideShare();
    this.invoiceList = JSON.parse(localStorage.getItem("invoiceList"));
    // 读取上次填写的发票信息
    if (localStorage.getItem("invoinceMsg"))
      this.form = JSON.parse(localStorage.getItem("invoinceMsg"));
  },

  methods: {
    // 获取抬头列表
    getTaiTouList() {
      Api.getTaiTouList({
        mobile: localStorage.getItem("mobile"),
        limit: "10000000",
        page: "1"
      }).then(res => {
        this.taiTouList = res.list
      });
    },
    certainHandle() {
      this.popupVisible = false;
    },
    totalMoney() {
      if (!this.invoiceList || this.invoiceList.length < 1) {
        return "";
      }
      return (
        this.invoiceList
          .map(item => item.payable || item.pay_money)
          .reduce((total, curr) => total + curr) / 100
      ).toFixed(2);
    },
    // 查看发票详情
    lookDetailHandle() {
      this.$router.push({ path: "/invoiceDetailList" });
    },
    // 添加发票抬头
    addInvoiceMsg() {
      if(!this.form.companytitle || !this.form.tax){
        alert('发票抬头和税号为必填')
        return
      }
      Api.addInvoiceMsg({
        ...this.form,
        mobile: localStorage.getItem("mobile"),
        type: this.form.type == "企业单位" ? "1" : "2"
      }).then(res => {
        if (res.status == 200) {
          // Toast('发票信息添加成功！')
          localStorage.setItem("invoinceMsg", JSON.stringify(this.form));
          this.openInvoice();
        }
      });
    },
    // 开票
    openInvoice() {
      // Toast('功能关闭')
      // return
      var param = this.form.type == "企业单位" ? { ...this.form } : {};
      Api.openInvoice({
        ...param, 
        plateno: localStorage.getItem("plateNo"),
        mobile: localStorage.getItem("mobile"),
        parkid: localStorage.getItem("parkId"),
        type: this.form.type == "企业单位" ? "1" : "2",
        parkingType: localStorage.getItem("parkingType"),
        parklist: this.invoiceList.map(
          item => item.kt_order_number || item.credit_payment_id
        ),
        totalmoney: this.totalMoney(),
        company: this.form.type == "企业单位" ?this.form.companytitle:this.form.company,
        companytitle:this.form.type == "企业单位" ?this.form.companytitle:this.form.company,
      }).then(res => {
        if (res.status == 200) {
          this.$router.push("/success");
        } else {
          this.$router.push("/fail");
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.inner-container /deep/ .weui-cells_radio {
  display: flex;
}
.inner-container /deep/ .weui-cell__ft *:before,
.inner-container /deep/ .weui-cell__ft *:after {
  border: none !important;
}
.inner-container /deep/ .vux-x-input,
.inner-container /deep/ .weui-cell__ft .detail,
.inner-container /deep/ .weui-cells_radio {
  width: 2.37rem;
  padding: 0;
}
.inner-container /deep/ .weui-check__label {
  padding: 0;
}
.inner-container /deep/ .weui-cells_radio {
  label {
    margin-right: 0.2rem;
  }
}
.container {
  .info {
    padding-left: 0.15rem;
    margin-top: 0.15rem;
  }
}
.fl-r {
  float: right;
}
.fl-l {
  float: left;
}
.tx-c {
  text-align: center;
}
.orange {
  margin-left: 0.04rem;
  color: rgb(255, 139, 75);
}
footer {
  background-color: #fff;
  // width: 90%;
  // margin-left: 5%;
  margin-top: 0.2rem;
  // border: 1px solid lightgray;
  // border-radius: .1rem;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
}
/deep/ .mint-popup {
  width: 100%;
}
</style>
