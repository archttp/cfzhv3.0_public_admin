<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> 您正在进行现金续费车辆套餐... </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item field="quantity" label="数量(例如要续费几个月，具体以该套餐产品单位时间为准)" required>
                  <a-input v-model="formData.quantity" placeholder="请输入需要续费的单位数量" allow-clear />
                </a-form-item>
              </a-col>
              <a-button type="primary" status="success" @click="batchCashBuy">提交</a-button>
            </a-row>
          </a-card>
        </a-space>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    carParkPackageCashBuy
  } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  const visible = ref(false);
  const selectedKeys = ref([]);

  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    quantity: '1',
  });
  const handleClick = (e: any) => {
    selectedKeys.value = e;
    visible.value = true;
  };
  const resetFields = () => {
    formRef.value.resetFields();
  };
  const batchCashBuy = async () => {
    if(selectedKeys.value.length==0){
      return;
    }
    const { code, message } = await carParkPackageCashBuy({
      packageIds: selectedKeys.value,
      quantity: formData.value.quantity
    });
    if (code === 10002) {
      formRef.value.resetFields();
      visible.value = false;
      selectedKeys.value = [];
      Message.success(message);
      emit('fetchData');
    } else {
      // @ts-ignore
      Message.error(message);
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
