<!--  -->
<template>
    <van-button :icon="value === 1 ? 'good-job' : 'good-job-o'" :class="{ liked: value === 1 }" @click="onLiked"
        :loading=loading />
</template>

<script>
import { deleteLike, addLike } from '@/api/article'
export default {
    name: 'LikeArticle',
    components: {},
    props: {
        value: {
            type: Number,
            requried: true,
        },
        articleId: {
            type: [String, Array, Number],
            requried: true,
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onLiked() {
            this.loading = true
            try {
                let status = -1
                if (this.value === 1) {
                    //value为真，就是取消点赞

                    await deleteLike(this.articleId)

                } else {
                    //没有收藏就收藏
                    await addLike(this.articleId)
                    status = 1
                }
                //更新视图
                this.$emit('input', status)
                this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')

            } catch (err) {
                console.log(this.articleId)
                this.$toast('请求失败，请稍后再试')
                console.log(err)
            }
            this.loading = false
        }
    },
}
</script>
<style scoped lang="less" >
.liked {
    .van-icon {
        color: #e5645f
    }
}
</style>