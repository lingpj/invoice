import axios from 'axios'
import { Indicator,Toast  } from 'mint-ui';

axios.defaults.timeout = 30000
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'
axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.get['If-Modified-Since'] = '0'
axios.defaults.cache = false
// http response 拦截器
axios.interceptors.response.use(
    response => {
        Indicator.close();
        
        if (response.data.status != 200 && response.data.code != 200 ) {
            // 针对share请求
            if(response.data.appId){
                return response.data
            }
            // 针对发票抬头api
            if(response.data.list || response.data.totalCout || response.data.totalPage){
                return response.data
            }
            // 疫情公司登陆
            if(response.data.code == 300){
                return response.data
            }
            Toast(response.data.message || '系统异常！');
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    error => {
        Indicator.close();
        console.log(error)
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })


export default class Http {
    static send(config, loading) {
        const currentUrl = encodeURIComponent(window.location.href)
        const configs = Object.assign({
            headers: {
                
            },
            timeout: 30000
        }, config)
        Indicator.open('加载中...');
        return axios(configs).then((res) => {
            if (loading === '' || typeof loading == 'object' || loading === undefined) {
                // 什么都不操作
            }  
            return res
        }).catch((error) => {
            if (loading === '' || typeof loading == 'object' || loading === undefined) {
                // 什么都不操作
            } 
            if (error) {
                switch (error.code) {
                    case 500:
                    
                        Message.error(error.message || '系统异常！');
                        break;
                    case 404:
                        Message.error('网络异常！');
                        break;

                }
            }
            throw error
        })
    }

    static post(url, params = {}, loading) {
        const config = {
            method: 'post',
            url,
            data: params
        }
        return Http.send(config, loading)
    }

    static get(url, params = {}, loading) {
        let urlParams = []
        Object.keys(params).forEach((key) => {
            urlParams.push(`${key}=${encodeURIComponent(params[key])}`)
        })
        if (urlParams.length) {
            urlParams = `${url}?${urlParams.join('&')}`
        } else {
            urlParams = url
        }
        const config = {
            url: urlParams,
            params: {
                randomTime: new Date().getTime() // 防止缓存
            }
        }
        return Http.send(config, loading)
    }
}
