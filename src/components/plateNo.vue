<template>
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
</template>

<script>

export default {
  name: "",
  components: {},
  data() {
    return {
      keyboard1:
        "京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝使",
    };
  },

  mounted() {},
  methods: {
    selectFirstplate(index,item) {
        this.$emit('change',{index,item})
    },
   
  }
};
</script>

<style lang='less' scoped>
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
        background-color: #fff;
        border: 0.5px solid #f5f6f7;
        border-radius: 9px;
        box-shadow: 0 0 5px 0px #bbb;
      }
    }
  }
}
</style>
