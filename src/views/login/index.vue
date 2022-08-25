<template>
    <div>
        <van-nav-bar class="page-nav-bar" title="登录" style="background-color:#3296fa ;">
            <van-icon slot="left" name="cross" class="cross" @click="$router.back()" />
        </van-nav-bar>


        <van-form @submit="onSubmit" ref="loginFrom">

            <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFromRoutes.mobile">
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>

            <van-field name="code" placeholder="请输入验证码" :rules="userFromRoutes.code" v-model="user.code">
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <van-count-down :time="1000 * 10" format="ss s" v-if="isCountDownShow"
                        @finish="isCountDownShow = false" />
                    <van-button v-else size="small" type="default" round class="send-sms-btn" @click="onSendSms"
                        native-type="button">发送验证码
                    </van-button>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
    name: 'LoginPage',
    components: {},
    props: {},
    data() {
        return {
            isCountDownShow: false,
            username: '',

            user: {
                mobile: "",
                code: " ",
            },
            userFromRoutes: {
                mobile: [
                    {
                        required: true,
                        message: '手机号不能为空'
                    },
                    {
                        pattern: /^1[3|5|7|8]\d{9}$/,
                        message: '手机号格式错误'
                    }

                ],
                code: [
                    {
                        required: true,
                        message: '请输入手机号'
                    },
                    {
                        pattern: /\d{6}/,
                        message: '验证码格式错误'
                    },
                ]
            }
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onSubmit(values) {
            // 1.获取表单数据
            // const user = this.user
            //2.表单验证
            this.$toast.loading({
                message: "登录中",
                forbidClick: true,
                duration: 2000,  //持续时间，默认是2000,如果为0，持续展示
            });
            //3.提交表单请求登录
            try {
                const res = await login(this.user)
                console.log('登录成功', res)
                this.$store.commit('setUser', res.data.data) // 教程里面是data.data,实际访问必须是res.data.data 

                this.$toast.success('登录成功')
                this.$router.back()

            } catch (err) {


                if (err.response.status === 400) {
                    console.log('登录失败', err)
                    this.$toast.fail('登录失败，请稍后再试')   //fail 是失败后的
                }
            }
        },
        async onSendSms() {
            // 1. 校验手机号
            try {
                await sendSms(this.user.mobile)
                this.$toast('发送成功')
            } catch (err) {
                // 发送失败，关闭倒计时
                this.isCountDownShow = false
                if (err.response.status === 429) {
                    this.$toast('发送太频繁了，请稍后重试')
                } else {
                    this.$toast('发送失败，请稍后重试')
                }
            }
        }
    },
}

</script>

<style scoped lang="less">
.login-container {
    .iconfont {
        font-size: 37px;
    }

    .send-sms-btn {
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666;
    }

    .login-btn-wrap {
        padding: 53px 33px;

        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }

}

.page-nav-bar {
    .cross {
        color: #fff;
    }
}
</style>
