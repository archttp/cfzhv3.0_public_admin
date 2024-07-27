<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.pay', 'menu.pay.coupon', 'menu.pay.coupon.couponlist']"
    />
    <a-card class="general-card" :title="$t('menu.pay.coupon.couponlist')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 10 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="赠送人手机号" field="fromUid">
                  <a-select
                    v-model="formModel.fromUid"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="发券人手机号"
                    allow-search
                    :filter-option="false"
                    :allow-clear="true"
                    @search="handleFromSearch"
                  >
                    <a-option
                      v-for="item of fromUserList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.userName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="接收人手机号" field="toUid">
                  <a-select
                    v-model="formModel.toUid"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="接收人或领券人手机号"
                    allow-search
                    :allow-clear="true"
                    :filter-option="false"
                    @search="handleToSearch"
                  >
                    <a-option
                      v-for="item of toUserList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.userName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="使用场景"
                  field="scenes"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formModel.scenes"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in scenesArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="状态"
                  field="status"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formModel.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in statusArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="券类型"
                  field="couponType"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formModel.couponType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in couponTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="targetObject"
                  label="作用对象"
                >
                  <a-input
                    v-model="formModel.targetObject"
                    placeholder="例如：车牌号/手机号"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="发券商铺" field="couponActivityId">
                  <a-select
                    v-model="formModel.couponActivityId"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="优惠券活动店铺名称搜索"
                    allow-search
                    :allow-clear="true"
                    :filter-option="false"
                    @search="handleCouponActivitySearch"
                  >
                    <a-option
                      v-for="item of couponActivityList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.title }}</a-option
                    >
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
      <!-- <a-row style="margin-bottom: 16px">
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
      </a-row> -->
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
        <!-- <template #operations="{ record }">
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
        </template> -->
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getCouponListByQuery, quicklySearchCouponActivity } from '@/api/pay';
  import editAdd from './editAdd.vue';
  import { cfUserQuicklySearchUser } from '@/api/user';
  import { parseTime } from '@/utils/index';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const fromUserList = ref([]);
  const toUserList = ref([]);
  const couponActivityList = ref([]);
  const columns = [
    {
      title: '发券店铺名',
      dataIndex: 'couponActivityName',
    },
    {
      title: '发券人',
      dataIndex: 'fromUserName',
    },
    {
      title: '收/领券人',
      dataIndex: 'toUserName',
    },
    {
      title: '优惠券类型',
      dataIndex: 'newCouponType',
    },
    {
      title: '已用额',
      dataIndex: 'amountUsed',
    },
    {
      title: '退回额',
      dataIndex: 'refundAmount',
    },
    {
      title: '使用场景',
      dataIndex: 'newScenes',
    },
    {
      title: '状态',
      dataIndex: 'newStatus',
    },
    {
      title: '面值',
      dataIndex: 'newDenomination',
    },
    {
      title: '目标对象',
      dataIndex: 'targetObject',
    },
    {
      title: '发放时间',
      dataIndex: 'newCreateTime',
    },
    {
      title: '生效时间',
      dataIndex: 'newEffectiveTime',
    },
    {
      title: '失效时间',
      dataIndex: 'newExpireTime',
    },
    {
      title: '使用时间',
      dataIndex: 'newUseTime',
    },
  ];
  const scenesArr = [
    { value: 0, label: '人脸门禁' },
    { value: 1, label: '停车场' },
    { value: 2, label: '商城' },
    { value: 3, label: '充电' },
    { value: 4, label: '洗车' },
    { value: 5, label: '加油' },
  ];
  //0-已使用/1-未使用2-锁定
  const statusArr = [
    { value: 0, label: '已使用' },
    { value: 1, label: '未使用' },
    { value: 2, label: '锁定' },
  ];
  //1-次数券/2-金额券/3-时长券
  const couponTypeArr = [
    { value: 1, label: '次数券' },
    { value: 2, label: '金额券' },
    { value: 3, label: '时长券' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      fromUid: '',
      toUid: '',
      scenes: '',
      shopId: '',
      goodsId: '',
      status: '',
      couponType: '',
      couponActivityId: '',
      targetObject: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });

  const handleFromSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      fromUserList.value = data;
    } else {
      fromUserList.value = [];
    }
  };
  const handleToSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      toUserList.value = data;
    } else {
      toUserList.value = [];
    }
  };
  const handleCouponActivitySearch = async (value: any) => {
    const { data, code } = await quicklySearchCouponActivity({
      params: {
        title: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      couponActivityList.value = data;
    } else {
      couponActivityList.value = [];
    }
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
    // await cfDepartmentDelete({ params: { id } });
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
  const getCouponDenomination = (num, type) => {
    switch (type) {
      case 1:
        return num + '次数券';
      case 2:
        return '¥' + num + '金额券';
      case 3:
        return num + '小时时长券';
      default:
        return '无效类型';
    }
  };

  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case 0:
        return '通用';
      case 1:
        return '停车场';
      case 2:
        return '商城';
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
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return '已使用';
      case 1:
        return '未使用';
      case 2:
        return '锁定';
      default:
        return '未知类型';
    }
  };

  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getCouponListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        fromUid: formModel.value.fromUid,
        toUid: formModel.value.toUid,
        scenes: formModel.value.scenes,
        shopId: formModel.value.shopId,
        goodsId: formModel.value.goodsId,
        status: formModel.value.status,
        couponType: formModel.value.couponType,
        couponActivityId: formModel.value.couponActivityId,
        targetObject: formModel.value.targetObject,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newStatus = getStatusText(i.status);
        i.newScenes = getCategoryName(i.scenes);
        i.newCouponType = getTicketType(i.couponType);
        i.newDenomination = getCouponDenomination(i.denomination, i.couponType);
        i.newCreateTime = parseTime(i.createTime);
        i.newEffectiveTime = parseTime(i.effectiveTime);
        i.newExpireTime = parseTime(i.expireTime);
        i.newUseTime = parseTime(i.useTime);
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
