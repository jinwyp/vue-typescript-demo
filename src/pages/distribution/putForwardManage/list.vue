<template>
	<section>
		<navigation></navigation>

		<div class="searchForm">
			<!--搜索-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="searchForm">
					<el-form-item>
						<div class="search-item">
							<span>提现方式</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.type" class="inputMin">
									<el-option label="支付宝" value="1"></el-option>
								</el-select>
							</em>
						</div>
						<div class="search-item">
							<span>分销商渠道号</span>
							<em>
								<el-input v-model.trim="searchForm.cardId" placeholder="请输入" class="inputDefault"></el-input>
							</em>
						</div>
                        <div class="search-item">
                            <span>交易流水号</span>
                            <em>
                                <el-input v-model.trim="searchForm.num" placeholder="请输入" class="inputDefault"></el-input>
                            </em>
                        </div>
                        <div class="search-item">
							<span>
								<el-select clearable placeholder="请选择" v-model="searchForm.stype" class="inputMin">
									<el-option label="用户名称" value="1"></el-option>
									<el-option label="联系电话" value="2"></el-option>
								</el-select>
							</span>
                            <em>
                                <el-input v-model.trim="searchForm.name" placeholder="请输入" class="inputDefault"></el-input>
                            </em>

                        </div>
						<div class="search-item">
							<span>状态</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.status" class="inputMin">
									<el-option label="提现中" value="1"></el-option>
									<el-option label="已完成" value="2"></el-option>
								</el-select>
							</em>
						</div>
						
                        <div class="search-item">
                            <span>提现方式</span>
                            <em>
                                <el-date-picker
                                    v-model="searchForm.startTime"
                                    type="datetime"
                                    placeholder="选择开始时间" style="width:200px;" :editable="false" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                                ~
                                <el-date-picker
                                    v-model="searchForm.endTime"
                                    type="datetime"
                                    placeholder="选择结束时间" style="width:200px;" :editable="false" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
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
				<el-table-column label="分销商渠道号" min-width="180">
                    <template slot-scope="scope">
                        <a href="javascript:void(0)" @click="goDetail(scope.row.id)"> {{scope.row.pid}}</a>
                    </template>
				</el-table-column>
				<el-table-column prop="pid" label="提现单号" min-width="180">
				</el-table-column>
                <el-table-column prop="pid" label="交易流水号" min-width="180">
                </el-table-column>
                <el-table-column prop="user" label="用户名称" min-width="140">
                </el-table-column>
                <el-table-column prop="tel" label="联系电话" min-width="140">
                </el-table-column>
				<el-table-column prop="marketprice" label="账户余额(元)" min-width="140">
				</el-table-column>
				<el-table-column prop="teamprice" label="提现金额(元)" min-width="140">
				</el-table-column>
				<el-table-column prop="businesstype" label="提现方式" min-width="140" :formatter="formatRelation">
				</el-table-column>
				<el-table-column label="账户" min-width="250">
					<template slot-scope="scope">
						<p>身份认证实名：{{scope.row.title}}</p>
						<p>支付宝账号：{{scope.row.id}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="businesstype" label="状态" min-width="140" :formatter="formatChannel">
				</el-table-column>
				<el-table-column prop="time" label="申请时间" min-width="180">
				</el-table-column>
                <el-table-column prop="time" label="到账时间" min-width="180">
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
            <p class="tip">*  账户余额不包含技术服务费。</p>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPutForwardManageList } from '@/api/api';

@Component({})
export default class PutForwardManageList extends Vue {
    // 搜索参数
    private searchForm: any = {
        type: '',
        cardId: '',
        num: '',
        stype: '1',
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
            if (data && data !== null) {
                this.total = data.total;
                this.listContent = data.list;
            } else {
                this.total = null;
                this.listContent = [];
            }
            this.loading = false;
        }).catch((err: any) => {
            this.loading = false;
        });
    }

    // 跳转详情页
    private goDetail(id: string) {
        this.$router.push({path: `/putForwardManage/details/${id}`});
    }

    private mounted() {
        this.getList();
    }
}
</script>

<style scoped lang="scss">
</style>
