<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item field="nickName" label="昵称">
      <a-input v-model="formData.nickName" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="email" label="email">
      <a-input v-model="formData.email" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="birthday" label="生日">
      <a-input v-model="formData.birthday" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="sign" label="个性签名">
      <a-input v-model="formData.sign" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="sex" label="性别">
      <a-select v-model="formData.sex" placeholder="请选择">
        <a-option :value="0">保密</a-option>
        <a-option :value="1">男</a-option>
        <a-option :value="2">女</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="password" label="密码" required>
      <a-input v-model="formData.password" placeholder="请输入" />
    </a-form-item>
    <a-form-item field="newPassword" label="新密码">
      <a-input v-model="formData.newPassword" placeholder="请输入" />
    </a-form-item>
    <div class="actions" style="margin-left: 50%">
      <a-space>
        <a-button @click="reset"> 重置 </a-button>
        <a-button type="primary" @click="onSubmitClick"> 保存 </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Message } from '@arco-design/web-vue';
  import { getMyInfo, modifyPersonalInformation } from '@/api/user';

  const userInfo = ref(null);
  const formRef = ref();
  const formData = ref({
    avatar: '',
    birthday: '',
    email: '',
    newPassword: '',
    nickName: '',
    password: '',
    sex: '',
    sign: '',
  });
  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };

  const checkParams = (obj: any) => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in obj) {
      if (!obj[i]) {
        if (obj[i] !== 0) {
          obj[i] = null;
        }
      }
    }
    return obj;
  };

  const onSubmitClick = () => {
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      const { code } = await modifyPersonalInformation(
        checkParams(formData.value)
      );
      if (code === 10002) {
        formRef.value.resetFields();
        Message.success('更新成功!');
        window.location.reload();
      }
    });
  };

  const getMyInfoFn = async () => {
    const { data, code } = await getMyInfo();
    console.log(data, code);
    // @ts-ignore
    userInfo.value = data;
    // @ts-ignore
    // avatar.value = data.avatarUrl;
    // @ts-ignore
    // userName.value = data.userName + ' (' + data?.cfRole.name + ')';
  };

  onMounted(() => {
    console.log(123);
    getMyInfoFn();
  });
</script>

<style scoped lang="less">
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
