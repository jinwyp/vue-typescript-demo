<template>
	<el-row class="container">
		<el-col :span="24" class="main">
			<aside v-if="navVisible">
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo"
					theme="dark" unique-opened router  mode="horizontal">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<template v-for="child in item.children">
								<template v-if="!child.hidden">
									<el-submenu :index="child.path" v-if="child.three">
										<template slot="title">{{child.name}}</template>
										<el-menu-item v-for="subThree in child.children" :index="subThree.path">
											{{subThree.name}}
										</el-menu-item>
									</el-submenu>
									<el-menu-item :index="child.path" v-if="!child.three">
										{{child.name}}
									</el-menu-item>
								</template>
							</template>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<el-col :span="24" class="content-wrapper">
					<transition>
						<router-view></router-view>
					</transition>
				</el-col>
			</section>
		</el-col>
	</el-row>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
        private navVisible: boolean = true;

        private mounted() {
            /*console.log(process.env.NODE_ENV);
            if ( process.env.NODE_ENV === 'development') {
                this.navVisible = true;
            } else {
                this.navVisible = false;
            }*/
        }
    }
</script>

<style scoped lang="scss">

</style>

