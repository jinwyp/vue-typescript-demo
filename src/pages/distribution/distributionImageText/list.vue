<template>
	<section>
		<navigation><el-button type="warning" @click="" size="mini">新增图文</el-button><el-button type="primary" @click="$router.push({'path':'/distributionImageText/recommend'})" size="mini">推荐轮播图片</el-button></navigation>

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
							<span>图文标题</span>
							<em>
                                <el-input v-model.trim="searchForm.title" placeholder="请输入" class="inputDefault"></el-input>
							</em>
						</div>
						<div class="search-item">
							<span>是否上线</span>
							<em>
								<el-select clearable placeholder="请选择" v-model="searchForm.isOnline" class="inputDefault">
									<el-option label="是" value="1"></el-option>
									<el-option label="否" value="2"></el-option>
								</el-select>
							</em>
						</div>
                        <div class="search-item">
                            <span><el-button type="primary" v-on:click="search" size="mini">查询</el-button></span>
                        </div>

					</el-form-item>
				</el-form>
			</el-col>
		</div>

		<div class="tabel-con">
			<!--列表-->
			<el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;" border :row-class-name="tableRowClassName">
				<el-table-column prop="id" label="图文标题" min-width="220">
					<template slot-scope="scope">
						<a href="javascript:void(0)" @click="detail(scope.row.id)">{{scope.row.title}}</a>
					</template>
				</el-table-column>
                <el-table-column label="图文封面" min-width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageurl" width="60px" v-if="scope.row.imageurl">
                    </template>
                </el-table-column>
				<el-table-column prop="comment" label="是否上线" min-width="140" :formatter="formatChannel">
				</el-table-column>
s                <el-table-column prop="teamtotalcount" label="评论数量" min-width="140">
                </el-table-column>
				<el-table-column prop="teamlimitcount" label="点赞数量" min-width="140">
				</el-table-column>				
				<el-table-column prop="time" label="创建时间" min-width="180">
				</el-table-column>
				<el-table-column prop="pid" label="商品ID" min-width="180">
				</el-table-column>
				<el-table-column prop="pid" label="商品编号" min-width="180">
				</el-table-column>
                <el-table-column label="商品图片" min-width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageurl" width="60px" v-if="scope.row.imageurl">
                    </template>
                </el-table-column>
				
				<el-table-column label="操作" width="230" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="warning" @click="handleOnline(scope.row.id,0)">上线</el-button>
						<!--<el-button size="mini" type="warning" @click="handleOnline(scope.row.id,1)">下线</el-button>-->
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
			<p class="tip">小提示：灰色记录表示图文对应的商品 库存为0 或 商品未上架售卖</p>
		</div>
	</section>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { getPutForwardManageList } from '@/api/api';

    @Component({})
    export default class DistributionImageText extends Vue {
        private searchForm: any = {
            type: '1',
            name: '',
            title: '',
            isOnline: '',
        };
        private currentPage: number = 1; // 当前页
        private total: number | null = null;  // 翻页
        private pageSize: number = this.pageSize;  // 每一页显示数量
        private loading: boolean = false; // loading
        // 列表数据
        private listContent: any[] = [];

        private mounted() {
            this.getList();
        }

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

        private formatChannel(row: any, column: any) {
            return row.comment === 1 ? '是' : '否';
        }

        private formatRelation(row: any, column: any) {
            return row.relation === 1 ? '是' : row.relation === 0 ? '否' : '--';
        }

        // 变色表格
        private tableRowClassName(row: any) {
            if (row.row.teamtotalcount > 25) {
                return 'grey-row';
            }
            return '';
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
        private handleDel(currentId: any) {
            this.$confirm('确定删除吗?', '提示', {
                type: 'warning'
            }).then(() => {
                const para = {id: currentId};
                getPutForwardManageList(para).then((res: any) => {
                    const {code, msg} = res.data;
                    this.$message.success('删除成功');
                    this.getList();
                });
            }).catch(() => {
            });
        }

        // 上下线
        private handleOnline(currentId: any, status: number) {
            const txt = status === 1 ? '下线了用户就不能查看并分销了哦，确定下线吗？' : '确定要上线吗？';
            this.$confirm(txt, '提示', {
                type: 'warning'
            }).then(() => {
                const para = {
                    id: currentId,
                    status: status
                };
                getPutForwardManageList(para).then((res: any) => {
                    const {code, msg} = res.data;
                    this.$message.success(status === 1 ? '下线成功！' : '上线成功！');
                    this.getList();

                });
            }).catch(() => {
            });
        }
    }
</script>



<style scoped lang="scss">
</style>
