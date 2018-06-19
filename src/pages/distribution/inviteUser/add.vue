<template>
	<section>
        <navigation></navigation>
		<div class="tabel-con">
            <el-row class="mar-t-20">
                <el-col :span="24">
                    <el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
                        <el-form-item label="手机号码" prop="tel">
                            <el-input v-model.trim="addForm.tel" placeholder="多个手机号请用英文,隔开" :disabled="$route.params.id!==undefined" style="width:70%;"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请免门槛分销商名额" prop="quota">
                            <el-input v-model.trim="addForm.quota" placeholder="请输入正整数" class="inputDefault"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期" prop="time">
                            <el-select clearable placeholder="请选择" v-model="addForm.time" style="width:100px;">
                                <el-option label="7天" value="7"></el-option>
                                <el-option label="1个月" value="1"></el-option>
                                <el-option label="3个月" value="3"></el-option>
                                <el-option label="6个月" value="6"></el-option>
                            </el-select>
                        </el-form-item>
    
                        <el-form-item v-if="!$route.params.id">
                            <el-button type="primary" v-on:click="add" size="mini">添 加</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table :data="listContent" style="width: 100%;" border class="mar-t-10">
                <el-table-column prop="username" label="用户名称" min-width="140">
                </el-table-column>
                <el-table-column prop="tel" label="联系电话" min-width="180">
                </el-table-column>
                <el-table-column prop="status" label="性别" min-width="140">
                </el-table-column>
                <el-table-column prop="balance" label="累计购物金额" min-width="140">
                </el-table-column>
                <el-table-column prop="status" label="是否成为分销商" min-width="140">
                </el-table-column>
                <el-table-column prop="sex" label="邀请免门槛分销商名额" min-width="180" v-if="!$route.params.id">
                </el-table-column>
                <el-table-column prop="time" label="最近一次登录时间" min-width="180">
                </el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleDel(scope.$index)" v-if="!$route.params.id"><span class="underline">移除</span></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="mar-t-20">
                <el-col :span="24">
                    <p><el-checkbox v-model="im.smsCheck">短信</el-checkbox></p>
                    <p>
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model.trim="im.smsTxt" style="width: 50%">
                        </el-input>
                    </p>
                    
                </el-col>
                <el-col :span="24" class="mar-t-20">
                    <p><el-checkbox v-model="im.appCheck">APP消息</el-checkbox></p>
                    <p>
                        <el-input
                            type="textarea" 
                            :rows="4"
                            placeholder="请输入内容"
                            v-model.trim="im.appTxt" style="width: 50%">
                        </el-input>
                    </p>
                </el-col>
            </el-row>
            <el-row class="mar-t-20 pad-b-20">
                <el-col :span="24">
                    <el-button type="warning" v-on:click="submit" size="mini" :loading="addLoading">提交并发送邀请</el-button>
                    <go-back></go-back>
                </el-col>
            </el-row>            
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {getPutForwardManageList, getPutForwardManageExamine} from '@/api/api';

    const isNum = (rule: any, value: any, callback: any) => {
        const exp = /^\d+$/;
        if (value === '') {
            return callback(new Error('请输入名额'));
        } else if (!exp.test(value)) {
            return callback(new Error('名额只能为正整数'));
        }
        callback();
    };
    
    @Component({})
    export default class InviteUserAdd extends Vue {

        // loading
        private addLoading: boolean = false;
        // 列表数据
        private listContent: any[] = [];
        private addFormRules: any = {
            tel: [
                {required: true, message: '请输入手机号码', trigger: 'blur'}
            ],
            quota: [
                {required: true, validator: isNum, trigger: 'blur'},
            ],
            time: [
                {required: true, message: '请选择有效期', trigger: 'change'}
            ],
        };
        // 新增界面数据
        private addForm: any = {
            tel: '',
            quota: '',
            time: '1',
        };
        // 短信&APP消息
        private im: any = {
            smsCheck: true,
            smsTxt: '【EYEE蜂潮】尊敬的{UserName}，蜂潮特邀您免费体验小蜂主权益，引领潮流还可赚钱的机会不容错过哦。您可下载蜂潮APP{下载链接}或直接点击{分销商申请链接}',
            appCheck: true,
            appTxt: '尊敬的{UserName}，蜂潮特邀您免费体验小蜂主权益，快来试试吧！幸福小蜂主，戳戳小手指，潮流由您引领。您可下载蜂潮APP{下载链接}或直接点击{分销商申请链接}，链接限时有效，机不可失哦~',
        };

        // 添加
        private add() {
            // @ts-ignore
            this.$refs.addForm.validate((valid: any) => {
                if (valid) {
                    const regBase = /^[0-9,]+$/;
                    const reg = /^1\d{10}$/;
                    const tel: any[] = []; // 以后传接口的手机号码
                    const allTel: any[] = []; // 获取所有列表的手机号防重复

                    if (!regBase.test(this.addForm.tel)) {
                        this.$message.error('请检查输入的手机号码是否正确！');
                        return false;
                    } else {
                        if (this.addForm.tel.split(',').length > 0) {
                            this.addForm.tel.split(',').forEach((val: any) => {
                                if (val !== '') {
                                    tel.push(val);
                                }
                            });
                        }

                        if (this.listContent.length > 0) {
                            this.listContent.forEach((val: any) => {
                                allTel.push(val.tel);
                            });
                        }

                        for (let i = 0, num = tel.length; i < num; i++) {
                            if (!reg.test(tel[i])) {
                                this.$message.error('请检查输入的手机号码是否正确');
                                return false;
                            }
                            if (allTel.indexOf(tel[i]) > -1) {
                                this.$message.error('列表中已有重复的手机号码');
                                return false;
                            }
                        }
                    }

                    const para = {
                        tel: tel.toString(),
                        time: this.addForm.time
                    };
                    getPutForwardManageList(para).then((res: any) => {
                        const {code, data, msg} = res.data;
                        this.listContent.push({
                            username: 'cher',
                            tel: this.addForm.tel,
                            sex: '男',
                            price: '199.9',
                            isDistribution: '否',
                            time: '2018-06-12 12:12:12'
                        });
                        this.addForm = {
                            tel: '',
                            time: '1'
                        };
                        
                    });
                }
            });
        }

        private handleDel(index: number) {
            this.$confirm('确定移除吗？', '提示', {}).then(() => {
                this.listContent.splice(index, 1);
            });
        }

        // 获取列表
        private getList() {
            const para = {
                id: this.$route.params.id
            };
            getPutForwardManageExamine(para).then((res: any) => {
                const {code, data, msg} = res.data;
                if (data && data !== null) {
                    this.listContent = [data];
                } else {
                    this.listContent = [];
                }
            }).catch((err: any) => {
            });
        }

        private submit() {
            if (this.listContent.length === 0) {
                this.$message.error('没有添加任务数据');
                return false;
            }
            const para: any = {};
            this.addLoading = true;
            getPutForwardManageList(para).then((res: any) => {
                const {code, data, msg} = res.data;
                this.addLoading = false;
                this.$message.success('发送邀请成功');
            }).catch((err: any) => {
                this.addLoading = false;
            });
        }

        private mounted() {
            if (this.$route.params.id) {
                this.getList();
            }
        }
    }   
</script>

<style scoped lang="scss">
</style>
