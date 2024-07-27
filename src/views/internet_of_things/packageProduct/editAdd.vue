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
        {{ formData?.id ? '编辑套餐产品' : '新增套餐产品' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item field="carParkId" label="停车场" required>
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
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
                  label="标题"
                  field="title"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.title"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="副标题"
                  field="subtitle"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.subtitle"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="原价"
                  field="originalPrice"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.originalPrice"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="现价"
                  field="currentPrice"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.currentPrice"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="宽限期"
                  field="gracePeriod"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.gracePeriod"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              
              <a-col :span="8">
                <a-form-item
                  label="车辆类型"
                  field="typeKey"
                  validate-trigger="input"
                  required
                >
                <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.typeKey"
                  >
                    <a-option :value="item.flagKey" v-for="item in carTypeList" :key="item.id">{{ item.name }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>

              
              <a-col :span="8">
                <a-form-item field="packageUnit" label="套餐产品单位" required>
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.packageUnit"
                  >
                    <a-option :value="1">小时</a-option>
                    <a-option :value="2">每日</a-option>
                    <a-option :value="3">每月</a-option>
                    <a-option :value="4">每年</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="specialCarPackage"
                  label="是否为特殊车辆套餐"
                  required
                >
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.specialCarPackage"
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="specialGive" label="是否为内部指定套餐" required>
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.specialGive"
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="useGracePeriod" label="是否使用宽限期" required>
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.useGracePeriod"
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="expiredRenewalMode" label="过期续费模式" required>
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.expiredRenewalMode"
                  >
                    <a-option :value="0">当前时间开始续费</a-option>
                    <a-option :value="1">过期时间开始续费</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="endMonthRenewalMode" label="月底续费模式" required>
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.endMonthRenewalMode"
                  >
                    <a-option :value="0">按标准月续费</a-option>
                    <a-option :value="1">续至月底</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="排序"
                  field="sortIndex"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.sortIndex"
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
  import { ref, onMounted } from 'vue';
  import { productAdd, productUpdate } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import { cfCarParkSearch } from '@/api/internetOfThings';
  import { getCarTypeListByQuery } from '@/api/park'

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const parkList = ref([]);
  const selectLoading = ref(false);
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    carParkId: '',
    currentPrice: '',
    gracePeriod: '',
    image: '',
    originalPrice: '',
    packageUnit: '',
    sortIndex: '',
    specialCarPackage: '',
    specialGive: '',
    subtitle: '',
    title: '',
    useGracePeriod: '',
    typeKey:'',
    id: '',
    expiredRenewalMode: 0,
    endMonthRenewalMode: 0,
  });
  const carTypeList = ref([])
  onMounted(() => {
    handleSelectSearch(null);
  });
  const handleClick = (e: any = null) => {
    getCarType()
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
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await productUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await productAdd(formData.value);
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
