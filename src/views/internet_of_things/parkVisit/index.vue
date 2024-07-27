<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.carpark',
        'menu.pay.internetofthings.carpark.carParkVisitList',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.pay.internetofthings.carpark.carParkVisitList')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-tabs>
              <a-tab-pane key="1">
                <template #title>
                  <icon-calendar/> 输入搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="6">
                    <a-form-item field="carParkId" label="停车场">
                      <a-select
                        :loading="loading"
                        placeholder="请输入"
                        allow-search
                        allow-clear
                        @search="handleSelectSearch"
                        :filter-option="false"
                        v-model="formModel.carParkId"
                      >
                        <a-option v-for="item of parkList" :value="item.id">{{
                          item.name
                        }}</a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item field="plateNumber" label="车牌号">
                      <a-input
                        v-model="formModel.plateNumber"
                        placeholder="请输入完整车牌号搜索"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="申请人" field="fromUid">
                      <a-select
                        v-model="formModel.fromUid"
                        :style="{ width: '320px' }"
                        :loading="loading"
                        placeholder="请输入申请人手机号"
                        allow-search
                        :filter-option="false"
                        allow-clear
                        @search="handleFromUserSearch"
                      >
                        <a-option
                          v-for="item of fromUserList"
                          :key="item?.id"
                          :value="item?.id"
                          >{{ item.userName }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="受访者" field="toUid">
                      <a-select
                        v-model="formModel.toUid"
                        :style="{ width: '320px' }"
                        :loading="loading"
                        placeholder="请输入受访者手机号"
                        allow-search
                        :filter-option="false"
                        allow-clear
                        @search="handleToUserSearch"
                      >
                        <a-option
                          v-for="item of toUserList"
                          :key="item?.id"
                          :value="item?.id"
                          >{{ item.userName }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="审核员" field="processUid">
                      <a-select
                        v-model="formModel.processUid"
                        :style="{ width: '320px' }"
                        :loading="loading"
                        placeholder="请输入审核员手机号"
                        allow-search
                        :filter-option="false"
                        allow-clear
                        @search="handleProcessUserSearch"
                      >
                        <a-option
                          v-for="item of processUserList"
                          :key="item?.id"
                          :value="item?.id"
                          >{{ item.userName }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      label="状态"
                      field="processStatus"
                      validate-trigger="input"
                    >
                      <a-select
                        v-model="formModel.processStatus"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.value"
                          v-for="item in processStatusArr"
                          :key="item.value"
                          >{{ item.label }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="车类型" field="carType">
                      <a-select
                        v-model="formModel.carType"
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
                </a-row>
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #title>
                  <icon-clock-circle/> 时间搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item label="申请时间" field="inTime">
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
                  <a-col :span="8">
                    <a-form-item label="审核时间" field="outTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onProcessTimeChange"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="过期时间" field="payTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onExpirationTimeChange"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="到访时间" field="payTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onVisitTimeChange"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
            
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :columns="columns"
        :data="state.list"
        :style="{ height: '700px' }"
        :pagination="pagination"
        :loading="loading"
        @page-change="pageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleEdit(record)"
              >编辑</a-button
            >
          </a-space>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getCarParkVisitListByQuery, addCarParkVisit, deleteCarParkVisit, updateCarParkVisit, getCarTypeListByQuery } from '@/api/park';
  import {
    cfCarParkSearch
  } from '@/api/internetOfThings';
  import editAdd from './editAdd.vue';
  import { parseTime, timeFn } from '@/utils';
  import { cfUserQuicklySearchUser } from '@/api/user';
  import dayjs from 'dayjs';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const selectLoading = ref(false);
  const editAddRef = ref();
  const carTypeList = ref([]);
  const parkList = ref([]);
  const fromUserList = ref([]);
  const toUserList = ref([]);
  const processUserList = ref([]);
  const columns = [
    {
      width: 120,
      title: '停车场',
      dataIndex: 'carParkName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车牌号',
      dataIndex: 'plateNumber',
      ellipsis: true,
    },
    {
      width: 120,
      title: '申请人',
      dataIndex: 'fromUserName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '受访人',
      dataIndex: 'toUserName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '审核员',
      dataIndex: 'processUserName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 100,
      title: '车辆类型',
      dataIndex: 'newCarType',
    },
    {
      width: 170,
      title: '申请时间',
      dataIndex: 'newCreateTime',
    },
    {
      width: 170,
      title: '过期时间',
      dataIndex: 'newExpirationTime',
    },
    {
      width: 170,
      title: '审核时间',
      dataIndex: 'newProcessTime',
    },
    {
      width: 170,
      title: '到访时间',
      dataIndex: 'newVisitTime',
    },
    {
      width: 100,
      title: '状态',
      dataIndex: 'newProcessStatus',
    },
    {
      width: 170,
      title: '到访原因',
      dataIndex: 'reason',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '目的地',
      dataIndex: 'destination',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      carParkId: '',
      plateNumber: '',
      fromUid: '',
      toUid: '',
      processUid: '',
      minCreateTime: '',
      maxCreateTime: '',
      minProcessTime: '',
      maxProcessTime: '',
      minVisitTime: '',
      maxVisitTime: '',
      minExpirationTime: '',
      maxExpirationTime: '',
      carType: '',
      processStatus: '',
    };
  };
  const processStatusArr = [
    { value: 0, label: '待审核' },
    { value: 1, label: '已审核' },
    { value: 2, label: '已到访' },
    { value: 3, label: '审核失败' },
  ];
  const formModel = ref(generateFormModel());

  onMounted(() => {
    getCarType();
    fetchData();
    handleSelectSearch(null);
  });
  const reset = () => {
    formModel.value = generateFormModel();
  };
  const handleFromUserSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      fromUserList.value = data;
    } else {
      fromUserList.value = [];
    }
  };
  const onCreateTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minCreateTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxCreateTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minCreateTime = '';
      formModel.value.maxCreateTime = '';
    }
    
  };
  const onProcessTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minProcessTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxProcessTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minProcessTime = '';
      formModel.value.maxProcessTime = '';
    }
    
  };
  const onExpirationTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minExpirationTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxExpirationTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minExpirationTime = '';
      formModel.value.maxExpirationTime = '';
    }
    
  };
  const onVisitTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minVisitTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxVisitTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minVisitTime = '';
      formModel.value.maxVisitTime = '';
    }
    
  };
  const handleToUserSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      toUserList.value = data;
    } else {
      toUserList.value = [];
    }
  };
  const handleProcessUserSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      processUserList.value = data;
    } else {
      processUserList.value = [];
    }
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

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const handleAdd = () => {
    editAddRef.value.handleClick();
  };
  const handleEdit = (e: any) => {
    editAddRef.value.handleClick(e);
  };
  const search = () => {
    fetchData();
  };
  const onDelete = async (id: string) => {
    await deleteCarParkVisit({ params: { id } });
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
  const getCarTypeName = (key: string) => {
    // @ts-ignore
    const findRes: any = carTypeList.value.find((i) => i.flagKey === key);
    return findRes?.name;
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getCarParkVisitListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        carParkId: formModel.value.carParkId,
        plateNumber: formModel.value.plateNumber,
        fromUid: formModel.value.fromUid,
        toUid: formModel.value.toUid,
        processUid: formModel.value.processUid,
        minCreateTime: formModel.value.minCreateTime,
        maxCreateTime: formModel.value.maxCreateTime,
        minProcessTime: formModel.value.minProcessTime,
        maxProcessTime: formModel.value.maxProcessTime,
        minVisitTime: formModel.value.minVisitTime,
        maxVisitTime: formModel.value.maxVisitTime,
        minExpirationTime: formModel.value.minExpirationTime,
        maxExpirationTime: formModel.value.maxExpirationTime,
        carType: formModel.value.carType,
        processStatus: formModel.value.processStatus,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newCarType = getCarTypeName(i.carType) || '-';
        i.newCreateTime = parseTime(i.createTime) || '-';
        i.newProcessTime = parseTime(i.processTime) || '-';
        i.newVisitTime = parseTime(i.visitTime) || '-';
        i.newExpirationTime = parseTime(i.expirationTime) || '-';
        switch(i.processStatus){
          case 0:
            i.newProcessStatus = '待审核';
            break;
          case 1:
            i.newProcessStatus = '已审核';
            break;
          case 2:
            i.newProcessStatus = '已到访';
            break;
        }
      }
      state.list = data;
    } else {
      state.list = [];
    }
    // console.log(data, code, 999);
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
