<template>
    <div class="comment-post">
        <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50"
            placeholder="请输入留言" show-word-limit />
        <van-button class="post-btn" @click="onAddComment" :disabled="!message.length">发布</van-button>
    </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
    name: 'CommentPost',
    components: {},
    props: {
        target: {
            type: [String, Number, Object],
            required: true,
        }
    },
    inject: ['articleId'],
    data() {
        return {
            message: ''
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onAddComment() {
            this.$toast.loading({
                message: '发布中',
                forbidClick: true,//禁用背景点击
                duration: 0,//持续时间，默认2000,0表示持续展示不关闭。

            })
            try {
                const { data } = await addComment({
                    target: this.target.toString(),
                    content: this.message,
                    art_id: this.articleId ? this.articleId.toString() : null,
                })
                this.$toast('发布成功')
                //1.关闭弹出层
                this.$emit('post-success', data.data)

                //3.清空文本框
                this.message = ''
                this.$toast.success('发布成功')

            } catch (err) {
                this.$toast.fail('发布失败')

            }
        }
    }
}
</script>

yle scoped lang="less">
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;

    .post-field {
        background-color: #f5f7f9;
    }

    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;

        &::before {
            display: none;
        }
    }
}
</style>
