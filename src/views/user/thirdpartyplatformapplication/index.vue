<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.ucenter',
        'menu.ucenter.thirdpartyplatformapplication',
        'menu.ucenter.thirdpartyplatformapplication.list',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.ucenter.thirdpartyplatformapplication.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 4 }"
            :wrapper-col-props="{ span: 12 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="applicationName" label="应用名称">
                  <a-input
                    v-model="formModel.applicationName"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="appid" label="appid">
                  <a-input
                    v-model="formModel.appid"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col  :span="8">
                <a-form-item label="用户" field="uid">
                  <a-select v-model="formModel.uid" :loading="loading" placeholder="手机号搜索" allow-search :allow-clear=true
                    :filter-option="false" @search="handleSearch">
                    <a-option v-for="item of userList" :key="item?.id" :value="item?.id">{{ item.userName }}</a-option>
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
        <!-- <template #privateKey="{ record }">
          <a-tooltip :content="record.privateKey" background-color="#722ED1">
            <div>{{ getKeyName(record.privateKey) }}</div>
          </a-tooltip>
        </template>
        <template #publicKey="{ record }">
          <a-tooltip :content="record.publicKey" background-color="#722ED1">
            <div>{{ getKeyName(record.publicKey) }}</div>
          </a-tooltip>
        </template> -->
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
  import { cfDeveloperGet, cfDeveloperDelete, cfUserQuicklySearchUser } from '@/api/user';
  import editAdd from './editAdd.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const userList = ref([]);
  const columns = [
    // {
    //   title: '接口内容加密方式',
    //   dataIndex: 'aesEncryption',
    // },
    {
      title: '第三方应用平台appid',
      dataIndex: 'appid',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '应用名称',
      dataIndex: 'applicationName',
    },
    // {
    //   title: '第三方应用授权token',
    //   dataIndex: 'authToken',
    //   ellipsis: true,
    //   tooltip: {
    //     'background-color': '#3491FA',
    //   },
    // },
    // {
    //   title: '原始id',
    //   dataIndex: 'originalId',
    // },
    {
      title: '平台',
      dataIndex: 'newPlatform',
    },
    {
      title: '私钥',
      dataIndex: 'privateKey',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '公钥',
      dataIndex: 'publicKey',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '所属用户',
      dataIndex: 'uid',
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
      applicationName: '',
      appid: '',
      uid: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });
  // const getKeyName = (value: string) => {
  //   if (!value) {
  //     return '-';
  //   }
  //   if (value.length >= 18) {
  //     // eslint-disable-next-line prefer-template
  //     return value.substring(0, 18) + '...';
  //   }
  //   return value;
  // };
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
  const onDelete = async (id: string) => {
    await cfDeveloperDelete({ params: { id } });
    fetchData();
  };
  const getPlatformName = (value: string) => {
    let text = '';
    switch (value) {
      case 'wx_web':
        text = '微信公众号';
        break;
      case 'wx_mp':
        text = '微信小程序';
        break;
      case 'wx_app':
        text = '微信app';
        break;
      case 'ali_web':
        text = '阿里公众号';
        break;
      case 'ali_mp':
        text = '阿里小程序';
        break;
      case 'ali_app':
        text = '阿里app';
        break;
      default:
        break;
    }
    return text;
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
    const { data, code, total } = await cfDeveloperGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        ...formModel.value,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      // eslint-disable-next-line no-restricted-syntax
      for (const i of data) {
        i.newPlatform = getPlatformName(i.platform);
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
