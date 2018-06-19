<template>
	<section>
        <navigation></navigation>
		<div class="tabel-con">
            <el-row class="mar-t-20">
                <el-col :span="24">
                    <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                        <el-form-item label="准入类别" prop="type">
                            <el-select clearable placeholder="请选择" v-model="addForm.type" style="width:140px;">
                                <el-option label="种子用户" value="1"></el-option>
                                <el-option label="非种子用户" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="商品ID" prop="id" v-if="!$route.params.id">
                            <el-input v-model.trim="addForm.id" placeholder="多个ID请用英文,隔开" style="width:70%;"></el-input>
                        </el-form-item>                        
    
                        <el-form-item v-if="!$route.params.id">
                            <el-button type="primary" v-on:click="add" size="mini">添 加</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table :data="listContent" style="width: 100%;" border class="mar-t-10">
                <el-table-column label="上级返佣（%）" min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.parent" type="number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="商品编号" min-width="180">
                </el-table-column>
                <el-table-column label="商品图片" min-width="140">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageurl" width="100px">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商家" min-width="140">
                </el-table-column>
                <el-table-column prop="join" label="准入类别" min-width="140">
                </el-table-column>
                <el-table-column prop="price" label="售价(元)" min-width="140">
                </el-table-column>
                <el-table-column prop="sale" label="折扣价(元)" min-width="140">
                </el-table-column>
                <el-table-column prop="stock" label="库存" min-width="140">
                </el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleDel(scope.$index)" v-if="!$route.params.id"><span class="underline">移除</span></el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-row class="mar-t-20 pad-b-20">
                <el-col :span="24">
                    <el-button type="warning" v-on:click="submit" size="mini" :loading="addLoading">确定</el-button>
                    <go-back></go-back>
                </el-col>
            </el-row>            
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {getPutForwardManageList} from '@/api/api';

    @Component({})
    export default class JoinManageSetting extends Vue {
        // loading
        private addLoading: boolean = false;
        // 列表数据
        private listContent: any[] = [];
        private addFormRules: any = {
            type: [
                {required: true, message: '请选择准入类别', trigger: 'change'}
            ],
            id: [
                {required: true, message: '请输入商品ID', trigger: 'blur'}
            ],
        };
        // 新增界面数据
        private addForm: any = {
            type: '1',
            id: '',
        };
        // 添加
        private add() {
            // @ts-ignore
            this.$refs.addForm.validate((valid: any) => {
                if (valid) {
                    const regBase = /^[0-9a-z,]+$/;
                    const arrId: any[] = []; // 以后传接口的ID
                    const allId: any[] = []; // 获取所有列表的ID防重复
                    
                    if ( !regBase.test( this.addForm.id ) ) {
                        this.$message.error('ID为数字和小字母组成！');
                        return false;
                    } else {
                        if (this.addForm.id.split(',').length > 0) {
                            this.addForm.id.split(',').forEach((val: any) => {
                                if (val !== '') {
                                    arrId.push(val);
                                }
                            }); 
                        }
                        

                        if (this.listContent.length > 0) {
                            this.listContent.forEach((val: any) => {
                                allId.push(val.id);
                            });
                        }
                        
                        
                        for (let i = 0, num = arrId.length; i < num; i++) {
                            if ( allId.indexOf(arrId[i]) > -1 ) {
                                this.$message.error('列表中已有重复的ID');
                                return false;
                            }
                        }
                    }
                    
                    const para = {
                        type: this.addForm.type,
                        id: arrId.toString()
                    };
                    getPutForwardManageList(para).then((res: any) => {
                        const {code, data, msg} = res.data;
                        this.listContent.push({
                            id: this.addForm.id,
                            parent: 5.55,
                            code: 'testchengchao2',
                            imageurl: 'http://files.eyee.com/Shop/system/main/2c79214912334485ae5e4d74f6615721.jpg!w400',
                            name: 'cher',
                            join: '非种子用户',
                            price: '199.9',  
                            sale: '199.9',
                            stock: '100',
                        });
                        this.addForm = {
                            type: '1',
                            id: ''
                        };
                        
                    }); 
                }
            });
        }
        // 获取列表
        private getList() {
            const para = {
                id : this.$route.params.id
            };
            getPutForwardManageList(para).then((res: any) => {
                const {code, data, msg} = res.data;
                if ( data && data !== null) {
                    this.listContent = data.list;
                } else {
                    this.listContent = [];
                }
                
            }).catch((err: any) => {
            }); 
        }
        private handleDel(index: number) {
            this.$confirm('确定移除吗？', '提示', {}).then(() => {
                this.listContent.splice(index, 1);
            });
        }
        // 提交并发送邀请
        private submit() {
            if (this.listContent.length === 0) {
                this.$message.error('没有添加任务数据');
                return false;
            }
            const para: any = {
                
            };
            this.addLoading = true;
            getPutForwardManageList(para).then((res: any) => {
                const {code, data, msg} = res.data;
                this.addLoading = false;
                this.$message.success('发送邀请成功');
            }).catch((err: any) => {
                this.addLoading = false;
            });
        }
        
        // private mounted() {}
        private created() {
            if ( this.$route.params.id) {
                this.getList();
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
