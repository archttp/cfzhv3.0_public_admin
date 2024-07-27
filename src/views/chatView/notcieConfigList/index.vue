<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.chat',
        'menu.chat.message',
        'menu.chat.message.NotcieConfigList',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.chat.message.NotcieConfigList')">
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
                <a-form-item field="shopId" label="店铺id">
                  <a-input
                    v-model="formModel.shopId"
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
  import {
    getNoticeSettingListByQuery,
    deleteNoticeSetting,
  } from '@/api/chatApi';
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
      title: '店铺id',
      dataIndex: 'shopId',
    },
    {
      title: '资源id',
      dataIndex: 'sourceId',
    },
    {
      title: '通知平台',
      dataIndex: 'newNoticePlatform',
    },
    {
      title: '通知类型',
      dataIndex: 'newNoticeType',
    },
    {
      title: '使用场景',
      dataIndex: 'newScene',
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
      shopId: '',
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
    await deleteNoticeSetting({ params: { id } });
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

  const getNoticePlatformText = (value: any) => {
    switch (value) {
      case 1:
        return '微信公众号';
      case 2:
        return '微信小程序';
      case 3:
        return '系统消息';
      case 4:
        return '阿里小程序';
      case 5:
        return '阿里生活号';
      case 6:
        return '短信';
      default:
        return '未知';
    }
  };
  const getNoticeTypeText = (notificationCode) => {
    switch (notificationCode) {
      case 1:
        return '停车套餐到期通知';
      case 2:
        return '停车套餐续费成功通知';
      case 3:
        return '车辆审核通知';
      case 4:
        return '收款账号申请通知';
      case 5:
        return '车辆入场通知';
      case 6:
        return '车辆出场通知';
      case 7:
        return '开始充电通知';
      case 8:
        return '充电结束通知';
      case 9:
        return '预约到访审核通知';
      case 10:
        return '停车追缴通知';
      case 11:
        return '会员到期通知';
      case 12:
        return '会员续费成功通知';
      case 13:
        return '物业费欠费通知';
      case 14:
        return '物业费缴费成功通知';
      case 15:
        return '上门报修下单通知';
      case 16:
        return '上门报修接单通知';
      default:
        return '未知通知';
    }
  };
  const getScenarioText = (scenarioCode) => {
    switch (scenarioCode) {
      case 0:
        return '通用';
      case 1:
        return '停车场';
      case 2:
        return '商城景';
      case 3:
        return '充电';
      case 4:
        return '洗车';
      case 5:
        return '加油';
      default:
        return '未知';
    }
  };

  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getNoticeSettingListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        shopId: formModel.value.shopId,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newNoticePlatform = getNoticePlatformText(i.noticePlatform);
        i.newNoticeType = getNoticeTypeText(i.noticeType);
        i.newScene = getScenarioText(i.scene);
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
