<!--  -->
<template>
    <div class="change-username">
        <van-nav-bar title="编辑昵称" right-text="提交" left-arrow @click-left="$emit('close')" @click-right="updateName" />
        <div class="field">
            <van-field v-model.trim()="localName" autosize type="textarea" maxlength="7" placeholder="请输入昵称"
                show-word-limit />
        </div>




    </div>
</template>

<script>
import { updateInfo } from '@/api/user.js'
export default {
    name: 'ChangeUserName',
    components: {},
    props: {
        value: {
            type: [Object, String, Number],
            requried: true,
        }
    },
    data() {
        return {
            localName: this.value
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async updateName() {
            this.$toast.loading({
                message: '更新中',
                forbidclick: true,//禁止背景点击
                duration: 0,//持续展示

            })
            //1.先判断用户名不能为空
            if (!this.localName.length) {
                this.$toast('昵称不能为空')
                return
            }
            try {
                await updateInfo({
                    name: this.localName
                })
                //2.更新视图
                this.$emit('input', this.localName)
                //3.关闭弹出层
                this.$emit('close')
                this.$toast.success('更新成功')
            } catch (err) {
                console.log(err)
                this.$toast.fail('修改失败，请稍后再试')
            }
        }
    },
}
</script>
<style scoped lang="less">
.change-username {
    /deep/ .van-nav-bar__text {
        color: red
    }

    .field {
        padding: 10px;

    }

}
</style>