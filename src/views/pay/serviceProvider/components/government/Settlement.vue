<template>
  <a-form ref="formRef" :model="formData" style="margin-top: 32px">
    <!-- <a-form-item field="activityName" label="账户类型">
      <a-radio-group>
        <a-radio value="A">对公银行账户</a-radio>
        <a-radio value="B">个人银行卡账户</a-radio>
      </a-radio-group>
    </a-form-item> -->
    <a-form-item field="account_bank" label="开户银行" required>
      <a-input v-model="formData.account_bank" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="account_name" label="开户名称" required>
      <a-input v-model="formData.account_name" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="account_number" label="银行账号" required>
      <a-input v-model="formData.account_number" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="bank_address_code" label="开户银行省市编码" required>
      <a-input v-model="formData.bank_address_code" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="bank_branch_id" label="开户银行联行号" required>
      <a-input v-model="formData.bank_branch_id" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="bank_name" label="开户银行全称（含支行）" required>
      <a-input v-model="formData.bank_name" placeholder="请输入" />
    </a-form-item>
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

  const formRef = ref()
  const emit = defineEmits(['changeStep', 'change-step']);
  const formData = ref({
    account_bank: '',
    account_name: '',
    account_number: '',
    bank_account_type: '',
    bank_address_code: '',
    bank_branch_id: '',
    bank_name: '',
  });

  const onLast = () => {
    emit('changeStep', 3);
  };

  onMounted(() => {
    if (localStorage.getItem('government-Settlement')) {
      // @ts-ignore
      formData.value = JSON.parse(localStorage.getItem('government-Settlement'));
    }
  });

  const onNext = () => {
    formRef.value.validate((valid: any) => {
      console.log(valid);
      if (valid !== undefined) return false;
      // @ts-ignore
      localStorage.setItem('government-Settlement', JSON.stringify(formData.value));
      emit('changeStep', 5);
      return true;
    });
  };
</script>
