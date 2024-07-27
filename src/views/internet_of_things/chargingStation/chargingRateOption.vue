<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false">
      <template #title>
        {{ parametersData.deviceName + ' 时段费率' }}
      </template>
      <a-button
        type="primary"
        @click="handleRulesOptionAdd"
        style="margin-bottom: 16px"
        >新增</a-button
      >
      <a-table
        row-key="id"
        :columns="columns"
        :data="list"
        :pagination="pagination"
        :loading="tableLoading"
        @page-change="pageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #feeCode="{ record }">
          <a-select v-model="record.feeCode" @change="onSubmitClick(record)">
            <a-option v-for="item of feeCodeOptions" :value="item.value">{{item.label}}</a-option>
          </a-select>
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm
              content="您确定删除吗？"
              @ok="onDeviceRulesOptionDelete(record.id)"
            >
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import {
    getChargingDeviceRulesOptionListByQuery,
    addChargingDeviceRulesOption,
    updateChargingDeviceRulesOption,
    deleteChargingDeviceRulesOption,
  } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const visible2 = ref(false);

  // 生成码数据
  const visible3 = ref(false);
  const createCodeImage = ref('');
  const createExitCodeFormData = ref({
    height: '300',
    logoText: '',
    text: '',
    width: '300',
  });
  const urlValue = ref(apiHost+'/scene/bcc/');
  const plainOptions = [
    { label: '二轮电动车', value: apiHost+'/scene/bcc/' },
    { label: '四轮电动车', value: apiHost+'/scene/evc/' },
  ];
  const feeCodeOptions = [
    { label: '尖费率', value: 0 },
    { label: '峰费率', value: 1 },
    { label: '平费率', value: 2 },
    { label: '谷费率', value: 3 },
  ];

  const tableLoading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    id: '',
    chargingStationId: '',
    chargingDeviceId: '',
    feeCode: '',
  });
  const pagination = reactive({
    current: 1,
    pageSize: 100,
    total: 0,
  });
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '费率编码',
      dataIndex: 'feeCode',
      slotName: 'feeCode',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const parametersData = ref({
    id: '',
    areaId: '',
  });
  const list = ref([]);

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };

  const fetchData = async () => {
    tableLoading.value = true;
    // @ts-ignore
    const { data, code, total } = await getChargingDeviceRulesOptionListByQuery({
      params: {
        page: 1,
        size: 100,
        chargingStationId: parametersData.value.areaId,
        chargingDeviceId: parametersData.value.id
      }
    });
    tableLoading.value = false;
    if (code === 10002) {
      let index = 1;
      for (const i of data) {
        i.index = getTimeText((index-1) * 1800000) + '-' +getTimeText(index * 1800000);
        index++;
        // i.newFeeCode = getFeeCodeText(i.feeCode);
      }
      list.value = data;
      if (total) pagination.total = total;
    } else {
      list.value = [];
      pagination.total = 0;
    }
  };

  const getTimeText = (time: number) => {
    if (time != null) {
      return dayjs(dayjs().startOf('day').valueOf() + time).format(
        'HH:mm'
      );
    } else {
      return '-';
    }
  };

  const handleClick = (e: any = null) => {
    parametersData.value = e;
    fetchData();
    visible.value = true;
  };
  const handleRulesOptionAdd = () => {
    if(pagination.total >= 48){
      Message.error('最多只能添加48项!');
      return;
    }
    formData.value.id = '';
    formData.value.feeCode = '';
    formData.value.chargingDeviceId = parametersData.value.id;
    formData.value.chargingStationId = parametersData.value.areaId;
    list.value.push(formData.value);
    
  };
  const onDeviceRulesOptionDelete = async (id: any) => {
    await deleteChargingDeviceRulesOption({ params: { id } });
    fetchData();
  };
  const getFeeCodeText = (status: number) => {
    switch (status) {
      case 0:
        return '尖费率';
      case 1:
        return '峰费率';
      case 2:
        return '平费率';
      case 3:
        return '谷费率';
      default:
        return '未知状态';
    }
  };

  const onSubmitClick = async (row: any) => {
    // eslint-disable-next-line consistent-retur
      
      // @ts-ignore
      if (row.id) {
        formData.value.id = row.id;
        formData.value.chargingStationId = row.chargingStationId;
        formData.value.chargingDeviceId = row.chargingDeviceId;
        formData.value.feeCode = row.feeCode;
        const { code } = await updateChargingDeviceRulesOption(formData.value);
        if (code === 10002) {
          fetchData();
        }
      } else {
        const { code } = await addChargingDeviceRulesOption(formData.value);
        if (code === 10002) {
          fetchData();
        }
      }
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
