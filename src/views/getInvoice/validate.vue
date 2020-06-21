<template>
  <div>
    <div class="container">
      <p class="tip">填写基本信息</p>
      <ul>
        <li v-if="!this.sourceFrom">
          <div>车牌号</div>
          <div style="display:flex;align-items:center" >
            <span class="prePlate" @click="popupVisible = true">{{prePlate}}</span>
            <input style="flex:1;margin:0;height:.4rem" type="text" maxlength="8" v-model="carnumber" placeholder>
          </div>
        </li>
        <li v-if="this.sourceFrom == 'mine'">
          <div>原车牌号</div>
          <div style="display:flex;align-items:center;padding:.15rem 0;">{{$route.query.plateno}}</div>
        </li>
        <li v-if="this.sourceFrom == 'mine'">
          <div>新车牌号</div>
          <div style="display:flex;align-items:center" >
            <span class="prePlate" @click="popupVisible = true">{{prePlate}}</span>
            <input style="flex:1;margin:0;height:.4rem" type="text" maxlength="8" v-model="carnumber" placeholder>
          </div>
        </li>
        <li>
          <div>联系电话</div>
          <input type="text" maxlength="11" v-if="sourceFrom == 'mine'" disabled v-model="mobile" placeholder>
          <input type="text" maxlength="11" v-else v-model="mobile" placeholder>
        </li>
        <li>
          <div>验证码</div>
          <input type="text" maxlength="6" v-model="code" placeholder="请输入验证码">
          <section class="c-blue" @click="sendCode">{{msg}}</section>
        </li>
      </ul>
    </div>
    <footer @click="bindOrder">{{sourceFrom ? '修改': '下一步'}}</footer>
    <div v-if="popupVisible">
      <!-- <popup v-model="popupVisible" > -->
        <!-- <plateNo @change="change"></plateNo> -->
        <div class="plateNoContainer">
          <div class="keyboard1">
            <div class="tools">
              <!-- <div class="ok" @click="inputOk">完成</div> -->
            </div>
            <div class="key">
              <div
                class="button"
                :key="index"
                v-for="(item,index) in keyboard1"
                @click="selectFirstplate(index,item)"
              >
                <div>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      <!-- </popup> -->
    </div>
  </div>
</template>

<script>
import hideShare from '@/core/WXConfig'
import plateNo from "@/components/plateNo";
import { Group, Cell ,Popup,TransferDom } from "vux";
import { Toast, } from "mint-ui";
import Api from "@/api/invoice";
export default {
  name: "",
  components: { Group, Cell, plateNo ,Popup},
  directives: {
    TransferDom
  },
  data() {
    return {
      prePlate:'沪',
      carnumber: "",
      mobile: "",
      code: "",
      msg: "获取",
      timer: "",
      popupVisible: false,
      sourceFrom:'',     // 页面来源
      keyboard1:
        "京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝使",
    };
  },

  mounted() {
    hideShare()
    this.sourceFrom = this.$route.query.sourceFrom || ''
    if(this.sourceFrom == 'mine'){
      this.mobile = localStorage.getItem('mobile')
    }
  },
  methods: {
    register() {
      console.log('车牌',this.prePlate+this.carnumber.toUpperCase())
      console.log('手机',this.mobile)
      console.log('参数：',{
        code: this.code,
        openid: localStorage.getItem('openId') ,
        plateno: this.prePlate+this.carnumber.toUpperCase(),
        mobile: this.mobile
      })
      Api.register({
         plateno: this.prePlate+this.carnumber.toUpperCase(),
        mobile: this.mobile,
        code: this.code,
        openid: localStorage.getItem('openId'),
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          localStorage.setItem('openId',localStorage.getItem('openId'))
          localStorage.setItem('mobile',this.mobile)
          Toast("注册成功！");
          this.$router.push('/invoiceGroup')
        }
      });
    },
    modify(){
      Api.modifyCar({
        code: this.code,
        openid: localStorage.getItem('openId') ,
        plateno: this.$route.query.plateno,
        mobile: this.mobile,
        newPlateNo:this.prePlate+this.carnumber.toUpperCase(),
      }).then(res => {
        if (res.status == 200) {
          localStorage.setItem('mobile',this.mobile)
          Toast("修改成功！");
          this.$router.push('/mine')
        }
      });
    },
    selectFirstplate(index,item) {
        // this.$emit('change',{index,item})
        var data = {index,item}
        this.prePlate = data.item
        this.popupVisible = false
    },
    // 车牌号
    // change(data){
    //     this.prePlate = data.item
    //     this.popupVisible = false
    // },
    //   发送验证码
    sendCode() {
      var self = this;
      if (!/^1[23456789]\d{9}$/.test(this.mobile)) {
        Toast("手机号码格式有误！");
        return false;
      }
      if (!this.timer) {
        Api.sendSMS({
          mobile: this.mobile
        }).then(res => {
          console.log(res);
          if (res.status == 200) {
            Toast("发送成功！");
          }
        });
        this.msg = 60;
        this.timer = setInterval(() => {
          if (self.msg > 0) {
            self.msg -= 1;
          } else {
            self.msg = "获取";
            clearInterval(self.timer);
            self.timer = null;
          }
        }, 1000);
      }
    },
    bindOrder() {
      if (!/^1[23456789]\d{9}$/.test(this.mobile)) {
        Toast("手机号码格式有误！");
        return false;
      }
      
      if(this.$route.query.sourceFrom){
        this.modify()
      }else{
        this.register();
      }
      // this.$router.push('/invoiceGroup')
    }
  }
};
</script>

<style lang='less' scoped>
/deep/ .vux-selector::before {
  display: none;
}
/deep/ .vux-selector {
  border-right: none;
}
.container {
  //   margin: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  .prePlate{
    width: .3rem;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    margin-right: .05rem;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
  .tip {
    color: rgb(252, 85, 65);
    font-size: 14px;
  }
  .c-blue {
    color: blue;
    float: right;
  }
  input:disabled {
    color: gray;
    background-color: transparent;
  }
  ul {
    li {
      border-radius: 5px;
      margin-top: 20px;
      padding: 5px;
      border: 1px solid #eee;
      display: flex;
      align-items: center;
      font-size: 14px;
      div {
        padding-right: 10px;

        text-align: right;
      }
      div:first-child {
        width: 100px;
        border-right: 1px solid #eee;
      }
      input {
        outline: none;
        border: none;
        margin-left: 10px;
        //  padding: 10px 0;
        width: 50%;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
footer {
  color: #fff;
  border-radius: 40px;
  text-align: center;
  height: 43px;
  width: 100%;
  background-color: rgb(45, 133, 237);
  margin: 20px auto;
  line-height: 43px;
  width: 80%;
}
.plateNoContainer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  .ok {
    text-align: right;
    margin: .1rem 0;
    color: rgb(252, 85, 65);
  }
  .key {
    padding-bottom: 0.1rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    & .button {
      // display: inline-block;
      box-sizing: border-box;
      font-size: 0.35rem;
      width: 0.5rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      margin-top: 0.15rem;
      // margin-right: .21rem;
      & div {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 auto;
        font-size: .2rem;
        background-color: #fff;
        border: 0.5px solid #f5f6f7;
        border-radius: 9px;
        box-shadow: 0 0 5px 0px #bbb;
      }
    }
  }
}
</style>
