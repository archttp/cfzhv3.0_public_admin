import axios from 'axios';


export function wisdomCommunityGet(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getListByQuery', params);
}
export function wisdomCommunityDelete(params: any) {
  return axios.delete('/wisdomCommunityAdmin/cfVillage/delete', params);
}
export function wisdomCommunityAdd(data: any) {
  return axios.post('/wisdomCommunityAdmin/cfVillage/add', data);
}
export function wisdomCommunityUpdate(data: any) {
  return axios.put('/wisdomCommunityAdmin/cfVillage/update', data);
}
export function countVillageByQuery() {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/countVillageByQuery');
}


export function getResidentListByQuery(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getResidentListByQuery', params);
}
export function deleteResident(params: any) {
  return axios.delete('/wisdomCommunityAdmin/cfVillage/deleteResident', params);
}
export function addResident(data: any) {
  return axios.post('/wisdomCommunityAdmin/cfVillage/addResident', data);
}
export function updateResident(data: any) {
  return axios.put('/wisdomCommunityAdmin/cfVillage/updateResident', data);
}

export function getResidentVisitingRecordsListByQuery(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getResidentVisitingRecordsListByQuery', params);
}
export function deleteResidentVisitingRecords(params: any) {
  return axios.delete('/wisdomCommunityAdmin/cfVillage/deleteResidentVisitingRecords', params);
}
export function addResidentVisitingRecords(data: any) {
  return axios.post('/wisdomCommunityAdmin/cfVillage/addResidentVisitingRecords', data);
}
export function updateResidentVisitingRecords(data: any) {
  return axios.put('/wisdomCommunityAdmin/cfVillage/updateResidentVisitingRecords', data);
}

export function getBuildingListByQuery(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getBuildingListByQuery', params);
}
export function deleteBuilding(params: any) {
  return axios.delete('/wisdomCommunityAdmin/cfVillage/deleteBuilding', params);
}
export function addBuilding(data: any) {
  return axios.post('/wisdomCommunityAdmin/cfVillage/addBuilding', data);
}
export function updateBuilding(data: any) {
  return axios.put('/wisdomCommunityAdmin/cfVillage/updateBuilding', data);
}
export function getVillageAppointmentVisitRecordListByQuery(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getVillageAppointmentVisitRecordListByQuery', params);
}
export function deleteVillageAppointmentVisitRecord(params: any) {
  return axios.delete('/wisdomCommunityAdmin/cfVillage/deleteVillageAppointmentVisitRecord', params);
}
export function cfVillageSearch(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/search', params);
}

// 小区房户
export function getBuildingHouseholdListByQuery(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getBuildingHouseholdListByQuery', params);
}
export function addBuildingHousehold(data: any) {
  return axios.post('/wisdomCommunityAdmin/cfVillage/addBuildingHousehold', data);
}
export function deleteBuildingHousehold(params: any) {
  return axios.delete('​/wisdomCommunityAdmin​/cfVillage​/deleteBuildingHousehold', params);
}
export function updateBuildingHousehold(data: any) {
  return axios.put('/wisdomCommunityAdmin/cfVillage/updateBuildingHousehold', data);
}

export function getPropertyFeeStandardListByQuery(params: any) {
  return axios.get<any>('/wisdomCommunityAdmin/cfVillage/getPropertyFeeStandardListByQuery', params);
}
export function addPropertyFeeStandard(data: any) {
  return axios.post('/wisdomCommunityAdmin/cfVillage/addPropertyFeeStandard', data);
}
export function deletePropertyFeeStandard(params: any) {
  return axios.delete('/wisdomCommunityAdmin/cfVillage/deletePropertyFeeStandard', params);
}
export function updatePropertyFeeStandard(data: any) {
  return axios.put('/wisdomCommunityAdmin/cfVillage/updatePropertyFeeStandard', data);
}
