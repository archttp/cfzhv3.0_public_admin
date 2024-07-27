import axios from 'axios';


export function cfSmsGet(params: any) {
  return axios.get<any>(
    '/validationAdmin/cfSms/getListByQuery',
    params
  );
}

export function getThirdPartyPlatformListByQuery(params: any) {
  return axios.get<any>(
    '/validationAdmin/cfFaceVerifyController/getThirdPartyPlatformListByQuery',
    params
  );
}

export function getSmsConfigListByQuery(params: any) {
  return axios.get<any>(
    '/validationAdmin/cfSms/getSmsConfigListByQuery',
    params
  );
}

export function addSmsConfig(data: any) {
  return axios.post('/validationAdmin/cfSms/addSmsConfig', data);
}

export function deleteSmsConfig(params: any) {
  return axios.delete(
    '/validationAdmin/cfSms/deleteSmsConfig',
    params
  );
}

export function updateSmsConfig(data: any) {
  return axios.put(
    '/validationAdmin/cfSms/updateSmsConfig',
    data
  );
}