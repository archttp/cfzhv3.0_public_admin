<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.charging',
        'menu.pay.internetofthings.charging.uselog',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.pay.internetofthings.charging.uselog')"
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
              <!-- <a-col :span="8">
                <a-form-item field="name" label="部门名称">
                  <a-input
                    v-model="formModel.name"
                    placeholder="请输入部门名称"
                    allow-clear
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item label="充电站" field="chargingStationId">
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formModel.chargingStationId"
                  >
                    <a-option
                      v-for="item of chargingStationList"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="充电类型" field="chargingType">
                  <a-select
                    placeholder="请选择"
                    allow-clear
                    v-model="formModel.chargingType"
                  >
                    <a-option :value="0">两轮电动车</a-option>
                    <a-option :value="1">三轮电动车</a-option>
                    <a-option :value="2">四轮电动汽车</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="充电状态" field="chargingStatus">
                  <a-select
                    placeholder="请选择"
                    allow-clear
                    v-model="formModel.chargingStatus"
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in chargingStatusArr"
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
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
            <a-button type="primary" status="danger" @click="onBatchDelete"
              >删除</a-button
            >
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
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
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
            <!-- <a-button type="primary" size="mini" @click="handleEdit(record)"
              >编辑</a-button
            > -->
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    getChargingUseLogListByQuery,
    deleteChargingUseLog,
    cfChargingStationSearch,
  } from '@/api/internetOfThings';
  import { parseTime } from '@/utils/index';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const selectLoading = ref(false);
  const chargingStationList = ref([]);
  const columns = [
    {
      title: '充电站',
      dataIndex: 'chargingStationName',
      ellipsis: true,
      tooltip: true,
      width: 150,
    },
    {
      title: '充电桩',
      dataIndex: 'checkPointName',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '充电设备',
      dataIndex: 'chargingDeviceName',
    },
    {
      title: '充电口',
      dataIndex: 'chargingPort',
    },

    {
      title: '总充电费(￥)',
      dataIndex: 'chargingFee',
    },
    {
      title: '总服务费(￥)',
      dataIndex: 'serviceFee',
    },
    {
      title: '充电价格(￥)',
      dataIndex: 'chargingPrice',
    },
    {
      title: '服务费价格(￥)',
      dataIndex: 'servicePrice',
    },
    {
      title: '已充电度数',
      dataIndex: 'chargingedKwh',
    },
    {
      title: '充电状态',
      dataIndex: 'newChargingStatus',
    },
    {
      title: '结束原因',
      dataIndex: 'endReason',
    },
    {
      title: '充电类型',
      dataIndex: 'newChargingType',
    },

    {
      title: '开始时间',
      dataIndex: 'newStartTime',
      ellipsis: true,
      tooltip: true,
      width: 100,
    },
    {
      title: '结束时间',
      dataIndex: 'newEndTime',
      ellipsis: true,
      tooltip: true,
      width: 100,
    },
    {
      title: '车牌号',
      dataIndex: 'numberPlate',
      ellipsis: true,
      tooltip: true,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
      fixed: 'right',
    },
  ];
  const chargingStatusArr = [
    { value: 1, label: '正准备开始充电' },
    { value: 2, label: '充电进行中' },
    { value: 3, label: '充电结束' },
    { value: 4, label: '启动失败' },
    { value: 5, label: '系统故障不能充电' },
  ];
  const chargingType = [
    { value: 0, label: '两轮电动车' },
    { value: 1, label: '三轮电动车' },
    { value: 2, label: '四轮电动汽车' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      chargingStationId: '',
      chargingType: '',
      chargingStatus: '',
    };
  };
  const formModel = ref(generateFormModel());
  const selectedKeys = ref([]);
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    fixed: true,
    onlyCurrent: true,
  });
  
  onMounted(() => {
    fetchData();
  });

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const search = () => {
    fetchData();
  };
  const onDelete = async (id: string) => {
    await deleteChargingUseLog({ params: { id } });
    fetchData();
  };
  const onBatchDelete = async () => {
    await deleteChargingUseLog({ params: { ids: selectedKeys.value.join(',') } });
    selectedKeys.value = [];
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
  const getLabelByValue = (array: any, value: any) => {
    const obj = array.find((item: any) => item.value === value);
    return obj ? obj.label : '';
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getChargingUseLogListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        chargingStationId: formModel.value.chargingStationId,
        chargingType: formModel.value.chargingType,
        chargingStatus: formModel.value.chargingStatus,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newStartTime = parseTime(i.startTime) || '-';
        i.newEndTime = parseTime(i.endTime) || '-';
        i.newChargingStatus = getLabelByValue(
          chargingStatusArr,
          i.chargingStatus
        );
        i.newChargingType = getLabelByValue(chargingType, i.chargingType);
      }
      state.list = data;
    } else {
      state.list = [];
    }
  };
  const handleSelectSearch = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfChargingStationSearch({
        params: {
          name: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        chargingStationList.value = data;
      } else {
        chargingStationList.value = [];
      }
    } else {
      chargingStationList.value = [];
    }
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
