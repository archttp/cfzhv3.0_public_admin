<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> 批量导入 </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item field="chargingStationId" label="充电站" required>
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.chargingStationId"
                    @change="chargingStationIdChange"
                  >
                    <a-option v-for="item of chargingStationList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="file"
                  label="上传文件"
                  validate-trigger="input"
                  required
                >
                  <a-upload
                    multiple
                    :action="apiHost+'/internetOfThingsAdmin/cfChargingStation/importExcelChargingStoredCard'"
                    :headers="header"
                    :data="uploadData"
                    @success="onSuccess"
                    @error="onError"
                    :disabled="!formData.chargingStationId"
                    :show-file-list="false"
                  />
                </a-form-item>
                <!-- <a-form-item field="file" label="上传文件" required>
                  <a-upload
                    action="/"
                    :auto-upload="false"
                    ref="uploadRef"
                    @change="onChange"
                    multiple
                    label="123123"
                  />
                </a-form-item> -->
              </a-col>
            </a-row>
          </a-card>
        </a-space>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cfChargingStationSearch,
  } from '@/api/internetOfThings';
  import { getToken } from '@/utils/auth';
import { login } from '@/api/user';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const chargingStationList = ref([]);
  const apiUrl = process.env.VITE_API_BASE_URL
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    chargingStationId: '',
    file: '',
  });
  const header: any = ref({
    Authorization: getToken(),
  });
  const uploadData: any = ref({
    chargingStationId: '',
  });
  const chargingStationIdChange = (e: any) => {
    uploadData.value.chargingStationId = e
  }

  const handleClick = (e: any = null) => {
    handleSelectSearch(null);
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
    }
    visible.value = true;
  };
  const resetFields = () => {
    formRef.value.resetFields();
  };
  
  const onError = (e: any) => {
    console.log(e);
  };
  const onSuccess = (fileRes: any) => {
    console.log(fileRes);
    if(fileRes.response.code === 10002){
        Message.success('导入成功')
        visible.value = false;
        emit('fetchData');
    }else{
        Message.error(fileRes.response.message + fileRes.response.mixMessage)
    }
  };
  const handleSelectSearch = async (value: any) => {
    selectLoading.value = true;
    const { data, code } = await cfChargingStationSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      chargingStationList.value = data;
    } else {
      chargingStationList.value = [];
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
