import axios from 'axios';


export function cfFileGet(params: any) {
  return axios.get<any>(
    '/fileAdmin/cfFile/getListByQuery',
    params
  );
}
export function cfFileDelete(params: any) {
  return axios.delete(
    '/fileAdmin/cfFile/delete',
    params
  );
}


export function getFilePlatformListByQuery(params: any) {
  return axios.get<any>(
    '/fileAdmin/cfFile/getFilePlatformListByQuery',
    params
  );
}

export function addFilePlatform(data: any) {
  return axios.post('/fileAdmin/cfFile/addFilePlatform', data);
}

export function deleteFilePlatform(params: any) {
  return axios.delete(
    '/fileAdmin/cfFile/deleteFilePlatform',
    params
  );
}

export function updateFilePlatform(data: any) {
  return axios.put(
    '/fileAdmin/cfFile/updateFilePlatform',
    data
  );
}