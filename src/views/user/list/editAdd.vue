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
        {{ formData?.id ? '编辑用户' : '新增用户' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="用户类型"
                  field="type"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.type"
                    placeholder="请选择用户类型"
                    allow-clear
                  >
                    <a-option :value="0">个人</a-option>
                    <a-option :value="1">个体工商户</a-option>
                    <a-option :value="2">企业单位</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="用户名"
                  field="userName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.userName"
                    placeholder="请输入用户名"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="昵称"
                  field="nickName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.nickName"
                    placeholder="请输入用户名"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="手机号"
                  field="phone"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.phone"
                    placeholder="请输入手机号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col v-if="!formData?.id" :span="8">
                <a-form-item
                  label="密码"
                  field="password"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.password"
                    placeholder="请输入密码"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="性别" field="sex" required>
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
                <a-form-item label="角色" field="roleId" required>
                  <a-select
                    v-model="formData.roleId"
                    placeholder="请选择角色"
                    allow-clear
                  >
                    <a-option
                      v-for="item in roleList"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="角色过期时间"
                  field="roleEndTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.roleEndTime"
                  />
                  <!-- <a-input
                    v-model="formData.startTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input> -->
                </a-form-item>
              </a-col>
              


            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="驾驶证状态" field="driverLicenseStatus">
                  <a-select
                    v-model="formData.driverLicenseStatus"
                    placeholder="请选择驾驶证状态"
                    allow-clear
                  >
                    <a-option :value="0">未上传</a-option>
                    <a-option :value="1">已经上传但未审核</a-option>
                    <a-option :value="2">已通过审核</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="身份证状态" field="idCardStatus">
                  <a-select
                    v-model="formData.idCardStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">未上传</a-option>
                    <a-option :value="1">已经上传但未审核</a-option>
                    <a-option :value="2">已通过审核</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="营业执照状态" field="businessLicenseStatus">
                  <a-select
                    v-model="formData.businessLicenseStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">未上传</a-option>
                    <a-option :value="1">已经上传但未审核</a-option>
                    <a-option :value="2">已通过审核</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="Email" field="email">
                  <a-input
                    v-model="formData.email"
                    placeholder="请输入Email"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="个性签名" field="sign">
                  <a-input
                    v-model="formData.sign"
                    placeholder="请输入个性签名"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="用户真实姓名" field="trueName">
                  <a-input
                    v-model="formData.trueName"
                    placeholder="请输入用户真实姓名"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col v-if="formData?.id" :span="8">
                <a-form-item
                  label="密码"
                  field="password"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.password"
                    placeholder="请输入密码"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              
              <a-col v-if="formData?.id" :span="8">
                <a-form-item
                  label="头像"
                  field="password"
                  validate-trigger="input"
                >
                  <a-upload
                    :action="apiHost+'/file/cfFile/upload'"
                    :file-list="file ? [file] : []"
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
                          file && file.status === 'error'
                            ? ' arco-upload-list-item-error'
                            : ''
                        }`"
                      >
                        <div
                          v-if="file && file.url"
                          class="arco-upload-list-picture custom-upload-avatar"
                        >
                          <img :src="file.url" />
                          <div class="arco-upload-list-picture-mask">
                            <IconEdit />
                          </div>
                          <a-progress
                            v-if="
                              file.status === 'uploading' && file.percent < 100
                            "
                            :percent="file.percent"
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
  import {
    cfUserAdd,
    cfRoleGet,
    cfUserUpdate,
    getRoleIdByUid,
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
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    driverLicenseStatus: '',
    businessLicenseStatus: '',
    avatar: '',
    email: '',
    idCardStatus: '',
    nickName: '',
    password: '',
    phone: '',
    sex: '',
    sign: '',
    trueName: '',
    type: '',
    userName: '',
    roleId: '',
    roleEndTime:'',
    id: '',
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

  const getRole = async () => {
    // @ts-ignore
    const { data, code } = await cfRoleGet({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      roleList.value = data;
    }
  };
  const getRoleId = async () => {
    // @ts-ignore
    const { data, code } = await getRoleIdByUid({
      params: {
        uid: formData.value.id,
      },
    });
    if (code === 10002) {
      formData.value.roleId = data.roleId;
    }
  };

  const onChange = (_: any, currentFile: any) => {
    file.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const onProgress = (currentFile: any) => {
    file.value = currentFile;
  };
  const onSuccess = (fileRes: any) => {
    formData.value.avatar = fileRes.response.data.id;
  };
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.password = null;
      newInfo.roleEndTime = e.roleEndTime === null ? '' : parseTime(e.roleEndTime)
      
      formData.value = newInfo;
      getRoleId();
    }
    visible.value = true;
    getRole();
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
      newForm.roleEndTime = dayjs(formData.value.roleEndTime).valueOf();
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfUserUpdate(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfUserAdd(newForm);
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
