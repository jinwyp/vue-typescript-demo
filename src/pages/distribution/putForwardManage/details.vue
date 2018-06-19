<template>
	<section>
        <navigation></navigation>
		<div class="tabel-con">
            <PutForwardTable :listContent="listContent" :step="step" :list="list"></PutForwardTable>
            <el-col :span="24">
                <go-back></go-back>
            </el-col>
            

        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {getPutForwardManageExamine} from '@/api/api';
    import PutForwardTable from './common/putForwardTable.vue';

    @Component({
        components: {
            PutForwardTable,
        },
    })
    export default class PutForwardManageDetails extends Vue {
        // loading
        private addLoading: boolean = false;
        // 列表数据
        private listContent: any[] = [];
        private step: any[] = [];
        private list: any[] = [];
        private addFormRules: any = {
            changeMoney: [
                {required: true, message: '请输入实际付款金额', trigger: 'change'}
            ]
        };
        // 新增界面数据
        private addForm: any = {
            changeMoney: null,
            status: null,
            remarks: '',
        };

        // 获取数据
        private getList() {
            this.listContent = [];
            const para: any = {id: this.$route.params.id};
            getPutForwardManageExamine(para).then((res: any) => {
                const {code, data, msg} = res.data;

                if (data && data !== null) {
                    this.listContent.push(data);
                    this.step = data.step;
                    this.list = data.list;
                } else {
                    this.listContent = [];
                    this.step = [];
                }
            }).catch((err: any) => {
            }); 
        }

        // 提交
        private handleSubmit() {
            // @ts-ignore
            this.$refs.addForm.validate((valid: any) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        const para = Object.assign({}, this.addForm);
                        getPutForwardManageExamine(para).then((res: any) => {
                            const {code, msg} = res.data;
                            this.$message.success('提交成功!');
                            this.getList();
                            this.addLoading = false;
                        });
                    });
                }
            });
        }

        private mounted() {
            this.getList();
        }
    }
</script>

<style scoped lang="scss">
</style>
