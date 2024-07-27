import axios from 'axios';
// import { UserState } from '@/store/modules/user/types';

//
export function cfCarParkGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getListByQuery',
    params
  );
}
export function cfCarParkDelete(params: any) {
  return axios.delete('/internetOfThingsAdmin/cfCarPark/delete', params);
}
export function cfCarParkAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/add', data);
}
export function carParkPackageCashBuy(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/carParkPackageCashBuy', data);
}
export function oneClickRelease(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/oneClickRelease', data);
}
export function cfCarParkUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfCarPark/update', data);
}
export function cfCarParkSearch(params: any) {
  return axios.get<any>('/internetOfThingsAdmin/cfCarPark/search', params);
}
export function getCarParkUseLogOrder(params: any) {
  return axios.get<any>('/internetOfThings/cfCarParkUseLog/getCarParkUseLogOrder', params);
}
export function controllerDeviceVoice(data: any) {
  return axios.post('/internetOfThingsAdmin/cfDevice/controllerDeviceVoice', data);
}

// 车牌绑定列表
export function bindGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarListByQuery',
    params
  );
}
export function bindDelete(params: any) {
  return axios.delete('/internetOfThingsAdmin/cfCarPark/deleteCar', params);
}
export function bindAdds(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCar', data);
}
export function bindUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfCarPark/updateCar', data);
}

// 停车记录
export function useLogGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkUseLogListByQuery',
    params
  );
}
export function getCarParkUseLogImages(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkUseLogImages',
    params
  );
}
export function useLogDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkUseLog',
    params
  );
}
export function useLogAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCarParkUseLog', data);
}
export function useLogUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkUseLog',
    data
  );
}
export function exportUseLogExcel(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/exportUseLogExcel',
    params,
  );
}

export function exportCarParkPackageExcel(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/exportCarParkPackageExcel',
    params,
  );
}

// 套餐产品
export function productGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkPackageProductListByQuery',
    params
  );
}
export function productDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkPackageProduct',
    params
  );
}
export function productAdd(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarPark/addCarParkPackageProduct',
    data
  );
}
export function productUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkPackageProduct',
    data
  );
}

// 套餐列表
export function packageListGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkPackageListByQuery',
    params
  );
}
export function getCarParkPackageLogListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkPackageLogListByQuery',
    params
  );
}
export function packageListDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkPackage',
    params
  );
}
export function packageListAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCarParkPackage', data);
}
export function addCarParkHomeGroupPackage(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCarParkHomeGroupPackage', data);
}
export function packageListUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkPackage',
    data
  );
}

// 特殊车辆
export function specialCarGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkSpecialCarListByQuery',
    params
  );
}
export function specialCarDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkSpecialCar',
    params
  );
}
export function specialCarAdd(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarPark/addCarParkSpecialCar',
    data
  );
}
export function specialCarUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkSpecialCar',
    data
  );
}

//车辆限制
export function getCarParkCarLimitListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkCarLimitListByQuery',
    params
  );
}
export function addCarParkCarLimit(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarPark/addCarParkCarLimit',
    data
  );
}
export function updateCarParkCarLimit(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkCarLimit',
    data
  );
}
export function deleteCarParkCarLimit(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkCarLimit',
    params
  );
}

export function getShopAccountNumberListByQuery(params: any) {
  return axios.get<any>(
    '/payAdmin/cfUserPaymentAgency/getShopAccountNumberListByQuery',
    params
  );
}
export function deleteShopAccountNumber(params: any) {
  return axios.delete(
    '/payAdmin/cfUserPaymentAgency/deleteShopAccountNumber',
    params
  );
}
export function addShopAccountNumber(data: any) {
  return axios.post('/payAdmin/cfUserPaymentAgency/addShopAccountNumber', data);
}

// 显示屏
export function ledGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfDeviceScreenShow/getListByQuery',
    params
  );
}
export function ledDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfDeviceScreenShow/delete',
    params
  );
}
export function ledAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfDeviceScreenShow/add', data);
}
export function ledUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfDeviceScreenShow/update', data);
}

export function cfAreaLinkUser(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfAreaLinkUser/getListByQuery',
    params
  );
}

export function cfAreaLinkUserAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfAreaLinkUser/add', data);
}
export function cfAreaLinkUserDelete(params: any) {
  return axios.delete('/internetOfThingsAdmin/cfAreaLinkUser/delete', params);
}
export function cfAreaLinkUserUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfAreaLinkUser/update', data);
}
export function cfCheckPointLinkUser(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCheckPointLinkUser/getListByQuery',
    params
  );
}

export function cfCheckPointLinkUserAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCheckPointLinkUser/add', data);
}
export function cfCheckPointLinkUserDelete(params: any) {
  return axios.delete('/internetOfThingsAdmin/cfCheckPointLinkUser/delete', params);
}
// 充电相关
export function cfChargingStationGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/getListByQuery',
    params
  );
}
export function cfChargingStationDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfChargingStation/delete',
    params
  );
}
export function cfChargingStationUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfChargingStation/update', data);
}
export function cfChargingStationAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfChargingStation/add', data);
}
export function countChargingStationByQuery() {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/countChargingStationByQuery'
  );
}

// 充电站收费规则
export function cfChargingStationRulesGet(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/getRulesListByQuery',
    params
  );
}
export function cfChargingStationRulesAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfChargingStation/addRules', data);
}
export function cfChargingStationRulesDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfChargingStation/deleteRules',
    params
  );
}
export function cfChargingStationRulesUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfChargingStation/updateRules',
    data
  );
}

// 充电口
export function chargingPortGet(params: any) {
  return axios.get<any>(
    'internetOfThingsAdmin/cfChargingStation/getChargingPortListByQuery',
    params
  );
}
export function chargingPortAdd(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfChargingStation/addChargingPort',
    data
  );
}
export function chargingPortDelete(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfChargingStation/deleteChargingPort',
    params
  );
}
export function chargingPortUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfChargingStation/updateChargingPort',
    data
  );
}

// 充电记录
export function getChargingUseLogListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/getChargingUseLogListByQuery',
    params
  );
}
export function deleteChargingUseLog(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfChargingStation/deleteChargingUseLog',
    params
  );
}
export function transferChargingStation(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfChargingStation/transferChargingStation',
    data
  );
}

// 充电站模糊搜索
export function cfChargingStationSearch(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/search',
    params
  );
}
export function controllerDeviceSwitch(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfDevice/controllerDeviceSwitch',
    data
  );
}

export function getDutyLogListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCheckPoint/getDutyLogListByQuery',
    params
  );
}

export function createTempQrCode(data: any) {
  return axios.post(
    '/ucenterAdmin/cfQrCode/createTempQrCode',
    data
  );
}

export function countDeviceByQuery() {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfDevice/countDeviceByQuery'
  );
}


export function chargingDeviceSetting(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfDevice/chargingDeviceSetting',
    data
  );
}
export function addChargingDeviceRules(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfChargingStation/addChargingDeviceRules',
    data
  );
}
export function getChargingDeviceRulesListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/getChargingDeviceRulesListByQuery',
    params
  );
}
export function updateChargingDeviceRules(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfChargingStation/updateChargingDeviceRules',
    data
  );
}

export function addChargingDeviceRulesOption(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfChargingStation/addChargingDeviceRulesOption',
    data
  );
}
export function getChargingDeviceRulesOptionListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/getChargingDeviceRulesOptionListByQuery',
    params
  );
}
export function updateChargingDeviceRulesOption(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfChargingStation/updateChargingDeviceRulesOption',
    data
  );
}
export function deleteChargingDeviceRulesOption(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfChargingStation/deleteChargingDeviceRulesOption',
    params
  );
}

export function getChargingStoredCardListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfChargingStation/getChargingStoredCardListByQuery',
    params
  );
}
export function addChargingStoredCard(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfChargingStation/addChargingStoredCard',
    data
  );
}
export function deleteChargingStoredCard(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfChargingStation/deleteChargingStoredCard',
    params
  );
}
export function updateChargingStoredCard(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfChargingStation/updateChargingStoredCard',
    data
  );
}

export function transferParking(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/transferParking',
    data
  );
}

export function importExcelParkPackage(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarPark/importExcelParkPackage',
    data,
  );
}




export function getCarParkDataReportingPlatformListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/getCarParkDataReportingPlatformListByQuery',
    params
  );
}
export function addCarParkDataReportingPlatform(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/addCarParkDataReportingPlatform',
    data
  );
}
export function deleteCarParkDataReportingPlatform(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/deleteCarParkDataReportingPlatform',
    params
  );
}
export function updateCarParkDataReportingPlatform(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/updateCarParkDataReportingPlatform',
    data
  );
}




export function getLinkPlatformListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/getLinkPlatformListByQuery',
    params
  );
}
export function addLinkPlatform(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/addLinkPlatform',
    data
  );
}
export function deleteLinkPlatform(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/deleteLinkPlatform',
    params
  );
}
export function updateLinkPlatform(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarParkLinkDataReportingPlatform/updateLinkPlatform',
    data
  );
}


// 价格测算
export function costMeasurement(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/costMeasurement',
    params
  );
}

export function getCarParkStoredCardListByQuery(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCarPark/getCarParkStoredCardListByQuery',
    params
  );
}
export function addCarParkStoredCard(data: any) {
  return axios.post(
    '/internetOfThingsAdmin/cfCarPark/addCarParkStoredCard',
    data
  );
}
export function deleteCarParkStoredCard(params: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarParkStoredCard',
    params
  );
}
export function updateCarParkStoredCard(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarParkStoredCard',
    data
  );
}

export function getDomainListByQuery(params: any) {
  return axios.get<any>(
    '/ucenterAdmin/cfUser/getDomainListByQuery',
    params
  );
}

export function getCheckPointQrcodeDomain(params: any) {
  return axios.get<any>(
    '/internetOfThingsAdmin/cfCheckPoint/getCheckPointQrcodeDomain',
    params
  );
}

