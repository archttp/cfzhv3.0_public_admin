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
        {{ formData?.id ? '编辑居民' : '新增居民' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="小区"
                  field="villageId"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.villageId"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.id"
                      v-for="item in wisdomCommunity"
                      :key="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="审核状态"
                  field="checkStatus"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.checkStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in checkStatusArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="居民类型"
                  field="residentType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.residentType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in residentTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼栋id"
                  field="buildingId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.buildingId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼栋单元"
                  field="unit"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.unit"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼层"
                  field="floor"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.floor"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="门牌号"
                  field="houseNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.houseNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="入住时间"
                  field="checkInTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.checkInTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="到期时间"
                  field="expirationTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.expirationTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="人脸图片"
                  field="expirationTime"
                  validate-trigger="input"
                  required
                >
                  <a-upload
                    :action="apiHost+'/file/cfFile/upload'"
                    :file-list="faceImagesFile ? [faceImagesFile] : []"
                    :headers="header"
                    :data="uploadData"
                    :show-file-list="false"
                    @change="onFaceChange"
                    @progress="onFaceProgress"
                    @success="onFaceSuccess"
                  >
                    <template #upload-button>
                      <div
                        :class="`arco-upload-list-item${
                          faceImagesFile && faceImagesFile.status === 'error'
                            ? ' arco-upload-list-item-error'
                            : ''
                        }`"
                      >
                        <div
                          v-if="faceImagesFile && faceImagesFile.url"
                          class="arco-upload-list-picture custom-upload-avatar"
                        >
                          <img :src="faceImagesFile.url" />
                          <div class="arco-upload-list-picture-mask">
                            <IconEdit />
                          </div>
                          <a-progress
                            v-if="
                              faceImagesFile.status === 'uploading' &&
                              faceImagesFile.percent < 100
                            "
                            :percent="faceImagesFile.percent"
                            type="circle"
                            size="mini"
                            :style="{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              transform: 'translateX(-50%) translateY(-50%)',
                            }"
                          />
                        </div>
                        <div v-else class="arco-upload-picture-card">
                          <div class="arco-upload-picture-card-text">
                            <IconPlus />
                            <div style="margin-top: 10px; font-weight: 600"
                              >Upload</div
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                  </a-upload>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="手机号"
                  field="phone"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.phone"
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
  import {
    addResident,
    updateResident,
    wisdomCommunityGet,
  } from '@/api/wisdomCommunity';
  import { getToken } from '@/utils/auth';
  import { Message } from '@arco-design/web-vue';
  // @ts-ignore
  import { parseTime } from '@/utils/index';
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    checkInTime: '',
    checkStatus: '',
    expirationTime: '',
    phone: '',
    residentType: '',
    villageId: '',
    buildingId: '',
    unit: '',
    floor: '',
    houseNumber: '',
    faceImage: '',
    id: '',
  });

  // 上传相关
  const uploadData: any = ref({
    fileType: 1,
    scene: 'user_avatar',
  });
  const header: any = ref({
    Authorization: getToken(),
  });
  const faceImagesFile = ref({
    url: '',
  });

  const wisdomCommunity = ref([]);
  const residentTypeArr = [
    { value: 1, label: '业主' },
    { value: 2, label: '个人租户' },
    { value: 3, label: '办公' },
  ];
  const checkStatusArr = [
    { value: 1, label: '待审核' },
    { value: 2, label: '正常' },
    { value: 3, label: '审核不通过' },
  ];
  const handleClick = (e: any = null) => {
    getWisdomCommunityList();
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      console.log(newInfo);
      newInfo.checkInTime = parseTime(e.checkInTime);
      // @ts-ignore
      newInfo.expirationTime = parseTime(e.expirationTime);
      formData.value = newInfo;
    }
    visible.value = true;
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  const rawCitiesDataChange = (e: any) => {
    console.log(e);
  };
  const getWisdomCommunityList = async () => {
    // @ts-ignore
    const { data, code } = await wisdomCommunityGet({
      params: {
        page: 1,
        size: 999,
      },
    });
    if (code === 10002) {
      wisdomCommunity.value = data;
    } else {
      wisdomCommunity.value = [];
    }
  };
  const onFaceChange = (_: any, currentFile: any) => {
    faceImagesFile.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const onFaceProgress = (currentFile: any) => {
    faceImagesFile.value = currentFile;
  };
  const onFaceSuccess = (fileRes: any) => {
    formData.value.faceImage = fileRes.response.data.id;
  };

  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);
      // @ts-ignore
      newForm.checkInTime = dayjs(formData.value.checkInTime).valueOf();
      // @ts-ignore
      newForm.expirationTime = dayjs(formData.value.expirationTime).valueOf();
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateResident(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addResident(newForm);
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
