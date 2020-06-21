<template>
  <div class="container">
    <Group>
      <Cell title="我的车辆" inline-desc="绑定车辆信息" link="/carList"></Cell>
      <Cell title="停车开票历史" inline-desc="查看历史发票" link="/history"></Cell>
    </Group>
    <footer @click="$router.push('/validate')">新增车牌</footer>
  </div>
</template>

<script>
import hideShare from "@/core/WXConfig";
import { Group, Cell } from "vux";
export default {
  name: "",
  components: { Group, Cell },
  data() {
    return {};
  },

  mounted() {
    hideShare();
    if (!localStorage.getItem("openId")) {
      this.$router.push("/");
    }
    
  },
  methods: {
     
  }
};
</script>

<style lang='less' scoped>
.container {
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
}
</style>
