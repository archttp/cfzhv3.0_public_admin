<template>
  <div class="container">
    <Breadcrumb :items="[
      'menu.pay.internetofthings',
      'menu.pay.internetofthings.carpark',
      'menu.pay.internetofthings.carpark.storedCardList',
    ]" />
    <a-card class="general-card" :title="$t('menu.pay.internetofthings.carpark.storedCardList')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="充电站" field="chargingStationId" required>
                  <a-select :loading="selectLoading" placeholder="请输入" allow-search allow-clear
                    @search="handleSelectSearch" :filter-option="false" v-model="formModel.chargingStationId">
                    <a-option v-for="item of chargingStationList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="cardNo" label="卡号">
                  <a-input v-model="formModel.cardNo" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="phone" label="手机号">
                  <a-input v-model="formModel.phone" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="卡类型" field="cardType">
                  <a-select
                    v-model="formModel.cardType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">两轮电动车</a-option>
                    <a-option :value="1">新能源汽车</a-option>
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
            <a-button @click="showPackageImport">
              {{ $t('searchTable.operation.import') }}
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table row-key="id" :columns="columns" :data="state.list" :style="{ height: '700px' }" :pagination="pagination"
        :loading="loading" @page-change="pageChange">
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini">删除</a-button>
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <packageImport ref="packageImportRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { getChargingStoredCardListByQuery, deleteChargingStoredCard, cfChargingStationSearch } from '@/api/internetOfThings';
import editAdd from './editAdd.vue';
import packageImport from './packageImport.vue';

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref(false);
const selectLoading = ref(false);

const editAddRef = ref();
const packageImportRef = ref();

const columns = [
  {
    title: '充电站名称',
    dataIndex: 'chargingStationName',
  },
  {
    title: '卡编号',
    dataIndex: 'cardNo',
  },
  {
    title: '卡类型',
    dataIndex: 'newCardType',
  },
  {
    title: '余额',
    dataIndex: 'amountBalance',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
];
const chargingStationList = ref([]);
const state = reactive({
  list: [],
});
const generateFormModel = () => {
  return {
    cardNo: '',
    chargingStationId: '',
    cardType: '',
    phone: '',
  };
};
const formModel = ref(generateFormModel());

onMounted(() => {
  fetchData();
  handleSelectSearch(null);
});
const showPackageImport = () => {
  packageImportRef.value.handleClick();
}
const handleSelectSearch = async (value: any) => {
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
  pagination.current = 1;
  fetchData();
};
const onDelete = async (id: string) => {
  await deleteChargingStoredCard({ params: { id } });
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
const fetchData = async () => {
  loading.value = true;
  // @ts-ignore
  const { data, code, total } = await getChargingStoredCardListByQuery({
    params: checkParams({
      page: pagination.current,
      size: pagination.pageSize,
      cardNo: formModel.value.cardNo,
      chargingStationId: formModel.value.chargingStationId,
      cardType: formModel.value.cardType,
      phone: formModel.value.phone,
    }),
  });
  loading.value = false;
  if (code === 10002) {
    // @ts-ignore
    if (total) pagination.total = total;
    for(const item of data){
      if(item.cardType==0){
        item.newCardType = '两轮电动车';
      }else{
        item.newCardType = '新能源汽车';
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
