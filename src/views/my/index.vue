<!--  -->
<template>
    <div class="my-container">
        <!-- 用户已登录 -->
        <div v-if="user" class="header user-info">
            <div class="base-info">
                <div class="left">
                    <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" class="avatar" round fit="cover" />
                    <span class="name">{{ userInfo.name }}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round to="/user">编辑资料</van-button>
                </div>
            </div>
            <div class="data-stats">
                <div class="data-item">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">头条</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">关注</span>
                </div>

                <div class="data-item">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">粉丝</span>
                </div>

                <div class="data-item">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">获赞</span>
                </div>


            </div>


        </div>
        <!-- 用户未登录 -->
        <div v-else class="header not-login">
            <div class="login-btn" @click="$router.push('/login')">
                <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
                <span class="text">登录/注册</span>
            </div>
        </div>

        <!--  -->
        <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="iconfont icon-shoucang "></i>
                <span class="text" slot="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="iconfont icon-lishi"></i>
                <span class="text" slot="text">历史</span>
            </van-grid-item>
        </van-grid>
        <!-- 小智同学 -->
        <van-cell-group>
            <van-cell title="消息通知" is-link />
            <van-cell title="小智同学" is-link class="md9" />
            <van-cell v-if="user" title="退出登录" class="laout-cell" @click="onLogout" clickable />
        </van-cell-group>
        <!--  -->

    </div>




</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
import { Dialog } from 'vant';

// Dialog({ message: '提示' });
export default {
    name: 'MyIndex',
    components: {},
    props: {},
    data() {
        return {
            userInfo: {} // 用户信息
        }
    },
    computed: {
        ...mapState(['user'])
    },
    watch: {},
    created() {
        // 初始化的时候，如果用户登录了，我才请求获取当前登录用户的信息
        if (this.$store.state.user) {
            this.loadUser()
        }
    },
    mounted() { },
    methods: {
        async loadUser() {
            try {
                const { data } = await getUserInfo()

                console.log(data.data)
                this.userInfo = data.data
            } catch (err) {
                this.$toast('获取数据失败')
                this.$router.push('/login')
            }
        },
        onLogout() {
            Dialog.confirm({
                title: '退出提示',
                message: '确认退出吗？',
            })  //确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
                .then(() => {
                    this.$store.commit('setUser', null)
                })
                .catch(() => {
                    return
                });
        },

    },
}
</script>
<style  scoped lang="less">
.my-container {
    .header {
        height: 361px;
        background: url('~@/assets/banner.png');
        background-size: cover;

    }

    .not-login {
        display: flex;
        justify-content: center; //水平剧中
        align-items: center; //垂直居中
    }

    .login-btn {

        display: flex;
        flex-direction: column; //两个元素垂直排列
        justify-content: center; //水平剧中
        align-items: center; //垂直居中

        .mobile-img {
            width: 132px;
            height: 132px;
            margin-bottom: 15px;
        }

        .text {
            font-size: 28px;
            color: #fff;
        }
    }

    .user-info {
        .base-info {
            height: 231px;
            padding: 76px 32px 23px;
            box-sizing: border-box; // 高度包含padding 跟broder
            display: flex;
            justify-content: space-between; //水平方向，互相用空间
            align-items: center; //水平居中

            .left {
                display: flex;
                // justify-content: center;
                align-items: center; //垂直居中
                // flex-direction: column;

                .avatar {
                    width: 132px;
                    height: 132px;
                    margin-right: 23px;
                    border: 4px solid #fff;
                }

                .name {
                    font-size: 30px;
                    color: #fff;
                }
            }
        }

        .data-stats {
            // height: 130px;

            display: flex;


            .data-item {
                height: 130px;
                flex: 1;
                display: flex;
                flex-direction: column; //垂直排列
                justify-content: center; //水平居中
                align-items: center; //垂直居中

                .count {
                    font-size: 36px;
                }

                .text {
                    font-size: 23px;
                }
            }
        }
    }

    .grid-nav {
        .grid-item {
            height: 141px;

            i.iconfont {
                font-size: 45px;
            }

            .icon-shoucang {
                color: #eb5253;
            }

            .icon-lishi {
                color: #ff9d1d;
            }

            span.text {
                font-size: 28px;
            }
        }
    }

    .laout-cell {
        text-align: center; //文本居中
        color: #e28c8c;
    }

    .md9 {
        margin-bottom: 9px;
    }
}
</style>