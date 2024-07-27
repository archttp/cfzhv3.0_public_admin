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
        {{ formData?.id ? '编辑驾驶证' : '新增驾驶证' }}
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
                  required
                >
                  <a-input
                    v-model="formData.userName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="地址"
                  field="address"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.address"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            
              <a-col :span="8">
                <a-form-item
                  label="生日-年"
                  field="birthdayYear"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.birthdayYear"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="生日-月"
                  field="birthdayMonth"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.birthdayMonth"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="生日-日"
                  field="birthdayDay"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.birthdayDay"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="准驾车型"
                  field="carClass"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.carClass"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="身份证号"
                  field="certificateNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.certificateNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
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
                    <a-option :value="0">未上传</a-option>
                    <a-option :value="1">上传待审核</a-option>
                    <a-option :value="2">审核通过</a-option>
                    <a-option :value="3">审核不通过</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="有效期起"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.startTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="有效期止"
                  field="endTime"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.endTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="档案编号"
                  field="fileNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.fileNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="初次领证日期-日"
                  field="firstIssueDay"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.firstIssueDay"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="初次领证日期-月"
                  field="firstIssueMonth"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.firstIssueMonth"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="初次领证日期-年"
                  field="firstIssueYear"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.firstIssueYear"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="实习期截至"
                  field="internshipPeriodEnds"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.internshipPeriodEnds"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="签发机关"
                  field="issuingAuthority"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.issuingAuthority"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="国籍"
                  field="nationality"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.nationality"
                    placeholder="请输入"
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
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="性别"
                  field="sex"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.sex"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">保密</a-option>
                    <a-option :value="1">男</a-option>
                    <a-option :value="2">女</a-option>
                  </a-select>
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
  import { addUserDriverLicense, updateUserDriverLicense } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    address: '',
    birthdayDay: '',
    birthdayMonth: '',
    birthdayYear: '',
    carClass: '',
    certificateNumber: '',
    checkStatus: '',
    endTime: '',
    fileNumber: '',
    firstIssueDay: '',
    firstIssueMonth: '',
    firstIssueYear: '',
    images: '',
    internshipPeriodEnds: '',
    issuingAuthority: '',
    nationality: '',
    phone: '',
    sex: '',
    startTime: '',
    userName: '',
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
        const { code } = await updateUserDriverLicense(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addUserDriverLicense(formData.value);
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
