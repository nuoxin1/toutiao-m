<!--  -->
<template>
    <div class="update-photo">
        <img :src="img" alt="" class="img" ref="img" />
        .
        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="comfirm" @click="onComfirm">完成</div>
        </div>

    </div>


</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
import { updatePhoto } from '@/api/user.js'
export default {
    name: 'ChangeUserPhto',
    components: {},
    props: {
        img: {
            type: [String, Object],
            requried: true,
        }
    },
    data() {
        return {
            cropper: null, //截取区域
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1, //查看模式， 0 可以拖动画布外
            dragMode: 'move',// 拖动模式，  Crop 跟move，后面图片拖动
            aspectRatio: 1, //截图的比例 。默认是16/9
            autoCropArea: 1, //自动截取区
            cropBoxMovable: false, //截图区域是否可以移动
            cropBoxResizable: false, //截图区域的缩放
            background: false, //背景
            movable: true //画布是否可以移动

        })

    },
    methods: {
        onComfirm() {

            //基于服务端的裁切使用getData方法获取裁切的参数
            // console.log(this.cropper.getData()); 
            //纯客户端的裁切使用 getCroppedCancas().toBlob()
            this.cropper.getCroppedCanvas().toBlob(blob => {
                this.updatePhoto(blob)
            })
        },
        async updatePhoto(blob) {

            this.$toast.loading({
                message: '更新中',
                forbidclick: true,//禁止背景点击
                duration: 0,//持续展示
            })
            try {
                //如果接口要求是参数application/json，则是JavaScript对象
                // updatePhoto({
                //     photo:blob
                // })
                //如果接口要求是Content-Type 参数是multipart/form-data 则要求你必须传递FormData对象
                const formData = new FormData()
                formData.append('photo', blob)
                const { data } = await updatePhoto(formData)
                //关闭弹出层
                this.$emit('close')
                //更新视图
                this.$emit('updatePhoto', data.data.photo)
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
.update-photo {
    background-color: #000;
    height: 100%;

    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;

        .cancel {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

        .comfirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }

    .img {
        display: block;
        max-width: 100%;


    }
}
</style>