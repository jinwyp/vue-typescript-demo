<template>
	<section>
		<navigation></navigation>
        <div class="tabel-con">
            <el-form :model="addForm" label-width="140px" :rules="addFormRules" ref="addForm" class="mar-t-20">
                <el-form-item label="分销渠道" prop="name">
                    <el-select clearable placeholder="请选择" v-model="addForm.type" style="width:70%">
                        <el-option label="B端" value="1"></el-option>
                        <el-option label="C端" value="2"></el-option>
                        <el-option label="全部" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品ID" prop="businessId">
                    <el-input v-model.trim="addForm.businessId" auto-complete="off" style="width:70%" placeholder="请输入" ></el-input>
                    &nbsp;&nbsp;<el-button type="primary" v-on:click="findGoods" size="mini">查询</el-button>
                </el-form-item>
                <el-form-item label="商品编号" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商家" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="售价(元)" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="总销量" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="注水" prop="name">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="公众号文章链接">
                    <el-input v-model.trim="addForm.name" auto-complete="off" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="推广图片" prop="name" v-if="addForm.type==1 || addForm.type==3">
                    <single-img-upload @previewShow="previewShow" @uploadEnd="uploadEnd"></single-img-upload>
                    <el-input auto-complete="off" v-model.trim="addForm.spreadPic" v-show="false"></el-input>
    
                </el-form-item>
                <el-form-item label="C端分佣设置" prop="name" v-if="addForm.type==2 || addForm.type==3">
                    <el-row>
                        <el-col :span="12">
                            <p>一级分销：</p>
                            <table class="distributionTable">
                                <tr>
                                    <th>一级分佣(%)</th>
                                </tr>
                                <tr>
                                    <td><el-input v-model.trim="addForm.name" ></el-input></td>
                                </tr>
                            </table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <p>二级分销：</p>
                            <table class="distributionTable">
                                <tr>
                                    <th>一级分佣(%)</th>
                                    <th>二级分佣(%)</th>
                                </tr>
                                <tr>
                                    <td><el-input v-model.trim="addForm.name" ></el-input></td>
                                    <td><el-input v-model.trim="addForm.name" ></el-input></td>
                                </tr>
                            </table>
                        </el-col>
                    </el-row>
                    <p class="f-red">* 所有的分佣都以商品的实际支付金额为计算依据。</p>
    
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click.native="submit" :loading="addLoading">提交</el-button>
                    <go-back></go-back>
                </el-form-item>
                
            </el-form>
        </div>
		<el-dialog :visible.sync="imgVisible" title="图片预览">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPutForwardManageList } from '@/api/api';

@Component({})
export default class DistributionGoodsAdd extends Vue {
    private addLoading: boolean = false; // loading
    private imgVisible: boolean = false; // 预览弹窗显隐
    private dialogImageUrl: string = ''; // 预览图片地址
    private addFormRules: any = {
        name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
    };
    // 表单数据
    private addForm: any = {
        id: '',
        type: '1',
        name: '',
        spreadPic: '',
        businessId: '',
    };

    private created() {
        if (this.$route.params.id) {
            this.getDate();
        }
    }

    // 获取编辑数据
    private getDate() {
        const para: any = {
            id: this.$route.params.id
        };
        getPutForwardManageList(para).then((res: any) => {
            const {code, data, msg} = res.data;
            this.addForm = {
                id: data.id,
                type: data.type + '',
                name: data.name,
                spreadPic: data.spreadPic,
                businessId: data.businessId
            };
            this.findGoods(); // 查询商品ID
        });
    }

    // 查询商品ID
    private findGoods() {
        const para: any = {
            id: this.addForm.businessId
        };
        getPutForwardManageList(para).then((res: any) => {
            const {code, data, msg} = res.data;
            console.log(data);
            
        });
    }

    // 预览图
    private previewShow(url: string) {
        this.imgVisible = true;
        this.dialogImageUrl = url;
    }

    // 图片上传完成回调
    private uploadEnd(url: string) {
        this.addForm.spreadPic = url;
    }

    // 新增
    private submit() {
        // @ts-ignore
        this.$refs.addForm.validate((valid: any) => {
            if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.addLoading = true;
                    const para = Object.assign({}, this.addForm);
                    getPutForwardManageList(para).then((res: any) => {
                        const {code, msg} = res.data;
                        this.$message.success('提交成功!');
                        this.$router.go(-1);
                        this.addLoading = false;
                    });
                });
            }
        });
    }
}
</script>


<style scoped lang="scss">
</style>
