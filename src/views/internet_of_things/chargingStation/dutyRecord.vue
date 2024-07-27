<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      width="96%"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 值班记录 </template>
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
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    getDutyLogListByQuery,
    deleteShopAccountNumber,
  } from '@/api/internetOfThings';
  import { parseTime } from '@/utils';

  const visible = ref(false);
  const list = ref([]);
  const loading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const columns = [
    {
      title: '值班人',
      dataIndex: 'duterName',
    },
    {
      title: '开始值班时间',
      dataIndex: 'newStartDutyTime',
    },
    {
      title: '结束值班时间',
      dataIndex: 'newEndDutyTime',
    },
    {
      title: '关卡名称',
      dataIndex: 'checkPointName',
    },
    {
      title: '入场人工次数',
      dataIndex: 'inManualReleaseCounts',
    },
    {
      title: '出场人工次数',
      dataIndex: 'outManualReleaseCounts',
    },
    {
      title: '总收入',
      dataIndex: 'totalPay',
    },
    {
      title: '现金',
      dataIndex: 'cashPayCny',
    },
    {
      title: '微信小程序',
      dataIndex: 'weiXinMpPayCny',
    },
    {
      title: '微信APP',
      dataIndex: 'weiXinAppPayCny',
    },
    {
      title: '支付宝小程序',
      dataIndex: 'aliMpPayCny',
    },
    {
      title: '支付宝APP',
      dataIndex: 'aliAppPayCny',
    },
    {
      title: '储值卡',
      dataIndex: 'storedCardPayCny',
    },
    {
      title: '异常',
      dataIndex: 'abnormalPayment',
    },
    {
      title: '用户钱包',
      dataIndex: 'systemFundAccount',
    },
    {
      title: '优惠券',
      dataIndex: 'coupon',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   slotName: 'operations',
    // },
  ];
  const shopId = ref('');

  const onDelete = async (id: string) => {
    await deleteShopAccountNumber({ params: { id } });
    getList();
  };
  const handleClick = (e: any = null) => {
    shopId.value = e.id;
    visible.value = true;
    modalTitle.value = e.stationName;
    getList();
  };
  const convertNumberToText = (number: any) => {
    switch (number) {
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
  const getList = async () => {
    loading.value = true
    const { data, code, total } = await getDutyLogListByQuery({
      params:{
        areaId: shopId.value,
        page: 1,
        size: 200,
      }
    });
    loading.value = false

    if (code == 10002) {
      for (const i of data) {
        i.newStartDutyTime = parseTime(i.startDutyTime) || '-';
        i.newEndDutyTime = parseTime(i.endDutyTime) || '-';
        i.newScene = convertNumberToText(i.scene)
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
