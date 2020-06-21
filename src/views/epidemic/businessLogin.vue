<template>
  <div class="container">
    <Group v-if="Object.keys(businessData).length < 1">
      <h1>企业登录666</h1>
      <div class="loginBox">
        <Cell title="账号：">
          <x-input :max="20" v-model="username" placeholder="请输入账号"></x-input>
        </Cell>
        <Cell title="密码：">
          <p>
            <x-input type="password" v-model="pwd" :max="20" placeholder="请输入密码"></x-input>
          </p>
        </Cell>
      </div>
    </Group>
    <Group v-else>
      <h1>企业信息</h1>
      <div class="loginBox">
        <Cell :title="fmtKey(item)" :key="index" v-for="(item,index) in dictInfo">
          <p>{{businessData[item]}}</p>
        </Cell>
      </div>
    </Group>

    <x-button
      type="primary"
      v-if="Object.keys(businessData).length > 1"
      @click.native="$router.push({path:'/qrImg',query:{id:businessData.id,title:businessData.item+'-'+businessData.company}})"
    >生成二维码</x-button>
    <x-button type="primary" v-else @click.native="loginHandle">登录</x-button>
    
  </div>
</template>

<script>
import API from "@/api/epidemic.js";
import hideShare from "@/core/WXConfig";
import { Toast } from "mint-ui";

import { Group, Cell, Radio, XInput, XButton } from "vux";
export default {
  name: "",
  components: { Group, Cell, Radio, XInput, XButton },
  data() {
    return {
      username: "",
      pwd: "",
      businessData: {},
      dictInfo: {
        "公司：": "company",
        "园区：": "item",
        "楼座：": "building",
        "房间号：": "room"
      }
    };
  },

  mounted() {
   
    hideShare()
  },
  methods: {
    fmtKey(key){
      var v = ''
      Object.keys(this.dictInfo).forEach(item =>{
         if(key == this.dictInfo[item] ){
           v =item
         }
      })
      return v
    },
    loginHandle() {
      if(!this.username || !this.pwd){
        Toast('请填写账号和密码')
        return 
      }
      API.businessLogin({
        username: this.username,
        pwd: this.pwd
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          Toast("登录成功~");
          this.businessData = res.element;
        } else {
          Toast(res.msg);
        }
      });
    },
    
  }
};
</script>

<style lang='less' scoped>
.container /deep/ .weui-cells_radio {
  display: flex;
}
.container /deep/ .weui-cell__ft *:before,
.container /deep/ .weui-cell__ft *:after {
  border: none !important;
}
.container /deep/ .vux-x-input,
.container /deep/ .weui-cell__ft .detail,
.container /deep/ .weui-cells_radio {
  width: 2.37rem;
  padding: 0;
}
.container /deep/ .weui-check__label {
  padding: 0;
}
.container /deep/ .weui-cells_radio {
  label {
    margin-right: 0.2rem;
  }
}
.container {
  .info {
    padding-left: 0.15rem;
    margin-top: 0.15rem;
  }
  #qrcode{
    margin-top: .5rem;
    display: flex;
    justify-content: center;
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
.container {
  h1 {
    text-align: center;
    font-size: 0.3rem;
    background-color: #fff;
  }
}
</style>
