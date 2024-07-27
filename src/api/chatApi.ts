import axios from 'axios';


export function getUserMessageListByQuery(params: any) {
  return axios.get<any>(
    '/chatAdmin/cfUserMessage/getUserMessageListByQuery',
    params
  );
}


export function deleteUserMessage(params: any) {
  return axios.delete(
    '/chatAdmin/cfUserMessage/deleteUserMessage',
    params
  );
}

export function getNoticeSettingListByQuery(params: any) {
  return axios.get<any>(
    '/chatAdmin/cfUserMessage/getNoticeSettingListByQuery',
    params
  );
}
export function addNoticeSetting(data: any) {
  return axios.post(
    '/chatAdmin/cfUserMessage/addNoticeSetting',
    data
  );
}

export function deleteNoticeSetting(params: any) {
  return axios.delete(
    '​/chatAdmin​/cfUserMessage​/deleteNoticeSetting',
    params
  );
}
export function updateNoticeSetting(data: any) {
  return axios.put(
    '/chatAdmin/cfUserMessage/updateNoticeSetting',
    data
  );
}


