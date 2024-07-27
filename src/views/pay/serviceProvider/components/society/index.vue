<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1500"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <a-steps :current="step">
        <a-step
          description="请填写商家的营业执照/登记证书、经营者/法人的证件等信息"
          >主体信息</a-step
        >
        <a-step
          description="请填写商家的经营业务信息、售卖商品/提供服务场景信息"
          >经营信息</a-step
        >
        <a-step description="请填写商家所属行业、特殊资质等信息"
          >行业资质</a-step
        >
        <a-step description="请填写商家提现收款的银行账户信息">结算账户</a-step>
        <a-step description="请填写商家的超级管理员信息">超级管理员</a-step>
      </a-steps>
      <!-- <keep-alive> -->
      <Subject v-if="step === 1" @change-step="changeStep" />
      <Manage v-if="step === 2" @change-step="changeStep" />
      <Industry v-if="step === 3" @change-step="changeStep" />
      <Settlement v-if="step === 4" @change-step="changeStep" />
      <SuperManagement v-if="step === 5" @change-step="changeStep" />
      <!-- </keep-alive> -->
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Subject from './Subject.vue';
  import Manage from './Manage.vue';
  import Industry from './Industry.vue';
  import Settlement from './Settlement.vue';
  import SuperManagement from './SuperManagement.vue';

  const visible = ref(false);
  const step = ref(4);

  const resetFields = () => {
    visible.value = false;
  };

  const handleClick = () => {
    visible.value = true;
  };

  const changeStep = (index: any) => {
    step.value = index;
  };

  defineExpose({ handleClick });
</script>

