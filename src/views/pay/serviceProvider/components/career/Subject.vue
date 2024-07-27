<template>
  <a-form ref="formRef" :model="formData" style="margin-top: 32px">
    <a-alert banner style="width: 50%; margin-left: 12%; margin-bottom: 16px"
      >营业执照 请上传"营业执照"，需年检章齐全，当年注册除外</a-alert
    >
    <a-form-item
      field="business_license_info.license_copy"
      label="营业执照照片"
      validate-trigger="input"
    >
      <a-upload action="/" />
    </a-form-item>
    <a-form-item
      field="business_license_info.license_number"
      label="注册号"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.business_license_info.license_number"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="business_license_info.license_address"
      label="营业执照注册地址"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.business_license_info.license_address"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="执照有效期类型">
      <a-radio-group v-model="radioValue">
        <a-radio value="定期">定期</a-radio>
        <a-radio value="长期">长期</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="business_license_info.period_begin"
      label="执照生效日期"
      validate-trigger="input"
      required
    >
      <a-date-picker v-model="formData.business_license_info.period_begin" />
    </a-form-item>
    <a-form-item
      v-if="radioValue == '定期'"
      field="business_license_info.period_end"
      label="执照失效日期"
      validate-trigger="input"
      required
    >
      <a-date-picker v-model="formData.business_license_info.period_end" />
    </a-form-item>
    <a-form-item
      field="business_license_info.merchant_name"
      label="商户名称"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.business_license_info.merchant_name"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="business_license_info.legal_person"
      label="经营者姓名"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.business_license_info.legal_person"
        placeholder="请输入"
      />
    </a-form-item>
    <a-alert banner style="width: 50%; margin-left: 12%; margin-bottom: 16px"
      >经营者证件 请上传经营者的证件信息</a-alert
    >
    <a-form-item
      field="identity_info.id_holder_type"
      label="证件类型"
      validate-trigger="input"
      required
    >
      <a-select
        v-model="formData.identity_info.id_holder_type"
        placeholder="请选择"
        allow-clear
      >
        <a-option value="IDENTIFICATION_TYPE_IDCARD"
          >中国大陆居民-身份证</a-option
        >
        <a-option :value="1" disabled
          >中国香港居民-来往内地通行证(暂不支持 请联系管理员)</a-option
        >
        <a-option :value="2" disabled
          >中国澳门居民-来往内地通行证(暂不支持 请联系管理员)</a-option
        >
        <a-option :value="3" disabled
          >中国台湾居民-来往内地通行证(暂不支持 请联系管理员)</a-option
        >
        <a-option :value="4" disabled
          >中国港澳居民-港澳居住证(暂不支持 请联系管理员)</a-option
        >
        <a-option :value="5" disabled
          >中国台湾居民-港澳居住证(暂不支持 请联系管理员)</a-option
        >
        <a-option :value="6" disabled
          >其他国家或地区居民-护照(暂不支持 请联系管理员)</a-option
        >
        <a-option :value="7" disabled
          >其他国家或地区居民-外国人居留证(暂不支持 请联系管理员)</a-option
        >
      </a-select>
    </a-form-item>
    <a-form-item
      field="identity_info.id_card_info.id_card_copy"
      label="身份证人像面照片"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.identity_info.id_card_info.id_card_copy"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="identity_info.id_card_info.id_card_national"
      label="身份证国徽面照片"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.identity_info.id_card_info.id_card_national"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="identity_info.id_card_info.id_card_name"
      label="身份证姓名"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.identity_info.id_card_info.id_card_name"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="identity_info.id_card_info.id_card_number"
      label="身份证件号码"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.identity_info.id_card_info.id_card_number"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="证件有效期类型">
      <a-radio-group v-model="radioValue2">
        <a-radio value="定期">定期</a-radio>
        <a-radio value="长期">长期</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="identity_info.id_card_info.card_period_begin"
      label="证件生效日期"
      validate-trigger="input"
      required
    >
      <a-date-picker
        v-model="formData.identity_info.id_card_info.card_period_begin"
      />
    </a-form-item>
    <a-form-item
      v-if="radioValue2 == '定期'"
      field="identity_info.id_card_info.card_period_end"
      label="证件失效日期"
      validate-trigger="input"
      required
    >
      <a-date-picker
        v-model="formData.identity_info.id_card_info.card_period_end"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNext"> 下一步 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  const emit = defineEmits(['changeStep', 'change-step']);
  const formRef = ref();

  const radioValue = ref('定期');
  const radioValue2 = ref('定期');

  const formData = ref({
    business_license_info: {
      legal_person: '',
      license_address: '',
      license_copy: '',
      license_number: '',
      merchant_name: '',
      period_begin: '',
      period_end: '',
    },
    finance_institution: false,
    identity_info: {
      id_card_info: {
        card_period_begin: '',
        card_period_end: '',
        id_card_address: '',
        id_card_copy: '',
        id_card_name: '',
        id_card_national: '',
        id_card_number: '',
      },
      id_doc_type: '',
      id_holder_type: '',
      owner: '',
    },
    subject_type: 'SUBJECT_TYPE_INDIVIDUAL',
  });

  onMounted(() => {
    if (localStorage.getItem('career-Subject')) {
      // @ts-ignore
      formData.value = JSON.parse(localStorage.getItem('career-Subject'));
    }
  });
  const onNext = () => {
    formRef.value.validate((valid: any) => {
      console.log(valid);
      if (valid !== undefined) return false;
      // @ts-ignore
      localStorage.setItem('career-Subject', JSON.stringify(formData.value));
      emit('changeStep', 2);
      return true;
    });
  };
</script>
