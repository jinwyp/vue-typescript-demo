<template>
	<section style="min-width:1280px;">
		<navigation></navigation>

		<div class="searchForm">
			<!--搜索-->
			<div :span="24" class="toolbar">
				<el-form :inline="true" :model="searchForm">
                    <div class="commissionDetailSearch">
                        <div class="search-item">
							<span>分销商渠道编号/名称</span>
                            <em><el-input class="inputDefault" v-model.trim="searchForm.name" placeholder="请输入"></el-input></em>
                        </div>
                        <div class="search-item">
                            <span>订单编号</span>
                            <em><el-input class="inputDefault" v-model.trim="searchForm.code" placeholder="请输入"></el-input></em>
                        </div>
                        <div class="search-item">
                            <span>商品名称</span>
                            <em><el-input style="width:415px;" v-model.trim="searchForm.title" placeholder="请输入"></el-input></em>
                        </div>
                    </div>

                    <div class="commissionDetailSearch">
                        <div class="search-item">
                            <span style="width: 130px;text-align: right">佣金状态</span>
                            <em>
                                <el-select clearable placeholder="请选择" v-model="searchForm.yStatus" class="inputDefault">
                                    <el-option label="待生效" value="1"></el-option>
                                    <el-option label="已生效" value="2"></el-option>
                                    <el-option label="退款扣除" value="3"></el-option>
                                </el-select>
                            </em>
                        </div>
                        <div class="search-item">
                            <span>结算状态</span>
                            <em>
                                <el-select clearable placeholder="请选择" v-model="searchForm.jStatus" class="inputDefault">
                                    <el-option label="未结算" value="1"></el-option>
                                    <el-option label="结算中" value="2"></el-option>
                                    <el-option label="已结算" value="3"></el-option>
                                </el-select>
                            </em>
                        </div>
                        <div class="search-item">
                            <span>生效时间</span>
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
                    </div>					
				</el-form>
			</div>
		</div>

		<div class="tabel-con">
			<!--列表-->
			<el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;" border>
				<el-table-column type="index" label="序号" width="80">
				</el-table-column>
                <el-table-column prop="businesstype" label="分销渠道" min-width="140" :formatter="formatChannel">
                </el-table-column>
                <el-table-column prop="pid" label="分销商渠道编号" min-width="180">
                </el-table-column>
				<el-table-column prop="title" label="公众号/用户名称" min-width="140">
				</el-table-column>
                <el-table-column prop="pid" label="订单编号" min-width="180">
                </el-table-column>
				<el-table-column label="商品图片" min-width="140">
					<template slot-scope="scope">
                        <img :src="scope.row.imageurl" width="100px">
					</template>
				</el-table-column>
                <el-table-column prop="teamtotalcount" label="数量" min-width="140">
                </el-table-column>
				<el-table-column label="支付金额（元）" min-width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.marketprice<0" class="f-red">{{scope.row.marketprice}}</span>
						<span v-else>{{scope.row.marketprice}}</span>
					</template>
				</el-table-column>
				<el-table-column label="文章标题" min-width="220">
                    <template slot-scope="scope">
                        <a href="javascript:void (0)">
                            {{scope.row.title}}
                        </a>
                    </template>
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="佣金状态" min-width="140" :formatter="formatChannel">
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="结算状态" min-width="140" :formatter="formatChannel">
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="分销商类别" min-width="140" :formatter="formatChannel">
				</el-table-column>
				<el-table-column prop="time" label="创建时间" min-width="140">
				</el-table-column>
                <el-table-column prop="time" label="生效时间" min-width="140">
                </el-table-column>
			</el-table>

			<!--工具条-->
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
    import { getPutForwardManageList } from '@/api/api';

    @Component({})
    export default class CommissionDetailList extends Vue {
        private searchForm: any = {
            name: '',
            code: '',
            title: '',
            yStatus: '',
            jStatus: '',
            startTime: '',
            endTime: '',
        };
        private currentPage: number = 1; // 当前页
        private total: number | null = null; // 翻页
        private pageSize: number = this.pageSize; // 每一页显示数量
        private loading: boolean = false; // loading
        private listContent: any[] = []; // 列表数据        

        private mounted() {
            this.getList(); // 获取列表
        }
        
        // 搜索
        private search() {
            if (this.searchForm.startTime && this.searchForm.endTime && this.searchForm.startTime > this.searchForm.endTime) {
                this.$message.error('生效时间区间有误');
                return false;
            }
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
        
        private formatChannel(row: any, column: any) {
            return row.businesstype === 1 ? 'B端' : row.businesstype === 2 ? 'C端' : '全部';
        }
        private formatRelation(row: any, column: any) {
            return row.businesstype === 1 ? '是' : row.businesstype === 0 ? '否' : '--';
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
    }
</script>


<style scoped lang="scss">
</style>
