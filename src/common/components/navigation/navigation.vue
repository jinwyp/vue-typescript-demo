<template>
    <div class="breadcrumb-container">
        <el-col :span="24">
            <i>您当前位置：</i>
            <el-breadcrumb separator=">" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <em>
                <slot></slot>
            </em>
        </el-col>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class Navigation extends Vue {

    }
</script>


<style scoped lang="scss">
</style>
