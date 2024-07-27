<template>
  <div class="container">
    <Breadcrumb :items="['menu.pay', 'menu.pay.coupon', 'menu.pay.coupon.activitylis']" />
    <a-card class="general-card" :title="$t('menu.pay.coupon.activitylis')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="title" label="活动标题">
                  <a-input v-model="formModel.title" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="phone" label="手机号">
                  <a-input v-model="formModel.phone" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="活动状态" field="activityStatus">
                  <a-select v-model="formModel.activityStatus" placeholder="请选择活动状态" allow-clear>
                    <a-option :value="0">暂停</a-option>
                    <a-option :value="1">正常</a-option>
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
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table row-key="id" :columns="columns" :data="state.list" :style="{ height: '700px' }" :pagination="pagination"
        :loading="loading" @page-change="pageChange">
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
              <a-doption>
                <a-space @click="handleEdit(record)">
                  <icon-edit />
                  <span> 编辑 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onDelete(record.id)">
                  <icon-delete />
                  <span> 删除 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowShop(record)">
                  <icon-list />
                  <span> 店铺 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowType(record)">
                  <icon-list />
                  <span> 优惠券类型 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="onShowAccountNumber(record)">
                  <icon-list />
                  <span> 收款账号 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="handleStaff(record)">
                  <icon-user />
                  <span> 员工 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="handleTransfer(record)">
                  <icon-user />
                  <span> 转让 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <shopList ref="shopListRef" @fetch-data="fetchData" />
    <typeList ref="typeListRef" @fetch-data="fetchData" />
    <accountNumber ref="accountNumberRef" />
    <staff ref="staffRef" />
    <activitytransfer ref="activitytransferRef" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import {
  getCouponActivityListByQuery,
  deleteCouponActivity,
} from '@/api/pay';
import editAdd from './editAdd.vue';
import shopList from './shopList.vue';
import typeList from './typeList.vue';
import accountNumber from './accountNumber.vue';
import activitytransfer from './activitytransfer.vue';
import staff from './staff.vue';

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref(false);
const editAddRef = ref();
const shopListRef = ref();
const activitytransferRef = ref();
const typeListRef = ref();
const accountNumberRef = ref();
const staffRef = ref();
const columns = [
  {
    title: '活动标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'newActivityStatus',
  },
  {
    title: '优惠券类型',
    dataIndex: 'newCouponType',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '类型',
    dataIndex: 'newType',
  },
  {
    title: '行业',
    dataIndex: 'tradeType',
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
    title: '',
    activityStatus: '',
    phone: '',
  };
};
const formModel = ref(generateFormModel());

onMounted(() => {
  fetchData();
});
const handleStaff = (row: any) => {
  staffRef.value.handleClick(row.id, row.title);
};
const onShowAccountNumber = (row: any) => {
  accountNumberRef.value.handleClick(row.id, row.title);
};
const onShowType = (item: any) => {
  typeListRef.value.handleClick(item.id, item.title);
};
const onShowShop = (item: any) => {
  shopListRef.value.handleClick(item.id, item.title);
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
  await deleteCouponActivity({ params: { id } });
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
const convertNumberToText = (number) => {
  switch (number) {
    case 0:
      return '通用';
    case 1:
      return '停车场';
    case 2:
      return '传统商城';
    case 3:
      return '充电';
    default:
      return '未知';
  }
};

const getTicketType = (ticketCode) => {
  switch (ticketCode) {
    case 1:
      return '次数券';
    case 2:
      return '金额券';
    case 3:
      return '时长券';
    default:
      return '未知类型';
  }
};
const handleTransfer = (row: any) => {
  activitytransferRef.value.handleClick(row)
};
const fetchData = async () => {
  loading.value = true;
  // @ts-ignore
  const { data, code, total } = await getCouponActivityListByQuery({
    params: checkParams({
      page: pagination.current,
      size: pagination.pageSize,
      title: formModel.value.title,
      phone: formModel.value.phone,
      activityStatus: formModel.value.activityStatus,
    }),
  });
  loading.value = false;
  if (code === 10002) {
    // @ts-ignore
    if (total) pagination.total = total;
    for (const i of data) {
      i.newActivityStatus = { 0: '暂停', 1: '正常' }[i.activityStatus] || '-';
      i.newCouponType = getTicketType(i.couponType);
      i.newType = convertNumberToText(i.type);
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
