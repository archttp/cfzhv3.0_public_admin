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
        {{ formData?.id ? '编辑系统配置' : '新增系统配置' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="中文名"
                  field="zhName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.zhName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="英文名"
                  field="enName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.enName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="配置值"
                  field="value"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.value"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="配置分组"
                  field="configGroup"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.configGroup"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <!-- <a-col :span="8">
                <a-form-item label="到期时间" field="expireTime">
                  <a-date-picker
                    v-model="formData.expireTime"
                    style="width: 220px; margin: 0 24px 24px 0"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item label="描述" field="description">
                  <a-input
                    v-model="formData.description"
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
  import { ref } from 'vue';
  import { cfSystemAdd, cfSystemUpdate } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  // import dayjs from 'dayjs';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    configGroup: '',
    description: '',
    enName: '',
    expireTime: '',
    value: '',
    zhName: '',
    id: '',
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      // newInfo.expireTime = dayjs(e.expireTime).format('YYYY-MM-DD HH:mm:ss');
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
      const form = cloneDeep(formData.value);
      // form.expireTime = dayjs(formData.value.expireTime).valueOf().toString();
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfSystemUpdate(form);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfSystemAdd(form);
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
