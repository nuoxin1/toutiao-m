<!--  -->
<template>
    <div class="change-uersex">
        <van-picker title="标题" show-toolbar :columns="columns" @cancel="$emit('close')" @confirm="onConfirm"
            @change="onChange" />
    </div>
</template>

<script>
import { updateInfo } from '@/api/user.js'
export default {
    name: 'ChangeUserSex',
    components: {},
    props: {
        value: {
            type: Number,
            requried: true,
        }
    },
    data() {
        return {
            columns: ["男", "女"],
            localGender: this.value


        }
    },
    computed: {


    },
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onConfirm() {

            this.$toast.loading({
                message: '更新中',
                forbidclick: true,//禁止背景点击
                duration: 0,//持续展示

            })
            try {
                const localGender = this.localGender
                await updateInfo({
                    gender: localGender
                })
                console.log(this.localGender);
                //2.更新视图

                this.$emit('input', this.localGender)
                //3.关闭弹出层
                this.$emit('close')
                this.$toast.success('更新成功')
            } catch (err) {
                console.log(err)
                this.$toast.fail('修改失败，请稍后再试')
            }
        },
        onChange(picker, value, index) {
            console.log(index)
            this.localGender = index
        },
        // onConfirm(value, index) {
        //     this.$toast(`当前值：${value}, 当前索引：${index}`);
        // },

        // onCancel() {
        //     this.$toast('取消');
        // },
    },

}
</script>
<style >

</style>