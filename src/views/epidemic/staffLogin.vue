<template>
  <div class="container">
    <Group label-width="1.2rem">
      <h1>人员登记</h1>
      <div class="loginBox">
        <cell>
          <span slot="title">入园情况登记<span style="vertical-align:middle;color:red">*</span></span>
          <radio
            title="title"
            :options="[{key:'1',value:'园区企业员工'},{key:'2',value:'园区访客'}]"
            v-model="form.v_type"
          ></radio>
        </cell>
        <Cell>
          <span slot="title">姓名<span style="vertical-align:middle;color:red">*</span></span>
          <x-input
            v-model="form.v_name"
            @on-blur="(val,$event)=>{onBlurHandle('姓名',val)}"
            :required="true"
            :max="20"
            placeholder="请输入姓名"
          ></x-input>
        </Cell>
        <Cell>
          <span slot="title">到访园区<span style="vertical-align:middle;color:red">*</span></span>
          <x-input disabled v-model="form.park" :max="20" placeholder="请输入到访园区"></x-input>
        </Cell>
        <Cell>
          <span slot="title">公司名称<span style="vertical-align:middle;color:red">*</span></span>
          <x-input disabled v-model="form.companyname" :max="20" placeholder="请输入公司名称"></x-input>
        </Cell>
        <Cell >
          <span slot="title">楼栋以及房号<span style="vertical-align:middle;color:red">*</span></span>
          <x-input v-model="form.roominfo" :max="20" placeholder="请输入楼栋以及房号"></x-input>
        </Cell>
        <Cell>
          <span slot="title">性别<span style="vertical-align:middle;color:red">*</span></span>
          <radio
            title="title"
            :options="[{key:'1',value:'男'},{key:'2',value:'女'}]"
            v-model="form.sex"
          ></radio>
        </Cell>
        <Cell>
          <!-- <group> -->
            <span slot="title">到达上海日期<span style="vertical-align:middle;color:red">*</span></span>
            <datetime style="width:2.37rem;" v-model="form.arrive_time" title=""></datetime>
          <!-- </group> -->
          <!-- <x-input v-model="form.arrive_time" @on-blur="(val,$event)=>{onBlurHandle('到达上海日期',val)}" :required="true" :max="20" placeholder="请输入到达上海日期"></x-input> -->
        </Cell>
        <Cell >
          <span slot="title">途径省份<span style="vertical-align:middle;color:red">*</span></span>
          <selector
            style="width:2.37rem"
            placeholder="请选择"
            title
            :options="[{key:'1',value:'湖北或途径湖北'},{key:'2',value:'其他省市'},{key:'3',value:'疫情期间未离开过上海'},{key:'4',value:'境外'}]"
            v-model="form.pass_by"
          ></selector>
        </Cell>
        <Cell>
          <span slot="title">身份证号码<span style="vertical-align:middle;color:red">*</span></span>
          <x-input
            v-model="form.card_id"
            @on-blur="(val,$event)=>{onBlurHandle('身份证号码',val)}"
            :required="true"
            :max="20"
            placeholder="请输入身份证号码"
          ></x-input>
        </Cell>
        <Cell>
          <span slot="title">现居住地址<span style="vertical-align:middle;color:red">*</span></span>
          <x-input
            v-model="form.address"
            @on-blur="(val,$event)=>{onBlurHandle('现居住地址',val)}"
            :required="true"
            :max="20"
            placeholder="请输入现居住地址"
          ></x-input>
        </Cell>
        <Cell>
          <span slot="title">户籍地<span style="vertical-align:middle;color:red">*</span></span>
          <x-input
            v-model="form.househol_register"
            @on-blur="(val,$event)=>{onBlurHandle('户籍地',val)}"
            :required="true"
            :max="20"
            placeholder="请输入户籍地"
          ></x-input>
        </Cell>
        <Cell>
          <span slot="title">手机号码<span style="vertical-align:middle;color:red">*</span></span>
          <x-input
            v-model="form.mobile"
            @on-blur="(val,$event)=>{onBlurHandle('手机号码',val)}"
            :required="true"
            :max="11"
            placeholder="请输入手机号码"
          ></x-input>
        </Cell>
        <Cell>
          <span slot="title">来沪交通工具<span style="vertical-align:middle;color:red">*</span></span>
          <selector
            style="width:2.37rem"
            placeholder="请选择"
            title
            :options="[{key:'1',value:'飞机航班'},{key:'2',value:'火车车次'},{key:'3',value:'汽车'},{key:'4',value:'自驾'}]"
            v-model="form.vehicle"
          ></selector>
        </Cell>
        <Cell v-if="form.vehicle == 1 || form.vehicle == 2">
          <span slot="title">具体车次<span style="vertical-align:middle;color:red">*</span></span>
          <x-input
            v-model="form.remarker"
            @on-blur="(val,$event)=>{onBlurHandle('具体车次',val)}"
            :required="true"
            :max="20"
            placeholder="请输入具体车次"
          ></x-input>
        </Cell>
        <Cell>
          <span slot="title">近15天内到访地点<span style="vertical-align:middle;color:red">*</span></span>
          <x-textarea v-model="form.visit_area" :max="200" placeholder="请输入近15天内到访地点" :show-counter="false" :height="100" :rows="3" :cols="30"></x-textarea>
          <!-- <x-input
            v-model="form.visit_area"
            @on-blur="(val,$event)=>{onBlurHandle('近15天内到访地点',val)}"
            :required="true"
            :max="20"
            placeholder="请输入近15天内到访地点"
          ></x-input> -->
        </Cell>
        <Cell>
          <span slot="title">是否已完成隔离<span style="vertical-align:middle;color:red">*</span></span>
          <selector
            style="width:2.37rem"
            placeholder="请选择"
            title
            :options="[{key:'1',value:'是'},{key:'2',value:'否'},{key:'3',value:'疫情期间未离开过上海'}]"
            v-model="form.is_quarantine"
          ></selector>
        </Cell>
        <Cell >
          <span slot="title">完成隔离方式<span style="vertical-align:middle;color:red">*</span></span>
          <selector
            style="width:2.37rem"
            placeholder="请选择"
            title
            :options="[{key:'1',value:'居家隔离'},{key:'3',value:'医院隔离'}]"
            v-model="form.quarantine_type"
          ></selector>
        </Cell>
        <Cell>
           <span slot="title">结束隔离证明<span style="vertical-align:middle;color:red">*</span></span>
          <span slot="inline-desc">(不超过4mb)</span>
          <input
            type="file"
            ref="quarantine_url"
            @change="fileChangeHandle($event,'quarantine_url')"
          >
        </Cell>
        <Cell>
          <p style="text-align:left">结束隔离证明上传（如无隔离证明，请通过手机扫码“疫情查询助手”将查询结果截屏并上传）</p>
        </Cell>
        <Cell>
          <img style="width:100%" src="../../assets/img/疫情1.jpg" alt="">
        </Cell>
        <cell>
          <div style="display:flex;width:100%">
              <img style="width:33.33%;height:33.33%" src="../../assets/img/疫情2.jpg" alt="" @click="imgPreviewer(0)">
              <img style="width:33.33%;height:33.33%" src="../../assets/img/疫情3.jpg" alt="" @click="imgPreviewer(1)">
              <img style="width:33.33%;height:33.33%" src="../../assets/img/疫情4.jpg" alt="" @click="imgPreviewer(2)">
            </div>
          </cell>
        <Cell>
           <span slot="title">身份证照片<span style="vertical-align:middle;color:red">*</span></span>
          <span slot="inline-desc">(不超过4mb)</span>
          <input
            type="file"
            ref="card_url"
            @change="fileChangeHandle($event,'card_url')"
          >
        </Cell>
        <Cell>
          <span slot="title">个人头像照<span style="vertical-align:middle;color:red">*</span></span>
          <span slot="inline-desc">(不超过4mb)</span>
          <input
            type="file"
            ref="people_url"
            @change="fileChangeHandle($event,'people_url')"
          >
        </Cell>
      </div>
    </Group>
    <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
          <img style="width:100%" src="../../assets/img/疫情2.jpg" alt=""  v-if="currentIndex == 0">
              <img style="width:100%" src="../../assets/img/疫情3.jpg" alt="" v-if="currentIndex == 1">
              <img style="width:100%" src="../../assets/img/疫情4.jpg" alt="" v-if="currentIndex == 2">
      </x-dialog>
    <p style="padding:.1rem;line-height:.2rem">以上信息仅用于来沪人员疫情情况统计以便更好的进行疫情防控，您的所有资料都将受到严格的保密，请您安心填写。如实及时报告疫情情况，是法律义务。有瞒报、谎报等情况，必将受到法律重责。</p>
    <x-button type="primary" @click.native="loginHandle">提交</x-button>
  </div>
</template>

<script>
import hideShare from "@/core/WXConfig";
import $ from "jquery";
import API from "@/api/epidemic.js";
import { Toast,Indicator } from "mint-ui";
import { Group, Cell, Radio, XInput, XButton, Selector, Datetime ,XTextarea,XDialog,TransferDomDirective as TransferDom} from "vux";
export default {
  directives: {
    TransferDom
  },
  name: "",
  components: { Group, Cell, Radio, XInput, XButton, Selector, Datetime,XTextarea,XDialog },
  data() {
    return {
      currentIndex:-1,
      showHideOnBlur:false,
      pwd: "123456",
      businessData: {},
      form: {
        openid: "",
        companyid: "",
        v_type: "1",
        v_name: "",
        park: "",
        companyname: "",
        roominfo: "",
        sex: "1",
        arrive_time:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDay(),
        pass_by: "",
        card_id: "",
        address: "",
        househol_register: "",
        mobile: "",
        vehicle: "",
        remarker: "",
        visit_area: "",
        is_quarantine: "",
        quarantine_type: "",
        quarantine_url: "",
        card_url: "",
        people_url: ""
      },
      requireKeyList: {
        v_name: "姓名",
        arrive_time: "到达上海日期",
        card_id: "身份证号码",
        address: "现居住地址",
        househol_register: "户籍地",
        mobile: "手机号",
        visit_area: "15天到访地点",
        roominfo:'楼栋以及房号',
        pass_by:'途径省份',
        vehicle:'来沪交通工具',
        is_quarantine:'是否已完成隔离',
        quarantine_type:'完成隔离方式',
      }
      
    };
  },
  watch: {
    // form: {
    //   deep: true,
    //   handler() {
    //     console.log(this.form);
    //   }
    // }
  },
  mounted() {
    
    // iOS微信 虚拟键盘问题
    $("input,textarea,select").on("blur", function() {
      window.scroll(0, 0);
    });
    $("select").on("change", function() {
      window.scroll(0, 0);
    });
    hideShare()
    this.form.openid = this.$route.query.token
    this.form.companyid = this.$route.query.companyid || this.$route.query.id
    this.getComponyInfo();
  },
  methods: {
    imgPreviewer(index){
      this.showHideOnBlur = true
      this.currentIndex = index
    },
    onBlurHandle(key, val) {
      if (val.length < 2) {
        Toast(key + "最少2个字");
      }
    },
    // 文件上传
    fileChangeHandle(ev, formName) {
      console.log(ev);
      console.log(this.$refs[formName].files[0].size)
      var self = this;
      var file = ev.target ? ev.target.files[0] : this.$refs[formName].files[0];
      if(file.size / 1024 / 1024 >4){
        Toast('上传文件不能超过4mb')
        self.form[formName] = ''
        return 
      }
      if(file.type.indexOf('image') <0){
        Toast('只能上传图片')
        self.form[formName] = ''
        return
      }
      //创建formdata对象
      var formdata = new FormData();
      formdata.append("file", file);
      //创建xhr，使用ajax进行文件上传
      var xhr = new XMLHttpRequest();
      xhr.open("post", process.env.invoice + "/codiv/employee/upload");
      //回调
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          Indicator.close()
          var data = JSON.parse(xhr.response);
          self.form[formName] = data.path;
          Toast('上传成功！')
        }
        if(xhr.readyState == 4 && xhr.status != 200){
          Indicator.close()
          self.form[formName] = ''
          Toast('上传失败！请重新上传')
        }
      };
      xhr.send(formdata);
      Indicator.open('上传中...')
    },
    //公司信息
    getComponyInfo() {
      var id = this.$route.query.companyid || this.$route.query.id ;
      API.getBusinessInfo({
        id: id
      }).then(res => {
        if (res.code == 200 || res.status == 200) {
          var { item, id, building, room, company } = res.data;
          this.form.companyid = id;
          this.form.park = item;
          this.form.roominfo = building + room;
          this.form.companyname = company;
        }
      });
    },
    // 登记
    async loginHandle() {
      if(1==1){
        for (var key in this.form) {
        if (Object.keys(this.requireKeyList).includes(key)) {
          if(['pass_by','vehicle','is_quarantine','quarantine_type'].includes(key) && this.form[key].length < 1){
            Toast('请选择'+this.requireKeyList[key]);
            return;
          }else if(!['pass_by','vehicle','is_quarantine','quarantine_type'].includes(key) && this.form[key].length < 2){
            Toast(this.requireKeyList[key] + "最少2个汉字~");
            return;
          }
          
        }
      }
      var regIdcard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(regIdcard.test(this.form.card_id) === false) {
        Toast('身份证号码不合法!')
        return 
      } 
      if(!(/^1[3456789]\d{9}$/.test(this.form.mobile))){ 
          Toast("手机号码有误，请重填");  
          return ; 
      } 

      if ((this.form.vehicle == 1 || this.form.vehicle == 2) &&this.form.remarker.length < 3) {
        Toast("请填写具体车次！");
        return;
      }
      
      if (!this.form.quarantine_url || !this.form.card_url ||!this.form.people_url) {
        Toast("请上传文件！");
        return;
      }
      }
      var isExist = await API.getUserInfo({openid:this.form.openid,limit:10,page:1})
      console.log(isExist)
      if(isExist.list.length > 0){
          Toast('您已经填过信息了，请勿重复填写！')
          return
      }
      if(!this.form.openid){
        Toast('非法登录，请联系物业管理员')
        return
      }
      
      API.businessEmployee({
        ...this.form
      }).then(res => {
        if ((res.code = 200)) {
          Toast("登记成功~");
          this.$router.push('/writeSuccess')
        } else {
          Toast("登记失败~");
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
.container /deep/ .weui-cell_select .weui-select {
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
/deep/ .vux-datetime{
  padding-left: 0;
} 
/deep/ .vux-datetime-value{
  text-align: left;
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
