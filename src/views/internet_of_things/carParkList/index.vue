<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.carpark',
        'menu.pay.internetofthings.carpark.list',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.pay.internetofthings.carpark.list')"
    >
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="name" label="停车场名称">
                  <a-input
                    v-model="formModel.name"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="phone" label="手机号">
                  <a-input
                    v-model="formModel.phone"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" field="status">
                  <a-select
                    v-model="formModel.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">正常</a-option>
                    <a-option :value="1">车位已满</a-option>
                    <a-option :value="2">暂停营业</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="计费模式" field="billingModel">
                  <a-select
                    v-model="formModel.billingModel"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="dynamic_time">动态时间计费</a-option>
                    <a-option value="fixed_time">固定时长计费</a-option>
                    <a-option value="dynamic_fixed_time">动态时间按段时长计费</a-option>
                    <a-option value="dynamic_time_upper_limit">每天指定最高费用</a-option>
                    <a-option value="static_time_upper_limit">限时指定最高费用</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
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
            <a-button @click="showPriceCalculation">
              <template #icon>
                <icon-tag />
              </template>
              价格测算
            </a-button>
            <a-button @click="showDeviceList">
              <template #icon>
                <icon-tag />
              </template>
              硬件列表
            </a-button>
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
        <template #id="{ record }">
          <div @click="copyText(record.id)">
            {{ record.id }}
          </div>
        </template>
        <template #image="{ record }">
          <a-image-preview-group
            infinite
            @change="imagePreViewChange"
            :current="imagePreViewIndex"
          >
            <a-image
              v-show="index == 0"
              v-for="(item, index) in record.imageUrl?.split(',')"
              :src="item"
              :key="item"
              width="48"
            ></a-image>
          </a-image-preview-group>
        </template>
        <template #operations="{ record }">
          <a-button
            type="primary"
            size="mini"
            @click="showOperationVisible(record)"
            >操作</a-button
          >
          <!-- <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
              <a-doption>
                <a-space @click="handleEdit(record)">
                  <icon-edit />
                  <span> 编辑 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onDelete(record)">
                  <icon-delete />
                  <span> 删除 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="handleAisle(record)">
                  <icon-unordered-list />
                  <span> 通道 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="handleChargingRules(record)">
                  <icon-unordered-list />
                  <span> 收费规则 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowAccountNumber(record)">
                  <icon-unordered-list />
                  <span> 收款账号 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowLedList(record)">
                  <icon-unordered-list />
                  <span> 显示屏 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowAdministratorList(record)">
                  <icon-unordered-list />
                  <span> 管理人员 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowDutyRecord(record)">
                  <icon-unordered-list />
                  <span> 值班记录 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowCarparkTransfer(record)">
                  <icon-unordered-list />
                  <span> 车场转让 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowReportingPlatform(record)">
                  <icon-unordered-list />
                  <span> 上报平台关联 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown> -->
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:visible="visible" @ok="handleOk">
      <template #title> 提示 </template>
      <div>您确认删除该停车场吗？</div>
    </a-modal>
    <a-modal v-model:visible="operationVisible" width="80%">
      <template #title> {{ selectedPark.name }} - 操作 </template>
      <TheService @clickOptions="clickOptions" />
    </a-modal>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <aisle ref="aisleRef" />
    <chargingRules ref="chargingRulesRef" />
    <carParkLimit ref="carParkLimitRef" />
    <accountNumber ref="accountNumberRef" />
    <ledList ref="ledListRef" />
    <administratorList ref="administratorListRef" />
    <dutyRecord ref="dutyRecordRef" />
    <carparkTransfer ref="carparkTransferRef"></carparkTransfer>
    <reportingPlatform ref="reportingPlatformRef"></reportingPlatform>
    <dataReport ref="dataReportRef"></dataReport>
    <priceCalculation ref="priceCalculationRef"></priceCalculation>
    <deviceList ref="deviceListRef"></deviceList>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted, h } from 'vue';
  import {
    cfCarParkGet,
    cfCarParkDelete,
    costMeasurement,
  } from '@/api/internetOfThings';
  import TheService from './components/the-service.vue';
  import editAdd from './editAdd.vue';
  import aisle from './aisle.vue';
  import chargingRules from './chargingRules.vue';
  import carParkLimit from './carParkLimit.vue';
  import accountNumber from './accountNumber.vue';
  import ledList from './ledList.vue';
  import administratorList from './administratorList.vue';
  import dutyRecord from './dutyRecord.vue';
  import carparkTransfer from './carparkTransfer.vue';
  import reportingPlatform from './reportingPlatform.vue';
  import dataReport from './dataReport.vue';
  import priceCalculation from './priceCalculation.vue';
  import deviceList from './deviceList.vue';
  import { copyText } from '@/utils/copyText';
  import { Modal, Button, Message } from '@arco-design/web-vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const visible = ref(false);
  const operationVisible = ref(false);
  const deleteCarParkId = ref('');

  const editAddRef = ref();
  const aisleRef = ref();
  const chargingRulesRef = ref();
  const carParkLimitRef = ref();
  const accountNumberRef = ref();
  const ledListRef = ref();
  const administratorListRef = ref();
  const dutyRecordRef = ref();
  const carparkTransferRef = ref();
  const reportingPlatformRef = ref();
  const dataReportRef = ref();
  const priceCalculationRef = ref();
  const deviceListRef = ref();
  const imagePreViewIndex = ref(0);

  const selectedPark = ref({ name: '' });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      slotName: 'id',
      width: 200,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 200,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'newStatus',
      width: 150,
    },
    {
      title: '座机号',
      dataIndex: 'landline',
      width: 150,
    },
    {
      title: '计费模式',
      dataIndex: 'newBillingModel',
      width: 150,
    },
    {
      title: '车满限制',
      dataIndex: 'newLimitParkingSpaceNumber',
      width: 150,
    },
    {
      title: '停车场图片',
      dataIndex: 'image',
      slotName: 'image',
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      name: '',
      phone: '',
      status: '',
      billingModel: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });
  const clickOptions = (clickType: string) => {
    processFunctionality(clickType);
  };
  const processFunctionality = (type: string) => {
    switch (type) {
      case '编辑':
        handleEdit(selectedPark.value);
        break;
      case '删除':
        // 执行删除功能的代码
        onDelete(selectedPark.value);
        break;
      case '通道':
        // 执行通道功能的代码
        handleAisle(selectedPark.value);
        break;
      case '收费规则':
        // 执行收费规则功能的代码
        handleChargingRules(selectedPark.value);
        break;
      case '收款账号':
        // 执行收款账号功能的代码
        onShowAccountNumber(selectedPark.value);
        break;
      case '显示屏':
        // 执行显示屏功能的代码
        onShowLedList(selectedPark.value);
        break;
      case '管理人员':
        // 执行管理人员功能的代码
        onShowAdministratorList(selectedPark.value);
        break;
      case '值班记录':
        // 执行值班记录功能的代码
        onShowDutyRecord(selectedPark.value);
        break;
      case '车场转让':
        // 执行车场转让功能的代码
        onShowCarparkTransfer(selectedPark.value);
        break;
      case '上报平台关联':
        // 执行上报平台关联功能的代码
        onShowReportingPlatform(selectedPark.value);
        break;
      case '数据报表':
        onShowDataReport(selectedPark.value);
        break;
      case '车辆限制':
        handleCarParkLimit(selectedPark.value);
        break;
      default:
        console.log('未知功能');
    }
  };
  const showOperationVisible = (record: any) => {
    operationVisible.value = true;
    selectedPark.value = record;
  };
  const showDeviceList = () => {
    deviceListRef.value.handleClick();
  };
  const showPriceCalculation = () => {
    priceCalculationRef.value.handleClick();
  };
  const onShowReportingPlatform = (e: any) => {
    reportingPlatformRef.value.handleClick(e);
  };
  const onShowDataReport = (e: any) => {
    dataReportRef.value.handleClick(e);
  };
  const onShowCarparkTransfer = (e: any) => {
    carparkTransferRef.value.handleClick(e);
  };
  const onShowDutyRecord = (e: any) => {
    dutyRecordRef.value.handleClick(e);
  };
  const imagePreViewChange = (e: any) => {
    imagePreViewIndex.value = e;
  };
  const onShowAdministratorList = (row: any) => {
    administratorListRef.value.handleClick(row.id, row.name);
  };
  const onShowLedList = (row: any) => {
    ledListRef.value.handleClick(row.id, row.name);
  };
  const onShowAccountNumber = (row: any) => {
    accountNumberRef.value.handleClick(row.id, row.name);
  };
  const handleChargingRules = (row: any) => {
    chargingRulesRef.value.handleClick(row.id, row.name);
  };
  const handleCarParkLimit = (row: any) => {
    carParkLimitRef.value.handleClick(row.id, row.name);
  };

  const handleAisle = (row: any) => {
    localStorage.setItem('parkingId', row.id);
    aisleRef.value.handleClick(row.id, row.name);
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

  const handleOk = async () => {
    const { code, message } = await cfCarParkDelete({
      params: { id: deleteCarParkId.value },
    });
    fetchData();
    if (code === 10002) {
      // @ts-ignore
      Message.success(message);
    } else {
      // @ts-ignore
      Message.error(message);
    }
  };

  const onDelete = async (row: any) => {
    deleteCarParkId.value = row.id;
    visible.value = true;
  };
  const reset = () => {
    formModel.value = generateFormModel();
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
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await cfCarParkGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        ...formModel.value,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      // eslint-disable-next-line no-restricted-syntax
      for (const i of data) {
        i.newStatus =
          // eslint-disable-next-line no-nested-ternary
          i.status === 0 ? '正常' : i.status === 1 ? '车位已满' : '暂停营业';
        i.newBillingModel = i.billingModel === 'static' ? '静态' : '动态';
        i.newLimitParkingSpaceNumber = i.limitParkingSpaceNumber ? '是' : '否';
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
