<!--  -->
<template>
    <div class="user-container">
        <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" class="user-nav" />
        <!-- 个人信息 -->
        <div>
            <input type="file" hidden ref="file" @change="onFileChange" />
            <!-- hidden 隐藏了.点击头像，通过ref获取到DOM，再让其点击click() -->
            <van-cell title="头像" is-link @click="$refs.file.click()">
                <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
            </van-cell>
            <van-cell title="昵称" is-link :value="userInfo.name" @click="userNameIsShow = true" />
            <van-cell title="简介" is-link :value="userInfo.intro" @click="userIntroIsShow = true" />
            <div class="user-sex">
                <van-cell title="性别" is-link :value="userInfo.gender=== 1? '女': '男' " @click="userSexIsShow = true" />
                <van-cell title="生日" is-link :value="userInfo.birthday" @click="userBdIsshow = true" />
            </div>

            <!-- 个人信息/ -->
            <!-- 昵称修改 -->
            <van-popup v-model="userNameIsShow" position="bottom" :style="{ height: '100%' }">
                <change-user-name @close="userNameIsShow = false" v-model="userInfo.name" v-if="userNameIsShow" />
            </van-popup>
            <!-- 昵称修改 /-->
            <!--简介修改 -->
            <van-popup v-model="userIntroIsShow" position="bottom" :style="{ height: '100%' }">
                <change-user-intro @close="userIntroIsShow = false" v-model="userInfo.intro" v-if="userIntroIsShow" />
            </van-popup>
            <!--简介修改、 -->
            <!-- 性别修改 -->
            <van-popup v-model="userSexIsShow" position="bottom">
                <change-user-sex @close="userSexIsShow = false" v-model="userInfo.gender" v-if="userSexIsShow" />
            </van-popup>
            <!-- 性别修改/ -->
            <!-- 生日修改 -->
            <van-popup v-model="userBdIsshow" position="bottom">
                <change-user-bd @close="userBdIsshow = false" v-model="userInfo.birthday" v-if="userBdIsshow" />
            </van-popup>
            <!-- 生日修改/ -->
            <!-- 编辑头像 -->
            <van-popup v-model="userPhtoIsshow" position="bottom" style="height:100%;">
                <!-- <change-user-bd @close="userBdIsshow = false" v-model="userInfo.birthday" v-if="userBdIsshow" /> -->
                <change-user-phto :img="img" @close="userPhtoIsshow = false" @updatePhoto="userInfo.photo= $event"
                    v-if="userPhtoIsshow" />
            </van-popup>
            <!-- 编辑头像/ -->




            <!-- 退出登录 -->
            <div>
                <van-button v-on:click="onLogout">退出登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { getUerPerInfo } from '@/api/user.js'
import ChangeUserName from './comment/change-uername.vue'
import ChangeUserIntro from './comment/change-userintro.vue'
import ChangeUserSex from './comment/change-usersex.vue'
import ChangeUserBd from './comment/change-userbd.vue'
import ChangeUserPhto from './comment/change-userphto.vue'
export default {
    name: '',
    components: {
        ChangeUserName,
        ChangeUserIntro,
        ChangeUserSex,
        ChangeUserBd,
        ChangeUserPhto,

    },
    props: {},
    data() {
        return {
            userInfo: [],
            userNameIsShow: false,
            userIntroIsShow: false,//简介弹出状态管理
            userSexIsShow: false,// 性别修改弹出状态
            userBdIsshow: false, //生日修改弹出状态
            userPhtoIsshow: false,//修改照片弹出状态
            img: null,//预览的图片
        }
    },
    computed: {},
    watch: {},
    created() {
        this.loaduserInfo()
    },
    mounted() { },
    methods: {
        //获取用户信息
        async loaduserInfo() {
            try {
                const { data } = await getUerPerInfo()
                this.userInfo = data.data

            } catch (err) {
                console.log(err)
                this.$toast('获取用户个人信息失败')
            }



        },
        onFileChange() {
            //获取文件对象,就是拿到file里面的files[0]，第一个。
            const file = this.$refs.file.files[0]
            //基于文章对象获取blob数据拿到Src
            //利用winow.URL的createobjectURL()方法，拿到数据。
            this.img = window.URL.createObjectURL(file)
            //展示预览的弹出层
            this.userPhtoIsshow = true
            //file-input 如果选择了同一个文件 ，不会触发change事件.
            //解决办法就是每次使用后，就把它的value清空  this.$refs.file的value清空
            this.$refs.file.value = ''
        },


        // 退出登录
        onLogout() {
            Dialog.confirm({
                title: '退出提示',
                message: '确认退出吗？',
            })  //确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
                .then(() => {
                    this.$store.commit('setUser', null)
                    this.$router.push('/my')

                })
                .catch(() => {
                    return
                });
        },
    },
}
</script>
<style scoped lang="less" >
.user-container {
    background-color: #f8f8f8;

    /deep/ .van-nav-bar .van-icon {
        color: black;
    }

    .avatar {
        height: 60px;
        width: 60px;
    }

    .user-nav {
        width: 100%;

    }

    .user-sex {
        margin-top: 30px;
    }

    .van-button {
        position: fixed;
        bottom: 37px;
        left: 0;
        right: 0;

        color: #fc6627;
        font-size: 30px;
        background-color: #f8f8f8;
    }

    .van-popup {
        background-color: #f5f7f9;
    }

}
</style>