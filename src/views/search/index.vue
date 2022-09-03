<!--  -->
<template>

    <div class="search-container">
        <form action="/" class="search-form">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
                @focus="isResultShow = false" background="#3296fa" />
        </form>
        <!-- 搜索栏 -->

        <!-- 过程就是，首先判断isResultShow是否为真，如果是，直接展示搜索结果，当不是真时候，就判断里面是不是有内容，有内容就显示联想记忆，如果没有
内容就显示搜索历史记录。2.已经处于搜索结果，又重新进行输入时候。需要搜索结果为假，当光标聚焦时候判断是否有内容，有就是联想记忆 -->
        <!-- 搜索结果 -->
        <search-result v-if="isResultShow" :search-text="searchText" />
        <!-- /搜索结果 -->

        <!-- 联想记忆 -->
        <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />


        <!-- /联想记忆 -->

        <!-- 搜索历史记录 -->
        <search-history v-else :search-histories="searchHistories" @clear-search-histories="searchHistories = []"
            @search="onSearch" />
        <!-- /搜索历史记录 -->


    </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
    name: 'SearchPage',
    components: {
        SearchResult,
        SearchSuggestion,
        SearchHistory,

    },
    props: {},
    data() {
        return {
            searchText: '',
            isResultShow: false, //控制搜索结果的展示
            searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [],  //通过本地存储拿到数据，第一次拿数据可能是空数据，所有是本地数据或者是的空数组。如果不是空数组，会报错
        }
    },
    computed: {},
    watch: {
        searchHistories(value) {
            setItem('TOUTIAO_SEARCH_HISTORIES', value)   //监视searchHistories的数据变化，其中的value就是数据变化的值。存储也是哪个值。
        }

        // searchHistories:{
        //     handler(){}
        // }

    },
    created() { },
    mounted() { },
    methods: {
        onSearch(val) {
            //更新文本内容
            this.searchText = val
            const index = this.searchHistories.indexOf(val)  //用数组的indexof()判断是否包含这个值，如果有返回下标，如果没有返回-1
            // 储存历史记录
            //要求不要重复的数据
            if (index !== -1) {
                this.searchHistories.splice(index, 1)// splice()方法删除，从index开始，删除1个
            }
            this.searchHistories.unshift(val) //unshift() 添加


            //渲染搜索结果
            this.isResultShow = true
        },
        onCancel() {
            this.$router.back()
        },
    },
}
</script>
<style scoped lang="less" >
.search-container {
    padding-top: 108px;

    .van-search__action {
        color: #fff;
    }

    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>