import Http from '../core/axios'
export default {
    // 企业微信端登陆
    businessLogin(params){
        return Http.post(process.env.invoice+`/codiv/qyAccount/valid`,params)
    },
    // 二维码查询公司信息
    getBusinessInfo(params){
        return Http.get(process.env.invoice+`/codiv/qyAccount/${params.id}`,params)
    },
    // 人员登记接口
    businessEmployee(params){
        return Http.post(process.env.invoice+`/codiv/employee`,params)
    },
    // 获取跳转链接
    getJumpUrl(params){
        return Http.get(process.env.invoice+`/codiv/authorize/info/${params.id}`,params)
    },
    // 获取人员信息
    getUserInfo(params){
        return Http.post(process.env.invoice+`/codiv/employee/pageList`,params)
    }
}
