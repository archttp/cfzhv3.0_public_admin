<template>
  <a-form ref="formRef" :model="formData" style="margin-top: 32px">
    <a-form-item field="service_phone" label="商户简称" required>
      <a-input v-model="formData.merchant_shortname" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="service_phone" label="客服电话" required>
      <a-input v-model="formData.service_phone" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="经营场景">
      <a-checkbox-group @change="checkboxChange">
        <a-checkbox value="1" disabled>线下场景</a-checkbox>
        <a-checkbox value="2" disabled>公众号</a-checkbox>
        <a-checkbox value="3" :model-value="true">小程序</a-checkbox>
        <a-checkbox value="4" disabled>APP</a-checkbox>
        <a-checkbox value="5" disabled>互联网网站</a-checkbox>
        <a-checkbox value="6" disabled>企业微信</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <div v-if="offlineView">
      <a-form-item field="sales_info.biz_store_info.biz_store_name" label="线下场所名称" required>
        <a-input
          v-model="formData.sales_info.biz_store_info.biz_store_name"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item field="sales_info.biz_store_info.biz_address_code" label="线下场所省市" required>
        <a-input
          v-model="formData.sales_info.biz_store_info.biz_address_code"
          placeholder="请输入线下场所省市编码"
        />
      </a-form-item>
      <a-form-item field="sales_info.biz_store_info.biz_store_address" label="线下场所地址" required>
        <a-input
          v-model="formData.sales_info.biz_store_info.biz_store_address"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item field="sales_info.biz_store_info.biz_sub_appid" label="线下场所对应的公众号APPID">
        <a-input
          v-model="formData.sales_info.biz_store_info.biz_sub_appid"
          placeholder="请输入"
        />
      </a-form-item>
    </div>
    <div v-if="gongZhongView">
      <!-- <a-form-item field="activityName" label="AppID所属" required>
        <a-radio-group>
          <a-radio value="A">服务商公众号AppId</a-radio>
          <a-radio value="B">商家公众号AppId</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item field="sales_info.mp_info.mp_appid" label="服务商公众号AppID" required>
        <a-input
          placeholder="请输入"
          v-model="formData.sales_info.mp_info.mp_appid"
        />
      </a-form-item>
      <a-form-item field="sales_info.mp_info.mp_sub_appid" label="商家公众号AppID" required>
        <a-input
          placeholder="请输入"
          v-model="formData.sales_info.mp_info.mp_sub_appid"
        />
      </a-form-item>
      <a-form-item field="activityName" label="公众号页面截图（选填）">
        <a-input placeholder="请输入" />
      </a-form-item>
    </div>
    <div v-if="mpView">
      <a-form-item field="sales_info.mini_program_info.mini_program_appid" label="服务商小程序APPID" required>
        <a-input
          v-model="formData.sales_info.mini_program_info.mini_program_appid"
          placeholder="请输入"
        />
      </a-form-item>
      <!-- <a-form-item field="sales_info.mini_program_info.mini_program_sub_appid" label="商家小程序APPID" required>
        <a-input
          v-model="formData.sales_info.mini_program_info.mini_program_sub_appid"
          placeholder="请输入"
        />
      </a-form-item> -->
      <!-- <a-form-item label="小程序截图（选填）">
        <a-input v-model="formData.sales_info.mini_program_info.mini_program_pics" placeholder="请输入" />
      </a-form-item> -->
    </div>
    <div v-if="AppView">
      <!-- <a-form-item field="activityName" label="AppID所属" required>
        <a-radio-group>
          <a-radio value="A">服务商公众号AppId</a-radio>
          <a-radio value="B">商家公众号AppId</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item field="sales_info.app_info.app_appid" label="服务商应用AppID" required>
        <a-input
          v-model="formData.sales_info.app_info.app_appid"
          placeholder="请输入"
        />
      </a-form-item>
      <!-- <a-form-item field="sales_info.app_info.app_sub_appid" label="商家应用AppID" required>
        <a-input
          v-model="formData.sales_info.app_info.app_sub_appid"
          placeholder="请输入"
        />
      </a-form-item> -->
      <a-form-item field="activityName" label="APP截图">
        <a-input placeholder="请输入" />
      </a-form-item>
    </div>
    <div v-if="internetView">
      <a-form-item field="sales_info.web_info.domain" label="互联网网站域名" required>
        <a-input
          v-model="formData.sales_info.web_info.domain"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item field="activityName" label="网站授权函照片" required>
        <a-input placeholder="请输入" />
      </a-form-item>
      <a-form-item
        field="sales_info.web_info.web_appid"
        label="互联网网站对应的商家AppID（选填）"
      >
        <a-input
          v-model="formData.sales_info.web_info.web_appid"
          placeholder="请输入"
        />
      </a-form-item>
    </div>
    <div v-if="enterpriseWxView">
      <a-form-item field="sales_info.wework_info.sub_corp_id" label="商家企业微信CorpID" required>
        <a-input v-model="formData.sales_info.wework_info.sub_corp_id" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="sales_info.wework_info.wework_pics" label="企业微信页面截图" required>
        <a-input v-model="formData.sales_info.wework_info.wework_pics" placeholder="请输入" />
      </a-form-item>
    </div>
    <a-form-item>
      <a-button type="primary" style="margin-right: 16px" @click="onLast">
        上一步
      </a-button>
      <a-button type="primary" @click="onNext"> 下一步 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  const emit = defineEmits(['changeStep', 'change-step']);
  const formRef = ref()
  const formData = ref({
    merchant_shortname: '德安天网科技',
    sales_info: {
      app_info: {
        app_appid: '',
        app_pics: [],
        app_sub_appid: '',
      },
      biz_store_info: {
        biz_address_code: '',
        biz_store_address: '',
        biz_store_name: '',
        biz_sub_appid: '',
        indoor_pic: [],
        store_entrance_pic: [],
      },
      mini_program_info: {
        mini_program_appid: 'wxfd734397abbb5bc1',
        mini_program_pics: [],
        mini_program_sub_appid: 'wxfd734397abbb5bc1',
      },
      mp_info: {
        mp_appid: '',
        mp_pics: [],
        mp_sub_appid: '',
      },
      sales_scenes_type: [],
      web_info: {
        domain: '',
        web_appid: '',
        web_authorisation: '',
      },
      wework_info: {
        sub_corp_id: '',
        wework_pics: [],
      },
    },
    service_phone: '18970223354',
  });

  const offlineView = ref(false);
  const gongZhongView = ref(false);
  const mpView = ref(false);
  const AppView = ref(false);
  const internetView = ref(false);
  const enterpriseWxView = ref(false);

  const onLast = () => {
    emit('changeStep', 1);
  };
  // const onNext = () => {
  //   emit('changeStep', 3);
  // };
  
  onMounted(() => {
    if (localStorage.getItem('individual-Manage')) {
      // @ts-ignore
      formData.value = JSON.parse(localStorage.getItem('individual-Manage'));
    }
  });
  
  const onNext = () => {
    formRef.value.validate((valid: any) => {
      console.log(valid);
      if (valid !== undefined) return false;
      // @ts-ignore
      localStorage.setItem('individual-Manage', JSON.stringify(formData.value));
      emit('changeStep', 3);
      return true;
    });
  };

  const checkboxChange = (e: any) => {
    if (e.indexOf('1') == '-1') {
      offlineView.value = false;
    } else {
      offlineView.value = true;
    }
    if (e.indexOf('2') == '-1') {
      gongZhongView.value = false;
    } else {
      gongZhongView.value = true;
    }
    if (e.indexOf('3') == '-1') {
      mpView.value = false;
    } else {
      mpView.value = true;
    }
    if (e.indexOf('4') == '-1') {
      AppView.value = false;
    } else {
      AppView.value = true;
    }
    if (e.indexOf('5') == '-1') {
      internetView.value = false;
    } else {
      internetView.value = true;
    }
    if (e.indexOf('6') == '-1') {
      enterpriseWxView.value = false;
    } else {
      enterpriseWxView.value = true;
    }
  };
</script>
