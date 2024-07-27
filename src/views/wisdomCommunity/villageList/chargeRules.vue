<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title>
        {{ villageName + ' - 收费规则' }}
      </template>
      <a-button type="primary" @click="handleAdd" style="margin-bottom: 16px">
        <template #icon>
          <icon-plus />
        </template>
        添加
      </a-button>
      <a-table row-key="id" :columns="columns" :data="state.list" :style="{ height: '700px' }" :pagination="pagination"
        :loading="loading" @page-change="pageChange">
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini">删除</a-button>
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template>
      </a-table>

    </a-modal>
    <a-modal v-model:visible="editVisible" draggable :width="800" :footer="false" @close="resetFields">
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="楼栋" field="buildingId" validate-trigger="input" required>
                  <a-select v-model="formData.buildingId" placeholder="请选择" allow-clear>
                    <a-option :value="item.id" v-for="item in buildingList" :key="item.id">{{ item.name }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时长单位" field="durationUnit" validate-trigger="input" required>
                  <a-select v-model="formData.durationUnit" placeholder="请选择" allow-clear>
                    <a-option value="day">天</a-option>
                    <a-option value="month">月</a-option>
                    <a-option value="year">年</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="价格" field="price" validate-trigger="input" required>
                  <a-input v-model="formData.price" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="收费规则名称" field="ruleName" validate-trigger="input" required>
                  <a-input v-model="formData.ruleName" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="滞纳金日利率" field="dailyInterestRateOfLateFee">
                  <a-input v-model="formData.dailyInterestRateOfLateFee" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="宽限期" field="gracePeriod">
                  <a-input v-model="formData.gracePeriod" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="楼栋单元" field="unit">
                  <a-input v-model="formData.unit" placeholder="请输入" allow-clear></a-input>
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
import { ref, reactive } from 'vue';
import { getPropertyFeeStandardListByQuery, getBuildingListByQuery, updatePropertyFeeStandard, addPropertyFeeStandard,deletePropertyFeeStandard } from '@/api/wisdomCommunity';
import { Message } from '@arco-design/web-vue';

const visible = ref(false);
const editVisible = ref(false);
const loading = ref(false);
const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const state = reactive({
  list: [],
});
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const columns = [
  {
    title: '小区名称',
    dataIndex: 'villageName',
  },
  {
    title: '楼栋名称',
    dataIndex: 'buildingName',
  },
  {
    title: '收费规则名称',
    dataIndex: 'ruleName',
  },
  {
    title: '宽限期',
    dataIndex: 'gracePeriod',
  },
  {
    title: '滞纳金日利率',
    dataIndex: 'dailyInterestRateOfLateFee',
  },
  {
    title: '时长单位',
    dataIndex: 'newDurationUnit',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
];
const villageId = ref('')
const villageName = ref('')
const buildingList = ref([]);
const formData = ref({
  buildingId: '',
  dailyInterestRateOfLateFee: '',
  durationUnit: '',
  gracePeriod: '',
  price: '',
  ruleName: '',
  unit: '',
  id: '',
});

// 搜索本小区的楼栋
const getBuildingList = async () => {
  const { data, code } = await getBuildingListByQuery({
    params: {
      page: 1,
      size: 200,
      villageId: villageId.value
    }
  })
  console.log("🚀🚀🚀🚀🚀🚀🚀 ~ file: chargeRules.vue:179 ~ getBuildingList ~ data:", data)
  if (code === 10002) {
    buildingList.value = data
  } else {
    buildingList.value = []
  }
};
const handleAdd = async () => {
  await getBuildingList()
  editVisible.value = true;
};

const pageChange = (e: number) => {
  pagination.current = e;
  getList();
};
const onDelete = async (id: string) => {
  await deletePropertyFeeStandard({ params: { id } });
  getList();
};
const handleEdit = async (e: any) => {
  formData.value = JSON.parse(JSON.stringify(e))
  await getBuildingList()
  editVisible.value = true;
};
const handleClick = (e: any = null) => {
  villageId.value = e.id
  villageName.value = e.name
  visible.value = true;
  getList()
};
const getList = async () => {
  loading.value = true
  const { data, code, total } = await getPropertyFeeStandardListByQuery({
    params: {
      villageId: villageId.value,
      page: pagination.current,
      size: pagination.pageSize,
    }
  })
  loading.value = false
  if (code === 10002) {
    if (total) pagination.total = total;
    for (const i of data) {
      i.newDurationUnit = i.durationUnit == 'day' ? '天' : i.durationUnit == 'month' ? '月' : i.durationUnit == 'year' ? '年' : ''
    }
    state.list = data
  } else {
    state.list = []
  }
};
const resetFields = () => {
  formRef.value.resetFields();
};
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    // @ts-ignore
    if (formData.value.id) {
      const { code } = await updatePropertyFeeStandard(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        editVisible.value = false;
        Message.success('更新成功!');
        getList()
      }
    } else {
      const { code } = await addPropertyFeeStandard(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        editVisible.value = false;
        Message.success('添加成功!');
        getList()
      }
    }
  });
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
