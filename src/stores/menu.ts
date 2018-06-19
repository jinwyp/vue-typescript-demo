import Vue from 'vue';

export const MENU_UPDATE = 'MENU_UPDATE'; // 左侧菜单更新

export default {
    state: {
        menuOptions: [],
        activeTabIndex: 'welcome',
        menuItems: [],
    },
    getters: {},
    mutations: {
        MENU_UPDATE(state: any, menuItems: any) {
            state.menuItems = menuItems;
            // Object.assign(state, menuItems)
        },
// tabs
        add_tab(state: any, options: any) {
            // path {path: '/',name:'欢迎页面'}
            state.menuOptions.push(options);
        },
        set_activeTabIndex(state: any, index: any) {
            state.activeTabIndex = index;
        },
        delete_tab(state: any, path: any) {
            let index = 0;
            for (const option of state.menuOptions) {
                if (option.path === path) {
                    break;
                }
                index++;
            }
            state.menuOptions.splice(index, 1);
        },
    },
    actions: {
        menuUpdate({commit}: any, menuItems: any) {
            commit(MENU_UPDATE, menuItems);
        },
    },
};
