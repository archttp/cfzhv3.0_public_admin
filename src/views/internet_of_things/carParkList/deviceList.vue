<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1400"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-row :gutter="16">
          <a-col :span="4">
            <a-form-item field="areaId" label="停车场">
              <!-- <a-input
                v-model="formModel.carParkId"
                placeholder="请输入"
                allow-clear
              /> -->
              <a-select
                :loading="loading"
                placeholder="请输入"
                allow-search
                allow-clear
                @search="handleSelectSearch"
                :filter-option="false"
                v-model="formData.areaId"
              >
                <a-option v-for="item of parkList" :value="item.id">{{
                  item.name
                }}</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item field="serialNo" label="设备序列号SN">
              <a-input
                v-model="formData.serialNo"
                placeholder="请输入"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="品牌" field="brand">
              <a-select
                v-model="formData.brand"
                placeholder="请选择"
                allow-clear
              >
                <a-option
                  :value="item.value"
                  v-for="item in brandOptions"
                  :key="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="设备类型"
              field="deviceType"
              validate-trigger="input"
            >
              <a-select
                v-model="formData.deviceType"
                placeholder="请选择"
                allow-clear
              >
                <a-option
                  :value="item.value"
                  v-for="item in deviceTypeList"
                  :key="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="云平台"
              field="bindCloudPlatforms"
              validate-trigger="input"
            >
              <a-select
                v-model="formData.bindCloudPlatforms"
                placeholder="请选择"
                allow-clear
              >
                <a-option
                  :value="0"
                  :key="0"
                  >未绑定</a-option
                >
                <a-option
                  :value="1"
                  :key="1"
                  >已绑定</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button
              type="primary"
              :loading="loading"
              @click="fetchData"
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
        <template #operations="{ record }">
          <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
              <a-doption v-if="record.bindCloudPlatforms==0">
                <a-space @click="bindCloudPlatForms(record)">
                  <icon-edit />
                  <span> 绑定云平台 </span>
                </a-space>
              </a-doption>
              <a-doption v-if="record.bindCloudPlatforms==1">
                <a-space @click="unBindCloudPlatForms(record)">
                  <icon-delete />
                  <span> 解绑云平台 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="getRemoteConnectionUrl(record)" v-if="record.bindCloudPlatforms==1">
                  <icon-attachment />
                  <span> 远程连接 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { costMeasurement, cfCarParkSearch } from '@/api/internetOfThings';
  import { cfDeviceGet, bindThirdPartyCloudPlatforms, getRemoteConnection } from '@/api/park';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const modalTitle = ref('硬件列表');
  const parkList = ref([]);
  const formRef = ref();
  const brandOptions = [
    {
      label: '臻识',
      value: 'zhen_shi',
    },
    {
      label: '华夏',
      value: 'hua_xia',
    },
    {
      label: '千熠',
      value: 'qian_yi',
    },
    {
      label: '海康',
      value: 'hk',
    },
    {
      label: '大华',
      value: 'dh',
    },
    {
      label: '道通物联',
      value: 'olm',
    },
    {
      label: '方控',
      value: 'fang_kong',
    },
    {
      label: '驴充充',
      value: 'lv_chong_chong',
    },
    {
      label: '金盾',
      value: 'king_tun',
    },
    {
      label: '答案',
      value: 'da_an',
    },
    {
    label: '云快充',
    value: 'yun_kuai_chong',
    },
    {
      label: '才风智慧',
      value: 'cfzh',
    },
  ];
  const deviceTypeList = [
    { label: '常规车牌识别相机', value: 2 },
    { label: '匝道', value: 1 },
    { label: '高位相机', value: 3 },
    { label: '地锁', value: 4 },
    { label: 'led设备', value: 5 },
    { label: '监控相机', value: 6 },
    { label: '人脸识别机', value: 7 },
    { label: '充电桩', value: 8 },
  ];
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const formData = ref({
    serialNo: '',
    model: '',
    brand: '',
    deviceType: 2,
    areaId: '',
    bindCloudPlatforms: '',
  });
  const state = reactive({
    list: [],
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 110,
      title: '场站',
      dataIndex: 'areaName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 110,
      title: '设备名称',
      dataIndex: 'deviceName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 110,
      title: '序列号',
      dataIndex: 'serialNo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '品牌',
      dataIndex: 'newBrand',
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      width: 150,
      title: '设备ip',
      dataIndex: 'ip',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '云平台',
      dataIndex: 'newBindCloudPlatforms',
    },
    {
      title: '状态',
      dataIndex: 'newStatus',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
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
  const getLabelByValue = (value: any) => {
    const option = brandOptions.find((item: any) => item.value === value);
    return option ? option.label : '';
  };
  const fetchData = async () => {
    loading.value = true;
    const { code, total, data } = await cfDeviceGet({
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
        i.newBrand = getLabelByValue(i.brand);
        i.newBindCloudPlatforms = i.bindCloudPlatforms ? '已绑定' : '-';
        //0-已下线/1-正常/2-故障维护/3-占用
        switch (i.status) {
          case 0:
            i.newStatus =  '已下线';
            break;
          case 1:
            i.newStatus =  '正常';
            break;
          case 2:
            i.newStatus =  '故障维护';
            break;
          case 3:
            i.newStatus =  '占用';
            break;
          default:
            i.newStatus =  '-';
            break;
        }
      }
      state.list = data;
    } else {
      state.list = [];
    }
  };
  const handleClick = () => {
    fetchData();
    handleSelectSearch(null);
    visible.value = true;
  };

  const bindCloudPlatForms = async (device: any) => {
    const { code } = await bindThirdPartyCloudPlatforms({
      id: device.id,
      action: 'bind',
    });
    if (code === 10002) {
      fetchData();
    }
  };

  const unBindCloudPlatForms = async (device: any) => {
    const { code } = await bindThirdPartyCloudPlatforms({
      id: device.id,
      action: 'unbind',
    });
    if (code === 10002) {
      fetchData();
    }
  };

  const getRemoteConnectionUrl = async (device: any) => {
    const { code, data } = await getRemoteConnection({
      params: checkParams({
        id: device.id,
      }),
    });
    if (code === 10002) {
      window.open(data);
    }
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
