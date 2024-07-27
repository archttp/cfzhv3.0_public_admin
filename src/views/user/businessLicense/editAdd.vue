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
        {{ formData?.id ? '编辑营业执照' : '新增营业执照' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="企业名称"
                  field="businessName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.businessName"
                    placeholder="请输入企业名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="营业期限"
                  field="businessTerm"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.businessTerm"
                    placeholder="请输入营业期限"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="企业类型"
                  field="businessType"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.businessType"
                    placeholder="请输入企业类型"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item label="审核状态" field="sex" required>
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
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  label="统一社会信用代码"
                  field="creditCode"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.creditCode"
                    placeholder="请输入统一社会信用代码"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="成立时间"
                  field="dateOfIncorporation"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    style="width: 220px; margin: 0 24px 24px 0"
                    show-time
                    :time-picker-props="{ defaultValue: '09:09:06' }"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                  <!-- <a-input
                    v-model="formData.dateOfIncorporation"
                    placeholder="请输入成立时间"
                    allow-clear
                  ></a-input> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="法人"
                  field="legalRepresentative"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.legalRepresentative"
                    placeholder="请输入法人"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="营业范围"
                  field="natureOfBusiness"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.natureOfBusiness"
                    placeholder="请输入营业范围"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="注册资本"
                  field="registeredCapital"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.registeredCapital"
                    placeholder="请输入注册资本"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="法人用户id" field="uid" required>
                  <a-input
                    v-model="formData.uid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-space>
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
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
              <a-col :span="8">
                <a-form-item label="图片" field="images">
                  <a-input
                    v-model="formData.images"
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
  import { addBusinessLicense, updateBusinessLicense } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    businessName: '',
    businessTerm: '',
    businessType: '',
    checkStatus: '',
    creditCode: '',
    dateOfIncorporation: '',
    images: '',
    legalRepresentative: '',
    natureOfBusiness: '',
    registeredCapital: '',
    uid: 0,
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
        const { code } = await updateBusinessLicense(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addBusinessLicense(formData.value);
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
