<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 优惠券类型 </template>
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
      <template #title> 新增类型 </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
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
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="优惠券类型"
                  field="couponType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.couponType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">次数券</a-option>
                    <a-option :value="2">金额券</a-option>
                    <a-option :value="3">时长券</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="面额"
                  field="denomination"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.denomination"
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
    getCouponActivityCouponTypeListByQuery,
    deleteCouponActivityCouponType,
    addCouponActivityCouponType,
  } from '@/api/pay';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import { parseTime } from '@/utils';

  const visible = ref(false);
  const visible2 = ref(false);
  const list = ref([]);
  const loading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const columns = [
    {
      title: '优惠券类型',
      dataIndex: 'newCouponType',
    },
    {
      title: '面值',
      dataIndex: 'denomination',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const formData = ref({
    couponActivityId: '',
    couponType: '',
    denomination: '',
  });
  const couponActivityId = ref('');

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
      const { code } = await addCouponActivityCouponType(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible2.value = false;
        Message.success('添加成功!');
        getList();
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
    await deleteCouponActivityCouponType({
      params: { couponActivityCouponTypeId: id },
    });
    getList();
  };
  const handleClick = (e: any = null, title: any) => {
    couponActivityId.value = e;
    visible.value = true;
    modalTitle.value = title;
    getList();
  };
  const couponTypeToText = (typeNumber: any) => {
    const textMap = {
      1: '次数券',
      2: '金额券',
      3: '时长券',
    };
    // @ts-ignore
    return textMap[typeNumber] || '未知券类型';
  };
  const getList = async () => {
    const { data, code, total } = await getCouponActivityCouponTypeListByQuery({
      params: {
        couponActivityId: couponActivityId.value,
        page: 1,
        size: 200,
      },
    });
    if (code == 10002) {
      for (const i of data) {
        i.newCouponType = couponTypeToText(i.couponType);
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
