<template>
    <div class="comment-reply">
        <!-- 导航栏 -->
        <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` :'暂无回复'">
            <van-icon slot="left" name="cross" @click="$emit('click-close')" />
        </van-nav-bar>
        <!-- /导航栏 -->
        <div class="sroll-wrap">

            <!-- 当前评论项 -->
            <comment-item :comment="comment" />
            <!-- /当前评论项 -->

            <van-cell title="全部回复" />

            <!-- 评论的回复列表 -->
            <comment-list :source="comment.com_id" type="c" :list="commentList" />
            <!-- /评论的回复列表 -->

        </div>
        <!-- 底部 -->
        <div class="post-wrap">
            <van-button size="small" round class="post-btn" @click="isPostShow=true">写评论</van-button>
        </div>
        <!-- /底部 -->
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
            <comment-post :target="comment.com_id" @post-success="OnPostSuccess" />
        </van-popup>
        <!-- 发布评论 /-->

    </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './conment-list..vue'
import CommentPost from './comment-post.vue'
export default {
    name: 'CommentReply',
    components: {
        CommentItem,
        CommentList,
        CommentPost,
    },

    props: {
        comment: {
            type: Object,
            requried: true,
        }
    },
    data() {
        return {
            isPostShow: false,
            commentList: []//评论回复列表. 通过父子绑定，建立联系，互相都共享。从而获取到子级的数据。
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        OnPostSuccess(data) {

            // 刚更回复的数量
            this.comment.reply_count++
            //关闭弹层
            this.isPostShow = false
            //将最新的类容展示到列表的最前面
            this.commentList.unshift(data.new_obj)



        }
    }
}
</script>

<style scoped lang="less">
.sroll-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}

.post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    .post-btn {
        width: 60%;
        border-top: 1px #d8d8d8 solid;
    }

}
</style>
