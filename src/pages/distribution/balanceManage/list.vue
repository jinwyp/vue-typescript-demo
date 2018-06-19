<template>
	<section>
		<navigation></navigation>

		<div class="searchForm">
			<!--搜索-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="searchForm">
					<el-form-item>
						<div class="search-item">
							<span>结款方式</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.type" class="inputMin">
									<el-option label="支付宝" value="1"></el-option>
									<el-option label="网银转账" value="2"></el-option>
								</el-select>
							</em>
						</div>
						<div class="search-item">
							<span>分销商渠道号/公众号名称</span>
							<em>
								<el-input v-model.trim="searchForm.name" placeholder="请输入" class="inputDefault"></el-input>
							</em>
						</div>
						<div class="search-item">
							<span>状态</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.status" class="inputMin">
									<el-option label="待运营审核" value="1"></el-option>
									<el-option label="待分销商审核" value="2"></el-option>
									<el-option label="待付款" value="3"></el-option>
									<el-option label="已完成" value="4"></el-option>
								</el-select>
							</em>
						</div>

						<div class="search-item">
							<span>出账时间</span>
							<em>
								<el-input type="number" v-model.trim="searchForm.startTime" style="width: 120px"></el-input>
								~
								<el-input type="number" v-model.trim="searchForm.endTime" style="width: 120px"></el-input>
							</em>

						</div>

                        <div class="search-item">
                            <span>
                                <el-button type="primary" v-on:click="search" size="mini">查询</el-button>
                            </span>
                        </div>

					</el-form-item>
				</el-form>
			</el-col>
		</div>

		<div class="tabel-con">
			<!--列表-->
			<el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;" border>
				<el-table-column type="index" label="序号" width="80">
				</el-table-column>
				<el-table-column prop="pid" label="分销商渠道号" min-width="180">
				</el-table-column>
				<el-table-column prop="title" label="公众号名称" min-width="180">
				</el-table-column>
				<el-table-column label="结算单号" min-width="180">
					<template slot-scope="scope">
						<p>{{scope.row.pid}}</p>
						<p><el-button type="warning" size="mini" @click="exportXls(scope.row.id)">导出账单</el-button></p>
					</template>
				</el-table-column>
                <el-table-column label="账期" min-width="140">
                    <template slot-scope="scope">
                        <span>{{scope.row.time}} ~ {{scope.row.time}}</span>
                    </template>
                </el-table-column>
				<el-table-column prop="marketprice" label="预结算金额(元)" min-width="140">
				</el-table-column>
				<el-table-column prop="teamprice" label="退款扣除佣金金额(元)" min-width="140">
				</el-table-column>
				<el-table-column label="调整金额（元）" min-width="140">
                    <template slot-scope="scope">
                        <span class="f-red">{{scope.row.teamtotalcount}}</span>
                    </template>
				</el-table-column>
				<el-table-column prop="marketprice" label="最终结算金额（元）" min-width="180">
				</el-table-column>
				<el-table-column prop="businesstype" label="提现方式" min-width="140" :formatter="formatRelation">
				</el-table-column>
				<el-table-column label="账户" min-width="180">
					<template slot-scope="scope">
						<p>户名：{{scope.row.title}}</p>
						<p>账号：{{scope.row.id}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="businesstype" label="状态" min-width="140" :formatter="formatChannel">
				</el-table-column>
				<el-table-column prop="time" label="出账时间" min-width="180">
				</el-table-column>
				<el-table-column label="操作" width="270" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="warning" @click="handleExamine(scope.row.id)">审核</el-button>
						<el-button size="mini" type="warning" @click="handlePay(scope.row.id)">财务付款</el-button>
						<el-button size="mini" type="primary" @click="handleDetails(scope.row.id)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--分页-->
			<div style="overflow: hidden">
				<el-col :span="24" class="pagination">
					<el-pagination
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-size="pageSize"
							layout="total , prev, pager, next , jumper"
							:total="total">
					</el-pagination>
				</el-col>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { httpErrorHandler } from '@/api/httpErrorHandler';
import { getPutForwardManageList } from '@/api/api';

@Component({})
export default class BalanceManageList extends Vue {
    // 搜索参数
    private searchForm: any = {
        type: '',
        name: '',
        status: '',
        startTime: '',
        endTime: '',
    };
    // 当前页
    private currentPage: number = 1;
    // 翻页
    private total: number | null = null;
    // 每一页显示数量
    private pageSize: number = this.pageSize;
    // loading
    private loading: boolean = false;
    // 列表数据
    private listContent: any[] = [];


    // 搜索
    private search() {
        if (this.currentPage === 1) {
            this.handleCurrentChange(1);
        } else {
            this.currentPage = 1;
        }
    }
    // 分页
    private handleCurrentChange(val: number) {
        this.currentPage = val;
        this.getList();
    }
    private formatChannel(row: any) {
        return row.businesstype === 1 ? '待运营审核' : row.businesstype === 2 ? '待付款' : '已完成';
    }
    private formatRelation(row: any) {
        return row.businesstype === 1 ? '支付宝' : row.businesstype === 0 ? '网银转账' : '--';
    }
    // 获取列表
    private getList() {
        const para: any = Object.assign({}, this.searchForm);
        para.page = this.currentPage;
        para.pageSize = this.pageSize;
        this.loading = true;
        getPutForwardManageList(para).then((res: any) => {
            const {code, data, msg} = res.data;
            if ( data && data !== null) {
                 this.total = data.total;
                 this.listContent = data.list;
            } else {
                this.total = null;
                this.listContent = [];
            }
            this.loading = false;
        }).catch((err: any) => {
            this.loading = false;
            httpErrorHandler(err);
        });
    }

    
    // 导出账单
    private exportXls(id: string) {
        window.location.href = 'url' + id;
    }
    // 审核
    private handleExamine(id: string) {
        this.$router.push({path: `/balanceManage/examine/${id}`});
    }
    
    // 财务付款
    private handlePay(id: string) {
        this.$router.push({path: `/balanceManage/pay/${id}`});
    }
    // 财务付款
    private handleDetails(id: string) {
        this.$router.push({path: `/balanceManage/details/${id}`});
    }
    private mounted() {
        this.getList();
    }
}
</script>

<style scoped lang="scss">
</style>
