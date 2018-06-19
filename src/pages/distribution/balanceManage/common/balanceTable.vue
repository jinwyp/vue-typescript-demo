<template>
    <section>
        <el-table :data="listContent" style="width: 100%;" border>
            <el-table-column label="账期" min-width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.time}} ~ {{scope.row.time}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="channelNum" label="分销商渠道号" min-width="180">
            </el-table-column>
            <el-table-column prop="username" label="名称" min-width="140">
            </el-table-column>
            <el-table-column label="账户" min-width="180">
                <template slot-scope="scope">
                    <p>户名：{{scope.row.name}}</p>
                    <p>账号：{{scope.row.tel}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="mode" label="结款方式" min-width="140">
            </el-table-column>
            <el-table-column prop="balance" label="结算金额(元)" min-width="140">
            </el-table-column>
            <el-table-column prop="take" label="调整金额(元)" min-width="140">
            </el-table-column>
            <el-table-column label="最终结算金额(元)" min-width="140">
                <template slot-scope="scope">
                    <span class="f-red">{{scope.row.change}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="statusTxt" label="状态" min-width="140">
            </el-table-column>
            <el-table-column prop="time" label="申请时间" min-width="180">
            </el-table-column>				
        </el-table>
        
        <h6 class="f-666 font-14 mar-t-20">结算进度</h6>

        <el-table :data="step" style="width: 100%;" border>
            <el-table-column prop="time" label="时间" min-width="180">
            </el-table-column>
            <el-table-column prop="name" label="操作人" min-width="180">
            </el-table-column>
            <el-table-column prop="status" label="操作状态" min-width="180">
            </el-table-column>
            <el-table-column prop="remarks" label="备注" min-width="180">
            </el-table-column>
        </el-table>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    export default class BalanceTable extends Vue {
        @Prop() private listContent: any[];
        @Prop() private step: any[];
    }
</script>

<style scoped lang="scss">
</style>
