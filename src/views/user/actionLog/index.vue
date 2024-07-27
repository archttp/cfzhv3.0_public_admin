<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.ucenter', 'menu.ucenter.user', 'menu.ucenter.user.actionLog.list']"
    />
    <a-card class="general-card" :title="$t('menu.ucenter.user.actionLog.list')">
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
                <a-form-item label="操作用户" field="uid">
                  <a-select
                    v-model="formModel.uid"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="手机号搜索"
                    allow-search
                    :filter-option="false"
                    @search="handleSearch"
                  >
                    <a-option
                      v-for="item of userList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.userName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="params" label="请求参数">
                  <a-input
                    v-model="formModel.params"
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
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
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
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getActionLogListByQuery, cfUserQuicklySearchUser } from '@/api/user';
  import { parseTime } from '@/utils';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const userList = ref([]);
  const columns = [
    {
      title: '请求id',
      dataIndex: 'id',
      ellipsis: true,
      width: 180,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '资源描述',
      dataIndex: 'description',
    },
    {
      title: '操作者id',
      dataIndex: 'uid',
    },
    {
      title: '操作者姓名',
      dataIndex: 'userTrueName',
    },
    {
      title: '请求参数',
      dataIndex: 'params',
      ellipsis: true,
      width: 180,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '模块名',
      dataIndex: 'module',
    },
    {
      title: '控制器名',
      dataIndex: 'controller',
    },
    {
      title: '方法名',
      dataIndex: 'method',
    },
    {
      title: '路径',
      dataIndex: 'path',
      ellipsis: true,
      width: 180,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '请求客户端',
      dataIndex: 'client',
      ellipsis: true,
      width: 180,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '请求时间',
      dataIndex: 'createTime',
      width: '180',
    },
  ];
  const state = reactive({
    list: [],
  });

  const generateFormModel = () => {
    return {
      uid: null,
      params: null,
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });

  const handleSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      userList.value = data;
    } else {
      userList.value = [];
    }
  };

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
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getActionLogListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        uid: formModel.value.uid,
        params: formModel.value.params,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.createTime = parseTime(i.createTime) || '-';
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