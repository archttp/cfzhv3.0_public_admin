<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.wisdomcommunity',
        'menu.wisdomcommunity.village',
        'menu.wisdomcommunity.village.list',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.wisdomcommunity.village.list')">
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
                <a-form-item field="name" label="小区名称">
                  <a-input
                    v-model="formModel.name"
                    placeholder="请输入"
                    allow-clear
                  />
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
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
              <a-doption>
                <a-space @click="handleEdit(record)">
                  <icon-edit />
                  <span> 编辑 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onDelete(record.id)">
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
                <a-space @click="handleChargeRules(record)">
                  <icon-unordered-list />
                  <span> 收费规则 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <aisle ref="aisleRef" />
    <chargeRules ref="chargeRulesRef" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    wisdomCommunityGet,
    wisdomCommunityDelete,
  } from '@/api/wisdomCommunity';
  import editAdd from './editAdd.vue';
  import aisle from './aisle.vue';
  import chargeRules from './chargeRules.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const chargeRulesRef = ref();
  const aisleRef = ref();
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '联系人',
      dataIndex: 'contacts',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '座机',
      dataIndex: 'landline',
    },
    {
      title: '物业',
      dataIndex: 'propertyCompany',
    },
    {
      title: '住宅类型',
      dataIndex: 'newResidentialType',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const residentialTypeArr = [
    { value: 1, label: '商品房' },
    { value: 2, label: '房改房' },
    { value: 3, label: '存量房' },
    { value: 4, label: '集资房' },
    { value: 5, label: '平价房' },
    { value: 6, label: '解困房' },
    { value: 7, label: '再上市房' },
    { value: 8, label: '廉租住房' },
    { value: 9, label: '花园式住宅' },
    { value: 10, label: '公寓式住宅' },
    { value: 11, label: '经济适用住房' },
    { value: 12, label: '限价房' },
    { value: 13, label: '商业综合体' },
    { value: 14, label: '商业街' },
    { value: 15, label: '写字楼办公区' },
    { value: 16, label: '工业园区' },
    { value: 17, label: '社会组织机构区' },
    { value: 18, label: '政府组织机构区' },
    { value: 19, label: '武警部队区' },
    { value: 20, label: '学校组织区域' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      name: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });
  const handleChargeRules = (row: any) => {
    chargeRulesRef.value.handleClick(row);
  };
  const handleAisle = (row: any) => {
    localStorage.setItem('parkingId', row.id);
    aisleRef.value.handleClick(row.id, row.name);
  };
  const getLabelFromValue = (value: any) => {
    const item = residentialTypeArr.find((obj) => obj.value === value);
    return item ? item.label : 'Label not found';
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
    await wisdomCommunityDelete({ params: { id } });
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
    const { data, code, total } = await wisdomCommunityGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        name: formModel.value.name,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newResidentialType = getLabelFromValue(i.residentialType)
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
