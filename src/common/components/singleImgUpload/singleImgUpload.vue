
<template>
	<section>
		<el-upload class="singleImgUpload" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="imgUploadSuccess" :before-upload="imgBeforeUpload">
			<img v-if="spreadPic != ''" :src="spreadPic">
			<span v-else>
				<i class="el-icon-upload"></i>
				<p>点击上传</p>
			</span>
		</el-upload>
		<em class="singlePreview" v-if="spreadPic != ''" @click="previewShow">预览</em>
	</section>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class SingleImgUpload extends Vue {
        private spreadPic: string = 'http://files.eyee.com/Shop/system/main/63382abb5b7e4bed9025729a26554938.jpeg';

        @Prop() private msg: string;
        @Prop() private imgVisible: boolean;

        // 上传之前
        private imgBeforeUpload(file: any) {
            if (/^image/.test(file.type)) {
                const size = Math.floor(file.size / 1024);
                if (size > 2000) {

                    this.$message.error('文件过大！请控制图片大小在2M以内');
                    return false;
                }
            } else {
                this.$message.error('请上传图片文件，文件支持JPG,PNG,JPEG格式！');
                return false;
            }
        }

        private imgUploadSuccess(response: any, file: any, fileList: any) {
            this.spreadPic = response.key;
            this.$emit('uploadEnd', this.spreadPic);
        }

        private previewShow() {
            this.$emit('previewShow', this.spreadPic);
        }
    }
</script>

<style scoped lang="scss">
</style>
