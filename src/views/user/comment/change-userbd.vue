<!--  -->
<template>
    <div class="change-userbd">
        <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
            @cancel="$emit('close')" @confirm="onConfirm" />
        <!-- 取消事件叫cancel  确认事件comfirm-->
    </div>
</template>

<script>
import { updateInfo } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
    name: 'ChangeUseBd',
    components: {},
    props: {
        value: {
            type: String,
            requried: true,
        }
    },
    data() {
        return {
            minDate: new Date(1968, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value) //用JS原生的new Date()方法可以根据日期转化成时间格式。
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() { },
    methods: {
        async onConfirm() {

            this.$toast.loading({
                message: '更新中',
                forbidclick: true,//禁止背景点击
                duration: 0,//持续展示

            })
            try {
                const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
                //利用dayjs（）的format()方法转换时间格式。
                await updateInfo({
                    birthday: currentDate,
                })
                console.log();
                //2.更新视图

                this.$emit('input', currentDate)
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
<style >

</style>