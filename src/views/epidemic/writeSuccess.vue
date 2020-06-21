<template>
  <div class='container'>
    <div class="msg" style="">
       您的信息已提交，正在审核中... 
       <img src="../../assets/img/success.png" alt=""></div>
  </div>
</template>

<script>
export default {
  name: '',
  components:{},
  data () {
    return {
    }
  },

  mounted(){},
  methods: {}
}
</script>

<style lang='less' scoped>
 .container{
   .msg{
     text-align:center;
     line-height:1rem;
     font-size: .2rem;
     vertical-align: middle;  
     img{
       vertical-align: middle;  
       width: .2rem;
     }
   }
 }
</style>
