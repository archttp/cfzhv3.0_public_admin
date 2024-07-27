import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/ucenterAdmin/cfAuth/login', data);
}

export function logout() {
  return axios.get<any>('/ucenterAdmin/cfAuth/logout');
}

export function getMyInfo() {
  return axios.get<UserState>('/ucenterAdmin/cfUser/getMyInfo');
}

export function getUserInfo() {
  return axios.get<UserState>('/ucenterAdmin/getMyInfo');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function selectTreeByUser() {
  return axios.get<any>('/ucenterAdmin/cfAuth/selectTreeByUser');
}

// 模糊搜索用户
export function cfUserQuicklySearchUser(params: any) {
  return axios.get<any>('/ucenterAdmin/cfUser/quicklySearchUser', params);
}

// 用户列表
export function cfUserGetListByQuery(params: any) {
  return axios.get<any>('/ucenterAdmin/cfUser/getListByQuery', params);
}

// 新增用户
export function cfUserAdd(data: any) {
  return axios.post('/ucenterAdmin/cfUser/add', data);
}

// 删除用户
export function cfUserDelete(params: any) {
  return axios.delete('/ucenterAdmin/cfUser/delete', params);
}

// 更新用户
export function cfUserUpdate(data: any) {
  return axios.put('/ucenterAdmin/cfUser/update', data);
}

// 获取角色列表
export function cfRoleGet(params: any) {
  return axios.get<any>('/ucenterAdmin/cfRole/getListByQuery', params);
}
export function cfRoleAdd(data: any) {
  return axios.post('/ucenterAdmin/cfRole/add', data);
}
export function cfRoleDelete(params: any) {
  return axios.delete('/ucenterAdmin/cfRole/delete', params);
}
export function cfRoleUpdate(data: any) {
  return axios.put('/ucenterAdmin/cfRole/update', data);
}

// 权限列表
export function cfAuthGet() {
  return axios.get<any>('/ucenterAdmin/cfAuth/selectAll');
}

// 新增权限
export function cfAuthAdd(data: any) {
  return axios.post('/ucenterAdmin/cfAuth/add', data);
}
// 更新权限
export function cfAuthUpdate(data: any) {
  return axios.put('/ucenterAdmin/cfAuth/update', data);
}

// 部门
export function cfDepartmentGet(params: any) {
  return axios.get<any>('/ucenterAdmin/cfDepartment/getListByQuery', params);
}
export function cfDepartmentDelete(params: any) {
  return axios.delete('/ucenterAdmin/cfDepartment/delete', params);
}
export function cfDepartmentAdd(data: any) {
  return axios.post('/ucenterAdmin/cfDepartment/add', data);
}
export function cfDepartmentUpdate(data: any) {
  return axios.put('/ucenterAdmin/cfDepartment/update', data);
}

// 开发者账号 /ucenterAdmin/cfThirdPartyPlatformApplication/add

export function cfDeveloperGet(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfThirdPartyPlatformApplication/getListByQuery',
    params
  );
}
export function cfDeveloperDelete(params: any) {
  return axios.delete(
    '/ucenterAdmin/cfThirdPartyPlatformApplication/delete',
    params
  );
}
export function cfDeveloperAdd(data: any) {
  return axios.post('/ucenterAdmin/cfThirdPartyPlatformApplication/add', data);
}
export function cfDeveloperUpdate(data: any) {
  return axios.put(
    '/ucenterAdmin/cfThirdPartyPlatformApplication/update',
    data
  );
}
export function cfSystemGet(params: any) {
  return axios.get<any>('/ucenterAdmin/cfSystemConfig/getListByQuery', params);
}
export function cfSystemDelete(params: any) {
  return axios.delete('/ucenterAdmin/cfSystemConfig/delete', params);
}
export function cfSystemAdd(data: any) {
  return axios.post('/ucenterAdmin/cfSystemConfig/add', data);
}
export function cfSystemUpdate(data: any) {
  return axios.put('/ucenterAdmin/cfSystemConfig/update', data);
}

export function getRoleIdByUid(data: any) {
  return axios.get('/ucenterAdmin/cfRole/getRoleIdByUid', data);
}

export function selectTreeByRole(data: any) {
  return axios.get('/ucenterAdmin/cfAuth/selectTreeByRole', data);
}

export function addRoleAuth(data: any) {
  return axios.post('/ucenterAdmin/cfRole/addRoleAuth', data);
}

export function createLoginQrCode(data: any) {
  return axios.post('/ucenterAdmin/cfQrCode/createLoginQrCode', data);
}

export function loginByQrCode(data: any) {
  return axios.get('/ucenterAdmin/cfAuth/loginByQrCode', data);
}

// 身份证
export function cfUserIdCardGet(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfUsercertificate/getIdCardListByQuery',
    params
  );
}
export function cfUserIdCardDelete(params: any) {
  return axios.delete('/ucenterAdmin/cfUsercertificate/deleteIdCard', params);
}
export function cfUserIdCardAdd(data: any) {
  return axios.post('/ucenterAdmin/cfUsercertificate/addIdCard', data);
}
export function cfUserIdCardUpdate(data: any) {
  return axios.put('/ucenterAdmin/cfUsercertificate/updateIdCard', data);
}

// 营业执照
export function getBusinessLicenseListByQuery(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfUsercertificate/getBusinessLicenseListByQuery',
    params
  );
}
export function deleteBusinessLicense(params: any) {
  return axios.delete(
    '/ucenterAdmin/cfUsercertificate/deleteBusinessLicense',
    params
  );
}
export function addBusinessLicense(data: any) {
  return axios.post('/ucenterAdmin/cfUsercertificate/addBusinessLicense', data);
}
export function updateBusinessLicense(data: any) {
  return axios.put(
    '/ucenterAdmin/cfUsercertificate/updateBusinessLicense',
    data
  );
}

export function modifyPersonalInformation(data: any) {
  return axios.put('/ucenterAdmin/cfUser/modifyPersonalInformation', data);
}

export function getUserDriverLicenseListByQuery(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfUsercertificate/getUserDriverLicenseListByQuery',
    params
  );
}
export function deleteUserDriverLicense(params: any) {
  return axios.delete(
    '/ucenterAdmin/cfUsercertificate/deleteUserDriverLicense',
    params
  );
}
export function addUserDriverLicense(data: any) {
  return axios.post('/ucenterAdmin/cfUsercertificate/addUserDriverLicense', data);
}
export function updateUserDriverLicense(data: any) {
  return axios.put(
    '/ucenterAdmin/cfUsercertificate/updateUserDriverLicense',
    data
  );
}

export function cfQrCodeGet(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfQrCode/getListByQuery',
    params
  );
}

export function getUserRoleProductListByQuery(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfRole/getUserRoleProductListByQuery',
    params
  );
}
export function deleteUserRoleProduct(params: any) {
  return axios.delete(
    '/ucenterAdmin/cfRole/deleteUserRoleProduct',
    params
  );
}
export function addUserRoleProduct(data: any) {
  return axios.post('/ucenterAdmin/cfRole/addUserRoleProduct', data);
}
export function updateUserRoleProduct(data: any) {
  return axios.put(
    '/ucenterAdmin/cfRole/updateUserRoleProduct',
    data
  );
}
// 用户操作日志列表
export function getActionLogListByQuery(params: any) {
  return axios.get<any>('/ucenterAdmin/cfUser/getActionLogListByQuery', params);
}

export function getDomainListByQuery(params: any) {
  return axios.get<any>('/ucenterAdmin/cfUser/getDomainListByQuery', params);
}
export function addDomain(data: any) {
  return axios.post('/ucenterAdmin/cfUser/addDomain', data);
}
export function updateDomain(data: any) {
  return axios.put(
    '/ucenterAdmin/cfUser/updateDomain',
    data
  );
}
export function deleteDomain(params: any) {
  return axios.delete(
    '/ucenterAdmin/cfUser/deleteDomain',
    params
  );
}

// 广告列表
export function getAdListByQuery(params: any) {
  return axios.get<any>('/ucenterAdmin/cfAd/getListByQuery', params);
}
// 新增广告
export function addAd(data: any) {
  return axios.post('/ucenterAdmin/cfAd/add', data);
}
// 编辑广告
export function updateAd(data: any) {
  return axios.put('/ucenterAdmin/cfAd/update', data);
}
// 删除广告
export function deleteAd(params: any) {
  return axios.delete(
    '/ucenterAdmin/cfAd/delete',
    params
  );
}
