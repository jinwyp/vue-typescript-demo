<template>
	<section>
		<navigation><el-button type="warning" @click="dialogFormVisible=true" size="mini">添加推荐图文</el-button></navigation>
        
		<div class="tabel-con">
			<!--列表-->
			<el-table :data="listContent" highlight-current-row v-loading="loading" style="width: 100%;" border>
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
				
				<el-table-column label="操作" width="120" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" @click="handleCancel(scope.row.id)"><span class="underline">取消推荐</span></el-button>
					</template>
				</el-table-column>
			</el-table>
            
            <go-back></go-back>

		</div>
        <el-dialog title="添加推荐图文" :visible.sync="dialogFormVisible" width="90%" @close="close">
            <RecommendTable @callAdd="callAdd" ref="recommendTable"></RecommendTable>
        </el-dialog>
	</section>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { getPutForwardManageList } from '@/api/api';
    import RecommendTable from './common/recommendTable.vue';

    @Component({
        components: {
            RecommendTable
        }
    })
    export default class DistributionRecommend extends Vue {
        private loading: boolean = false; // loading
        // 列表数据
        private listContent: any[] = [];
        private dialogFormVisible: boolean = false;

        private mounted() {
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
            const para: any = {};
            this.loading = true;
            getPutForwardManageList(para).then((res: any) => {
                const {code, data, msg} = res.data;
                if (data && data !== null) {
                    this.listContent = data.list;
                } else {
                    this.listContent = [];
                }                
                this.loading = false;
            }).catch((err: any) => {
                this.loading = false;
            });
        }

        // 取消推荐
        private handleCancel(currentId: any) {
            this.$confirm('确定要取消推荐吗?', '提示', {
                type: 'warning'
            }).then(() => {
                const para = {id: currentId};
                getPutForwardManageList(para).then((res: any) => {
                    const {code, msg} = res.data;
                    this.$message.success('取消推荐成功');
                    this.getList(); 
                });
            }).catch(() => {
            });
        }

        // 增加
        private callAdd(id: any) {
            const para = {id: id};
            getPutForwardManageList(para).then((res: any) => {
                const {code, msg} = res.data;
                this.$message.success('添加成功');
                this.dialogFormVisible = false;
                this.getList(); 
            });
        }

        // 关闭弹窗
        private close() {
            this.dialogFormVisible = false;
            // @ts-ignore
            this.$refs.recommendTable.searchForm = {
                type: '1',
                name: '',
                title: '',
            };
            // @ts-ignore
            this.$refs.recommendTable.currentPage = 1;
            // @ts-ignore
            this.$refs.recommendTable.total = null;
            // @ts-ignore
            this.$refs.recommendTable.getList();
        }
        
       
    }
</script>



<style scoped lang="scss">
</style>
