import Vue from 'vue';
import Vuex from 'vuex' ;
import commonVar from './commonVar';
// import menu from './menu';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        commonVar,
    },
});
