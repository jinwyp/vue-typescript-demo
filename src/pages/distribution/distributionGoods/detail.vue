<template>
	<section>
		<navigation></navigation>
        <div class="tabel-con">
            <div class="goodsDetail">
                <div class="goodsDetail-label">
                    
                </div>
                <div class="goodsDetail-info">
                    <ul>
                        <li><span>商品编号：</span><em>{{listContent.orderNum}}</em></li>
                        <li><span>商品名称：</span><em>{{listContent.title}}</em></li>
                        <li><span>类目：</span><em>{{listContent.class}}</em></li>
                        <li><span>品牌：</span><em>{{listContent.logo}}</em></li>
                        <li><span>零售价：</span><em>人民币：{{listContent.price}} 元</em></li>
                        <li><span>促销价：</span><em>人民币：{{listContent.sale}} 元</em></li>
                        <li><span>是否限购：</span><em>{{listContent.xg}}</em></li>
                        <li><span>是否支持退换货：</span><em>{{listContent.change}}</em></li>
                        <li><span>是否是全球购商品：</span><em>{{listContent.world}}</em></li>
                        <li><span>材质：</span><em>{{listContent.cz}}</em></li>
                        <li>
                            <span>商品图片：</span>
                            <em>
                                <div class="goodsDetail-pic">
                                    <span v-for="item in listContent.pic">
                                        <img :src="item" @click="imgShow(item)">
                                    </span>
                                </div>
                            </em>
                        </li>
                        <li>
                            <span>规格明细：</span>
                            <em>
                                <div class="goodsDetail-spec">
                                    <table>
                                        <tr>
                                            <th :colspan="5">规格明细</th>
                                        </tr>
                                        <tr>
                                            <td v-for="(items,index) in listContent.spec" :key="index">
                                                <p>{{items.label}}</p>
                                                <p v-for="item in items.child">{{item}}</p>
                                            </td>
                                            
                                        </tr>
                                    </table>
                                </div>
                            </em>
                        </li>
                        <li>
                            <span>商品明细：</span>
                            <em>
                                <div class="goodsDetail-spec">
                                    <table>
                                        <tr>
                                            <th>颜色</th>
                                            <th>尺码</th>
                                            <th>零售价</th>
                                            <th>库存</th>
                                            <th>条形码</th>
                                        </tr>
                                        <tr v-for="items in listContent.goods">
                                            <td class="goodsImg">
                                                <p>{{items.label}}</p>
                                                <p><img :src="items.img"/></p>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li v-for="child in items.size">{{child}}</li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li v-for="child in items.price">{{child}}</li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li v-for="child in items.stock">{{child}}</li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li v-for="child in items.code">{{child}}</li>
                                                </ul>
                                            </td>                                              

                                        </tr>
                                    </table>
                                </div>
                            </em>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
		<el-dialog :visible.sync="imgVisible" title="图片预览">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getGoodsDetail } from '@/api/api';

@Component({})
export default class DistributionGoodsDetail extends Vue {
    private imgVisible: boolean = false; // 预览弹窗显隐
    private dialogImageUrl: string = ''; // 预览图片地址
    private listContent: any[] = []; // 列表数据
    private colspan: number = 0;

    private created() {
        this.getDate();
    }

    // 获取编辑数据
    private getDate() {
        const para: any = {
            id: this.$route.params.id
        };
        getGoodsDetail(para).then((res: any) => {
            const {code, data, msg} = res.data;
            this.listContent = data;
            this.colspan = data.spec.length;            
        });
    }

    // 预览图
    private imgShow(url: string) {
        this.imgVisible = true;
        this.dialogImageUrl = url;
    } 
    
}
</script>


<style scoped lang="scss">
    .goodsDetail{
        color:#666;
    }
    .goodsDetail-info{
        li{
            width:100%;
            height: auto;
            display: flex;
            padding: 10px 0;
            > span{
                flex:0 0 160px;
                text-align: right;
            }
            > em{
                flex:1;
                margin-left: 10px;
                font-style:normal;
            }
        }

    }
    .goodsDetail-pic{
        display: flex;
        span{
            margin-right:10px;
            img{
                width: 100px;
                cursor: pointer;
            }
        }
    }
    .goodsDetail-spec{
        table,td,th{
            border:1px solid #ddd;
            border-collapse: collapse;
        }
        th{
            background-color: #F0EFF4;
        }
        td,th{
            width:120px;
            padding: 5px 10px;
            text-align: center;
            line-height: 24px;
        }
        .goodsImg{
            img{
                width: 60px;
            }
        }
        
    }
</style>
