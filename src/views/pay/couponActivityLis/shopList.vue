<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 已绑定店铺 </template>
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
            <a-popconfirm content="您确定解绑吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >解绑</a-button
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
      <template #title> 新增店铺 </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-alert
          >店铺类型为停车场时,店铺搜索停车场名称。为充电时,搜索充电站名称。以此类推
          ...</a-alert
        >
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="优惠券活动id"
                  field="couponActivityId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.couponActivityId"
                    placeholder="请输入"
                    allow-clear
                    disabled
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="店铺类型">
                  <a-select placeholder="请输入" v-model="shopIdType">
                    <a-option :value="1">停车场</a-option>
                    <a-option :value="2" disabled>商城</a-option>
                    <a-option :value="3" disabled>充电</a-option>
                    <a-option :value="4" disabled>洗车</a-option>
                    <a-option :value="5" disabled>加油</a-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="店铺"
                  field="shopId"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.shopId"
                    :disabled="!shopIdType"
                  >
                    <a-option v-for="item of parkList" :value="item.id"
                      >{{ item.name }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="是否为主店铺"
                  field="mainShop"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.mainShop"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
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
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">通用</a-option>
                    <a-option :value="1">停车</a-option>
                    <a-option :value="2">商城</a-option>
                    <a-option :value="3">充电</a-option>
                    <a-option :value="4">洗车</a-option>
                    <a-option :value="5">加油</a-option>
                  </a-select>
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
    getCfCouponActivityLinkShopListByQuery,
    deleteCfCouponActivityLinkShop,
    addCfCouponActivityLinkShop,
  } from '@/api/pay';
  import { cfCarParkSearch } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import { parseTime } from '@/utils';

  const visible = ref(false);
  const visible2 = ref(false);
  const list = ref([]);
  const selectLoading = ref(false);
  const loading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'shopName',
    },
    {
      title: '店铺id',
      dataIndex: 'shopId',
    },
    {
      title: '场景',
      dataIndex: 'newScene',
    },
    {
      title: '是否为主店铺',
      dataIndex: 'newMainShop',
    },
    {
      title: '优惠券活动id',
      dataIndex: 'couponActivityId',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const formData = ref({
    couponActivityId: '',
    mainShop: '',
    scene: '',
    shopId: '',
  });
  const couponActivityId = ref('');
  const parkList = ref([]);
  const shopIdType = ref(1);
  
  // 弹窗内的事件
  const onShowEditModal = () => {
    formData.value.couponActivityId = couponActivityId.value;
    visible2.value = true;
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      const { code } = await addCfCouponActivityLinkShop(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible2.value = false;
        Message.success('添加成功!');
        getList()
        // emit('fetchData');
      }
    });
  };
  const handleSelectSearch = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfCarParkSearch({
        params: {
          name: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        parkList.value = data;
      } else {
        parkList.value = [];
      }
    } else {
      parkList.value = [];
    }
  };
  // end

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
    await deleteCfCouponActivityLinkShop({ params: { id } });
    getList();
  };
  const handleClick = (e: any = null, title: any) => {
    couponActivityId.value = e;
    visible.value = true;
    modalTitle.value = title;
    getList();
  };
  const convertNumberToText = (number: any) => {
    switch (number) {
      case 0:
        return '通用';
      case 1:
        return '停车';
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
  const getList = async () => {
    const { data, code, total } = await getCfCouponActivityLinkShopListByQuery({
      params: {
        couponActivityId: couponActivityId.value,
        page: 1,
        size: 200,
      },
    });
    if (code == 10002) {
      for (const i of data) {
        i.newScene = convertNumberToText(i.scene);
        i.newMainShop = { 0: '否', 1: '是' }[i.mainShop];
      }
      list.value = data;
    } else {
      list.value = [];
    }
  };

  const resetFields = () => {
    formData.value.id = '';
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
