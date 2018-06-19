<template>
    <el-button size="mini" type="" @click="$router.go(-1)" class="mar-t-20"><slot>返回</slot></el-button>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class GoBack extends Vue {

    }
</script>


<style scoped lang="scss">
</style>
