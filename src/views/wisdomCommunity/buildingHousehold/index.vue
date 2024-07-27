<template>
  <div class="container">
    <Breadcrumb :items="[
      'menu.wisdomcommunity',
      'menu.wisdomcommunity.village',
      'menu.wisdomcommunity.village.household',
    ]" />
    <a-card class="general-card" :title="$t('menu.wisdomcommunity.village.household')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="小区" field="villageId">
                  <a-select :loading="selectLoading" placeholder="请输入" allow-search allow-clear
                    @search="handleSelectSearch" :filter-option="false" v-model="formModel.villageId">
                    <a-option v-for="item of buildingHouseholdList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="houseShortName" label="房屋缩写">
                  <a-input v-model="formModel.houseShortName" placeholder="例如：16-1-8-803 表示16栋1单元8层803号房间" allow-clear />
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { getBuildingHouseholdListByQuery, deleteBuildingHousehold, cfVillageSearch } from '@/api/wisdomCommunity';
import editAdd from './editAdd.vue';

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref(false);
const selectLoading = ref(false);

const editAddRef = ref();
const columns = [
  {
    title: '小区名称',
    dataIndex: 'villageName',
  },
  {
    title: '房屋名称',
    dataIndex: 'houseName',
  },
  {
    title: '房屋名称缩写',
    dataIndex: 'houseShortName',
  },
  {
    title: '户主手机号',
    dataIndex: 'householderPhone',
  },
  {
    title: '居住人数',
    dataIndex: 'numberOfResidents',
  },
  {
    title: '房产注册登记面积',
    dataIndex: 'registeredArea',
  },
  {
    title: '实际居住面积',
    dataIndex: 'actualArea',
  },
  {
    title: '房屋状态',
    dataIndex: 'newHouseStatus',
  },

  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
];
const state = reactive({
  list: [],
});
const buildingHouseholdList = ref([]);

const generateFormModel = () => {
  return {
    houseShortName: '',
    villageId: ''
  };
};
const formModel = ref(generateFormModel());

onMounted(() => {
  fetchData();
});

const handleSelectSearch = async (value: any) => {
  if (value) {
    selectLoading.value = true;
    const { data, code } = await cfVillageSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      buildingHouseholdList.value = data;
    } else {
      buildingHouseholdList.value = [];
    }
  } else {
    parkList.value = [];
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
  await deleteBuildingHousehold({ params: { id } });
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
const convertStatusToText = (statusCode) => {
  switch (statusCode) {
    case 0:
      return "毛坯";
    case 1:
      return "正常居住";
    case 2:
      return "待售";
    case 3:
      return "出租居住中";
    case 4:
      return "待租中";
    case 5:
      return "冻结中";
    case 6:
      return "拍卖中";
    default:
      return "未知状态";
  }
};
const fetchData = async () => {
  loading.value = true;
  // @ts-ignore
  const { data, code, total } = await getBuildingHouseholdListByQuery({
    params: checkParams({
      page: pagination.current,
      size: pagination.pageSize,
      houseShortName: formModel.value.houseShortName,
      villageId: formModel.value.villageId,
    }),
  });
  loading.value = false;
  if (code === 10002) {
    // @ts-ignore
    if (total) pagination.total = total;
    for (const i of data) {
      i.newHouseStatus = convertStatusToText(i.houseStatus)
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
