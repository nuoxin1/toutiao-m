<!--  -->
<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button type="danger" plain size="mini" round class="edit-btn" @click="isEdit = !isEdit">{{  isEdit ===
            true
            ? "完成" : "编辑"































                }}</van-button>

        </van-cell>
        <van-grid :gutter="10" class="my-grid">
            <van-grid-item v-for="(channel, index) in myChannels" :key="index" class="grid-item"
                @click="onMyChannelClick(channel, index)">
                <span slot="text" class="text" :class="{ active: index === active }">
                    {{  channel.name  }}
                </span>
                <van-icon slot="icon" name="clear" class="van-icon"
                    v-show="isEdit && !fiexChannels.includes(channel.id)" />
            </van-grid-item>


        </van-grid>

        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div slot="title">频道推荐</div>


        </van-cell>
        <van-grid :gutter="10" class="recommend-grid">
            <van-grid-item v-for="(channel, index) in recommendChannels" :key="index" icon="plus" :text="channel.name"
                class="grid-item" @click="onAddChannel(channel)" />
        </van-grid>
        <!-- /频道推荐 -->
    </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";
import { mapState } from "vuex";

export default {
    name: 'ChannelEdit',
    components: {},
    props: {
        myChannels: {
            type: Array,
            requried: true,

        },
        active: {
            type: Number,
            requried: true,

        }
    },
    data() {
        return {
            allChannels: [],
            isEdit: false,
            fiexChannels: [0],//固定频道，不允许删除
        }
    },
    computed: {
        ...mapState(['user']),
        recommendChannels() {
            //思路，推荐频道=所有频道-我的频道
            //数组的fiter()方法遍历数组，根据函数返回值决定是否收集遍历项
            //返回值：一个数组。所有条件为true的元素。
            return this.allChannels.filter(channel => {   // fiter 遍历数组，筛选出符合条件的组成新数组。条件是 true
                return !this.myChannels.find(myChannel => {  //find 查找符合函数的条件的值, ！是取反。取不是一样的值
                    return myChannel.id === channel.id
                })
            })

        }

    },
    watch: {},
    created() {
        this.loadAllChannels()
    },
    mounted() { },
    methods: {
        async loadAllChannels() {
            try {
                const { data } = await getAllChannels()
                this.allChannels = data.data.channels
                console.log(data.data.channels)
            } catch (err) {
                console.log(err)
                this.$toast('获取所有频道失败')
            }
        },
        onAddChannel(channel) {
            this.myChannels.push(channel)

        },
        onMyChannelClick(channel, index) {
            if (this.isEdit) {
                // 1. 如果是固定频道，则不删除, true 直接返回。
                if (this.fiexChannels.includes(channel.id)) {
                    return
                }
                // 2. 删除频道项
                this.myChannels.splice(index, 1)

                // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
                // 参数1：要删除的元素的开始索引（包括）
                // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
                if (index <= this.active) {
                    // 让激活频道的索引 - 1,因为active 在父组件中，所有不能直接改变，需要用$emit通知。

                    this.$emit('update-active', this.active - 1, true)
                }
                if (this.user) {
                    //已登录，把数据请求接口放到线上
                }


                // 4. 处理持久化

            } else {
                // 非编辑状态，执行切换频道
                this.$emit('update-active', index, false)
            }
        }
    }
}




</script>
<style scoped lang="less" >
.channel-edit {
    padding: 85px 0;
}

.title-text {
    font-size: 32px;
    color: #333333;
}

.edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;

}

/deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
        background-color: #f4f5f6;

        .van-grid-item__text,
        .text {
            font-size: 28px;
            color: #222;
            margin-top: 0;
        }

        .active {
            color: red
        }

        .van-grid-item__icon-wrapper {
            position: unset;
        }
    }
}

/deep/ .my-grid {
    .grid-item {
        .van-icon {
            position: absolute; //相对定位，不脱表
            top: -10px;
            right: -10px;
            font-size: 30px;
            color: #cacaca;
            z-index: 2; //图层的层级为第二级
        }
    }


}

/deep/ .recommend-grid {
    .grid-item {
        .van-grid-item__content {
            white-space: nowrap; // 禁止折行
            flex-direction: row;

            .van-icon-plus {
                font-size: 28px;
                margin-right: 6px;
            }

            // .van-grid-item__text {
            //     margin-top: 0;
            // }
        }

    }

}
</style>