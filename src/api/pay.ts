import axios from 'axios';
// import { UserState } from '@/store/modules/user/types';

export function cfOrderGet(params: any) {
  return axios.get<any>('/payAdmin/cfOrder/getListByQuery', params);
}
export function refund(data: any) {
  return axios.post('/payAdmin/cfOrder/refund', data);
}
export function exportOrderExcel(params: any) {
  return axios.get<any>('/payAdmin/cfOrder/exportOrderExcel', params);
}

export function deletePack() {
  return axios.get<any>('/carparkAdmin/delete');
}

// 收款账户
export function cfPaymentAgencyGet(params: any) {
  return axios.get<any>('/payAdmin/cfUserPaymentAgency/getListByQuery', params);
}
export function cfPaymentAgencyDelete(params: any) {
  return axios.delete('/payAdmin/cfUserPaymentAgency/delete', params);
}
export function cfPaymentAgencyAdd(data: any) {
  return axios.post('/payAdmin/cfUserPaymentAgency/add', data);
}
export function cfPaymentAgencyUpdate(data: any) {
  return axios.put('/payAdmin/cfUserPaymentAgency/update', data);
}

// 积分类型
export function cfScoreTypeGet(params: any) {
  return axios.get<any>('/payAdmin/cfScoreType/getListByQuery', params);
}
export function cfScoreTypeDelete(params: any) {
  return axios.delete('/payAdmin/cfScoreType/delete', params);
}
export function cfScoreTypeAdd(data: any) {
  return axios.post('/payAdmin/cfScoreType/add', data);
}
export function cfScoreTypeUpdate(data: any) {
  return axios.put('/payAdmin/cfScoreType/update', data);
}

// 资金账户

export function cfAccountGet(params: any) {
  return axios.get<any>('/payAdmin/cfAccount/getListByQuery', params);
}

// 申请服务商
export function wxInboundApplicationOfSpecialMerchants(data: any) {
  return axios.post('/payAdmin/cfUserPaymentAgency/wxInboundApplicationOfSpecialMerchants', data);
}

export function getCouponListByQuery(params: any) {
  return axios.get<any>('/payAdmin/cfCoupon/getCouponListByQuery', params);
}
export function getCouponActivityListByQuery(params: any) {
  return axios.get<any>('/payAdmin/cfCoupon/getCouponActivityListByQuery', params);
}
export function deleteCouponActivity(params: any) {
  return axios.delete('/payAdmin/cfCoupon/deleteCouponActivity', params);
}
export function addCouponActivity(data: any) {
  return axios.post('/payAdmin/cfCoupon/addCouponActivity', data);
}
export function updateCouponActivity(data: any) {
  return axios.put('/payAdmin/cfCoupon/updateCouponActivity', data);
}

export function getCfCouponActivityLinkShopListByQuery(data: any) {
  return axios.get('/payAdmin/cfCoupon/getCfCouponActivityLinkShopListByQuery', data);
}
export function addCfCouponActivityLinkShop(data: any) {
  return axios.post('/payAdmin/cfCoupon/addCfCouponActivityLinkShop', data);
}
export function deleteCfCouponActivityLinkShop(params: any) {
  return axios.delete('/payAdmin/cfCoupon/deleteCfCouponActivityLinkShop', params);
}

export function getCouponActivityCouponTypeListByQuery(data: any) {
  return axios.get('/payAdmin/cfCoupon/getCouponActivityCouponTypeListByQuery', data);
}
export function deleteCouponActivityCouponType(params: any) {
  return axios.delete('/payAdmin/cfCoupon/deleteCouponActivityCouponType', params);
}
export function addCouponActivityCouponType(data: any) {
  return axios.post('/payAdmin/cfCoupon/addCouponActivityCouponType', data);
}

export function getCouponActivityStaffListByQuery(data: any) {
  return axios.get('/payAdmin/cfCoupon/getCouponActivityStaffListByQuery', data);
}
export function deleteCouponActivityStaff(params: any) {
  return axios.delete('/payAdmin/cfCoupon/deleteCouponActivityStaff', params);
}
export function addCouponActivityStaff(data: any) {
  return axios.post('/payAdmin/cfCoupon/addCouponActivityStaff', data);
}
export function quicklySearchCouponActivity(data: any) {
  return axios.get('/payAdmin/cfCoupon/quicklySearchCouponActivity', data);
}


export function getBankListByQuery(data: any) {
  return axios.get('/payAdmin/cfBank/getBankListByQuery', data);
}
export function deleteBank(params: any) {
  return axios.delete('/payAdmin/cfBank/deleteBank', params);
}
export function addBank(data: any) {
  return axios.post('/payAdmin/cfBank/addBank', data);
}
export function updateBank(data: any) {
  return axios.put('/payAdmin/cfBank/updateBank', data);
}


export function getBankBranchListByQuery(data: any) {
  return axios.get('/payAdmin/cfBank/getBankBranchListByQuery', data);
}
export function deleteBankBranch(params: any) {
  return axios.delete('/payAdmin/cfBank/deleteBankBranch', params);
}
export function addBankBranch(data: any) {
  return axios.post('/payAdmin/cfBank/addBankBranch', data);
}
export function updateBankBranch(data: any) {
  return axios.put('/payAdmin/cfBank/updateBankBranch', data);
}


// 支付机构
export function getPaymentAgencyListByQuery(data: any) {
  return axios.get('/payAdmin/cfUserPaymentAgency/getPaymentAgencyListByQuery', data);
}

export function transferenceCouponActivity(data: any) {
  return axios.put('/payAdmin/cfCoupon/transferenceCouponActivity', data);
}


