<template>
	<section>
        <navigation></navigation>
		<div class="tabel-con">
            <el-table :data="listContent" style="width: 100%;" border>
                <el-table-column prop="username" label="用户名称" min-width="140">
                </el-table-column>
                <el-table-column prop="tel" label="联系电话" min-width="180">
                </el-table-column>
                <el-table-column prop="status" label="性别" min-width="140" :formatter="formatChannel">
                </el-table-column>
                <el-table-column prop="balance" label="累计购物金额" min-width="140">
                </el-table-column>
                <el-table-column prop="status" label="是否成为分销商" min-width="140" :formatter="formatRelation">
                </el-table-column>
                <el-table-column prop="time" label="最近一次登录时间" min-width="180">
                </el-table-column>
                <el-table-column prop="time" label="邀请时间" min-width="180">
                </el-table-column>
                <el-table-column prop="time" label="失效时间" min-width="180">
                </el-table-column>
            </el-table>

            <h6 class="f-666 font-14 mar-t-20">邀请记录</h6>

            <el-table :data="step" style="width: 100%;" border>
                <el-table-column prop="time" label="邀请时间" min-width="180">
                </el-table-column>
                <el-table-column prop="status" label="有效期" min-width="180">
                </el-table-column>
                <el-table-column prop="time" label="失效时间" min-width="180">
                </el-table-column>
                <el-table-column prop="status" label="邀请免门槛分销商名额" min-width="180">
                </el-table-column>
                <el-table-column prop="name" label="操作人" min-width="180">
                </el-table-column>
            </el-table>
            <el-col :span="24">
                <go-back></go-back>
            </el-col>
            

        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {getPutForwardManageExamine} from '@/api/api';

    @Component({})
    export default class InviteUserRecord extends Vue {
        // loading
        private addLoading: boolean = false;
        // 列表数据
        private listContent: any[] = [];
        private step: any[] = [];
        
        private formatChannel(row: any) {
            return row.comment === 1 ? '男' : '女';
        }
        private formatRelation(row: any) {
            return row.comment === 1 ? '是' : '否';
        }

        // 获取数据
        private getList() {
            this.listContent = [];
            const para: any = {id: this.$route.params.id};
            getPutForwardManageExamine(para).then((res: any) => {
                const {code, data, msg} = res.data;
                if (data && data !== null) {
                    this.listContent.push(data);
                    this.step = data.step;
                } else {
                    this.listContent = [];
                    this.step = [];
                }
            }).catch((err: any) => {
            }); 
        }       

        private mounted() {
            this.getList();
        }
    }
</script>

<style scoped lang="scss">
</style>
