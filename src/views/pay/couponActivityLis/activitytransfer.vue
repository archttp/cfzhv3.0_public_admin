<template>
  <div>
    <div class="container">
      <a-modal v-model:visible="visible" :width="600" draggable :footer="false" @close="resetFields">
        <template #title> {{ modalTitle }} - 转让 </template>
        <a-form ref="formRef" layout="vertical" :model="formData">
          <a-space direction="vertical" :size="16">
            <a-col>
              <a-form-item label="优惠券活动id" field="couponActivityId" validate-trigger="input" disabled required>
                <a-input v-model="formData.couponActivityId" placeholder="请输入" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item label="服务商id" field="ipsId">
                <a-select v-model="formData.ipsId" :loading="loading" placeholder="手机号搜索" allow-search
                  :filter-option="false" @search="handleSearch">
                  <a-option v-for="item of userList" :key="item?.id" :value="item?.id">{{ item.userName }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item label="项目经理id" field="projectManagerId">
                <a-select v-model="formData.projectManagerId" :loading="loading" placeholder="手机号搜索" allow-search
                  :filter-option="false" @search="handleSearch">
                  <a-option v-for="item of userList" :key="item?.id" :value="item?.id">{{ item.userName }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col>
              <a-form-item label="服务商id" field="ipsId" validate-trigger="input">
                <a-input v-model="formData.ipsId" placeholder="请输入" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item label="项目经理id" field="projectManagerId" validate-trigger="input">
                <a-input v-model="formData.projectManagerId" placeholder="请输入" allow-clear></a-input>
              </a-form-item>
            </a-col> -->
          </a-space>
          <div class="actions">
            <a-space>
              <a-button type="primary" :loading="loading" @click="onSubmitClick">
                确定
              </a-button>
            </a-space>
          </div>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { transferenceCouponActivity } from '@/api/pay';
import { cfUserQuicklySearchUser } from '@/api/user';

import { Message } from '@arco-design/web-vue';

const visible = ref(false);
const loading = ref(false);
const modalTitle = ref('');
const formRef = ref();
const userList = ref([]);
const emit = defineEmits(['fetchData', 'fetch-data']);
const formData = ref({
  couponActivityId: '',
  ipsId: '',
  projectManagerId: '',
});
const handleSearch = async (value: any) => {
  const { data, code } = await cfUserQuicklySearchUser({
    params: {
      phone: value,
      page: 1,
      size: 20,
    },
  });
  if (code === 10002) {
    userList.value = data;
  } else {
    userList.value = [];
  }
};
const handleClick = (e: any = null) => {
  console.log(e, 111);
  formData.value.couponActivityId = e.id;
  visible.value = true;
  modalTitle.value = e.title;
};
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    // @ts-ignore
    const { code, message } = await transferenceCouponActivity(formData.value);
    if (code === 10002) {
      formRef.value.resetFields();
      visible.value = false;
      // @ts-ignore
      Message.success(message);
      emit('fetchData');
    } else {
      // @ts-ignore
      Message.error(message);
    }
  });
};

const resetFields = () => {
  formData.value.id = '';
  formRef.value.resetFields();
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
  