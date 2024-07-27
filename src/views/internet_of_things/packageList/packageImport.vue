<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> 批量导入套餐 </template>
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
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.carParkId"
                    @change="carParkIdChange"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="跨区停车场"
                  field="transRegionalCarParkIds"
                  validate-trigger="input"
                >
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    multiple
                    @search="handleSelectTransRegionalSearch"
                    :filter-option="false"
                    v-model="formData.transRegionalCarParkIds"
                    @change="transRegionalCarParkIdChange"
                  >
                    <a-option v-for="item of transRegionalParkList" :value="item.id">{{
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
                    :action="apiHost+'/internetOfThingsAdmin/cfCarPark/importExcelParkPackage'"
                    :headers="header"
                    :data="uploadData"
                    @success="onSuccess"
                    @error="onError"
                    :disabled="!formData.carParkId"
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
  import { ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cfCarParkSearch,
    importExcelParkPackage,
  } from '@/api/internetOfThings';
  import { getToken } from '@/utils/auth';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const parkList = ref([]);
  const transRegionalParkList = ref([]);

  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    carParkId: '',
    file: '',
    transRegionalCarParkIds: [],
  });
  const header: any = ref({
    Authorization: getToken(),
  });
  const uploadData: any = ref({
    carParkId: '',
    transRegionalCarParkIds: [],
  });
  const carParkIdChange = (e: any) => {
    uploadData.value.carParkId = e
  }
  const transRegionalCarParkIdChange = (e: any) => {
    uploadData.value.transRegionalCarParkIds = e
  }

  const handleClick = (e: any = null) => {
    handleSelectSearch(null);
    handleSelectTransRegionalSearch(null);
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
    }else{
        Message.error(fileRes.response.message + fileRes.response.mixMessage)
    }
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
  const handleSelectTransRegionalSearch = async (value: any) => {
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
      transRegionalParkList.value = data;
    } else {
      transRegionalParkList.value = [];
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
