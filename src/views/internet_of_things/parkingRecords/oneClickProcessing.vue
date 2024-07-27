<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="600"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-tabs @change="chooseType">
            <a-tab-pane key="5">
              <template #title>
                <icon-calendar/> 异常放行
              </template>
              <a-col :span="8">
                <a-form-item
                  label="方向"
                  field="direction"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.direction"
                    placeholder="请选择"
                  >
                    <a-option :value="0">入场</a-option>
                    <a-option :value="1">出场</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #title>
                <icon-clock-circle/> 结束账单
              </template>
              <a-col>
                <a-form-item
                  label="优惠金额"
                  field="deductionAmount"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.deductionAmount"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
                <a-space size="large">
                  <a-statistic :title="'车牌号：'+orderData.numberPlate" :value="orderData.cfOrder.amountsPayable" :precision="2" :value-style="{ color: '#0fbf60' }">
                    <template #prefix>
                      应付金额：
                    </template>
                    <template #suffix>元</template>
                  </a-statistic>
                </a-space>
              </a-col>
            </a-tab-pane>
          </a-tabs>
          <a-col :span="8">
            <a-form-item
              label="是否需要开闸"
              field="openDoor"
              validate-trigger="input"
              required
            >
              <a-select
                v-model="formData.openDoor"
                placeholder="请选择"
              >
                <a-option :value="0">否</a-option>
                <a-option :value="1">是</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              label="放行原因"
              field="reason"
              validate-trigger="input"
              required
            >
              <a-input
                v-model="formData.reason"
                placeholder="请输入"
                allow-clear
              ></a-input>
            </a-form-item>
          </a-col>
        </a-space>
        <div class="actions">
          <a-space>
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
  import { cfCarParkSearch, oneClickRelease, getCarParkUseLogOrder } from '@/api/internetOfThings';

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const modalTitle = ref('一键处理');
  const parkList = ref([]);
  const formRef = ref();
  const orderData = ref({numberPlate: '', cfOrder: {amountsPayable: '0'}});
  const formData = ref({
    useLogId: '',
    reason: '',
    deductionAmount: '0',
    openDoor: 0,
    releaseType: '5',
    direction: '',
  });
  const selectedKeys = ref([]);
  const emit = defineEmits(['fetchData', 'fetch-data', 'resetSelectedKeys']);
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
  const handleClick = (_selectedKeys: any) => {
    visible.value = true;
    selectedKeys.value = _selectedKeys
    formData.value.reason = '人工确认无误，异常放行车辆';
  };
  const chooseType = async (type: any) => {
    formData.value.releaseType = type;
    if(type==2 && !formData.value.reason){
      formData.value.reason = '人工已确认且现金收费';
    }else if(type==2 && formData.value.reason=='人工确认无误，异常放行车辆'){
      formData.value.reason = '';
    }else if(type==5 && (formData.value.reason=='人工已确认且现金收费' || !formData.value.reason)){
      formData.value.reason = '人工确认无误，异常放行车辆';
    }
    if(type==2){
      //现金放行，强制改为人工放行
      formData.value.direction = 1;
      //查找账单
      const {code, data} = await getCarParkUseLogOrder({
      params: {
        carParkUseLogId : selectedKeys.value[0]
      },
    });
      if(code===10002){
        orderData.value = data;
        console.log('数据',orderData);
      }
    }else{
      formData.value.direction = '';
    }
  };
  const onSubmitClick = async () => {
    if(selectedKeys.value.length==0){
      return;
    }
    for(const selectedKey in selectedKeys.value){
      formData.value.useLogId = selectedKeys.value[selectedKey];
      // @ts-ignore
      await oneClickRelease(formData.value);
    }
    selectedKeys.value = [];
    formRef.value.resetFields();
    visible.value = false;
    emit('fetchData');
    emit('resetSelectedKeys');
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
