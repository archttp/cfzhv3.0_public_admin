<template>
  <a-form ref="formRef" :model="formData" style="margin-top: 32px">
    <a-alert banner style="width: 50%; margin-left: 12%; margin-bottom: 16px"
      >登记证书
      请上传相关部门颁发的证书，如：社会团体法人登记证书、民办非企业单位登记证书、基金会法人登记证书</a-alert
    >
    <a-form-item
      field="certificate_info.cert_copy"
      label="登记证书照片"
      validate-trigger="input"
      required
    >
      <a-upload
        multiple
        :action="apiHost+'/file/cfFile/upload'"
        :headers="header"
        :data="uploadData"
        @success="onSuccess"
      />
    </a-form-item>

    <a-form-item
      field="certificate_info.cert_type"
      label="登记证书类型"
      validate-trigger="input"
      required
    >
      <a-select
        v-model="formData.certificate_info.cert_type"
        placeholder="请选择"
        allow-clear
      >
        <a-option value="CERTIFICATE_TYPE_2389">统一社会信用代码证书</a-option>
        <a-option value="CERTIFICATE_TYPE_2394">社会团体法人登记证书</a-option>
        <a-option value="CERTIFICATE_TYPE_2395"
          >民办非企业单位登记证书</a-option
        >
        <a-option value="CERTIFICATE_TYPE_2396">基金会法人登记证书</a-option>
        <a-option value="CERTIFICATE_TYPE_2520">执业许可证/执业证</a-option>
        <a-option value="CERTIFICATE_TYPE_2521"
          >基层群众性自治组织特别法人统一社会信用代码证</a-option
        >
        <a-option value="CERTIFICATE_TYPE_2522"
          >农村集体经济组织登记证</a-option
        >
        <a-option value="CERTIFICATE_TYPE_2399">宗教活动场所登记证</a-option>
        <a-option value="CERTIFICATE_TYPE_2400"
          >政府部门下发的其他有效证明文件</a-option
        >
      </a-select>
    </a-form-item>
    <a-form-item
      field="certificate_info.cert_number"
      label="证书号"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.certificate_info.cert_number"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="certificate_info.merchant_name"
      label="商户名称"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.certificate_info.merchant_name"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="certificate_info.legal_person"
      label="法定代表人姓名"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.certificate_info.legal_person"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      field="certificate_info.company_address"
      label="注册地址"
      validate-trigger="input"
      required
    >
      <a-input
        v-model="formData.certificate_info.company_address"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="有效期类型">
      <a-radio-group v-model="radioValue">
        <a-radio value="定期">定期</a-radio>
        <a-radio value="长期">长期</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="business_license_info.period_begin"
      label="证件生效日期"
      validate-trigger="input"
      required
    >
      <a-date-picker v-model="formData.certificate_info.period_begin" />
    </a-form-item>
    <a-form-item
      v-if="radioValue == '定期'"
      field="business_license_info.period_end"
      label="证件失效日期"
      validate-trigger="input"
      required
    >
      <a-date-picker v-model="formData.certificate_info.period_end" />
    </a-form-item>
    <a-alert banner style="width: 50%; margin-left: 12%; margin-bottom: 16px"
      >法定代表人证件 请上传法定代表人的证件信息</a-alert
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
      <a-upload
        :action="apiHost+'/file/cfFile/upload'"
        :headers="header"
        :data="uploadData"
        @success="onSuccess_id_card_copy"
      />
    </a-form-item>
    <a-form-item
      field="identity_info.id_card_info.id_card_national"
      label="身份证国徽面照片"
      validate-trigger="input"
      required
    >
      <a-upload
        :action="apiHost+'/file/cfFile/upload'"
        :headers="header"
        :data="uploadData"
        @success="onSuccess_id_card_national"
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
  import { getToken } from '@/utils/auth';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const emit = defineEmits(['changeStep', 'change-step']);
  const formRef = ref();

  const radioValue = ref('定期');
  const radioValue2 = ref('定期');

  const formData = ref({
    // business_license_info: {
    //   legal_person: '',
    //   license_address: '',
    //   license_copy: '',
    //   license_number: '',
    //   merchant_name: '',
    //   period_begin: '',
    //   period_end: '',
    // },
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
    certificate_info: {
      cert_copy: '',
      cert_number: '',
      cert_type: '',
      company_address: '',
      legal_person: '',
      merchant_name: '',
      period_begin: '',
      period_end: '',
    },
    subject_type: 'SUBJECT_TYPE_INDIVIDUAL',
  });
  const header: any = ref({
    Authorization: getToken(),
  });
  const uploadData: any = ref({
    fileType: 1,
    scene: 'certificates',
  });
  onMounted(() => {
    if (localStorage.getItem('society-Subject')) {
      // @ts-ignore
      formData.value = JSON.parse(localStorage.getItem('society-Subject'));
    }
  });
  const onSuccess = (fileRes: any) => {
    formData.value.certificate_info.cert_copy =
      fileRes.response.data.id;
  };
  const onSuccess_id_card_copy = (fileRes: any) => {
    formData.value.identity_info.id_card_info.id_card_copy =
      fileRes.response.data.id;
  };
  const onSuccess_id_card_national = (fileRes: any) => {
    formData.value.identity_info.id_card_info.id_card_national =
      fileRes.response.data.id;
  };
  const onNext = () => {
    formRef.value.validate((valid: any) => {
      console.log(valid);
      if (valid !== undefined) return false;
      // @ts-ignore
      localStorage.setItem('society-Subject', JSON.stringify(formData.value));
      emit('changeStep', 2);
      return true;
    });
  };
</script>
