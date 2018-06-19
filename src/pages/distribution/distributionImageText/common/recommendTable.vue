<template> 
    <section>
        <!--搜索-->
        <el-col :span="24">
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
                        <span><el-button type="primary" v-on:click="search" size="mini">查询</el-button></span>
                    </div>

                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;" border @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="60">
            </el-table-column>
            <el-table-column prop="id" label="图文标题" min-width="220">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column label="图文封面" min-width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.imageurl" width="60px" v-if="scope.row.imageurl">
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="是否上线" min-width="140" :formatter="formatChannel">
            </el-table-column>
            <el-table-column prop="teamlimitcount" label="分享次数" min-width="140">
            </el-table-column>
            <el-table-column prop="teamtotalcount" label="评论数量" min-width="140">
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
        <div slot="footer" class="dialog-footer mar-t-20">
            <el-button size="mini" type="warning" @click="submit">确 定</el-button>
        </div>
    </section>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { getPutForwardManageList } from '@/api/api';

    @Component({})
    export default class RecommendTable extends Vue {
        private searchForm: any = {
            type: '1',
            name: '',
            title: '',
        };
        private currentPage: number = 1; // 当前页
        private total: number | null = null;  // 翻页
        private pageSize: number = this.pageSize;  // 每一页显示数量
        private loading: boolean = false; // loading
        private listContent: any[] = []; // 列表数据
        private multipleSelection: any[] = []; // 批量选择

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

        // 批量选择
        private handleSelectionChange(val: any) {
            this.multipleSelection = val;
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

        // 提交
        private submit() {
            let multipleId;
            if (this.multipleSelection.length === 0) {
                this.$message.error('没有选择任务图文');
                return false;
            } else {
                multipleId = this.multipleSelection.map((val: any) => {
                    return val.id;
                });
            }

            this.$emit('callAdd', multipleId);

        }        
        
    }
</script>



<style scoped lang="scss">
</style>
