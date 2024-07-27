<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 员工 </template>
      <a-button
        type="primary"
        size="mini"
        style="margin-bottom: 8px"
        @click="showEdit"
        >新增</a-button
      >
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
      v-model:visible="editVisible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
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
                    disabled
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="手机号"
                  field="phone"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.phone"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="员工名"
                  field="staffName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.staffName"
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
            <!-- <a-button @click="resetFields"> 重置 </a-button> -->
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
    getCouponActivityStaffListByQuery,
    deleteCouponActivityStaff,
    addCouponActivityStaff,
  } from '@/api/pay';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import { parseTime } from '@/utils';

  const visible = ref(false);
  const editVisible = ref(false);
  const list = ref([]);
  const loading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const columns = [
    {
      title: '员工名称',
      dataIndex: 'staffName',
    },
    {
      title: '今日发送金额',
      dataIndex: 'amountTodaySended',
    },
    {
      title: '24小时发送金额',
      dataIndex: 'amountHoursSended',
    },
    {
      title: '今日发送时长',
      dataIndex: 'timeTodaySended',
    },
    {
      title: '24小时发送时长',
      dataIndex: 'timeHoursSended',
    },
    {
      title: '今日发送次数',
      dataIndex: 'timesTodaySended',
    },
    {
      title: '24小时发送次数',
      dataIndex: 'timesHoursSended',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const generateFormModel = () => {
    return {
      couponActivityId: '',
      phone: '',
      staffAvatar: '',
      staffName: '',
    };
  };
  const formData = ref(generateFormModel());

  // 用于处理返回的字段 为 '0' 的情况
  const formatTime = (time: any) => {
    console.log(time, 'timeeeee');

    if (time === '0' || !time || time === '-') {
      return '';
    } else {
      return parseTime(time);
    }
  };
  const showEdit = () => {
    editVisible.value = true;
  };
  const onDelete = async (id: string) => {
    await deleteCouponActivityStaff({ params: { couponActivityStaffId: id } });
    getList();
  };
  const handleClick = (e: any = null, title: any) => {
    console.log(e);

    formData.value.couponActivityId = e;
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
    const { data, code, total } = await getCouponActivityStaffListByQuery({
      params: {
        couponActivityId: formData.value.couponActivityId,
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
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      const { code } = await addCouponActivityStaff(formData.value);
      if (code === 10002) {
        editVisible.value = false;
        Message.success('添加成功!');
        getList();
        // emit('fetchData');
      }
    });
  };
  const resetFields = () => {
    formData.value = {
      ...formData.value,
      phone: '',
      staffAvatar: '',
      staffName: '',
    };
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
