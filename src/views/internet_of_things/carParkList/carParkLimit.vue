<template>
  <div class="container">
    <a-modal v-model:visible="visible" fullscreen :footer="false">
      <template #title> {{ parkName }} - 车辆限制 </template>
      <a-tabs trigger="click" @change="tabsChange">
        <a-tab-pane
          :title="item.name"
          v-for="item in carTypeList"
          :key="item.flagKey"
        >
          <a-button
            type="primary"
            @click="handleAdd"
            style="margin-bottom: 16px"
          >
            <template #icon>
              <icon-plus />
            </template>
            新建
          </a-button>
          <a-popconfirm content="您确定恢复所有默认显示配置吗？" @ok="setDefaultCarParkCarLimit()">
            <a-button type="primary" status="danger" size="mini"
              >恢复(使用)默认配置</a-button
            >
          </a-popconfirm>
          <a-table
            row-key="id"
            :columns="columns"
            :data="list"
            :loading="loading"
          >
            <template #operations="{ record }">
              <a-space>
                <a-popconfirm
                  content="您确定删除吗？"
                  @ok="onDelete(record.id)"
                >
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
        </a-tab-pane>
      </a-tabs>
    </a-modal>
    <carParkLimitEditAdd ref="carParkLimitEditAddRef"  @fetch-data="getCarParkCarLimitList" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    getCarTypeListByQuery,
    setParkDefaultCarParkCarLimit,
  } from '@/api/park';
  import { getCarParkCarLimitListByQuery, deleteCarParkCarLimit } from '@/api/internetOfThings';
  import dayjs from 'dayjs';
  import carParkLimitEditAdd from './carParkLimitEditAdd.vue';

  const visible = ref(false);
  const carParkLimitEditAddRef = ref();

  const carTypeList = ref([]);
  const parkingId = ref('');
  const parkName = ref('');
  const list = ref([]);
  const loading = ref(false);
  const flagKey = ref('');
  const emit = defineEmits(['fetchData', 'fetch-data']);

  const columns = [
    {
      title: '停车场名称',
      dataIndex: 'carParkName',
    },
    {
      title: '收费模式',
      dataIndex: 'newBillingModel',
    },
    {
      title: '免停时间(分钟)',
      dataIndex: 'newFreeTime',
    },
    {
      title: '入场自动开闸',
      dataIndex: 'newAutoOpenDoor',
    },
    {
      title: '禁止入场',
      dataIndex: 'newForbidIn',
    },
    {
      title: '禁止出场',
      dataIndex: 'newForbidOut',
    },
    {
      title: '免费放行',
      dataIndex: 'newFreeRelease',
    },
    {
      title: '赠送免停时间',
      dataIndex: 'newGiveFreeTime',
    },
    {
      title: '模板',
      dataIndex: 'newTemplate',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];

  const handleClick = (e: any = null, name: any) => {
    parkingId.value = e;
    parkName.value = name;
    getCarType();
    visible.value = true;
  };
  const tabsChange = (e: any) => {
    flagKey.value = e;
    getCarParkCarLimitList();
  };
  const getTimeText = (time: number) => {
    if (time != null) {
      return dayjs(dayjs().startOf('month').valueOf() + time).format(
        'HH:mm:ss'
      );
    } else {
      return '-';
    }
  };
  const setDefaultCarParkCarLimit = async () => {
    const { data, code, total } = await setParkDefaultCarParkCarLimit({
      params: {
        id: parkingId.value,
      },
    });
    if (code == 10002) {
      getCarParkCarLimitList();
    } else {
    }
  };
  const handleAdd = () => {
    carParkLimitEditAddRef.value.handleClick(parkingId.value, parkName.value, flagKey.value);
  };
  const onDelete = async (id: any) => {
    await deleteCarParkCarLimit({ params: { id } });
    getCarParkCarLimitList();
  };
  const handleEdit = (row: any) => {
    carParkLimitEditAddRef.value.handleEdit(row);
  };
  const getCarType = async () => {
    const { data, code, message } = await getCarTypeListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      flagKey.value = data[0].flagKey;
      carTypeList.value = data;
      getCarParkCarLimitList();
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };

  const getCarTypeName = (key: string) => {
    // @ts-ignore
    const findRes: any = carTypeList.value.find((i) => i.flagKey === key);
    return findRes.name;
  };

  const getCarParkCarLimitList = async () => {
    const { data, code, message } = await getCarParkCarLimitListByQuery({
      params: {
        carTypeKey: flagKey.value,
        carParkId: parkingId.value,
        page: 1,
        size: 200
      },
    });
    if (code === 10002) {
      for (const i of data) {
        i.newFreeTime = !i.freeTime ? '-' : i.freeTime / 60000;
        i.newBillingModel = getOptionText(i.billingModel);
        i.newAutoOpenDoor = { 0: '否', 1: '是' }[i.autoOpenDoor];
        i.newForbidIn = { 0: '否', 1: '是' }[i.forbidIn];
        i.newForbidOut = { 0: '否', 1: '是' }[i.forbidOut];
        i.newFreeRelease = { 0: '否', 1: '是' }[i.freeRelease];
        i.newGiveFreeTime = { 0: '否', 1: '是' }[i.giveFreeTime];
        i.newTemplate = { 0: '否', 1: '是' }[i.template];
      }
      list.value = data;
    } else {
      list.value = [];
      // @ts-ignore
      // Message.error(message);
    }
  };

  const getOptionText = (value) => {
    switch (value) {
      case 'dynamic_time':
        return '动态时间计费';
      case 'fixed_time':
        return '固定时长计费';
      case 'dynamic_fixed_time':
        return '动态时间按段时长计费';
      case 'dynamic_time_upper_limit':
        return '每天指定最高费用';
      case 'static_time_upper_limit':
        return '限时指定最高费用';
      default:
        return '';
    }
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
