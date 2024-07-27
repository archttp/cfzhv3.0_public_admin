<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 已绑定收款账号 </template>
      <a-button
        type="primary"
        @click="onShowEditModal"
        style="margin-bottom: 16px"
      >
        新增
      </a-button>
      <a-table
        row-key="id"
        :columns="columns"
        :data="list"
        :style="{ height: '700px' }"
        :loading="loading"
      >
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template></a-table
      >
    </a-modal>

    <a-modal
      v-model:visible="visible2"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> 新增收款账号 </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="店铺id"
                  field="shopId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.shopId"
                    placeholder="请输入"
                    disabled
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="场景"
                  field="scene"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.scene"
                    disabled
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="carpark">停车</a-option>
                    <a-option value="charge">充电</a-option>
                    <a-option value="coupon_activity">优惠券活动</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="收款账号"
                  field="userPaymentAgencyId"
                  required
                >
                  <a-select
                    :loading="selectLoading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.userPaymentAgencyId"
                  >
                    <a-option
                      v-for="item of userPaymentAgencyList"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                  <!-- <a-input-number v-model="formData.carParkId" allow-clear /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="开票商品编码"
                  field="invoiceGoodsCode"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.invoiceGoodsCode"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="特殊票种标志"
                  field="invoiceSpecialMark"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.invoiceSpecialMark"
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
              保存
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    getShopAccountNumberListByQuery,
    deleteShopAccountNumber,
    addShopAccountNumber,
  } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import { parseTime } from '@/utils';
  import { cfPaymentAgencyGet } from '@/api/pay';

  const visible = ref(false);
  const visible2 = ref(false);
  const list = ref([]);
  const loading = ref(false);
  const selectLoading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const columns = [
    {
      title: '机构名称',
      dataIndex: 'userPaymentAgencyName',
    },
    {
      title: '场景',
      dataIndex: 'newScene',
    },
    {
      title: '开票商品编码',
      dataIndex: 'invoiceGoodsCode',
    },
    {
      title: '特殊票种标志',
      dataIndex: 'invoiceSpecialMark',
    },
    {
      title: '平台',
      dataIndex: 'platform',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const formData = ref({
    scene: 'carpark',
    shopId: '',
    userPaymentAgencyId: '',
    invoiceGoodsCode: '',
    invoiceSpecialMark: '',
  });
  const userPaymentAgencyList = ref([]);
  const shopId = ref('');

  // 编辑窗口事件
  const onShowEditModal = () => {
    formData.value.shopId = shopId.value;
    visible2.value = true;
  };
  const handleSelectSearch = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfPaymentAgencyGet({
        params: {
          name: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        userPaymentAgencyList.value = data;
      } else {
        userPaymentAgencyList.value = [];
      }
    } else {
      userPaymentAgencyList.value = [];
    }
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      const { code } = await addShopAccountNumber(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible2.value = false;
        Message.success('添加成功!');
        getList();
        // emit('fetchData');
      }
    });
  };

  // 用于处理返回的字段 为 '0' 的情况
  const formatTime = (time: any) => {
    console.log(time, 'timeeeee');

    if (time === '0' || !time || time === '-') {
      return '';
    } else {
      return parseTime(time);
    }
  };
  const onDelete = async (id: string) => {
    await deleteShopAccountNumber({ params: { id } });
    getList();
  };
  const handleClick = (e: any = null, title: any) => {
    console.log(e, 111);

    shopId.value = e;
    visible.value = true;
    modalTitle.value = title;
    getList();
  };
  const convertNumberToText = (number: any) => {
    switch (number) {
      case 'carpark':
        return '停车';
      case 'charge':
        return '充电';
      case 'coupon_activity':
        return '优惠券活动';
      default:
        return '未知';
    }
  };
  const getList = async () => {
    const { data, code, total } = await getShopAccountNumberListByQuery({
      params: {
        shopId: shopId.value,
        scene: 'carpark',
        page: 1,
        size: 200,
      },
    });
    if (code == 10002) {
      for (const i of data) {
        i.newScene = convertNumberToText(i.scene);
      }
      list.value = data;
    } else {
      list.value = [];
    }
  };

  const resetFields = () => {
    formRef.value.resetFields();
  };

  defineExpose({ handleClick });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
</style>
