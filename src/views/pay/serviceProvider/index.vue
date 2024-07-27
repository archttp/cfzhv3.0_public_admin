<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay',
        'menu.pay.userPaymentAgency',
        'menu.pay.userPaymentAgency.wechatmerchantapplicationlist',
      ]"
    />
    <a-card class="general-card" title="微信收款账号申请">
      <a-row>
        <a-col :span="6">
          <a-card title="个体工商户" hoverable>
            <template #extra>
              <a-link @click="onIndividual">申请</a-link>
            </template>
            营业执照上的主体类型一般为个体户、个体工商户、个体经营
          </a-card>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-card title="企业" hoverable>
            <template #extra>
              <a-link @click="onEnterprise">申请</a-link>
            </template>
            营业执照上的主体类型一般为有限公司、有限责任公司
          </a-card>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-card title="事业单位" hoverable>
            <template #extra>
              <a-link @click="onCareer">申请</a-link>
            </template>
            包括国内各类事业单位，如：医疗、教育、学校等单位
          </a-card>
        </a-col>
      </a-row>
      <a-row style="margin-top: 16px">
        <a-col :span="6">
          <a-card title="社会组织" hoverable>
            <template #extra>
              <a-link @click="onSociety">申请</a-link>
            </template>
            包括社会团体、民办非企业、基金会、基层群众性自治组织、农村集体经济组织等组织
          </a-card>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-card title="政府机关" hoverable>
            <template #extra>
              <a-link @click="onGovernment">申请</a-link>
            </template>
            包括国内各级、各类政府机关，如：机关党委、税务、民政、人社、工商、商务、市监等
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="general-card" title="支付宝收款账号申请">
      <a-row>
        <a-col :span="6">
          <a-card title="xxx" hoverable>
            <template #extra>
              <a-link @click="onIndividual">申请</a-link>
            </template>
            xxxxx
          </a-card>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-card title="xxx" hoverable>
            <template #extra>
              <a-link @click="onEnterprise">申请</a-link>
            </template>
            xxxxx
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <individual ref="individualRef" />
    <career ref="careerRef" />
    <enterprise ref="enterpriseRef" />
    <government ref="governmentRef" />
    <society ref="societyRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import individual from './components/individual/index.vue';
  import career from './components/career/index.vue';
  import enterprise from './components/enterprise/index.vue';
  import government from './components/government/index.vue';
  import society from './components/society/index.vue';

  const individualRef = ref();
  const careerRef = ref();
  const enterpriseRef = ref();
  const governmentRef = ref();
  const societyRef = ref();

  const onIndividual = () => {
    individualRef.value.handleClick();
  };
  const onEnterprise = () => {
    enterpriseRef.value.handleClick();
  };
  const onCareer = () => {
    careerRef.value.handleClick();
  };
  const onSociety = () => {
    societyRef.value.handleClick();
  };
  const onGovernment = () => {
    governmentRef.value.handleClick();
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
