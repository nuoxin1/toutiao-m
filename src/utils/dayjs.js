import dayjs from "dayjs";
import Vue from "vue"
// dayjs默认语言是英文，我们配置中文
import 'dayjs/locale/zh-cn'
//加载的中文语文包
import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用处理相对relativeTime插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') //全局使用

// 定义一个全局过滤器,然后就可以在任何组件模板中使用了
//其实过滤器就是相当于一个全局可以用的方法（仅供模板使用）
//参数1：过滤器名称
//参数2：过滤函数
//使用方法 {{表达式 | 过滤器名称}}
//前面表达式的结果会作为参数传递到过滤器函数中
//过滤器的返回值会渲染到使用过滤器的模板位置。
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})
//
// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()