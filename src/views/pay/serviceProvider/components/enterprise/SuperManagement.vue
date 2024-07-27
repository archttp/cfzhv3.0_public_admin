<template>
  <a-form ref="formRef" :model="formData" style="margin-top: 32px">
    <!-- <a-form-item field="contact_type" label="账户类型">
      <a-radio-group v-model="formData.contact_type">
        <a-radio value="LEGAL">法定代表人/经营者</a-radio>
        <a-radio value="SUPER">经办人</a-radio>
      </a-radio-group>
    </a-form-item> -->
    <a-form-item field="contact_name" label="超管姓名" required>
      <a-input v-model="formData.contact_name" placeholder="请输入" />
    </a-form-item>
    <!-- <a-form-item field="activityName" label="超管资料类型" required>
      <a-input v-model="formData.contact_name" placeholder="请输入" />
    </a-form-item> -->
    <a-form-item field="contact_id_number" label="证件号码">
      <a-input v-model="formData.contact_id_number" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="mobile_phone" label="手机号码" required>
      <a-input v-model="formData.mobile_phone" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="contact_email" label="邮箱" required>
      <a-input v-model="formData.contact_email" placeholder="请输入" />
    </a-form-item>

    <a-form-item field="appid" label="服务商微信应用appid" required>
      <a-input v-model="formData.appid" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="mchid" label="服务商商户号" required>
      <a-input v-model="formData.mchid" placeholder="请输入" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" style="margin-right: 16px" @click="onLast">
        上一步
      </a-button>
      <a-button type="primary" @click="onNext"> 完成 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { wxInboundApplicationOfSpecialMerchants } from '@/api/pay';

  const formRef = ref();
  const emit = defineEmits(['changeStep', 'change-step']);
  const formData = ref({
    business_authorization_letter: '',
    contact_email: '',
    contact_id_doc_copy: '',
    contact_id_doc_copy_back: '',
    contact_id_doc_type: '',
    contact_id_number: '',
    contact_name: '',
    contact_period_begin: '',
    contact_period_end: '',
    // contact_type: 'LEGAL',
    mobile_phone: '',
    openid: '',

    appid:'',
    mchid:''
  });

  const onLast = () => {
    emit('changeStep', 4);
  };

  onMounted(() => {
    if (localStorage.getItem('enterprise-SuperManagement')) {
      // @ts-ignore
      formData.value = JSON.parse(
        localStorage.getItem('enterprise-SuperManagement')
      );
    }
  });

  const onNext = () => {
    formRef.value.validate(async (valid: any) => {
      console.log(valid);
      if (valid !== undefined) return false;
      // @ts-ignore
      localStorage.setItem(
        'enterprise-SuperManagement',
        JSON.stringify(formData.value)
      );
      console.log(localStorage.getItem('enterprise-Manage'));

      const paramsInfo = {
        bank_account_info: JSON.parse(
          localStorage.getItem('enterprise-Settlement')
        ),
        subject_info: JSON.parse(localStorage.getItem('enterprise-Subject')),
        business_info: JSON.parse(localStorage.getItem('enterprise-Manage')),
        settlement_info: JSON.parse(
          localStorage.getItem('enterprise-Industry')
        ),
        contact_info: JSON.parse(
          localStorage.getItem('enterprise-SuperManagement')
        ),
        appid: formData.value.appid,
        mchid: formData.value.mchid,
      };
      console.log(
        '🚀 ~ file: SuperManagement.vue:78 ~ formRef.value.validate ~ paramsInfo:',
        paramsInfo
      );
      const { data, code } = await wxInboundApplicationOfSpecialMerchants(
        paramsInfo
      );
      console.log(data, code);

      return true;
    });
    console.log('完成');
  };
</script>
