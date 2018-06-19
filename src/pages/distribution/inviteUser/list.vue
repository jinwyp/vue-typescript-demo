<template>
	<section>
		<navigation><el-button type="warning" @click="handleAdd" size="mini">邀请种子用户</el-button></navigation>

		<div class="searchForm">
			<!--搜索-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="searchForm">
					<el-form-item>
                        <div class="search-item">
                            <span>
								<el-select clearable placeholder="请选择" v-model="searchForm.stype" class="inputMin">
									<el-option label="用户名称" value="1"></el-option>
									<el-option label="联系电话" value="2"></el-option>
								</el-select>
							</span>
                            <em>
                                <el-input v-model.trim="searchForm.sname" placeholder="请输入" class="inputDefault"></el-input>
                            </em>
                        </div>
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
				<el-table-column prop="user" label="用户名称" min-width="140">
				</el-table-column>
				<el-table-column prop="tel" label="联系电话" min-width="180">
				</el-table-column>                
                <el-table-column prop="time" label="最近一次登录时间" min-width="180">
                </el-table-column>
                <el-table-column prop="time" label="邀请时间" min-width="180">
                </el-table-column>
                <el-table-column label="失效时间" min-width="180">
                    <template slot-scope="scope">
                        <span :class="{'f-red':scope.row.comment===0}">{{scope.row.time}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="comment" label="是否成为分销商" min-width="140" :formatter="formatRelation">
                </el-table-column>
                <el-table-column prop="time" label="成为分销商时间" min-width="180">
                </el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleLook(scope.row.id)">查看</el-button>
						<!--<el-button size="mini" type="warning" @click="handleDel(scope.row.id)">删除</el-button>-->
						<el-button size="mini" type="warning" @click="handleInvite(scope.row.id)" v-if="scope.row.comment===0">重新邀请</el-button>
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
import { getPutForwardManageList } from '@/api/api';

@Component({})
export default class InviteUserList extends Vue {
    // 搜索参数
    private searchForm: any = {
        stype: '1',
        sname: '',
        type: '1',
        name: '',
    };
    // 当前页
    private currentPage: number = 1;
    // 翻页
    private total: number | null = null;
    // loading
    private loading: boolean = false;
    // 列表数据
    private listContent: any[] = [];
    private pageSize: number = this.pageSize;


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
        return row.comment === 1 ? '男' : '女';
    }

    private formatRelation(row: any) {
        return row.comment === 1 ? '是' : '否';
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

    // 邀请种子用户
    private handleAdd() {
        this.$router.push({path: '/inviteUser/add'});
    }

    // 查看
    private handleLook(id: string) {
        this.$router.push({path: `/inviteUser/record/${id}`});
    }

    // 删除
    /*private handleDel(currentId: string) {
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
    }*/

    // 重新邀请
    private handleInvite(currentId: string) {
        this.$router.push({path: `/inviteUser/add/${currentId}`});
    }

    private mounted() {
        this.getList();
    }
}
</script>

<style scoped lang="scss">
</style>
