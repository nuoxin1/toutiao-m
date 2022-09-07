<template>
    <van-cell class="comment-item">
        <van-image slot="icon" class="avatar" round fit="cover" :src="comment.aut_photo" />
        <div slot="title" class="title-wrap">
            <div class="user-name">{{ comment.aut_name }}</div>
            <van-button :class="{ liked: comment.is_liking }" :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
                @click="onCommentLike" :loading="loading">{{
                comment.like_count || '赞'
                }}
            </van-button>
        </div>

        <div slot="label">
            <p class="comment-content">{{ comment.content }}</p>
            <div class="bottom-info">
                <span class="comment-pubdate">{{ comment.pubdate | relativeTime }}</span>
                <van-button class="reply-btn" round @click="$emit('reply-click',comment)">回复 {{ comment.reply_count }}
                </van-button>
            </div>
        </div>
    </van-cell>
</template>

<script>
import { deleteCommentLike, addCommentLike } from '@/api/comment'
export default {
    name: 'CommentItem',
    components: {},
    props: {
        comment: {
            type: Object,
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
        async onCommentLike() {
            this.loading = true

            try {
                //1.判断是不是点赞了。是点赞状态就取消操作
                if (this.comment.is_liking) {
                    await deleteCommentLike(this.comment.com_id)
                    this.comment.like_count--
                } else {
                    //2.不是点赞状态就进行点赞操作
                    await addCommentLike(this.comment.com_id)
                    this.comment.like_count++
                }
                this.comment.is_liking = !this.comment.is_liking
                this.loading = false
            } catch (err) {
                this.$toast('操作失败，请稍后再试')
                console.log(err)
            }
            this.loading = false
        }
    }
}
</script>

<style scoped lang="less">
.comment-item {
    .avatar {
        width: 72px;
        height: 72px;
        margin-right: 25px;
    }

    .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user-name {
            color: #406599;
            font-size: 26px;
        }
    }

    .comment-content {
        font-size: 32px;
        color: #222222;
        word-break: break-all;
        text-align: justify;
    }

    .comment-pubdate {
        font-size: 19px;
        color: #222;
        margin-right: 25px;
    }

    .bottom-info {
        display: flex;
        align-items: center;
    }

    .reply-btn {
        // width: 135px;
        height: 48px;
        line-height: 48px;
        font-size: 21px;
        color: #222;
    }

    .like-btn {
        height: 30px;
        padding: 0;
        border: none;
        font-size: 19px;
        line-height: 30px;
        margin-right: 7px;

        .van-icon {
            font-size: 30px;
        }

        &.liked {
            color: #e5645f
        }
    }
}
</style>
