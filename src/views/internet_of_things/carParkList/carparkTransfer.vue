<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="600"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 停车场转让 </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-col>
            <a-form-item
              label="停车场id"
              field="id"
              validate-trigger="input"
              disabled
              required
            >
              <a-input
                v-model="formData.id"
                placeholder="请输入"
                allow-clear
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              label="转让接收方手机号"
              field="phone"
              validate-trigger="input"
              required
            >
              <a-input
                v-model="formData.phone"
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
  import { transferParking } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    id: '',
    phone: '',
  });

  const handleClick = (e: any = null) => {
    console.log(e, 111);
    formData.value.id = e.id;
    visible.value = true;
    modalTitle.value = e.name;
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      const { code, message } = await transferParking(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('更新成功!');
        emit('fetchData');
      } else {
        // @ts-ignore
        Message.error(message);
      }
    });
  };

  const resetFields = () => {
    formData.value.id = '';
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
