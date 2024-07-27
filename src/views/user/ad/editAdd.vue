<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1400"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑广告' : '新增广告' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="素材类型"
                  field="materialType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.materialType"
                    placeholder="请选择素材类型"
                    allow-clear
                  >
                    <a-option value="0">图片</a-option>
                    <a-option value="1">视频</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="平台"
                  field="platform"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.platform"
                    placeholder="请选择平台"
                    @change="selectApplicationSearch"
                    allow-clear
                  >
                    <a-option value="wx_web">微信公众号</a-option>
                    <a-option value="wx_mp">微信小程序</a-option>
                    <a-option value="wx_app">微信app</a-option>
                    <a-option value="ali_web">阿里公众号</a-option>
                    <a-option value="ali_mp">阿里小程序</a-option>
                    <a-option value="ali_app">阿里app</a-option>
                    <a-option value="hardware_advertising_screen">硬件广告屏</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="广告标题"
                  field="title"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.title"
                    placeholder="请输入广告标题"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="appid" label="第三方应用" required>
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="applicationSearch"
                    :filter-option="false"
                    v-model="formData.appid"
                  >
                    <a-option v-for="item of applicationList" :value="item.id">{{
                      item.applicationName
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="投放时间" field="launchTime">
                  <a-range-picker
                    v-model="formData.launchTime"
                    showTime
                    :time-picker-props="{
                    defaultValue:['00:00:00','00:00:00']
                    }"
                    @change="onStartTimeChange"
                    style=" width: 380px; "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="排序"
                  field="sortIndex"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.sortIndex"
                    placeholder="请输入排序"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="源地址"
                  field="sourceAddress"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.sourceAddress"
                    placeholder="请输入源地址"
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
  import {
    addAd,
    updateAd,
    deleteAd,
    getAdListByQuery,
    cfDeveloperGet,
  } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';
  import dayjs from 'dayjs';
  import { parseTime } from '@/utils';
  import { cloneDeep } from 'lodash';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const applicationList = ref([]);
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    platform: null,
    materialType: null,
    title: '',
    sourceAddress: '',
    appid: '',
    sortIndex: '',
    id: '',
    startTime: '',
    endTime: '',
    launchTime: [],
  });

  const roleList = ref([]);
  const file = ref();
  const header: any = ref({
    Authorization: getToken(),
  });
  const uploadData: any = ref({
    fileType: 1,
    scene: 'user_avatar',
  });
  onMounted(() => {
    applicationSearch(null);
    fetchData()
  });
  const fetchData = async () => {
    // @ts-ignore
    const { data, code } = await getAdListByQuery({
      params: {
        page: 1,
        size: 10,
      },
    });
    if (code === 10002) {
      roleList.value = data;
    }
  };
  const onStartTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formData.value.startTime = dayjs(date[0]).valueOf() + '';
      formData.value.endTime = dayjs(date[1]).valueOf() + '';
    }else{
      formData.value.startTime = '';
      formData.value.endTime = '';
    }
    
  };
  const selectApplicationSearch = async (_platform: any) => {
    formData.value.platform = _platform
    applicationSearch(null)
  };
  const applicationSearch = async (_applicationName: any) => {
    if(formData.value.platform=='hardware_advertising_screen'){
      formData.value.platform = '';
    }
    const { data, code } = await cfDeveloperGet({
      params: {
        page: 1,
        size: 200,
        applicationName: _applicationName,
        platform: formData.value.platform,
      },
    });
    if (code == 10002) {
      applicationList.value = data;
    } else {
      applicationList.value = [];
    }
  };
  const onChange = (_: any, currentFile: any) => {
    file.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const handleClick = (e: any = null) => {
    if (e?.id) {
      e.launchTime = [];
      e.launchTime[0] = parseTime(e.startTime);
      e.launchTime[1] = parseTime(e.endTime);
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.startTime = parseTime(e.startTime)
      newInfo.endTime = parseTime(e.endTime)
      
      // newInfo.endTime = e.roleEndTime === null ? 0 : parseTime(e.roleEndTime)
      formData.value = newInfo;
      formData.value.materialType = formData.value.materialType+''
      console.log('e', formData)
    }
    visible.value = true;
  };
  const resetFields = () => {
    formRef.value.avatar = '';
    formRef.value.avatarUrl = '';
    formRef.value.resetFields();
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);
      // @ts-ignore
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateAd(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addAd(newForm);
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
