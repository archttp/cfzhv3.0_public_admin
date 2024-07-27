<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.carpark',
        'menu.pay.internetofthings.carparkuselog',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.pay.internetofthings.carparkuselog')"
    >
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
                  <a-col :span="8">
                    <a-form-item field="id" label="记录id">
                      <a-input
                        v-model="formModel.id"
                        placeholder="请输入数据id精准搜索"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="numberPlate" label="车牌号">
                      <a-input
                        v-model="formModel.numberPlate"
                        placeholder="请输入4个以上字符搜索"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="carParkId" label="停车场">
                      <a-select
                        :loading="loading"
                        placeholder="请输入"
                        allow-search
                        allow-clear
                        @search="handleSelectSearch"
                        :filter-option="false"
                        v-model="formModel.carParkId"
                        @change="parkChange"
                      >
                        <a-option v-for="item of parkList" :value="item.id">{{
                          item.name
                        }}</a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="入口" field="inCheckPointId">
                      <a-select
                        v-model="formModel.inCheckPointId"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.id"
                          v-for="item in inCheckPointList"
                          :key="item.id"
                          >{{ item.name }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="出口" field="outCheckPointId">
                      <a-select
                        v-model="formModel.outCheckPointId"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.id"
                          v-for="item in outCheckPointList"
                          :key="item.id"
                          >{{ item.name }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="用户" field="uid">
                      <a-select
                        v-model="formModel.uid"
                        :style="{ width: '320px' }"
                        :loading="loading"
                        placeholder="请输入扫无牌车码手机号"
                        allow-search
                        :filter-option="false"
                        allow-clear
                        @search="handleSearch"
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
                  <a-col :span="8">
                    <a-form-item field="homeGroup" label="套餐分组">
                      <a-input
                        v-model="formModel.homeGroup"
                        placeholder="一(多)位多车-分组编号"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="visitUnit" label="到访单元">
                      <a-input
                        v-model="formModel.visitUnit"
                        placeholder="到访单元/业主姓名"
                        allow-clear
                      />
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
                    <a-form-item label="入场时间" field="inTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onInTimeChange"
                        @select="onInTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="出场时间" field="outTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onOutTimeChange"
                        @select="onOutTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="支付时间" field="payTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onPayTimeChange"
                        @select="onPayTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
              <a-tab-pane key="3">
                <template #title>
                  <icon-user/> 选择搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item label="车辆类型" field="carType">
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
                  <a-col :span="8">
                    <a-form-item
                      label="入场方式"
                      field="inReleaseType"
                      validate-trigger="input"
                    >
                      <a-select
                        v-model="formModel.inReleaseType"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.value"
                          v-for="item in releaseTypeArr"
                          :key="item.value"
                          >{{ item.label }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      label="出场方式"
                      field="outReleaseType"
                      validate-trigger="input"
                    >
                      <a-select
                        v-model="formModel.outReleaseType"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.value"
                          v-for="item in releaseTypeArr"
                          :key="item.value"
                          >{{ item.label }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="paymentAgencyShortName" label="支付机构">
                      <a-select
                        v-model="formModel.paymentAgencyShortName"
                        placeholder="请选择支付机构"
                        allow-clear
                      >
                        <a-option v-for="paymentAgency in paymentAgencyList" :key="paymentAgency.paymentAgencyName" :value="paymentAgency.paymentAgencyName">
                            {{ paymentAgency.name }}
                        </a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="noInTime" label="无入场时间">
                      <a-switch v-model="formModel.noInTime" />
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
            <!-- <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button> -->
            <a-button @click="importUseLog">
              {{ $t('searchTable.operation.import') }}
            </a-button>
            <a-button type="primary" status="danger" @click="onBatchDelete"
              >删除</a-button
            >
            <a-button type="dashed" status="success" @click="oneClickProcessingUseLog">一键处理</a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button @click="downloadUseLog">
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
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #inSmallImageUrl="{ record }">
          <a-image
            :src="record.inSmallImageUrl"
            :width="80"
            :height="30"
          ></a-image>
        </template>
        <template #inBigImageUrl="{ record }">
          <a-image
            :src="record.inBigImageUrl"
            :width="80"
            :height="30"
          ></a-image>
        </template>
        <template #outSmallImageUrl="{ record }">
          <a-image
            :src="record.outSmallImageUrl"
            :width="80"
            :height="30"
          ></a-image>
        </template>
        <template #outBigImageUrl="{ record }">
          <a-image
            :src="record.outBigImageUrl"
            :width="80"
            :height="30"
          ></a-image>
        </template>
        <!-- <template #operations="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template> -->
        <template #operations="{ record }">
          <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
              <a-doption>
                <a-space @click="getUseLogImages(record)">
                  <icon-eye />
                  <span> 显示图片 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="handleEdit(record)">
                  <icon-edit />
                  <span> 编辑 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <useLogImport ref="useLogImportRef" />
    <oneClickProcessing ref="oneClickProcessingRef" @fetch-data="resetSelectedKeys" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    useLogGet,
    useLogDelete,
    cfCarParkSearch,
    exportUseLogExcel,
    getCarParkUseLogImages,
  } from '@/api/internetOfThings';
  import { getCarTypeListByQuery, cfCheckPointGet } from '@/api/park';
  import { cfUserQuicklySearchUser } from '@/api/user';
  import editAdd from './editAdd.vue';
  import { parseTime, timeFn } from '@/utils';
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';
  import { getPaymentAgencyListByQuery } from '@/api/pay';
  import useLogImport from './useLogImport.vue';
  import oneClickProcessing from './oneClickProcessing.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    fixed: true,
    onlyCurrent: true,
  });
  const selectedKeys = ref([]);
  const loading = ref(false);
  const selectLoading = ref(false);
  const editAddRef = ref();
  const useLogImportRef = ref();
  const oneClickProcessingRef = ref();
  const columns = [
    {
      width: 60,
      title: 'id',
      dataIndex: 'id',
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
      bodyCellStyle: (record: any) => {
        let colorStr: string = '';
        switch (record.carNumberPlateColor){
          case 1:
            colorStr = 'blue';
            break;
          case 2:
            colorStr = 'orange';
            break;
          // case 3:
          //   colorStr = 'white';
            break;
          case 5:
            colorStr = 'green';
            break;
        }
        return {
          color: colorStr
        }
      }
    },
    {
      width: 120,
      title: '停车场名称',
      dataIndex: 'carParkName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 80,
      title: '车类',
      dataIndex: 'newCarType',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 110,
      title: '入口',
      dataIndex: 'inCheckPointName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 110,
      title: '出口',
      dataIndex: 'outCheckPointName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '进场时间',
      dataIndex: 'newInTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '出场时间',
      dataIndex: 'newOutTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '停车时长',
      dataIndex: 'parkingDuration',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '入场方式',
      dataIndex: 'newInReleaseType',
      width: '90',
    },
    {
      title: '出场方式',
      dataIndex: 'newOutReleaseType',
      width: '90',
    },
    {
      title: '应付金额',
      dataIndex: 'amountsPayable',
      width: '90',
    },
    {
      title: '实付金额',
      dataIndex: 'amountActuallyPaid',
      width: '90',
    },
    {
      title: '支付方式',
      dataIndex: 'paymentAgencyShortNameTitle',
      width: '100',
    },
    {
      title: '支付时间',
      dataIndex: 'newPayTime',
      width: '170',
    },
    {
      title: '家庭组',
      dataIndex: 'homeGroup',
      width: '80',
    },
    {
      width: 60,
      title: '备注',
      dataIndex: 'remarks',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 90,
      title: '入场小图',
      dataIndex: 'inSmallImageUrl',
      slotName: 'inSmallImageUrl',
    },
    {
      width: 90,
      title: '入场大图',
      dataIndex: 'inBigImageUrl',
      slotName: 'inBigImageUrl',
    },
    {
      width: 90,
      title: '出场小图',
      dataIndex: 'outSmallImageUrl',
      slotName: 'outSmallImageUrl',
    },
    {
      width: 90,
      title: '出场大图',
      dataIndex: 'outBigImageUrl',
      slotName: 'outBigImageUrl',
    },
    {
      width: 90,
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
      fixed: 'right',
    },
  ];

  //0-未放行/1-自动抬杆/2-人工抬杆/3-手机放行，断电断网时/4-扫码
  const releaseTypeArr = [
    { value: 0, label: '未放行' },
    { value: 1, label: '自动抬杆' },
    { value: 2, label: '人工抬杆' },
    { value: 3, label: '手机放行' },
    { value: 4, label: '扫码' },
    { value: 5, label: '异常放行' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      id: '',
      numberPlate: '',
      carParkId: '',
      carType: '',
      uid: '',
      minInTime: '',
      maxInTime: '',
      minOutTime: '',
      maxOutTime: '',
      minPayTime: '',
      maxPayTime: '',
      paymentAgencyShortName: '',
      inReleaseType: '',
      outReleaseType: '',
      inCheckPointId: '',
      outCheckPointId: '',
      homeGroup: '',
      visitUnit: '',
      noInTime: false,
    };
  };
  const handleSearch = async (value: any) => {
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

  const importUseLog = () => {
    useLogImportRef.value.handleClick();
  }

  const oneClickProcessingUseLog = () => {
    oneClickProcessingRef.value.handleClick(selectedKeys.value);
  }

  //下载停车记录
  const downloadUseLog = async () => {
    let newForm = cloneDeep(formModel.value);
    if (newForm.noInTime===true) {
      newForm.inTime = 0;
    }else{
      newForm.inTime = null;
    }
    await exportUseLogExcel({
      params: checkParams({
        ...newForm,
      }),
      responseType: 'blob',
    })
    .then((data) => {
      const link = document.createElement('a')
      let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      // link.download = res.headers['content-disposition'] //下载后文件名
      link.download = '停车场记录' //下载的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const onInTimeSelect = (dateString: any, date: any) => {
    //不做任何操作
  };
  const onInTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minInTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxInTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minInTime = '';
      formModel.value.maxInTime = '';
    }
    
  };
  const onOutTimeSelect = (dateString: any, date: any) => {
    //不做任何操作
  };
  const onOutTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minOutTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxOutTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minOutTime = '';
      formModel.value.maxOutTime = '';
    }
    
  };
  const onPayTimeSelect = (dateString: any, date: any) => {
    //不做任何操作
  };
  const onPayTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minPayTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxPayTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minPayTime = '';
      formModel.value.maxPayTime = '';
    }
    
  };
  const formModel = ref(generateFormModel());
  const carTypeList = ref([]);
  const parkList = ref([]);
  const inCheckPointList = ref([]);
  const outCheckPointList = ref([]);
  const userList = ref([]);
  const paymentAgencyList = ref([]);

  onMounted(() => {
    getPaymentAgencyList();
    fetchData();
    getCarType();
    handleSelectSearch(null);
  });
  const onBatchDelete = async () => {
    if(selectedKeys.value.length==0){
      return;
    }
    await useLogDelete({ params: { ids: selectedKeys.value.join(',') } });
    selectedKeys.value = [];
    fetchData();
  };
  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const handleAdd = () => {
    editAddRef.value.handleClick({});
  };
  const handleEdit = (e: any) => {
    editAddRef.value.handleClick(e);
  };
  const search = () => {
    pagination.current = 1;
    fetchData();
  };
  const onDelete = async (id: string) => {
    await useLogDelete({ params: { id } });
    fetchData();
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
  const getUseLogImages = async (useLog: any) => {
    const { data, code, message } = await getCarParkUseLogImages({
      params: {
        page: 1,
        size: 200,
        id: useLog.id
      },
    });
    if (code === 10002) {
      useLog.inSmallImageUrl = data.inSmallImageUrl
      useLog.outSmallImageUrl = data.outSmallImageUrl
      useLog.inBigImageUrl = data.inBigImageUrl
      useLog.outBigImageUrl = data.outBigImageUrl
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const reset = () => {
    formModel.value = generateFormModel();
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
  const parkChange = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfCheckPointGet({
        params: {
          areaId: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        for(const checkPoint of data){
          if(checkPoint.features=='in'){
            inCheckPointList.value.push(checkPoint);
          }else{
            outCheckPointList.value.push(checkPoint);
          }
        }
      } else {
        inCheckPointList.value = [];
      outCheckPointList.value = [];
      }
    } else {
      inCheckPointList.value = [];
      outCheckPointList.value = [];
    }
  };
  const getCarTypeName = (key: string) => {
    // @ts-ignore
    const findRes: any = carTypeList.value.find((i) => i.flagKey === key);
    return findRes?.name;
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
  const getPaymentAgencyList = async () => {
    const { code, data } = await getPaymentAgencyListByQuery({
      params:{
        page: 1,
        size: 200,
      }
    })
    if(code === 10002){
      paymentAgencyList.value = data
    }else{
      paymentAgencyList.value = []
    }
  }
  const resetSelectedKeys = async () => {
    selectedKeys.value = [];
    fetchData();
  }
  const fetchData = async () => {
    loading.value = true;
    let newForm = cloneDeep(formModel.value);
    if (newForm.noInTime===true) {
      newForm.inTime = 0;
    }else{
      newForm.inTime = null;
    }
    // @ts-ignore
    const { data, code, total } = await useLogGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        ...newForm,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newCarType = getCarTypeName(i.carType) || '-';
        i.newInTime = parseTime(i.inTime) || '-';
        i.newOutTime = parseTime(i.outTime) || '-';
        i.newPayTime = parseTime(i.payTime) || '-';
        i.parkingDuration = (i.inTime && i.outTime) ? timeFn(Number(i.inTime), Number(i.outTime)) : '-';
        for(const j of releaseTypeArr){
          // console.log(j);
          if(i.inReleaseType == j.value){
            i.newInReleaseType = j.label;
          }
          if(i.outReleaseType == j.value){
            i.newOutReleaseType = j.label;
          }
        }
        for(const j of paymentAgencyList.value){
          // console.log(j);
          if(i.paymentAgencyShortName == j.paymentAgencyName){
            i.paymentAgencyShortNameTitle = j.name;
          }
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
