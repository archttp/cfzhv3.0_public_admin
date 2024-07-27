<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑到访预约' : '新增到访预约' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item field="carParkId" label="停车场" required>
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleParkSelectSearch"
                    :filter-option="false"
                    v-model="formData.carParkId"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="车辆类型"
                  field="carType"
                  validate-trigger="input"
                >
                <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.carType"
                  >
                    <a-option :value="item.flagKey" v-for="item in carTypeList" :key="item.id">{{ item.name }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="车牌号" field="plateNumber">
                  <a-input
                    v-model="formData.plateNumber"
                    placeholder="请输入车牌号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="申请人手机号" field="fromUserPhone" required>
                  <a-input
                    v-model="formData.fromUserPhone"
                    placeholder="请输入申请人手机号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="受访人手机号" field="toUserPhone" required>
                  <a-input
                    v-model="formData.toUserPhone"
                    placeholder="请输入受访人手机号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="状态"
                  field="processStatus"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.processStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in processStatusArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="目的地" field="destination">
                  <a-input
                    v-model="formData.destination"
                    placeholder="请输入目的地"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="到访原因" field="reason">
                  <a-input
                    v-model="formData.reason"
                    placeholder="请输入到访原因"
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
  import { ref, onMounted } from 'vue';
  import { addCarParkVisit, updateCarParkVisit, getCarTypeListByQuery } from '@/api/park';
  import { Message } from '@arco-design/web-vue';
  import {
    cfCarParkSearch,
  } from '@/api/internetOfThings';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const selectLoading = ref(false);
  const parkList = ref([]);
  const carTypeList = ref([]);
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    id: '',
    carParkId: '',
    plateNumber: '',
    destination: '',
    reason: '',
    fromUserPhone: '',
    toUserPhone: '',
    carType: '',
    processStatus: ''
  });
  const processStatusArr = [
    { value: 0, label: '待审核' },
    { value: 1, label: '已审核' },
    { value: 2, label: '已到访' },
    { value: 3, label: '审核失败' },
  ];
  onMounted(() => {
    getCarType();
    handleParkSelectSearch(null);
  });
  const handleParkSelectSearch = async (value: any) => {
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
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
    }
    visible.value = true;
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      if(formData.value.plateNumber==''){
        formData.value.plateNumber = null;
      }
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateCarParkVisit(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addCarParkVisit(formData.value);
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
