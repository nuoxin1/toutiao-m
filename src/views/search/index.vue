<!--  -->
<template>

    <div class="search-container">
        <form action="/">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
                @focus="isResultShow = false" background="#3296fa" />
        </form>
        <!-- 搜索栏 -->

        <!-- 过程就是，首先判断isResultShow是否为真，如果是，直接展示搜索结果，当不是真时候，就判断里面是不是有内容，有内容就显示联想记忆，如果没有
内容就显示搜索历史记录。2.已经处于搜索结果，又重新进行输入时候。需要搜索结果为假，当光标聚焦时候判断是否有内容，有就是联想记忆 -->
        <!-- 搜索结果 -->
        <search-result v-if="isResultShow" />
        <!-- /搜索结果 -->

        <!-- 联想记忆 -->
        <search-suggestion v-else-if="searchText" :search-text="searchText" />


        <!-- /联想记忆 -->

        <!-- 搜索历史记录 -->
        <search-history v-else />
        <!-- /搜索历史记录 -->


    </div>
</template>

<script>
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
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        onSearch(val) {
            console.log(val)
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
    .van-search__action {
        color: #fff;
    }
}
</style>