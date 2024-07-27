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
        {{ formData?.id ? '编辑文件平台' : '新增文件平台' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="文件平台"
                  field="filePlatform"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.filePlatform"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="item.value" v-for="item in storageTypeMap" :key="item.value">{{ item.label }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="文件域名"
                  field="endpoint"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.endpoint"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="文件桶名"
                  field="bucketName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.bucketName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
               <a-col :span="8">
                <a-form-item
                  label="配置名称"
                  field="configName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.configName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="文件平台key"
                  field="platformKey"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.platformKey"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="文件平台secret"
                  field="platformSecret"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.platformSecret"
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
  import { addFilePlatform, updateFilePlatform } from '@/api/files';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    bucketName: '',
    configName: '',
    endpoint: '',
    filePlatform: '',
    platformKey: '',
    platformSecret: '',
    id: '',
  });
  const storageTypeMap = [
    { value: 'minio', label: 'Minio分布式存储' },
    { value: 'aliyun_oss', label: '阿里云OSS' },
    { value: 'fastdfs', label: '开源FastDFS' },
    { value: 'qiniu', label: '七牛云存储' },
  ];
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
        const { code } = await updateFilePlatform(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addFilePlatform(formData.value);
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
