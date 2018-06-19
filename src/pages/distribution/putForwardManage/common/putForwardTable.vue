<template>
    <section>
        <el-table :data="listContent" style="width: 100%;" border>
            <el-table-column prop="channel" label="分销渠道" min-width="140">
            </el-table-column>
            <el-table-column prop="channelNum" label="分销商渠道号" min-width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名称" min-width="140">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" min-width="140">
            </el-table-column>
            <el-table-column prop="username" label="来源" min-width="140">
            </el-table-column>
            <el-table-column prop="username" label="上级" min-width="140">
            </el-table-column>
            <el-table-column prop="balance" label="总收入(元)" min-width="140">
            </el-table-column>
            <el-table-column prop="take" label="技术服务费(元)" min-width="140">
            </el-table-column>
            <el-table-column prop="take" label="账户余额(元)" min-width="140">
            </el-table-column>
            <el-table-column prop="take" label="已提现金额(元)" min-width="140">
            </el-table-column>            
            <el-table-column prop="statusTxt" label="状态" min-width="140">
            </el-table-column>
            <el-table-column prop="time" label="合作开始时间" min-width="180">
            </el-table-column>
            <el-table-column prop="time" label="合作结束时间" min-width="180">
            </el-table-column>				
        </el-table>
        
        <h6 class="f-666 font-14 mar-t-20">提现账户</h6>

        <el-table :data="step" border>
            <el-table-column prop="time" label="创建时间" min-width="180">
            </el-table-column>
            <el-table-column prop="type" label="账户类型" min-width="180">
            </el-table-column>
            <el-table-column label="账户" min-width="250">
                <template slot-scope="scope">
                    <p>身份认证实名：{{scope.row.name}}</p>
                    <p>支付宝账号：{{scope.row.tel}}</p>
                    <p v-if="scope.row.code">
                        身份证：
                        <span v-if="scope.row.img"><a href="javascript:void(0)" @click="imgShow(scope.row.img)">{{scope.row.code}}</a></span>
                        <span v-else>{{scope.row.code}}</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>

        <h6 class="f-666 font-14 mar-t-20">提现记录</h6>

        <el-table :data="list" highlight-current-row style="width: 100%;" border>
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="pid" label="提现单号" min-width="180">
            </el-table-column>
            <el-table-column prop="pid" label="交易流水号" min-width="180">
            </el-table-column>
            <el-table-column prop="marketprice" label="账户余额(元)" min-width="140">
            </el-table-column>
            <el-table-column prop="teamprice" label="提现金额(元)" min-width="140">
            </el-table-column>
            <el-table-column prop="businesstype" label="提现方式" min-width="140">
            </el-table-column>
            <el-table-column label="账户" min-width="250">
                <template slot-scope="scope">
                    <p>身份认证实名：{{scope.row.title}}</p>
                    <p>支付宝账号：{{scope.row.id}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="businesstype" label="状态" min-width="140">
            </el-table-column>
            <el-table-column prop="time" label="申请时间" min-width="180">
            </el-table-column>
            <el-table-column prop="time" label="到账时间" min-width="180">
            </el-table-column>
        </el-table>
        
        <el-dialog :visible.sync="imgVisible" title="图片预览">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    export default class PutForwardTable extends Vue {
        @Prop() private listContent: any[];
        @Prop() private step: any[];
        @Prop() private list: any[];
        private imgVisible: boolean = false;
        private dialogImageUrl: string = '';

        // 预览图
        private imgShow(url: string) {
            this.imgVisible = true;
            this.dialogImageUrl = url;
        }
    }
</script>

<style scoped lang="scss">
</style>
