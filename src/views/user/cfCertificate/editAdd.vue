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
        {{ formData?.id ? '编辑' : '新增' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="姓名"
                  field="userName"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.userName"
                    placeholder="请输入姓名"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="性别" field="sex">
                  <a-select
                    v-model="formData.sex"
                    placeholder="请选择性别"
                    allow-clear
                  >
                    <a-option :value="0">保密</a-option>
                    <a-option :value="1">男</a-option>
                    <a-option :value="2">女</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="身份号"
                  field="identityNumber"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.identityNumber"
                    placeholder="请输入身份号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="生日-年"
                  field="birthdayYear"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.birthdayYear"
                    placeholder="请输入生日-年"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="生日-月"
                  field="birthdayMonth"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.birthdayMonth"
                    placeholder="请输入生日-月"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="生日-日"
                  field="birthdayDay"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.birthdayDay"
                    placeholder="请输入生日-日"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="有效期起"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.startTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="有效期止"
                  field="endTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.endTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="民族"
                  field="nationality"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.nationality"
                    placeholder="请输入民族"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="签发机关"
                  field="issuingAuthority"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.issuingAuthority"
                    placeholder="请输入签发机关"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="地址"
                  field="address"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.address"
                    placeholder="请输入地址"
                    allow-clear
                  ></a-input>
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
                    placeholder="请输入地址"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="审核状态" field="checkStatus">
                  <a-select
                    v-model="formData.checkStatus"
                    placeholder="请选择审核状态"
                    allow-clear
                  >
                    <a-option :value="0">待审核</a-option>
                    <a-option :value="1">审核通过</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  label="背面图片"
                  field="backImages"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.backImages"
                    placeholder="请输入背面图片"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="正面图片"
                  field="faceImages"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.faceImages"
                    placeholder="请输入正面图片"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  label="背景图片"
                  field="pasbackImagessword"
                  validate-trigger="input"
                >
                  <a-upload
                    :action="apiHost+'/file/cfFile/upload'"
                    :file-list="backImagesFile ? [backImagesFile] : []"
                    :headers="header"
                    :data="uploadData"
                    :show-file-list="false"
                    @change="onChange"
                    @progress="onProgress"
                    @success="onSuccess"
                  >
                    <template #upload-button>
                      <div
                        :class="`arco-upload-list-item${
                          backImagesFile && backImagesFile.status === 'error'
                            ? ' arco-upload-list-item-error'
                            : ''
                        }`"
                      >
                        <div
                          v-if="backImagesFile && backImagesFile.url"
                          class="arco-upload-list-picture custom-upload-avatar"
                        >
                          <img :src="backImagesFile.url" />
                          <div class="arco-upload-list-picture-mask">
                            <IconEdit />
                          </div>
                          <a-progress
                            v-if="
                              backImagesFile.status === 'uploading' &&
                              backImagesFile.percent < 100
                            "
                            :percent="backImagesFile.percent"
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
                  label="正面图片"
                  field="pasbackImagessword"
                  validate-trigger="input"
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
  import { cfUserIdCardAdd, cfUserIdCardUpdate } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';
  import { parseTime } from '@/utils';
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);

  // 上传相关
  const uploadData: any = ref({
    fileType: 1,
    scene: 'user_avatar',
  });
  const header: any = ref({
    Authorization: getToken(),
  });
  const backImagesFile = ref({
    url: '',
  });
  const faceImagesFile = ref({
    url: '',
  });

  const formData = ref({
    address: '',
    backImages: '',
    birthdayDay: '',
    birthdayMonth: '',
    birthdayYear: 0,
    checkStatus: '',
    endTime: 0,
    faceImages: '',
    id: 0,
    identityNumber: '',
    issuingAuthority: '',
    nationality: '',
    sex: '',
    startTime: 0,
    uid: 0,
    userName: '',
    phone: '',
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.startTime = parseTime(e.startTime);
      newInfo.endTime = parseTime(e.endTime);
      formData.value = newInfo;
      backImagesFile.value.url = newInfo.backImagesURL;
      faceImagesFile.value.url = newInfo.faceImagesURL;
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
      const newForm = cloneDeep(formData.value);
      newForm.startTime = dayjs(formData.value.startTime).valueOf();
      newForm.endTime = dayjs(formData.value.endTime).valueOf();
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfUserIdCardUpdate(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfUserIdCardAdd(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('添加成功!');
          emit('fetchData');
        }
      }
    });
  };

  const onChange = (_: any, currentFile: any) => {
    backImagesFile.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const onProgress = (currentFile: any) => {
    backImagesFile.value = currentFile;
  };
  const onSuccess = (fileRes: any) => {
    formData.value.backImages = fileRes.response.data.id;
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
    formData.value.faceImages = fileRes.response.data.id;
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
