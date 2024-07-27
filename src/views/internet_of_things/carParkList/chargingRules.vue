<template>
  <div class="container">
    <a-modal v-model:visible="visible" fullscreen :footer="false">
      <template #title> {{ parkName }} - 收费规则 </template>
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
                <a-button
                  type="primary"
                  size="mini"
                  @click="handleChild(record)"
                  >子级</a-button
                >
              </a-space>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-modal>

    <a-modal v-model:visible="visibleChild" :footer="false" width="800px">
      <template #title> {{ parkName }} - 子级 </template>
      <a-button
        type="primary"
        @click="handleChildAdd"
        style="margin-bottom: 16px"
      >
        <template #icon>
          <icon-plus />
        </template>
        新建
      </a-button>
      <a-table
        row-key="id"
        :columns="columns"
        :data="childList"
        :loading="loading"
      >
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onChildDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
            <a-button
              type="primary"
              size="mini"
              @click="handleChildEdit(record)"
              >编辑</a-button
            >
            <!-- <a-button type="primary" size="mini" @click="handleChild(record)"
              >子级</a-button
            > -->
          </a-space>
        </template>
      </a-table>
    </a-modal>

    <chargingRulesEdit
      ref="chargingRulesEditRef"
      @fetch-data="getchargingRuleList"
      :carTypeList="carTypeList"
    />
    <chargingRulesChildEdit
      ref="chargingRulesChildEditRef"
      @getChildList="getChildList"
      :carTypeList="carTypeList"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    getCarTypeListByQuery,
    chargingRuleGet,
    chargingRuleDelete,
  } from '@/api/park';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import chargingRulesEdit from './chargingRulesEdit.vue';
  import chargingRulesChildEdit from './chargingRulesChildEdit.vue';

  const visible = ref(false);
  const visibleChild = ref(false);
  const pid = ref('');
  const child_parking_id = ref('');

  const carTypeList = ref([]);
  const parkingId = ref('');
  const parkName = ref('');
  const list = ref([]);
  const childList = ref([]);
  const loading = ref(false);
  const flagKey = ref('');
  const chargingRulesEditRef = ref();
  const chargingRulesChildEditRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);

  const columns = [
    {
      title: '车辆类型',
      dataIndex: 'newCarType',
    },
    {
      title: '开始时间',
      dataIndex: 'startTimeString',
    },
    {
      title: '结束时间',
      dataIndex: 'endTimeTimeString',
    },
    {
      title: '实时单价',
      dataIndex: 'fee',
    },
    {
      title: '价格上限',
      dataIndex: 'feeUpperLimit',
    },
    {
      title: '价格类型',
      dataIndex: 'newType',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];

  // 对于子级的方法
  const onChildDelete = async (id: any) => {
    await chargingRuleDelete({ params: { id } });
    getChildList();
  };
  const handleChildEdit = (row: any) => {
    chargingRulesChildEditRef.value.handleClick(row);
  };
  const handleChildAdd = () => {
    chargingRulesChildEditRef.value.handleClick({
      parkingId: child_parking_id.value,
      flagKey: flagKey.value,
      pid: pid.value,
    });
  };
  const handleChild = (row: any) => {
    visibleChild.value = true;
    pid.value = row.id;
    child_parking_id.value = row.carParkId;
    getChildList();
  };
  const getChildList = async () => {
    const { data, code, message } = await chargingRuleGet({
      params: {
        carParkId: child_parking_id.value,
        pid: pid.value,
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      for (const i of data) {
        i.newCarType = getCarTypeName(i.carType);
        i.newType =
          i.type === 'unit_of_time'
            ? '单位时间'
            : i.type === 'each'
            ? '每次'
            : i.type === 'each_add'
            ? '每次累加'
            : '-';
      }
      childList.value = data;
    } else {
      childList.value = [];
    }
  };
  // 对于子级的方法 End

  const handleClick = (e: any = null, name: any) => {
    parkingId.value = e;
    parkName.value = name;
    getCarType();
    visible.value = true;
  };
  const tabsChange = (e: any) => {
    flagKey.value = e;
    getchargingRuleList();
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
  const handleAdd = () => {
    chargingRulesEditRef.value.handleClick({
      parkingId: parkingId.value,
      flagKey: flagKey.value,
    });
  };
  const onDelete = async (id: any) => {
    await chargingRuleDelete({ params: { id } });
    getchargingRuleList();
  };
  const handleEdit = (row: any) => {
    chargingRulesEditRef.value.handleClick(row);
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
      getchargingRuleList();
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

  const getchargingRuleList = async () => {
    const { data, code, message } = await chargingRuleGet({
      params: {
        carType: flagKey.value,
        carParkId: parkingId.value,
        page: 1,
        size: 200,
        pid: 0
      },
    });
    if (code === 10002) {
      for (const i of data) {
        i.newCarType = getCarTypeName(i.carType);
        // i.newStartTime = getTimeText(i.startTime);
        // i.newEndTime = getTimeText(i.endTime);
        i.newType =
          i.type === 'unit_of_time'
            ? '单位时间'
            : i.type === 'each'
            ? '每次'
            : i.type === 'each_add'
            ? '每次累加'
            : '-';
      }
      list.value = data;
    } else {
      list.value = [];
      // @ts-ignore
      // Message.error(message);
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
