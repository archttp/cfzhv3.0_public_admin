<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.charging',
        'menu.pay.internetofthings.charging.stationlist',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.pay.internetofthings.charging.stationlist')"
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
                <a-form-item field="stationName" label="充电站名称">
                  <a-input
                    v-model="formModel.stationName"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" field="stationStatus">
                  <a-select
                    v-model="formModel.stationStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">停止营业</a-option>
                    <a-option :value="1">正常营业</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="充电站类型" field="stationType">
                  <a-select
                    v-model="formModel.stationType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in stationTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 40px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <!-- <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button> -->
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
        <template #id="{ record }">
          <div @click="copyText(record.id)">
            {{ record.id }}
          </div>
        </template>
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #chargeSlowly="{ record }">
          <a-statistic
            :title="'总数：' + record.slowChargeNumber"
            :value="record.slowChargeNumberPercent"
            :precision="2"
            :value-style="{ color: '#0fbf60' }"
          >
            <template #prefix>
              <!-- <icon-arrow-rise /> -->
              已使用
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </template>
        <template #fastCharge="{ record }">
          <a-statistic
            :title="'总数：' + record.fastChargeNumber"
            :value="record.fastChargeNumberPercent"
            :precision="2"
            :value-style="{ color: '#0fbf60' }"
          >
            <template #prefix>
              <!-- <icon-arrow-rise /> -->
              已使用
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </template>
        <template #superFastCharge="{ record }">
          <a-statistic
            :title="'总数：' + record.superFastChargeNumber"
            :value="record.superFastChargeNumberPercent"
            :precision="2"
            :value-style="{ color: '#0fbf60' }"
          >
            <template #prefix>
              <!-- <icon-arrow-rise /> -->
              已使用
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </template>
        <template #supporting="{ record }">
          <a-space>
            <div>
              <a-tag
                :color="record.hasBathroom ? 'green' : 'red'"
                style="margin-bottom: 5px"
              >
                <template #icon>
                  <icon-check v-if="record.hasBathroom" />
                  <icon-close v-else /> </template
                >洗手间</a-tag
              >
              <a-tag :color="record.hasLounge ? 'green' : 'red'"
                ><template #icon>
                  <icon-check v-if="record.hasLounge" />
                  <icon-close v-else /> </template
                >休息室</a-tag
              >
            </div>
            <div>
              <a-tag
                :color="record.hasDinningRoom ? 'green' : 'red'"
                style="margin-bottom: 5px"
                ><template #icon>
                  <icon-check v-if="record.hasDinningRoom" />
                  <icon-close v-else /> </template
                >餐厅</a-tag
              >
              <a-tag :color="record.hasShop ? 'green' : 'red'"
                ><template #icon>
                  <icon-check v-if="record.hasShop" />
                  <icon-close v-else /> </template
                >商店</a-tag
              >
            </div>
          </a-space>
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
            </template>
          </a-dropdown> -->
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:visible="visible" @ok="handleOk">
      <template #title> 提示 </template>
      <div>您确认删除该充电站吗？</div>
    </a-modal>
    <a-modal v-model:visible="operationVisible" width="80%">
      <template #title> {{ selectedChargingStation.stationName }} - 操作 </template>
      <TheService @clickOptions="clickOptions" />
    </a-modal>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <aisle ref="aisleRef" />
    <chargingRules ref="chargingRulesRef" />
    <accountNumber ref="accountNumberRef" />
    <ledList ref="ledListRef" />
    <administratorList ref="administratorListRef" />
    <dutyRecord ref="dutyRecordRef" />
    <chargingStationTransfer ref="chargingStationTransferRef"></chargingStationTransfer>
    <reportingPlatform ref="reportingPlatformRef"></reportingPlatform>
    <dataReport ref="dataReportRef"></dataReport>
    <priceCalculation ref="priceCalculationRef"></priceCalculation>
    <deviceList ref="deviceListRef"></deviceList>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import TheService from './components/the-service.vue';
  import {
    cfChargingStationGet,
    cfChargingStationDelete,
  } from '@/api/internetOfThings';
  import { copyText } from '@/utils/copyText';
  import editAdd from './editAdd.vue';
  import aisle from './aisle.vue';
  import chargingRules from './chargingRules.vue';
  import accountNumber from './accountNumber.vue';
  import ledList from './ledList.vue';
  import administratorList from './administratorList.vue';
  import dutyRecord from './dutyRecord.vue';
  import chargingStationTransfer from './chargingStationTransfer.vue';
  import dataReport from './dataReport.vue';

  
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const aisleRef = ref();
  const chargingRulesRef = ref();
  const imagePreViewIndex = ref(0);

  const accountNumberRef = ref();
  const ledListRef = ref();
  const administratorListRef = ref();
  const dutyRecordRef = ref();
  const chargingStationTransferRef = ref();
  const reportingPlatformRef = ref();
  const dataReportRef = ref();
  const priceCalculationRef = ref();
  const deviceListRef = ref();

  const operationVisible = ref(false);
  const deleteChargingStationId = ref('');
  const selectedChargingStation = ref({ name: '' });
  const visible = ref(false);

  const clickOptions = (clickType: string) => {
    processFunctionality(clickType);
  };
  const processFunctionality = (type: string) => {
    switch (type) {
      case '编辑':
        handleEdit(selectedChargingStation.value);
        break;
      case '删除':
        // 执行删除功能的代码
        onDelete(selectedChargingStation.value);
        break;
      case '通道':
        // 执行通道功能的代码
        handleAisle(selectedChargingStation.value);
        break;
      case '收费规则':
        // 执行收费规则功能的代码
        handleChargingRules(selectedChargingStation.value);
        break;
      case '收款账号':
        // 执行收款账号功能的代码
        onShowAccountNumber(selectedChargingStation.value);
        break;
      case '显示屏':
        // 执行显示屏功能的代码
        onShowLedList(selectedChargingStation.value);
        break;
      case '管理人员':
        // 执行管理人员功能的代码
        onShowAdministratorList(selectedChargingStation.value);
        break;
      case '值班记录':
        // 执行值班记录功能的代码
        onShowDutyRecord(selectedChargingStation.value);
        break;
      case '电站转让':
        // 执行电站转让功能的代码
        onShowChargingStationTransfer(selectedChargingStation.value);
        break;
      case '上报平台关联':
        // 执行上报平台关联功能的代码
        onShowReportingPlatform(selectedChargingStation.value);
        break;
      case '数据报表':
        onShowDataReport(selectedChargingStation.value);
        break;
      default:
        console.log('未知功能');
    }
  };

  const showOperationVisible = (record: any) => {
    operationVisible.value = true;
    selectedChargingStation.value = record;
  };
  const onShowReportingPlatform = (e: any) => {
    reportingPlatformRef.value.handleClick(e);
  };
  const onShowDataReport = (e: any) => {
    dataReportRef.value.handleClick(e);
  };
  const onShowChargingStationTransfer = (e: any) => {
    chargingStationTransferRef.value.handleClick(e);
  };
  const onShowDutyRecord = (e: any) => {
    dutyRecordRef.value.handleClick(e);
  };
  const imagePreViewChange = (e: any) => {
    imagePreViewIndex.value = e;
  };
  const onShowAdministratorList = (row: any) => {
    administratorListRef.value.handleClick(row.id, row.stationName);
  };
  const onShowLedList = (row: any) => {
    ledListRef.value.handleClick(row.id, row.stationName);
  };
  const onShowAccountNumber = (row: any) => {
    accountNumberRef.value.handleClick(row.id, row.stationName);
  };
  const handleChargingRules = (row: any) => {
    chargingRulesRef.value.handleClick(row.id, row.stationName);
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      slotName: 'id',
      width: 200,
    },
    {
      title: '充电站名称',
      dataIndex: 'stationName',
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      tooltip: true,
      width: 200,
    },
    {
      title: '联系人电话',
      dataIndex: 'phone',
    },
    {
      title: '充电站类型',
      dataIndex: 'newStationType',
    },
    {
      title: '慢充',
      dataIndex: 'chargeSlowly',
      slotName: 'chargeSlowly',
    },
    {
      title: '快充',
      dataIndex: 'fastCharge',
      slotName: 'fastCharge',
    },
    {
      title: '超快充',
      dataIndex: 'superFastCharge',
      slotName: 'superFastCharge',
    },
    {
      title: '配套',
      dataIndex: 'supporting',
      slotName: 'supporting',
      width: 160,
    },
    {
      title: '充电站图片',
      dataIndex: 'image',
      slotName: 'image',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const onCopyText = (value: any) => {
    copyText(value)
  }
  const stationTypeArr = [
    {
      value: 1,
      label: '电动车充电站',
    },
    {
      value: 2,
      label: '电动汽车充电站',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      stationName: '',
      stationStatus: '',
      stationType: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });
  const handleAisle = (row: any) => {
    localStorage.setItem('charginStationId', row.id);
    aisleRef.value.handleClick(row.id, row.stationName);
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
  const onDelete = async (row: any) => {
    deleteChargingStationId.value = row.id;
    visible.value = true;
  };
  const handleOk = async () => {
    const {code} = await cfChargingStationDelete({params: {id: deleteChargingStationId.value}});
    if(code===10002){
      fetchData();
    }
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
  const calculatePercentage = (num, total) => {
    return (num / total) * 100;
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await cfChargingStationGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        stationName: formModel.value.stationName,
        stationStatus: formModel.value.stationStatus,
        stationType: formModel.value.stationType,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.slowChargeNumberPercent = calculatePercentage(
          i.usedSlowChargeNumber,
          i.slowChargeNumber
        );
        i.fastChargeNumberPercent = calculatePercentage(
          i.usedFastChargeNumber,
          i.fastChargeNumber
        );
        i.superFastChargeNumberPercent = calculatePercentage(
          i.usedSuperFastChargeNumber,
          i.superFastChargeNumber
        );
        i.newStationType =
          i.stationType == 1 ? '电动车充电站' : '电动汽车充电站';
      }
      console.log(data, 231);

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
