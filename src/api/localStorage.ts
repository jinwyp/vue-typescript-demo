function getLS(key: string) {
    let result: string = '';
    const tempString: string | null = localStorage.getItem(key);
    if (tempString) {
        try {
            result = JSON.parse(tempString);
        } catch (e) {
            console.log('JSON parse key: ', key, ' error!', e); // error in the above string (in this case, yes)!
        }
    }
    return result;
}
const removeAccessToken = function() {
    localStorage.removeItem('accessToken');
};
const getAccessToken = localStorage.getItem('accessToken') || '';
const saveAccessToken = function(newToken: string = '') {
    localStorage.setItem('accessToken', newToken);
};
const getCurrentUserInfo = getLS('currentUserInfo');
const saveCurrentUserInfo = function(user: string = '') {
    if (user) {
        localStorage.setItem('currentUserInfo', JSON.stringify(user));
    }
};
const getNewsCategory = getLS('newsCategory');
const saveNewsCategory = function(categoryList: any[] = []) {
    if (Array.isArray(categoryList)) {
        localStorage.setItem('newsCategory', JSON.stringify(categoryList));
    }
};
export {
    removeAccessToken,
    getAccessToken,
    saveAccessToken,
    getCurrentUserInfo,
    saveCurrentUserInfo,
    getNewsCategory,
    saveNewsCategory
};
