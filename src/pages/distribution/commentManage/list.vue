<template>
	<section>
		<navigation></navigation>

		<div class="searchForm">
			<!--搜索-->
			<div :span="24" class="toolbar">
				<el-form :inline="true" :model="searchForm">
                    <el-form-item>
                        <div class="search-item">
                            <span>图文标题</span>
                            <em>
                                <el-input v-model.trim="searchForm.title" placeholder="请输入" class="inputDefault"></el-input>
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
                            <span>操作人</span>
                            <em>
                                <el-input v-model.trim="searchForm.user" placeholder="请输入" class="inputDefault"></el-input>
                            </em>
                        </div>                        
                        <div class="search-item">
                            <span>评论</span>
                            <em>
                                <el-input v-model.trim="searchForm.comment" placeholder="请输入" class="inputDefault"></el-input>
                            </em>
                        </div>
                        <div class="search-item">
                            <span>状态</span>
                            <em>
                                <el-select clearable placeholder="请选择" v-model="searchForm.status" class="inputMin">
                                    <el-option label="待处理" value="1"></el-option>
                                    <el-option label="已处理" value="2"></el-option>
                                    <el-option label="已回复" value="3"></el-option>
                                </el-select>
                            </em>
                        </div>
                        <div class="search-item">
                            <span>
                                <el-button type="primary" v-on:click="search" size="mini">查询</el-button>
                            </span>
                        </div>

                    </el-form-item>
                    				
				</el-form>
			</div>
		</div>

		<div class="tabel-con">
            <div :span="24"><el-button size="mini" type="warning" @click="wrongfulAll">批量处理违规</el-button></div>
			<!--列表-->
			<el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;margin-top: 10px;" border @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column prop="user" label="用户名称" min-width="140">
                </el-table-column>
                <el-table-column prop="tel" label="联系电话" min-width="180">
                </el-table-column>
				<el-table-column prop="title" label="图文标题" min-width="220">
				</el-table-column>
                <el-table-column prop="pid" label="类型" min-width="140" :formatter="formatChannel">
                </el-table-column>
                <el-table-column label="评论回复" min-width="220">
                    <template slot-scope="scope">
                        <p>{{scope.row.msg}}</p>
                        <p v-if="scope.row.msg">小编回复：{{scope.row.msg}}</p>
                    </template>
                </el-table-column>
				<el-table-column prop="time" label="评论时间" min-width="160">
				</el-table-column>
                <el-table-column prop="status" label="状态" min-width="140">
                </el-table-column>
                <el-table-column prop="user" label="操作人" min-width="140">
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.comment===1">
                            <el-button size="mini" type="warning" @click="handleWrongful(scope.row.id)">违规</el-button>
                            <el-button size="mini" type="primary" @click="replyShow(scope.row.id)">回复</el-button>
                        </span>
                        
                        <span  v-if="scope.row.comment===0">已处理</span>
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
		</div>

        <el-dialog title="确认" :visible.sync="dialogFormVisible">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入回复内容"
                v-model.trim="replyTxt">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="replySubmit">确 定</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPutForwardManageList } from '@/api/api';

@Component({})
export default class CommentManage extends Vue {
    private searchForm: any = {
        title: '',
        stype: '1',
        name: '',
        user: '',
        comment: '',
        status: '',        
    };
    private currentPage: number = 1; // 当前页
    private total: number | null = null; // 翻页
    private pageSize: number = this.pageSize; // 每一页显示数量
    private loading: boolean = false; // loading
    private listContent: any[] = []; // 列表数据
    private multipleSelection: any[] = []; // 批量选择
    private saveId: string = ''; // 保存ID
    private dialogFormVisible: boolean = false; // 回复弹窗显隐
    private replyTxt: string = ''; // 回复内容

    private mounted() {
        this.getList(); // 获取列表
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

    // 批量违规
    private handleSelectionChange(val: any) {
        this.multipleSelection = val;
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

    // 违规
    private handleWrongful(currentId: number) {
        this.$confirm('确定处理这条违规评论吗?', '提示', {
            type: 'warning'
        }).then(() => {
            const para = {id: currentId};
            getPutForwardManageList(para).then((res: any) => {
                const {code, msg} = res.data;
                this.$message.success('处理成功!');
                this.getList();

            });
        }).catch(() => {
        });
    }

    // 批量处理违规
    private wrongfulAll() {
        // 判断有没有数据及有没有勾选已处理的数据
        if (this.multipleSelection.length === 0) {
            this.$message.error('没有勾选任何数据！');
            return false;
        } else {
            const isAll = this.multipleSelection.every((val: any) => {
                return val.comment === 1;
            });
            if (!isAll) {
                this.$message.error('勾选了已处理的数据！');
                return false;
            }
        }
        // 遍历所有ID
        const allId: any[] = [];
        this.multipleSelection.forEach((val: any) => {
            allId.push(val.id);
        });
        this.$confirm('确定要违规处理吗？', '提示', {
            type: 'warning'
        }).then(() => {
            const para = {id: allId.join()};
            getPutForwardManageList(para).then((res: any) => {
                const {code, msg} = res.data;
                this.$message.success('处理成功!');
                this.getList();

            });
        }).catch(() => {
        });
    }

    // 回复弹窗
    private replyShow(id: string) {
        this.replyTxt = '';
        this.saveId = id;
        this.dialogFormVisible = true;
    }

    // 回复提交
    private replySubmit() {
        if (!this.replyTxt) {
            this.$message.error('请输入回复内容');
            return false;
        }
        const para = {
            id: this.saveId,
            reply: this.replyTxt
        };
        getPutForwardManageList(para).then((res: any) => {
            const {code, msg} = res.data;
            this.$message.success('回复成功!');
            this.getList();
            this.dialogFormVisible = false;

        });
    }
}
</script>


<style scoped lang="scss">
</style>
