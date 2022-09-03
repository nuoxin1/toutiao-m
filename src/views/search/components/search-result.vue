<!--  -->
<template>
    <div class="search-result">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
        </van-list>




    </div>
</template>

<script>
import { suggestionResult } from '@/api/search'
export default {
    name: 'SearchResult',
    components: {},
    props: {
        searchText: {
            type: String,
            required: true
        },

    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            perPage: 20,
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onLoad() {
            //1.请求获取数据
            try {
                const { data } = await suggestionResult({
                    page: this.page,// 页数，默认不传为1
                    per_page: this.page, //每页数量，不传每页数量由后端决定
                    q: this.searchText, //搜索的关键词，就是searchText
                })
                //2.将数据添加到数组当中
                const { results } = data.data

                this.list.push(...results) //结果是一个数组，用...进行展开，把每一个数据用数组push方法进行添加到数组当中
                //3.将本次加载中的loading关闭
                this.loading = false
                //4.判断是否还有数据，如果有则更新下一个数据的页码，如果没有则将加载状态finished设置为ture
                if (results.length) {
                    this.page++

                } else {
                    this.finished = true
                }

            } catch (err) {
                // 展示加载失败的提示状态
                this.error = true

                // 加载失败了 loading 也要关闭
                this.loading = false
            }

        },
    },
}

</script >
<style scoped lang="less">
</style>