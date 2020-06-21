import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 主页
    {
      path: '/',
      name: 'index',
      meta:{
        title:'首页'
      },
      component: resolve=>require(['@/views/index'],resolve)
    },
    // 发票类型：临停/信用付
    {
      path: '/invoiceGroup',
      name: 'invoiceGroup',
      meta:{
        title:'停车类型'
      },
      component: resolve=>require(['@/views/getInvoice/invoiceGroup'],resolve)
    },
    // 发票列表
    {
      path: '/invoiceList',
      name: 'invoiceList',
      meta:{
        title:'停车记录'
      },
      component: resolve=>require(['@/views/getInvoice/invoiceList'],resolve)
    },
     // 填写发票信息
     {
      path: '/writeInvoice',
      name: 'writeInvoice',
      meta:{
        title:'填写发票信息'
      },
      component: resolve=>require(['@/views/getInvoice/writeInvoice'],resolve)
    },
     // 开票成功
     {
      path: '/success',
      name: 'success',
      meta:{
        title:'开票成功'
      },
      component: resolve=>require(['@/views/getInvoice/success'],resolve)
    },
     // 我的
     {
      path: '/mine',
      name: 'mine',
      meta:{
        title:'我的'
      },
      component: resolve=>require(['@/views/mine/mine'],resolve)
    },
    // 车辆列表
    {
      path: '/carList',
      name: 'carList',
      meta:{
        title:'车辆列表'
      },
      component: resolve=>require(['@/views/mine/carList'],resolve)
    },
    // 开票历史
    {
      path: '/history',
      name: 'history',
      meta:{
        title:'开票历史'
      },
      component: resolve=>require(['@/views/mine/history'],resolve)
    },
    // 开票详情list
    {
      path: '/invoiceDetailList',
      name: 'invoiceDetailList',
      meta:{
        title:'开票详情'
      },
      component: resolve=>require(['@/views/getInvoice/invoiceDetailList'],resolve)
    },
     // 用户注册
     {
      path: '/validate',
      name: 'validate',
      meta:{
        title:'填写信息'
      },
      component: resolve=>require(['@/views/getInvoice/validate'],resolve)
    },
    // 企业微信登录
    {
      path: '/businessLogin',
      name: 'businessLogin',
      meta:{
        title:'企业微信登录'
      },
      component: resolve=>require(['@/views/epidemic/businessLogin'],resolve)
    },
    // 人员登记
    {
      path: '/staffLogin',
      name: 'staffLogin',
      meta:{
        title:'人员登记'
      },
      component: resolve=>require(['@/views/epidemic/staffLogin'],resolve)
    },
    // 通行证
    {
      path: '/passTicket',
      name: 'passTicket',
      meta:{
        title:'通行证'
      },
      component: resolve=>require(['@/views/epidemic/passTicket'],resolve)
    },
    // 通行证
    {
      path: '/qrImg',
      name: 'qrImg',
      meta:{
        title:'二维码'
      },
      component: resolve=>require(['@/views/epidemic/qrImg'],resolve)
    },
    // 登记成功
    {
      path: '/writeSuccess',
      name: 'writeSuccess',
      meta:{
        title:'登记成功'
      },
      component: resolve=>require(['@/views/epidemic/writeSuccess'],resolve)
    },
  ]
})
