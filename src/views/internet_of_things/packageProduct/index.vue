<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.carpark',
        'menu.pay.internetofthings.packageproduct',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.pay.internetofthings.packageproduct')"
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
                <a-form-item field="title" label="标题">
                  <a-input
                    v-model="formModel.title"
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
  import { productGet, productDelete } from '@/api/internetOfThings';
  import editAdd from './editAdd.vue';
  import { getCarTypeListByQuery } from '@/api/park';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const columns = [
    {
      title: '车场',
      dataIndex: 'carParkName',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
    },
    {
      title: '车辆类型',
      dataIndex: 'newTypeKey',
    },
    {
      title: '原价',
      dataIndex: 'originalPrice',
    },
    {
      title: '现价',
      dataIndex: 'currentPrice',
    },
    {
      title: '单位',
      dataIndex: 'newPackageUnit',
    },

    {
      title: '内部套餐',
      dataIndex: 'newSpecialGive',
    },
    {
      title: '使用宽限期',
      dataIndex: 'newUseGracePeriod',
    },
    {
      title: '宽限期',
      dataIndex: 'newGracePeriod',
    },
    {
      title: '特殊车辆套餐',
      dataIndex: 'newSpecialCarPackage',
    },
    {
      title: '排序',
      dataIndex: 'sortIndex',
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
  const carTypeList = ref([]);
  const generateFormModel = () => {
    return {
      title: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(async() => {
    await getCarType();
    await fetchData();
  });

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
    await productDelete({ params: { id } });
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
    const { data, code, total } = await productGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        title: formModel.value.title,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newUseGracePeriod = i.useGracePeriod ? '是' : '否';
        i.newSpecialGive = i.specialGive ? '是' : '否';
        i.newGracePeriod = i.gracePeriod + '' != '0' ? i.gracePeriod : '-';
        i.newSpecialCarPackage = i.specialCarPackage ? '是' : '否';
        i.newTypeKey = getCarTypeName(i.typeKey);
        i.newPackageUnit =
          i.packageUnit == 1
            ? '小时'
            : i.packageUnit == 2
            ? '每日'
            : i.packageUnit == 3
            ? '每月'
            : i.packageUnit == 4
            ? '每年'
            : '-';
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
