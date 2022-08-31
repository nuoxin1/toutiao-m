<!--  -->
<template>
    <div class="search-suggestion">
        <van-cell title="he" icon="search" />
        <van-cell title="he" icon="search" />
        <van-cell title="he" icon="search" />
        <van-cell title="he" icon="search" />






    </div>
</template>

<script>

export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
        searchText: {
            type: String,
            requried: true,
        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {
        searchText: {
            //当searchText发生改变时候，就会调用handler函数
            //handler函数名是固定的。
            handler(value) {
                console.log(value)
            },
            immediate: true //该回调将会在侦听开始之后被立即调用
        }
    },
    created() { },
    mounted() { },
    methods: {},
}
</script>
<style scoped lang="less">
</style>