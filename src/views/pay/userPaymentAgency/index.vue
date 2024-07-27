<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay',
        'menu.pay.userPaymentAgency',
        'menu.pay.userPaymentAgency.list',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.pay.userPaymentAgency.list')">
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
                <a-form-item field="name" label="机构名称">
                  <a-input
                    v-model="formModel.name"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="mchId" label="商户号">
                  <a-input
                    v-model="formModel.mchId"
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
  import { cfPaymentAgencyGet, cfPaymentAgencyDelete, getPaymentAgencyListByQuery } from '@/api/pay';
  import editAdd from './editAdd.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const paymentAgencyList = ref([]);
  const columns = [
    {
      width: 180,
      title: '商户号',
      dataIndex: 'mchId'
    },
    {
      width: 200,
      title: '机构名称',
      dataIndex: 'name',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    // {
    //   width: 180,
    //   title: '账号备注',
    //   dataIndex: 'accountNumberNote'
    // },
    {
      width: 200,
      title: '应用id',
      dataIndex: 'appid',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    // {
    //   width: 180,
    //   title: '授权token',
    //   dataIndex: 'authToken',
    // },
    // {
    //   width: 120,
    //   title: '证书路径',
    //   dataIndex: 'certPath',
    //   ellipsis: true,
    //   tooltip: {
    //     'background-color': '#3491FA',
    //   },
    // },
    {
      width: 60,
      title: '币种',
      dataIndex: 'currencyType',
    },
    // {
    //   width: 120,
    //   title: '支付key',
    //   dataIndex: 'payKey',
    //   ellipsis: true,
    //   tooltip: {
    //     'background-color': '#3491FA',
    //   },
    // },
    // {
    //   width: 120,
    //   title: '支付通知地址',
    //   dataIndex: 'payNotifyUrl',
    //   ellipsis: true,
    //   tooltip: {
    //     'background-color': '#3491FA',
    //   },
    // },
    {
      title: '支付机构',
      dataIndex: 'paymentAgencyShortNameTitle',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    // {
    //   title: '支付退款通知地址',
    //   dataIndex: 'refundPayNotifyUrl',
    //   ellipsis: true,
    //   tooltip: {
    //     'background-color': '#3491FA',
    //   },
    // },
    // {
    //   title: '支付secret',
    //   dataIndex: 'secret',
    //   ellipsis: true,
    //   width: 120,
    //   tooltip: {
    //     'background-color': '#3491FA',
    //   },
    // },
    {
      title: '子商户appid',
      dataIndex: 'subAppid',
      ellipsis: true,
      width: 200,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '子商户号',
      dataIndex: 'subMchId',
      ellipsis: true,
      width: 200,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    // {
    //   title: '用户id',
    //   dataIndex: 'uid',
    // },
    {
      title: '使用场景',
      dataIndex: 'useScenesName',
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
      name: '',
      mchId: '',
    };
  };
  const getScene = (value: string) => {
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
  const formModel = ref(generateFormModel());

  onMounted(() => {
    getPaymentAgencyList();
    fetchData();
  });

  const getPaymentAgencyList = async () => {
    const { code, data } = await getPaymentAgencyListByQuery({
      params:{
        page: 1,
        size: 200,
      }
    })
    console.log(code,data);
    if(code === 10002){
      paymentAgencyList.value = data
    }else{
      paymentAgencyList.value = []
    }
  }

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
    await cfPaymentAgencyDelete({ params: { id } });
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
    const { data, code, total } = await cfPaymentAgencyGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        name: formModel.value.name,
        mchId: formModel.value.mchId,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      for (const i of data) {
        i.useScenesName = getScene(i.useScenes);
        for(const j of paymentAgencyList.value){
          // console.log(j);
          if(i.paymentAgencyShortName == j.paymentAgencyName){
            i.paymentAgencyShortNameTitle = j.name;
          }
        }
      }
      // @ts-ignore
      if (total) pagination.total = total;
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
