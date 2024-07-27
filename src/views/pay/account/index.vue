<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.pay', 'menu.account', 'menu.account.list']"
    />
    <a-card class="general-card" :title="$t('menu.user.list.searchTable')">
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
                <a-form-item field="uid" label="用户id">
                  <a-input
                    v-model="formModel.uid"
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
          <!-- <a-space>
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
          </a-space> -->
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
      ></a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { cfAccountGet, cfScoreTypeGet } from '@/api/pay';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const scoreList = ref([]);
  const columns = [
    {
      title: '积分类型',
      dataIndex: 'newScoreType',
    },
    {
      title: '账号类型',
      dataIndex: 'newType',
    },
    {
      title: '余额',
      dataIndex: 'balance',
    },
    {
      title: '用户id',
      dataIndex: 'uid',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      uid: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
    cfScoreTypeGetFn();
  });

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const search = () => {
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
  const cfScoreTypeGetFn = async () => {
    // @ts-ignore
    const { data, code } = await cfScoreTypeGet({
      params: checkParams({
        page: 1,
        size: 200,
      }),
    });
    if (code === 10002) {
      scoreList.value = data;
    }
  };
  const getScoreTypeName = (value: any) => {
    // @ts-ignore
    return scoreList.value.filter((i: any) => i.keyFlag === value)[0].name;
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await cfAccountGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        uid: formModel.value.uid,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const i of data) {
        // eslint-disable-next-line no-nested-ternary
        i.newType = i.type === 0 ? '个人' : i.type === 1 ? '商户' : '企业机构';
        i.newScoreType = i.scoreType ? getScoreTypeName(i.scoreType) : '-';
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
