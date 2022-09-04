<!--  -->
<template>
    <van-button :icon="value ? 'star' : 'star-o'" :class="{ collected: value }" @click="onCollect" :loading=loading />
</template>

<script>
import { deleteCollect, addCollect } from '@/api/article'
export default {
    name: 'CollectArticle',
    components: {},
    props: {
        value: {
            type: Boolean,
            requried: true,
        },
        articleId: {
            type: [String, Array, Number],
            requried: true,
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onCollect() {
            this.loading = true
            try {
                if (this.value) {
                    //value为真，就是取消收藏
                    await deleteCollect(this.articleId)

                } else {
                    //没有收藏就收藏
                    await addCollect(this.articleId)

                }
                //更新视图
                this.$emit('input', !this.value)
                this.$toast.success(!this.value ? '收藏成功' : '取消收藏')

            } catch (err) {
                this.$toast('请求失败，请稍后再试')
            }
            this.loading = false
        }
    },
}
</script>
<style scoped lang="less" >
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>