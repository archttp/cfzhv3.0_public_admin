<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.ucenter',
        'menu.ucenter.qrcode',
        'menu.ucenter.qrcode.list',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.ucenter.qrcode.list')">
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
                <a-form-item field="name" label="部门名称">
                  <a-input
                    v-model="formModel.name"
                    placeholder="请输入部门名称"
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
        <a-col :span="12"> </a-col>
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
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { cfQrCodeGet, cfDepartmentDelete } from '@/api/user';
  import editAdd from './editAdd.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '随机码',
      dataIndex: 'randomCode',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '资源类型',
      dataIndex: 'sourceType',
    },
    {
      title: '二维码类型',
      dataIndex: 'newCodeType',
    },
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
    await cfDepartmentDelete({ params: { id } });
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
  const getCodeTypeName = (type: any) => {
    switch (type) {
      case 0:
        return '通用'
        break;
      case 1:
        return '停车场'
        break;
      case 2:
        return '商城'
        break;
      case 3:
        return '充电'
        break;
      case 4:
        return '洗车'
        break;
      case 5:
        return '加油'
        break;
      default:
        return '-'
        break;
    }
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await cfQrCodeGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newCodeType = getCodeTypeName(i.codeType)
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
