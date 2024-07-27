import axios from 'axios';
// import { UserState } from '@/store/modules/user/types';

export function parkCounts() {
  return axios.get<any>('/internetOfThingsAdmin/cfCarPark/countParkByQuery');
}
export function setParkDefaultDeviceScreenShow(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/setDefaultDeviceScreenShow',
    data
  );
}
export function setParkDefaultCarParkCarLimit(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/setDefaultCarParkCarLimit',
    data
  );
}

export function deletePack() {
  return axios.get<any>('/carparkAdmin/delete');
}

// 通道
export function cfCheckPointGet(data: any) {
  return axios.get('/internetOfThingsAdmin/cfCheckPoint/getListByQuery', data);
}
export function cfCheckPointAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCheckPoint/add', data);
}
export function cfCheckPointUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfCheckPoint/update', data);
}
export function cfCheckPointDelete(data: any) {
  return axios.delete('/internetOfThingsAdmin/cfCheckPoint/delete', data);
}

export function cfDeviceGet(data: any) {
  return axios.get('/internetOfThingsAdmin/cfDevice/getListByQuery', data);
}

export function cfDeviceAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfDevice/add', data);
}
export function cfDeviceUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfDevice/update', data);
}
export function cfDeviceDelete(data: any) {
  return axios.delete('/internetOfThingsAdmin/cfDevice/delete', data);
}
export function bindThirdPartyCloudPlatforms(data: any) {
  return axios.post('/internetOfThingsAdmin/cfDevice/bindThirdPartyCloudPlatforms', data);
}
export function getRemoteConnection(data: any) {
  return axios.get('/internetOfThingsAdmin/cfDevice/getRemoteConnection', data);
}

// 收费规则
export function chargingRuleGet(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/getChargingRulesListByQuery',
    data
  );
}

export function chargingRuleAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addChargingRules', data);
}
export function chargingRuleUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateChargingRules',
    data
  );
}
export function chargingRuleDelete(data: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteChargingRules',
    data
  );
}

// 车辆类型
export function getCarTypeListByQuery(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/getCarTypeListByQuery',
    data
  );
}
export function carTypeAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCarType', data);
}
export function carTypeDelete(data: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarType',
    data
  );
}
export function carTypeUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarType',
    data
  );
}
// 车辆预约
export function getCarParkVisitListByQuery(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/getCarParkVisitListByQuery',
    data
  );
}
export function addCarParkVisit(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCarParkVisit', data);
}
export function deleteCarParkVisit(data: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkVisit',
    data
  );
}
export function updateCarParkVisit(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkVisit',
    data
  );
}