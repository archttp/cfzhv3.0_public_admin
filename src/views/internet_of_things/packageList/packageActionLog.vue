<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      width="98%"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-row :gutter="28">
          <a-col :span="4">
            <a-form-item field="packageId" label="套餐id">
              <a-input
                v-model="formData.packageId"
                placeholder="请输入"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item field="carParkId" label="停车场">
              <a-select
                :loading="loading"
                placeholder="请输入"
                allow-search
                allow-clear
                @search="handleSelectSearch"
                :filter-option="false"
                v-model="formData.carParkId"
              >
                <a-option v-for="item of parkList" :value="item.id">{{
                  item.name
                }}</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="车辆类型" field="typeKey">
              <a-select
                v-model="formData.typeKey"
                placeholder="请选择"
                allow-clear
              >
                <a-option
                  :value="item.flagKey"
                  v-for="item in carTypeList"
                  :key="item.id"
                  >{{ item.name }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="操作用户" field="uid">
              <a-select
                v-model="formData.uid"
                :style="{ width: '320px' }"
                :loading="loading"
                placeholder="请输入操作人手机号"
                allow-search
                :filter-option="false"
                @search="handleUserSearch"
              >
                <a-option
                  v-for="item of userList"
                  :key="item?.id"
                  :value="item?.id"
                  >{{ item.userName }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item field="numberPlate" label="车牌号">
              <a-input
                v-model="formData.numberPlate"
                placeholder="请输入"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item field="groupFlag" label="分组(一/多位多车)">
              <a-input
                v-model="formData.groupFlag"
                placeholder="请输入"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item field="parkingSpaceNumber" label="车位编号">
              <a-input
                v-model="formData.parkingSpaceNumber"
                placeholder="请输入"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item field="roomNo" label="房间号">
              <a-input
                v-model="formData.roomNo"
                placeholder="请输入"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="操作类型"
              field="actionType"
              validate-trigger="input"
            >
              <a-select
                v-model="formData.actionType"
                placeholder="请选择"
                allow-clear
              >
                <a-option
                  :value="item.value"
                  v-for="item in actionTypeList"
                  :key="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="操作时间" field="inTime">
              <a-range-picker
                showTime
                :time-picker-props="{
                defaultValue:['00:00:00','00:00:00']
                }"
                @change="onCreateTimeChange"
                style=" width: 380px; "
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button
              type="primary"
              :loading="loading"
              @click="searchUseLog"
              style="margin-top: 30px"
            >
              搜索
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        row-key="id"
        :columns="columns"
        :data="state.list"
        :pagination="pagination"
        :loading="loading"
        @page-change="pageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { cfCarParkSearch, getCarParkPackageLogListByQuery } from '@/api/internetOfThings';
  import {  getCarTypeListByQuery } from '@/api/park';
  import { parseTime } from '@/utils/index';
  import { cfUserQuicklySearchUser } from '@/api/user';
  import dayjs from 'dayjs';

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const modalTitle = ref('车辆套餐操作详细记录');
  const parkList = ref([]);
  const carTypeList = ref([]);
  const userList = ref([]);
  const formRef = ref();
  const actionTypeList = [
    { label: '删除', value: 0 },
    { label: '新增', value: 1 },
    { label: '更新', value: 2 },
    { label: '续费', value: 3 },
    { label: '导入', value: 4 },
  ];
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const formData = ref({
    carParkId: '',
    typeKey: '',
    minCreateTime: '',
    maxCreateTime: '',
    handleUid: '',
    numberPlate: '',
    groupFlag: '',
    parkingSpaceNumber: '',
    roomNo: '',
    actionType: '',
    packageId: '',
  });
  const onCreateTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formData.value.minCreateTime = dayjs(date[0]).valueOf() + '';
      formData.value.maxCreateTime = dayjs(date[1]).valueOf() + '';
    }else{
      formData.value.minCreateTime = '';
      formData.value.maxCreateTime = '';
    }
    
  };
  const state = reactive({
    list: [],
  });
  const getCarType = async () => {
  const { data, code, message } = await getCarTypeListByQuery({
    params: {
      page: 1,
      size: 200,
    },
  });
  if (code === 10002) {
    carTypeList.value = data;
  } else {
    // @ts-ignore
    // Message.error(message);
  }
};

  const columns = [
    {
      width: 110,
      title: '车场名称',
      dataIndex: 'carParkName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 115,
      title: '车牌号',
      dataIndex: 'numberPlate',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '车辆类型',
      dataIndex: 'carTypeName',
    },
    {
      width: 180,
      title: '开始时间',
      dataIndex: 'newStartTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 180,
      title: '结束时间',
      dataIndex: 'newEndTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '内供',
      dataIndex: 'newSpecialGive',
    },
    {
      width: 100,
      title: '套餐产品',
      dataIndex: 'packageProductName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '跨区',
      dataIndex: 'newTransRegional',
    },
    {
      width: 120,
      title: '手机号',
      dataIndex: 'phone',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 100,
      title: '车主名',
      dataIndex: 'carOwnerName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 80,
      title: '分组',
      dataIndex: 'groupFlag',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '状态',
      dataIndex: 'newStatus',
    },
    {
      width: 80,
      title: '车位编号',
      dataIndex: 'parkingSpaceNumber',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 80,
      title: '房间号',
      dataIndex: 'roomNo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 80,
      title: '操作人',
      dataIndex: 'handleUserName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 180,
      title: '操作时间',
      dataIndex: 'newCreateTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 60,
      title: '类型',
      dataIndex: 'newActionType',
      bodyCellStyle: (record: any) => {
        let colorStr: string = '';
        //操作类型(0-删除/1-新增/2-更新/3-续费/4-导入)
        switch (record.actionType){
          case 0:
            colorStr = 'red';
            break;
          case 1:
            colorStr = 'green';
            break;
          case 2:
            colorStr = 'blue';
            break;
          case 3:
            colorStr = 'orange';
            break;
          case 4:
            colorStr = 'brown';
            break;
        }
        return {
          color: colorStr
        }
      }
    },
  ];
  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const checkParams = (obj: any) => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in obj) {
      if (!obj[i]) {
        if (obj[i] !== 0) {
          obj[i] = null;
        }
      }
    }
    return obj;
  };
  const handleSelectSearch = async (value: any) => {
      selectLoading.value = true;
      const { data, code } = await cfCarParkSearch({
        params: {
          name: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        parkList.value = data;
      } else {
        parkList.value = [];
      }
  };
  const handleUserSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      userList.value = data;
    } else {
      userList.value = [];
    }
  };
  const searchUseLog = async () => {
    pagination.current = 1;
    fetchData();
  }
  const fetchData = async () => {
    loading.value = true;
    const { code, total, data } = await getCarParkPackageLogListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        ...formData.value,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      if (total) pagination.total = total;
      for (const i of data) {
        i.newStartTime = parseTime(i.startTime);
        i.newEndTime = parseTime(i.endTime);
        i.newCreateTime = parseTime(i.createTime);
        i.newSpecialGive = i.specialGive ? '是' : '否';
        i.newTransRegional = i.transRegional ? '是' : '否';
        //0-已下线/1-正常/2-故障维护/3-占用
        switch (i.actionType) {
          case 0:
            i.newActionType =  '删除';
            break;
          case 1:
            i.newActionType =  '新增';
            break;
          case 2:
            i.newActionType =  '更新';
            break;
          case 3:
            i.newActionType =  '续费';
            break;
          case 4:
            i.newActionType =  '导入';
            break;
        }
        switch (i.status) {
          case 0:
            i.newStatus =  '禁用';
            break;
          case 1:
            i.newStatus =  '正常';
            break;
          case 2:
            i.newStatus =  '停用';
            break;
        }
      }
      state.list = data;
    } else {
      state.list = [];
    }
  };
  const handleClick = (queryParams: any) => {
    if(queryParams && queryParams.carParkId){
      formData.value.carParkId = queryParams.carParkId;
    }
    if(queryParams && queryParams.packageId){
      formData.value.packageId = queryParams.packageId;
    }
    fetchData();
    handleSelectSearch(null);
    visible.value = true;
  };

  const resetFields = () => {
    formRef.value.resetFields();
  };

  defineExpose({ handleClick });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
</style>
