<template>
  <div class='container'>
    <Group>
        <Cell title="车牌号" v-for="(item,index) in list" :key="index+10" :inline-desc="item.plate_no" :link="'/validate?sourceFrom=mine&plateno='+item.plate_no">修改</Cell>
        <!-- <Cell title="手机号" v-for="(item,index) in list" :key="index" :inline-desc="item.mobile" link="/validate?sourceFrom=mine">修改</Cell> -->
        <Cell title="手机号" v-for="(item,index) in list.slice(0,1)" :key="index" :inline-desc="item.mobile" ></Cell>
    </Group>
  </div>
</template>

<script>
import hideShare from '@/core/WXConfig'
import { Group, Cell } from "vux";
import Api from '@/api/invoice'
export default {
  name: '',
  components:{ Group, Cell},
  data () {
    return {
        list:[],
    }
  },

  mounted(){
    hideShare()
    this.getCarInfo()
  },
  methods: {
    getCarInfo(){
      // 获取车辆信息
      Api.getCarInfo({
        mobile:localStorage.getItem('mobile')
      }).then(res=>{
        console.log(res)
        this.list = res.data  || []
      })
    }
  }
}
</script>

<style lang='less' scoped>
 .container{}
</style>
