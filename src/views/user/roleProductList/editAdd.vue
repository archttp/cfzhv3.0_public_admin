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
        {{ formData?.id ? '编辑角色产品' : '新增角色产品' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="标题(名称)"
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
                  label="角色key"
                  field="roleKey"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.roleKey"
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
                <a-form-item label="套餐产品单位" field="packageUnit" required>
                  <a-select
                    v-model="formData.packageUnit"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">小时</a-option>
                    <a-option :value="2">每日</a-option>
                    <a-option :value="3">每月</a-option>
                    <a-option :value="4">每年</a-option>
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
  import { addUserRoleProduct, updateUserRoleProduct } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    currentPrice: '',
    image: '',
    originalPrice: '',
    packageUnit: '',
    roleKey: '',
    sortIndex: '',
    subtitle: '',
    title: '',
    id: '',
  });
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
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateUserRoleProduct(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addUserRoleProduct(formData.value);
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
