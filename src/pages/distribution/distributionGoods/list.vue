<template>
	<section>
		<navigation><el-button type="warning" @click="handleAdd" size="mini">新增分销商品</el-button></navigation>

		<div class="searchForm">
			<!--搜索-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="searchForm">
					<el-form-item>
						<div class="search-item">
							<span>
								<el-select clearable placeholder="请选择" v-model="searchForm.type" style="width:100px;">
									<el-option label="商品ID" value="1"></el-option>
									<el-option label="商品编号" value="2"></el-option>
									<el-option label="商品名称" value="3"></el-option>
								</el-select>
							</span>
							<em>
								<el-input v-model.trim="searchForm.name" placeholder="请输入" class="inputDefault"></el-input>
							</em>

						</div>
						<div class="search-item">
							<span>商家</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.business" class="inputDefault">
									<el-option v-for="item in businessList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</em>
						</div>
						<div class="search-item">
							<span>是否关联图文</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.relation" class="inputDefault">
									<el-option label="是" value="1"></el-option>
									<el-option label="否" value="0"></el-option>
								</el-select>
							</em>
						</div>
						<div class="search-item">
							<span>售价</span>
							<em>
								<el-input type="number" v-model.trim="searchForm.minPrice" style="width: 100px"></el-input>
								~
								<el-input type="number" v-model.trim="searchForm.maxPrice" style="width: 100px"></el-input>
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
			<el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;" border :row-class-name="tableRowClassName">
				<el-table-column prop="pid" label="商品ID" min-width="180">
				</el-table-column>
				<el-table-column prop="pid" label="商品编号" min-width="140">
				</el-table-column>
				<el-table-column label="商品图片" min-width="140">
					<template slot-scope="scope">
						<a href="javascript:void(0)" @click="detail(scope.row.id)">
							<img :src="scope.row.imageurl" width="100px" v-if="scope.row.imageurl">
						</a>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="商家" min-width="140">
				</el-table-column>
				<el-table-column prop="businesstype" label="分销渠道" min-width="140" :formatter="formatChannel">
				</el-table-column>
				<el-table-column label="售价(元)" min-width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.marketprice>40" class="f-red">{{scope.row.marketprice}}</span>
						<span v-else>{{scope.row.marketprice}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="库存" min-width="140">
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="分销销量" min-width="140">
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="总销量" min-width="140">
				</el-table-column>
				<el-table-column prop="teamtotalcount" label="注水量" min-width="140">
				</el-table-column>
				<el-table-column prop="businesstype" label="是否关联图文" min-width="140" :formatter="formatRelation">
				</el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="warning" @click="handleDel(scope.row.id)">删除</el-button>
					</template>
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
			<p class="tip">小提示：灰色记录表示该商品 库存为0 或 商品未上架。</p>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPutForwardManageList } from '@/api/api';

@Component({})
export default class DistributionGoods extends Vue {
    private searchForm: any = {
        type: '1',
        name: '',
        business: '',
        relation: '',
        minPrice: '',
        maxPrice: '',
    };
    private currentPage: number = 1; // 当前页
    private total: number | null = null; // 翻页
    private pageSize: number = this.pageSize; // 每一页显示数量
    private loading: boolean = false; // loading
    private listContent: any[] = []; // 列表数据
    private businessList: any[] = [
        {name: '我是商家1', id: 1},
        {name: '我是商家2', id: 2},
        {name: '我是商家3', id: 3}
    ];

    private mounted() {
        this.getList(); // 获取列表
        this.getBusiness(); // 获取商家列表
    }

    // 获取商家列表
    private getBusiness() {
        getPutForwardManageList({}).then((res: any) => {
            const {code, data, msg} = res.data;
            this.businessList = data;
        });
    }
    // 搜索
    private search() {
        if (this.searchForm.minPrice && this.searchForm.maxPrice && this.searchForm.minPrice > this.searchForm.maxPrice) {
            this.$message.error('售价区间有误');
            return false;
        }
        if (this.currentPage === 1) {
            this.handleCurrentChange(1);
        } else {
            this.currentPage = 1;
        }

    }

    // 变色表格
    private tableRowClassName(row: any) {
        if (row.row.teamtotalcount > 25) {
            return 'grey-row';
        }
        return '';
    }

    // 分页
    private handleCurrentChange(val: any) {
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

    // 删除
    private handleDel(currentId: number) {
        this.$confirm('确定要删除吗?', '提示', {
            type: 'warning'
        }).then(() => {
            const para = {id: currentId};
            getPutForwardManageList(para).then((res: any) => {
                const {code, msg} = res.data;
                this.$message.success('删除成功!');
                this.getList();

            });
        }).catch(() => {
            
        });
    }

    // 跳编辑页
    private handleEdit(id: string) {
        this.$router.push({path: `/distributionGoods/edit/${id}`});
    }

    // 跳新增页
    private handleAdd() {
        this.$router.push({path: '/distributionGoods/add'});
    }

    // 跳详情页
    private detail(id: string) {
        this.$router.push({path: `/distributionGoods/detail/${id}`});
    }
}
</script>


<style scoped lang="scss">
</style>
