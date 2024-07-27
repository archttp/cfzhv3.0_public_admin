<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title>
        {{ formData?.id ? '编辑储值卡' : '新增储值卡' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="停车场" field="carParkId" required>
                  <a-select :loading="selectLoading" placeholder="请输入" allow-search allow-clear @search="handleSelectSearch"
                    :filter-option="false" v-model="formData.carParkId">
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="车牌号" field="plateNumber" validate-trigger="input" required>
                  <a-input v-model="formData.plateNumber" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="余额" field="amountBalance" validate-trigger="input" required>
                  <a-input v-model="formData.amountBalance" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="手机号" field="phone" validate-trigger="input" required>
                  <a-input v-model="formData.phone" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="开始时间"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.startTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="结束时间"
                  field="endTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.endTime"
                  />
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
import { ref, onMounted } from 'vue';
import { addCarParkStoredCard, updateCarParkStoredCard, cfCarParkSearch } from '@/api/internetOfThings';
import { Message } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';
import { parseTime } from '@/utils';
import dayjs from 'dayjs';

const visible = ref(false);
const loading = ref(false);
const selectLoading = ref(false);
const parkList = ref([]);

const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const formData = ref({
  amountBalance: "",
  carParkId: "",
  endTime: "",
  plateNumber: "",
  startTime: "",
  phone: "",
  id: '',
});
const handleClick = (e: any = null) => {
  if (e?.id) {
    const newInfo = JSON.parse(JSON.stringify(e));
    newInfo.startTime = parseTime(e.startTime)
    newInfo.endTime = parseTime(e.endTime)
    formData.value = newInfo;
  }
  visible.value = true;
};
onMounted(() => {
  handleSelectSearch(null);
});
const handleSelectSearch = async (value: any) => {
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
};
const resetFields = () => {
  formData.value.id = '';
  formRef.value.resetFields();
};
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    const newForm = cloneDeep(formData.value);
    // @ts-ignore
    newForm.startTime = dayjs(formData.value.startTime).valueOf();
    // @ts-ignore
    newForm.endTime = dayjs(formData.value.endTime).valueOf();
    // @ts-ignore
    if (formData.value.id) {
      const { code } = await updateCarParkStoredCard(newForm);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('更新成功!');
        emit('fetchData');
      }
    } else {
      const { code } = await addCarParkStoredCard(newForm);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('添加成功!');
        emit('fetchData');
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
