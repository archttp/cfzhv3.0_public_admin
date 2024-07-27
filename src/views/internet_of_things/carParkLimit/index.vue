<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.carpark',
        'menu.pay.internetofthings.carparklimit',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.pay.internetofthings.carparklimit')">
      <a-row>
        <a-col :span="8">
                <a-form-item field="carParkId" label="停车场">
                  <!-- <a-input
                    v-model="formModel.carParkId"
                    placeholder="请输入"
                    allow-clear
                  /> -->
                  <a-select
                    :loading="loading"
                    placeholder="请输入停车名称搜索"
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
  import {
    getCarParkCarLimitListByQuery,
    deleteCarParkCarLimit,
    cfCarParkSearch,
  } from '@/api/internetOfThings';
  import { getCarTypeListByQuery } from '@/api/park';
  import editAdd from './editAdd.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const carTypeList = ref([]);
  const parkList = ref([]);
  const selectLoading = ref(false);
  const columns = [
    {
      title: '停车场名称',
      dataIndex: 'carParkName',
    },
    {
      title: '车辆类型',
      dataIndex: 'newCarTypeKey',
    },
    {
      title: '收费模式',
      dataIndex: 'newBillingModel',
    },
    {
      title: '免停时间(分钟)',
      dataIndex: 'newFreeTime',
    },
    {
      title: '入场自动开闸',
      dataIndex: 'newAutoOpenDoor',
    },
    {
      title: '禁止入场',
      dataIndex: 'newForbidIn',
    },
    {
      title: '禁止出场',
      dataIndex: 'newForbidOut',
    },
    {
      title: '免费放行',
      dataIndex: 'newFreeRelease',
    },
    {
      title: '赠送免停时间',
      dataIndex: 'newGiveFreeTime',
    },
    {
      title: '模板',
      dataIndex: 'newTemplate',
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
  const generateFormModel = () => {
    return {
      carParkId: '',
    };
  };
  const handleSelectSearch = async (value) => {
    if (value) {
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
    } else {
      parkList.value = [];
    }
  };
  const formModel = ref(generateFormModel());

  onMounted(async () => {
    await getCarType();
    await fetchData();
  });

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
    await deleteCarParkCarLimit({ params: { id } });
    fetchData();
  };
  const getOptionText = (value) => {
    switch (value) {
      case 'dynamic_time':
        return '动态时间计费';
      case 'fixed_time':
        return '固定时长计费';
      case 'dynamic_fixed_time':
        return '动态时间按段时长计费';
      case 'dynamic_time_upper_limit':
        return '每天指定最高费用';
      case 'static_time_upper_limit':
        return '限时指定最高费用';
      default:
        return '';
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
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getCarParkCarLimitListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        carParkId: formModel.value.carParkId,
      }),
    });

    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newFreeTime = !i.freeTime ? '-' : i.freeTime / 60000;
        i.newCarTypeKey = getCarTypeName(i.carTypeKey);
        i.newBillingModel = getOptionText(i.billingModel);
        i.newAutoOpenDoor = { 0: '否', 1: '是' }[i.autoOpenDoor];
        i.newForbidIn = { 0: '否', 1: '是' }[i.forbidIn];
        i.newFreeRelease = { 0: '否', 1: '是' }[i.freeRelease];
        i.newGiveFreeTime = { 0: '否', 1: '是' }[i.giveFreeTime];
        i.newTemplate = { 0: '否', 1: '是' }[i.template];
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
