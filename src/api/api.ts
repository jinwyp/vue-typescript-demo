import http from './http';

export const getPutForwardManageList = (params: any) => { 
    return http.get('/api/distribution/list', { params }); };
export const getPutForwardManageExamine = (params: any) => { return http.get('/api/distribution/examine', { params }); };
export const getGoodsDetail = (params: any) => { return http.get('/api/distribution/detail', { params }); };
