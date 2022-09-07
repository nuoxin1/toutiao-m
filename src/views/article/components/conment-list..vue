<!--  -->
<template>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error="error"
        error-text="加载失败，点击重试" :immediate-check="false">
        <!-- immediate-check='false' 在初始化时取消立即执行滚动位置检查 -->
        <CommentItem v-for="(item, index) in list" :key="index" :comment="item"
            @reply-click="$emit('reply-click',$event)" />
    </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {

    name: 'CommentList',
    components: {
        CommentItem,
    },
    props: {
        source: {
            type: [Number, String, Object],
            required: true
        },
        list: {
            //父组件访问子组件里面的值，可以是父组件传子默认为空，然后给子组件的值获取添加到里面。
            type: Array,
            default: () => {
                return []  //默认值是数组或者是对象时候就必须是函数return
            }
        },
        type: {
            type: String,
            //自定义prop数据验证
            validator(value) {
                return ['a', 'c'].includes(value)
            },
            default: 'a',

        }
    },
    data() {
        return {
            //  list: [],
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
            error: false,
        }
    },
    computed: {},
    watch: {},
    created() {
        this.loading = true  //慢速网络需要手动开启loading
        this.onLoad()
    },
    mounted() { },
    methods: {
        async onLoad() {

            //1.请求数据
            //获取文章的评论跟获取评论回复的接口一样，，区别是接口参数不一样， type：a是文章评论,C是评论的回复。
            //source: 文章的评论，则传递文章的ID，评论的回复，则传递评论的ID
            try {
                const { data } = await getComment({
                    source: this.source, //
                    type: this.type,
                    limit: this.limit,
                    offset: this.offset
                })
                console.log(data)
                //2.将数据更新到列表中
                const { results } = data.data
                this.list.push(...results)
                // 把文章评论的总数量传递到外部
                this.$emit('onload-success', data.data)
                //3.将loading设置为false
                this.loading = false
                // 4.判断是否还有数据，
                //有数据就更新设置下一页的数据页码，
                if (results.length) {
                    this.offset = data.data.last_id
                } else {
                    //没有数据就直接设置finlished为true
                    this.finished = true
                }
                //加载失败错误提示开启，并且把loading关闭。
            } catch (err) {
                this.error = true
                this.finished = true

            }




        },
    },
}

</script>
<style scoped lang="less">

</style>