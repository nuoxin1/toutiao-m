<!--  -->
<template>
    <div class="change-userintro">
        <van-nav-bar title="编辑简介" right-text="提交" left-arrow @click-left="$emit('close')" @click-right="updateName" />
        <div class="field">
            <van-field v-model.trim()="localIntro" autosize type="textarea" maxlength="100" placeholder="请输入简介"
                show-word-limit />
        </div>

    </div>
</template>

<script>
import { updateInfo } from '@/api/user.js'
export default {
    name: 'ChangeUserIntro',
    components: {},
    props: {
        value: {
            type: [Object, String, Number],
            requried: true,
        }
    },
    data() {
        return {
            localIntro: this.value
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
            try {
                await updateInfo({
                    intro: this.localIntro
                })
                //2.更新视图
                this.$emit('input', this.localIntro)
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
<style scoped lang="less" >
.change-userintro {
    /deep/ .van-nav-bar__text {
        color: red
    }
}
</style>