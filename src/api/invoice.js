import Http from '../core/axios'
export default {
    //新用户注册
    register(params) {  
        return Http.post(process.env.invoice+`/invoice/user/register`,params)
    },
    // 验证码发送
    sendSMS(params) {  
        return Http.post(process.env.invoice+`/invoice/sms/send`,params)
    },
    // 根据openid查询信用付
    getCreditInfo(params){
        return Http.post(process.env.invoice+`/invoice/credit/info`,params)
    },
    // 查询临时停车记录信息
    
    getTempPark(params){
        console.log(process.env)
        return Http.post(process.env.invoice+`/invoice/selfpayfee/list`,params)
    },
    // 查询信用付停车记录
    getCreditParkRecord(params){
        return Http.post(process.env.invoice+`/invoice/credit/record/list`,params)
    },
    // 根据手机号码查询绑定的车辆信息
    getCarInfo(params){
        return Http.post(process.env.invoice+`/invoice/car/info`,params)
    },  
    // 查询用户信息
    getUserInfo(params){
        return Http.post(process.env.invoice+`/invoice/user/info`,params)
    },  
    // 我的发票
    getSelfpayfee(params){
        return Http.post(process.env.invoice+`/invoice/selfpayfee/mine`,params)
    },
    // 新增用户开票抬头信息
    addInvoiceMsg(params){
        return Http.post(process.env.invoice+`/invoice/invoice`,params)
    },
    // 更新绑定车牌信息
    modifyCar(params){
        return Http.post(process.env.invoice+`/invoice/car/modify`,params)
    },
    // 开票条件限制接口
    limit(params){
        return Http.post(process.env.invoice+`/invoice/limit/usecount`,params)
    },
    // 电子发票开票
    openInvoice(params){
        return Http.post(process.env.invoice+`/invoice/selfpayfee/openInvoice`,params)
    },
    //  获取app签名
    getAppInfo(params){
        return Http.post(process.env.invoice+`/invoice/share/info/share`,params)
    },
    // 查询抬头列表
    getTaiTouList(params){
        return Http.post(process.env.invoice+`/invoice/invoice/pageList`,params)
    },
}
