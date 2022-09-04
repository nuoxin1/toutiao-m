/**
 * 封装 axios 请求模块
 */
import axios from "axios"
import store from "@/store"
import JSONBig from 'json-bigint'

// JSONBig.stringify() 是把javascript转换成JSON的格式的字符串
// JSONBig.parse( ) 是把JSON的字符串转换为javascript对象
const request = axios.create({

    baseURL: "http://toutiao.itheima.net",
    transformResponse: [function (data) {
        // return data       //AXIOS 默认会在内部转换返回前段数据，JSON.parse(data)
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }
    }]
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// 响应拦截器

export default request