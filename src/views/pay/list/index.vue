<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.pay', 'menu.pay.order', 'menu.pay.order.list']"
    />
    <a-card class="general-card" :title="$t('menu.pay.order.list')">
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
                <a-form-item
                  field="id"
                  label="订单号"
                >
                  <a-input
                    v-model="formModel.id"
                    placeholder="请输入订单id"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="goodsId"
                  label="商品id"
                >
                  <a-input
                    v-model="formModel.goodsId"
                    placeholder="请输入商品id"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="effectObject"
                  label="作用对象"
                >
                  <a-input
                    v-model="formModel.effectObject"
                    placeholder="请输入作用对象"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="goodsType" label="商品类型">
                  <a-select
                    v-model="formModel.goodsType"
                    :options="goodsTypeOptions"
                    placeholder="请选择商品类型"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="支付状态">
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    placeholder="请选择支付状态"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col  :span="8">
                <a-form-item label="下单用户" field="uid">
                  <a-select v-model="formModel.uid" :loading="loading" placeholder="手机号搜索" allow-search :allow-clear=true
                    :filter-option="false" @search="handleSearch">
                    <a-option v-for="item of userList" :key="item?.id" :value="item?.id">{{ item.userName }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="paymentAgencyShortName" label="支付机构">
                  <a-select
                    v-model="formModel.paymentAgencyShortName"
                    placeholder="请选择支付机构"
                    allow-clear
                  >
                    <a-option v-for="paymentAgency in paymentAgencyList" :key="paymentAgency.paymentAgencyName" :value="paymentAgency.paymentAgencyName">
                        {{ paymentAgency.name }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
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
      >
        <template #operations="{ record }">
          <a-space>
            <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
              <a-doption>
                <a-space @click="orderRefund(record)">
                  <icon-edit />
                  <span> 退款 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
          </a-space>
        </template>
      </a-table>
    </a-card>


    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        警告：您正在进行退款操作，请仔细确认和谨慎操作，一旦退款，无法追回！
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="订单号"
                  field="orderId"
                  validate-trigger="input"
                  required
                  disabled
                >
                  <a-input
                    v-model="formData.orderId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="退款金额"
                  field="refundAmount"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.refundAmount"
                    placeholder="请输入不小于0.01的退款金额"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="退款原因"
                  field="refundReason"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.refundReason"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-space>
        <div class="actions">
          <a-space>
            <a-button @click="resetFields"> 重置 </a-button>
            <a-button type="primary" :loading="loading" @click="onSubmitClick">
              确认退款
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { cfOrderGet, getPaymentAgencyListByQuery, refund } from '@/api/pay';
  import { parseTime } from '@/utils/index';
  import { cfUserQuicklySearchUser } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const visible = ref(false);
  const loading = ref(false);
  const userList = ref([]);
  const paymentAgencyList = ref([]);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    id: '',
    orderId: '',
    refundAmount: '',
    refundReason: '',
  });
  const resetFields = () => {
    formData.value.id = '';
    formData.value.orderId = '';
    formData.value.refundAmount = '';
    formData.value.refundReason = '';
    formRef.value.resetFields();
  };
  const columns = [
    {
      title: '单号',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '商品类型',
      dataIndex: 'newGoodsType',
    },
    {
      title: '应付金额',
      dataIndex: 'amountsPayable',
    },
    {
      title: '实付金额',
      dataIndex: 'amountActuallyPaid',
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
    },
    {
      title: '券抵扣',
      dataIndex: 'couponPaid',
    },
    {
      title: '数量',
      dataIndex: 'purchaseQuantity',
    },
    {
      title: '币种',
      dataIndex: 'currencyType',
    },
    {
      title: '支付机构',
      dataIndex: 'paymentAgencyShortNameTitle',
    },
    {
      title: '订单状态',
      dataIndex: 'newStatus',
    },
       {
      title: '创建时间',
      dataIndex: 'newCreateTime',
    },
    {
      title: '支付时间',
      dataIndex: 'newPayTime',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const goodsTypeOptions = [
    {
      label: '停车',
      value: 1,
    },
    {
      label: '充值',
      value: 2,
    },
    {
      label: '洗车',
      value: 3,
    },
    {
      label: '转账',
      value: 4,
    },
    {
      label: '停车套餐',
      value: 5,
    },
    {
      label: '车位预订',
      value: 6,
    },
    {
      label: '优惠券活动充值',
      value: 7,
    },
    {
      label: '汽车充电',
      value: 8,
    },
    {
      label: '提现',
      value: 9,
    },
    {
      label: '退款',
      value: 10,
    },
    {
      label: '收款',
      value: 11,
    },
    {
      label: '电动车充电',
      value: 12,
    },
    {
      label: '用户角色',
      value: 13,
    }
  ];
  const statusOptions = [
    {
      label: '待支付',
      value: 0,
    },
    {
      label: '已支付',
      value: 1,
    },
    {
      label: '已发货',
      value: 2,
    },
    {
      label: '已取消',
      value: 3,
    },
    {
      label: '退款中',
      value: 4,
    },
    {
      label: '已退款',
      value: 5,
    },
    {
      label: '退货中',
      value: 6,
    },
    {
      label: '已退货',
      value: 7,
    },
    {
      label: '交易成功',
      value: 8,
    },
    {
      label: '售后中',
      value: 9,
    },
    {
      label: '售后已结束',
      value: 10,
    }
  ];
  const state = reactive({
    list: [],
  });
  const reset = () => {
    formModel.value = generateFormModel();
  };
  const generateFormModel = () => {
    return {
      goodsId: '',
      effectObject: '',
      goodsType: '',
      status: '',
      uid: '',
      paymentAgencyShortName: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    getPaymentAgencyList();
    fetchData();
  });

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const search = () => {
    fetchData();
  };
  const onSubmitClick = () => {
    visible.value = true;
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      console.log('申请数据',formData.value);
      const { code } = await refund(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('退款成功!');
        fetchData();
      }
    });
  };
  const orderRefund = (row: any) => {
    if(row.status!=1){
      Message.warning('本订单不能退款!');
    }else{
      formData.value.orderId = row.id;
      onSubmitClick();
      console.log('订单数据', row);
    }
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
  const getStatusName = (value: any) => {
    let text = '';
    switch (value) {
      case 0:
        text = '待支付';
        break;
      case 1:
        text = '已支付';
        break;
      case 2:
        text = '已发货';
        break;
      case 3:
        text = '已取消';
        break;
      case 4:
        text = '退款中';
        break;
      case 5:
        text = '已退款';
        break;
      case 6:
        text = '退货中';
        break;
      case 7:
        text = '已退货';
        break;
      case 8:
        text = '交易成功';
        break;
      case 9:
        text = '售后中';
        break;
      case 10:
        text = '售后已结束';
        break;
      default:
        text = '';
        break;
    }
    return text;
  };
  const getGoodTypeName = (value: any) => {
    let text = '';
    switch (value) {
      case 1:
        text = '停车';
        break;
      case 2:
        text = '充值';
        break;
      case 3:
        text = '洗车';
        break;
      case 4:
        text = '转账';
        break;
      case 5:
        text = '停车套餐';
        break;
      case 6:
        text = '车位预订';
        break;
      case 7:
        text = '优惠券活动充值';
        break;
      case 8:
        text = '汽车充电';
        break;
      case 9:
        text = '提现';
        break;
      case 10:
        text = '退款';
        break;
      case 11:
        text = '收款';
        break;
      case 12:
        text = '电动车充电';
        break;
      case 13:
        text = '用户角色';
        break;
      default:
        text = '';
        break;
    }
    return text;
  };

  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await cfOrderGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        goodsId: formModel.value.goodsId,
        effectObject: formModel.value.effectObject,
        goodsType: formModel.value.goodsType,
        status: formModel.value.status,
        uid: formModel.value.uid,
        paymentAgencyShortName: formModel.value.paymentAgencyShortName,
        id: formModel.value.id,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const i of data) {
        i.newStatus = getStatusName(i.status);
        i.newGoodsType = getGoodTypeName(i.goodsType);
        i.newPayTime = parseTime(i.payTime);
        i.newCreateTime = parseTime(i.createTime);
        for(const j of paymentAgencyList.value){
          // console.log(j);
          if(i.paymentAgencyShortName == j.paymentAgencyName){
            i.paymentAgencyShortNameTitle = j.name;
          }
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
