<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title>
        {{ formData?.id ? '编辑车辆限制' : '新增车辆限制' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="停车场id" field="carParkId" required>
                  <a-select :loading="loading" placeholder="请输入" allow-search allow-clear @search="handleSelectSearch"
                    @change="carParkIdChange" :filter-option="false" v-model="formData.carParkId" :disabled="isEdit">
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                  <!-- <a-input v-model="formData.carParkId" allow-clear /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="收费模式" field="billingModel" required>
                  <a-select v-model="formData.billingModel" placeholder="请选择" allow-clear>
                    <a-option value="dynamic_time">动态时间计费</a-option>
                    <a-option value="fixed_time">固定时长计费</a-option>
                    <a-option value="dynamic_fixed_time">动态时间按段时长计费</a-option>
                    <a-option value="dynamic_time_upper_limit">每天指定最高费用</a-option>
                    <a-option value="static_time_upper_limit">限时指定最高费用</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="车辆类型" field="carTypeKey" required>
                  <a-select v-model="formData.carTypeKey" placeholder="请选择" allow-clear>
                    <a-option :value="item.flagKey" v-for="item in carTypeList" :key="item.id">{{ item.name }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="是否自动开闸" field="autoOpenDoor">
                  <a-select placeholder="请选择" allow-clear v-model="formData.autoOpenDoor">
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="是否禁止入场" field="forbidIn">
                  <a-select placeholder="请选择" allow-clear v-model="formData.forbidIn">
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否禁止出场" field="forbidOut">
                  <a-select placeholder="请选择" allow-clear v-model="formData.forbidOut">
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="免费放行" field="freeRelease">
                  <a-select placeholder="请选择" allow-clear v-model="formData.freeRelease">
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否赠送免停时间" field="giveFreeTime">
                  <a-select placeholder="请选择" allow-clear v-model="formData.giveFreeTime">
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="停车记录异常是否自动放行"
                  field="abnormalAutoRelease"
                >
                  <a-select
                    v-model="formData.abnormalAutoRelease"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="费用上限" field="feeUpperLimit">
                  <a-input v-model="formData.feeUpperLimit" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="免停时间(分钟)" field="freeTime">
                  <a-input v-model="formData.freeTime" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="离场时间限制(分钟)" field="leaveTimeLimit">
                  <a-input v-model="formData.leaveTimeLimit" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时间上限" field="upperLimitTime">
                  <a-input v-model="formData.upperLimitTime" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="起步价" field="startingPrice">
                  <a-input v-model="formData.startingPrice" placeholder="请输入" allow-clear />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="禁止通行通道" field="forbidPassCheckPointIds">
                  <a-select placeholder="请选择" allow-clear multiple v-model="formData.forbidPassCheckPointIds"
                    :disabled="!pointList.length">
                    <a-option :value="item.id" v-for="item in pointList" :key="item.id">{{ item.areaName + ' - ' +
                      item.name }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="设置为模板"
                  field="template"
                  validate-trigger="input"
                >
                  <a-select placeholder="请选择" allow-clear v-model="formData.template">
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
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
import { getCarTypeListByQuery, cfCheckPointGet } from '@/api/park';
import { cfCarParkSearch, updateCarParkCarLimit, addCarParkCarLimit } from '@/api/internetOfThings';
import { Message } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';

const visible = ref(false);
const loading = ref(false);
const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const formData = ref({
  autoOpenDoor: 1,
  billingModel: '',
  carParkId: '',
  carTypeKey: '',
  feeUpperLimit: '',
  forbidIn: 0,
  forbidOut: 0,
  freeRelease: 0,
  freeTime: 30,
  giveFreeTime: 0,
  abnormalAutoRelease: 1,
  leaveTimeLimit: 15,
  upperLimitTime: '',
  startingPrice: 0,
  forbidPassCheckPointIds: [],
  id: '',
  template: 0,
});
const carTypeList = ref([]);
const parkList = ref([]);
const selectLoading = ref(false);

const isEdit = ref(false);
const pointList = ref([]);

// 停车场id发生了改变
const carParkIdChange = (value: any) => {
  getAccess(value)
};

// 获取通道
const getAccess = async (id: any) => {
  const { data, code, total } = await cfCheckPointGet({
    params: {
      areaId: id,
      scene: 1,
      page: 1,
      size: 200,
    },
  });
  if (code == 10002) {
    pointList.value = data;
  } else {
    pointList.value = [];
  }
};

const handleClick = (e: any = null) => {
  getCarType();
  if (e?.id) {
    const newInfo = JSON.parse(JSON.stringify(e));
    console.log('newInfo', newInfo);
    newInfo.freeTime = e.freeTime / 60000;
    newInfo.leaveTimeLimit = e.leaveTimeLimit / 60000;
    if(newInfo.forbidPassCheckPointIds){
      newInfo.forbidPassCheckPointIds = e.forbidPassCheckPointIds.split(',');
    }
    formData.value = newInfo;
    getAccess(formData.value.carParkId)
    isEdit.value = true
  } else {
    isEdit.value = false
  }
  visible.value = true;
};
const resetFields = () => {
  formData.value.id = '';
  pointList.value = []
  formRef.value.resetFields();
};
const getCarType = async () => {
  const { data, code, message } = await getCarTypeListByQuery({
    params: {
      page: 1,
      size: 200,
    },
  });
  if (code === 10002) {
    carTypeList.value = data;
  } else {
    // @ts-ignore
    // Message.error(message);
  }
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
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    let newFormData = cloneDeep(formData.value);
    // @ts-ignore
    newFormData.freeTime = formData.value.freeTime * 60000;
    // @ts-ignore
    newFormData.leaveTimeLimit = formData.value.leaveTimeLimit * 60000;
    // @ts-ignore
    if(newFormData.forbidPassCheckPointIds){
    // @ts-ignore
      newFormData.forbidPassCheckPointIds = formData.value.forbidPassCheckPointIds.filter(str => str.trim() !== "").join(",")
    }
    // @ts-ignore
    if (formData.value.id) {
      const { code } = await updateCarParkCarLimit(newFormData);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('更新成功!');
        emit('fetchData');
      }
    } else {
      const { code } = await addCarParkCarLimit(newFormData);
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
