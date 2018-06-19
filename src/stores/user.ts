export const USER_SIGNIN = 'USER_SIGNIN'; // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT'; // 退出登录

export default {
    state: JSON.parse(localStorage.getItem('user') + '') || {},
    getters: {
        // this.$store.getters['getUser'].user
        // getUser(state){
        //     return state.username
        // }
    },
    mutations: {
        USER_SIGNIN(state: any, user: any) {
            // 登录赋值
            localStorage.setItem('user', user);
            // Object.assign(state, user)
        },
        USER_SIGNOUT(state: any) {
            localStorage.removeItem('user');

            // Object.keys(state).forEach(k => Vue.delete(state, k))
        },
    },
    actions: {
        userSignIn({commit}: any, user: any) {
            commit(USER_SIGNIN, user);
        },
        userSignOut({commit}: any) {
            commit(USER_SIGNOUT);
        },
    },
};
