<!--  -->
<template>

    <van-cell class="article-item" :to="`/article/${article.art_id}`">
        <!-- :to 是动态路由，后面地址要拼接上文章ID -->
        <!-- 或者第二种方法 :to后面接一各对象，name 跟里面params 跟路由设置里面的一样
        :to="{
         name:article,
         params:{
            articleId:article.art_id，
         }
        }"
        -->
        <div slot="title" class="title van-multi-ellipsis--l2">
            {{ article.title }}
        </div>
        <div slot="label">
            <div class="cover-warp" v-if="article.cover.type === 3">

                <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">

                    <van-image :src="img" fit="cover" class="cover-item-img" />
                </div>

            </div>
            <div class="label-info-wrap">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}评论</span>
                <span>{{ article.pubdate | relativeTime }}</span>

            </div>
        </div>

        <van-image v-if="article.cover.type === 1" slot="default" class="right-cover" fit="cover"
            :src="article.cover.images[0]" />

    </van-cell>





</template>

<script>
export default {
    name: 'ArticleItem',
    components: {},
    props: {
        article: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {},
}
</script>
<style scoped lang="less">
.article-item {
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }

    .van-cell-value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }

    .right-cover {
        width: 232px;
        height: 146px;

    }

    .label-info-wrap span {

        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;

    }

    .cover-warp {
        display: flex;
        padding: 30px 0;
    }

    .cover-item {
        flex: 1;
        height: 146px;
    }

    .cover-warp {
        display: flex;
        padding: 30px 0;

        .cover-item {
            flex: 1;
            height: 146px;

            &:not(:last-child) {
                padding-right: 4px;
            }

            .cover-item-img {
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>