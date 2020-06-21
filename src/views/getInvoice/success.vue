<template>
  <div class="container">
    <div class="box">
      <div class="img"></div>
      <div class="resultBox">
        <img src="../../assets/img/success.png" alt>
        <span>开票成功</span>
      </div>
    </div>
    <p class="msg">开票已成功，稍后可在公众号我的中历史开票信息中下载发票</p>
    <footer @click="$router.go(-1)">返回</footer>
    <footer @click="$router.push('/mine')">立即查看发票</footer>
  </div>
</template>

<script>
import hideShare from '@/core/WXConfig'
export default {
  name: "",
  components: {},
  data() {
    return {};
  },

  mounted() {
    hideShare()
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.container {
  padding-top: 0.2rem;
  .box {
    .img {
      width: 2.43rem;
      height: 1.32rem;
      background: url("../../assets/img/chenggong2.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    img {
      width: 0.62rem;
      margin-bottom: 15px;
    }
    .resultBox {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: -80px;
      font-size: 20px;
    }
    width: calc(100% - 0.4rem);
    margin: 0 auto;
  }
  p {
    margin-top: -30px;
    text-align: center;
  }
  .msg {
    width: 3.35rem;
    margin-left: 0.2rem;
    line-height: .2rem;
  }
  footer {
    color: #fff;
    border-radius: 5px;
    text-align: center;
    height: 0.43rem;
    width: 3.35rem;
    background-color: rgb(45, 133, 237);
    margin: 0.2rem auto;
    line-height: 0.43rem;
    margin-top: .1rem;
  }
}
</style>
