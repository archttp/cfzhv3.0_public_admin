<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.ucenter',
        'menu.ucenter.user',
        'menu.ucenter.user.domainlist',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.ucenter.user.domainlist')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 4 }"
            :wrapper-col-props="{ span: 8 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col  :span="8">
              <a-form-item label="用户" field="uid">
                <a-select v-model="formModel.uid" :loading="loading" placeholder="手机号搜索" allow-search
                  :filter-option="false" @search="handleSearch">
                  <a-option v-for="item of userList" :key="item?.id" :value="item?.id">{{ item.userName }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="使用场景" field="scene">
                  <a-select v-model="formModel.scene" placeholder="请选择" allow-clear>
                    <a-option :value="0">登录二维码域名</a-option>
                    <a-option :value="1">优惠券二维码域名</a-option>
                    <a-option :value="2">通道码域名</a-option>
                    <a-option :value="3">充电域名</a-option>
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
  import { getDomainListByQuery, deleteDomain, cfUserQuicklySearchUser } from '@/api/user';
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
      title: '域名id',
      dataIndex: 'id',
    },
    {
      title: '域名备注',
      dataIndex: 'domainNotes',
    },
    {
      title: '域名值',
      dataIndex: 'domainValue',
    },
    {
      title: '场景',
      dataIndex: 'newScene',
    },
    {
      title: '用户编号id',
      dataIndex: 'uid',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const userList = ref([]);
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      uid: '',
      scene:''
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
    await deleteDomain({ params: { id } });
    fetchData();
  };
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
    const { data, code, total } = await getDomainListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        uid: formModel.value.uid,
        scene: formModel.value.scene,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        switch(i.scene){
          case 0:
            i.newScene = '登录二维码域名';
            break;
          case 1:
            i.newScene = '优惠券二维码域名';
            break;
          case 2:
            i.newScene = '通道码域名';
            break;
          case 3:
            i.newScene = '充电域名';
            break;
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
