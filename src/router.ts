import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from './pages/404.vue'; // 404页面
import Home from './pages/Home.vue'; // home外框架
import SubRouter from './pages/SubRouter.vue'; // 子页面外框架

// import DistributionGoods from './pages/distribution/distributionGoods/list.vue'; // 分销商品管理=>列表
// import DistributionGoodsAdd from './pages/distribution/distributionGoods/add.vue'; // 分销商品管理=>新增
// import DistributionGoodsDetail from './pages/distribution/distributionGoods/detail.vue'; // 分销商品管理=>详情
import DistributionImageText from './pages/distribution/distributionImageText/list.vue'; // 分销图文管理=>列表
import DistributionRecommend from './pages/distribution/distributionImageText/recommend.vue'; // 分销图文管理=>推荐图文
import JoinManage from './pages/distribution/joinManage/list.vue'; // C端分销商准入管理=>列表
import JoinManageSetting from './pages/distribution/joinManage/setting.vue'; // C端分销商准入管理=>设置准入门槛
import InviteUser from './pages/distribution/inviteUser/list.vue'; // 设置种子用户=>列表
import InviteUserRecord from './pages/distribution/inviteUser/record.vue'; // 设置种子用户=>邀请记录
import InviteUserAdd from './pages/distribution/inviteUser/add.vue'; // 设置种子用户=>邀请种子用户
import CommentManage from './pages/distribution/commentManage/list.vue'; // 评论管理
// import CommissionDetail from './pages/distribution/commissionDetail/list.vue'; // 佣金明细
// import BalanceManage from './pages/distribution/balanceManage/list.vue'; // 结算管理=>列表
// import BalanceManageExamine from './pages/distribution/balanceManage/examine.vue'; // 结算管理=>结算审核
// import BalanceManagePay from './pages/distribution/balanceManage/pay.vue'; // 结算管理=>结算付款
// import BalanceManageDetails from './pages/distribution/balanceManage/details.vue'; // 结算管理=>结算详情
import PutForwardManage from './pages/distribution/putForwardManage/list.vue'; // 提现管理=>列表
import PutForwardManageExamine from './pages/distribution/putForwardManage/examine.vue'; // 提现管理=>提现审核
import PutForwardManagePay from './pages/distribution/putForwardManage/pay.vue'; // 提现管理=>提现付款
import PutForwardManageDetails from './pages/distribution/putForwardManage/details.vue'; // 提现管理=>提现详情



Vue.use(VueRouter);

const routes: any = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true,
    },
    {
        path: '/',
        component: Home,
        name: '',
        hidden: true,
    },
    {
        path: '/',
        component: Home,
        name: '分销业务',
        icon: '',
        children: [
            /*{ 
                path: '/distributionGoods', 
                component: SubRouter, 
                name: '分销商品管理',
                children: [
                    { path: '', component: DistributionGoods, name: '列表' },
                    { path: 'add/', component: DistributionGoodsAdd, name: '新增分销商品', hidden: true },
                    { path: 'edit/:id', component: DistributionGoodsAdd, name: '修改分销商品', hidden: true },
                    { path: 'detail/:id', component: DistributionGoodsDetail, name: '商品详情', hidden: true },
                ]
            },*/
            { 
                path: '/distributionImageText',
                component: SubRouter,
                name: '分销图文管理',
                children: [
                    { path: '', component: DistributionImageText, name: '列表' },
                    { path: 'recommend/', component: DistributionRecommend, name: '推荐图文', hidden: true },
                ]
            },
            {
                path: '/joinManage',
                component: SubRouter,
                name: 'C端分销商准入管理',
                children: [
                    { path: '', component: JoinManage, name: '列表' },
                    { path: 'setting/', component: JoinManageSetting, name: '设置准入门槛', hidden: true },
                    { path: 'setting/:id', component: JoinManageSetting, name: '设置准入门槛', hidden: true },
                ]
            },
            {
                path: '/inviteUser',
                component: SubRouter,
                name: '种子用户管理',
                children: [
                    { path: '', component: InviteUser, name: '列表' },
                    { path: 'record/:id', component: InviteUserRecord, name: '邀请记录', hidden: true },
                    { path: 'add', component: InviteUserAdd, name: '邀请种子用户', hidden: true },
                    { path: 'add/:id', component: InviteUserAdd, name: '重新邀请', hidden: true },
                ]
            },
            { path: '/commentManage', component: CommentManage, name: '评论管理' },
            // { path: '/commissionDetail', component: CommissionDetail, name: '佣金明细' },
            /*{
                path: '/balanceManage',
                component: SubRouter,
                name: '结算管理',
                children: [
                    { path: '', component: BalanceManage, name: '列表' },
                    { path: 'examine/:id', component: BalanceManageExamine, name: '结算审核', hidden: true },
                    { path: 'pay/:id', component: BalanceManagePay, name: '结算付款', hidden: true },
                    { path: 'details/:id', component: BalanceManageDetails, name: '结算详情', hidden: true },
                ]
            },*/
            { 
                path: '/putForwardManage', 
                component: SubRouter, 
                name: '提现管理',
                children: [
                    { path: '', component: PutForwardManage, name: '列表' },
                    { path: 'examine/:id', component: PutForwardManageExamine, name: '提现审核', hidden: true },
                    { path: 'pay/:id', component: PutForwardManagePay, name: '提现付款', hidden: true },
                    { path: 'details/:id', component: PutForwardManageDetails, name: '提现详情', hidden: true },
                ]
            },
        ],
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' },
    },
];

const router = new VueRouter({
    routes,
});

/*router.beforeEach((to, from, next) => {
    if(to.query.token){
        next()
    }else{
        window.location.href='http://stestadmin.eyee.com/Admin/Login/Index'
    }
})*/



export default router;
