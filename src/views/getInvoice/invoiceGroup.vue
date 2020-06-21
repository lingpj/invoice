<template>
  <div class="container">
    <Group>
      <!-- <Cell title="临时停车" inline-desc="此功能暂未开放,请至服务台领取" link='/invoiceList?sourceFrom=1'></Cell> -->
      <Cell title="临时停车" inline-desc="此功能暂未开放,请至服务台领取" ></Cell>
      <Cell v-if="showCredit" title="信用付停车" inline-desc="月结后付费费用" link="/invoiceList?sourceFrom=2"></Cell>
    </Group>
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
      <mt-button style="margin:.2rem;width:calc(100% - .4rem)" type="primary" size="large" @click="popupVisible = false">确定</mt-button>
    </mt-popup>
  </div>
</template>

<script>
import hideShare from '@/core/WXConfig'
import Api from "@/api/invoice";
import { Group, Cell, Radio } from "vux";
export default {
  name: "",
  components: { Group, Cell, Radio },
  data() {
    return {
      showCredit: false,
      popupVisible: true,
      parkId: "1594",
      car:'',
      carList:[],
    };
  },
  watch:{
    parkId(){
      localStorage.setItem('parkId',this.parkId)
    },
    car(){
      localStorage.setItem('plateNo',this.car)
    },
  },
  mounted() {
    hideShare()
    localStorage.setItem('parkId',this.parkId)
    this.getCreditInfo();
    this.getCarInfo()
  },
  methods: {
    getCreditInfo() {
      // 查询信用付信息
      Api.getCreditInfo({
        openid: localStorage.getItem("openId")
      }).then(res => {
        if (res.data.length > 0) {
          this.showCredit = true;
        }
      });
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
        this.car =  this.carList.length>0 ? this.carList[0].value:''
        localStorage.setItem('plateNo',this.car)
      })
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  
}
/deep/ .mint-popup {
  width: 100%;
}
</style>
