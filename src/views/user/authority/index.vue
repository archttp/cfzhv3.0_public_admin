<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.ucenter',
        'menu.ucenter.authority',
        'menu.ucenter.authority.list',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.ucenter.authority.list')">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <!-- <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload> -->
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
        :pagination="false"
        :loading="loading"
        @page-change="pageChange"
      >
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button
                type="primary"
                status="danger"
                size="mini"
                :disabled="record.children !== null"
                >删除</a-button
              >
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleEdit(record)"
              >编辑</a-button
            >

            <a-button type="primary" size="mini" @click="handleAdd(record)"
              >新增</a-button
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
  import { cfAuthGet, cfUserDelete } from '@/api/user';
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
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '模块',
      dataIndex: 'module',
    },
    {
      title: '控制器',
      dataIndex: 'controller',
    },
    {
      title: '方法名',
      dataIndex: 'method',
    },
    {
      title: '路由名称',
      dataIndex: 'routerName',
    },
    {
      title: '路由路径',
      dataIndex: 'routerPath',
    },
    {
      title: '排序序号',
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

  onMounted(() => {
    fetchData();
  });

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const handleAdd = (params: any = null) => {
    editAddRef.value.handleClick({
      type: !params?.id ? 'add' : 'add_params',
      data: params,
    });
  };
  const handleEdit = (params: any) => {
    editAddRef.value.handleClick({
      type: 'edit',
      data: params,
    });
  };
  const onDelete = async (id: string) => {
    await cfUserDelete({ params: { id } });
    fetchData();
  };
  // const checkParams = (obj: any) => {
  //   // eslint-disable-next-line no-restricted-syntax, guard-for-in
  //   for (const i in obj) {
  //     if (!obj[i]) obj[i] = null;
  //   }
  //   return obj;
  // };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await cfAuthGet();
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      state.list = data;
    } else {
      state.list = [];
    }
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
