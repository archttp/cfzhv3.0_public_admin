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
        {{ formData?.id ? '编辑开发者账号' : '新增开发者账号' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="第三方应用平台appid"
                  field="appid"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.appid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="应用名称"
                  field="applicationName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.applicationName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="公钥"
                  field="publicKey"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.publicKey"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="平台" field="platform" required>
                  <a-select
                    v-model="formData.platform"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="wx_web">微信公众号</a-option>
                    <a-option value="wx_mp">微信小程序</a-option>
                    <a-option value="wx_app">微信app</a-option>
                    <a-option value="ali_web">阿里公众号</a-option>
                    <a-option value="ali_mp">阿里小程序</a-option>
                    <a-option value="ali_app">阿里app</a-option>
                    <a-option value="sdgs_etc">山东高速ETC</a-option>
                    <a-option value="baiwangyun">百旺云</a-option>
                    <a-option value="xlu_tong">信路通</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="接口内容加密方式" field="aesEncryption">
                  <a-input
                    v-model="formData.aesEncryption"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="第三方应用授权token" field="authToken">
                  <a-input
                    v-model="formData.authToken"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="原始id" field="originalId">
                  <a-input
                    v-model="formData.originalId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="私钥" field="privateKey">
                  <a-input
                    v-model="formData.privateKey"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="跳转地址" field="redirectUrl">
                  <a-input
                    v-model="formData.redirectUrl"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="回调地址" field="callbackUrl">
                  <a-input
                    v-model="formData.callbackUrl"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="接口内容加密方式(支付宝专用decryptKey)" field="decryptKey">
                  <a-input
                    v-model="formData.decryptKey"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item label="所属用户" field="uid">
                  <a-select
                    v-model="formData.uid"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    :filter-option="false"
                    @search="handleSearch"
                  >
                    <a-option
                      v-for="item of userList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.userName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col> -->
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
    cfDeveloperAdd,
    cfDeveloperUpdate,
    cfUserGetListByQuery,
  } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const userList = ref([]);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    aesEncryption: '',
    appid: '',
    applicationName: '',
    authToken: '',
    originalId: '',
    platform: '',
    privateKey: '',
    publicKey: '',
    uid: '',
    redirectUrl: '',
    callbackUrl: '',
    id: '',
    decryptKey: '',
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
        const { code } = await cfDeveloperUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfDeveloperAdd(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('添加成功!');
          emit('fetchData');
        }
      }
    });
  };
  const handleSearch = async (value: any) => {
    const { data, code } = await cfUserGetListByQuery({
      params: {
        userName: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      userList.value = data;
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
