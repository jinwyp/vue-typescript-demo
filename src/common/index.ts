// 组件引用
import navigation from './components/navigation/navigation.vue'; // 当前位置导航
import singleImgUpload from './components/singleImgUpload/singleImgUpload.vue'; // 单图片上传
import goBack from './components/goBack/goBack.vue'; // 返回按钮
// 过滤器引用
import formatTime from './filter/date/formatTime';
// 组件集合
const components: any = {
    navigation,
    singleImgUpload,
    goBack
};
// 过滤器集合
const filters = [
    formatTime
];
const install = function fn(Vue: any, options: any) {
    Object.keys(components).forEach((name: string) => {
        Vue.component(name, components[name]);
    });
    filters.forEach(function(filter: any) {
        Vue.filter(filter.name, filter.fn);
    });
};
export default {install};
