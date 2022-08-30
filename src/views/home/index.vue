<!--  -->
<template>
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed style="background-color:#3296fa;">
            <!-- <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索
            </van-button> -->
            <van-button type="info" class="search-btn cover" slot="title" size="small" icon="search" round>
                搜索
            </van-button>
        </van-nav-bar>
        <!-- /导航栏 -->
        <!-- 频道列表 -->
        <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
        <!-- 通过 sticky 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。 -->
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
            <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
                <!-- 文章列表 -->
                <article-list ref="article-list" :channel="channel" />
                <!-- 文章列表 -->
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow = true">
                <i class="iconfont icon-shanchu"></i>
            </div>

        </van-tabs>
        <!-- 频道列表 -->
        <!-- 频道弹出层 -->

        <van-popup v-model="isChennelEditShow" closeable position="bottom" :style="{ height: '100%' }"
            close-icon-position="top-left">

            <channel-edit :myChannels="channels" :active="active" @update-active="onUpdateActive" />
        </van-popup>
        <!-- 频道弹出层 -->
    </div>
</template>

<script>
import { getUserChannels, } from '@/api/user'
import articleList from './components/article-list'
import ChannelEdit from './components/channel-edit.vue'


export default {
    name: 'HomeIndex',
    components: {
        articleList,
        ChannelEdit,

    },

    data() {
        return {
            active: 0,
            channels: [],
            isChennelEditShow: false // 控制编辑频道弹出层的展示状态

        }
    },
    computed: {},
    watch: {},
    created() {
        this.loadChannels()
    },
    mounted() { },
    methods: {
        async loadChannels() {

            try {
                const { data } = await getUserChannels()
                console.log(data.data.channels)
                this.channels = data.data.channels

            } catch (err) {
                this.$toast('获取列表失败')
            }
        },
        onUpdateActive(index, isChennelEditShow = true) {

            this.active = index
            this.isChennelEditShow = isChennelEditShow  //里面传值，默认状态为true
        }
    }
}

</script>
<style scoped lang="less">
.home-container {
    padding-bottom: 100px;
    padding-top: 174px;

    ::v-deep .van-nav-bar__title {

        max-width: unset;
    }





    .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        // max-width: 100%;

        .van-icon {
            font-size: 32px;
        }

    }

    .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
    }

    ::v-deep .channel-tabs {
        height: 82px;

        .van-tab {
            border-right: 1px solid #edeff3;
            min-width: 200px;
            font-size: 30px;
            color: #777777
        }

        .van-tabs__wrap {
            position: fixed;
            top: 92px;
            z-index: 1;
            left: 0;
            right: 0;
            height: 82px;
        }


        .van-tab--active {
            color: #333333;
        }

        .van-tabs__line {
            width: 31px;
            height: 6px;
            background-color: #3296fa;
            margin-bottom: 8px;
        }
    }

    .hamburger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        background-color: #fff;
        background-color: rgba(255, 255, 255, 0.902);

        i.iconfont {
            font-size: 33px;
        }

        &:before {
            content: "";
            position: absolute;
            left: 0;
            width: 1px;
            height: 100%;
            background-image: url(~@/assets/gradient-gray-line.png);
            background-size: contain;
        }


    }


}
</style>