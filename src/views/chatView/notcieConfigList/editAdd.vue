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
        {{ formData?.id ? '编辑消息配置' : '新增消息配置' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="通知平台" field="noticePlatform" required>
                  <a-select
                    v-model="formData.noticePlatform"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">微信公众号</a-option>
                    <a-option :value="2">微信小程序</a-option>
                    <a-option :value="3">系统消息</a-option>
                    <a-option :value="4">阿里小程序</a-option>
                    <a-option :value="5">阿里生活号</a-option>
                    <a-option :value="6">短信</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="通知类型" field="noticeType" required>
                  <a-select
                    v-model="formData.noticeType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">停车套餐到期通知</a-option>
                    <a-option :value="2">停车套餐续费成功通知</a-option>
                    <a-option :value="3">车辆审核通知</a-option>
                    <a-option :value="4">收款账号申请通知</a-option>
                    <a-option :value="5">车辆辆入场通知</a-option>
                    <a-option :value="6">车辆出场通知</a-option>
                    <a-option :value="7">开始充电通知</a-option>
                    <a-option :value="8">充电结束通知</a-option>
                    <a-option :value="9">预约到访审核通知</a-option>
                    <a-option :value="10">停车追缴通知</a-option>
                    <a-option :value="11">会员到期通知</a-option>
                    <a-option :value="12">会员续费成功通知</a-option>
                    <a-option :value="13">物业费欠费通知</a-option>
                    <a-option :value="14">物业费缴费成功通知</a-option>
                    <a-option :value="15">上门报修下单通知</a-option>
                    <a-option :value="16">上门报修接单通知</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="使用场景" field="scene" required>
                  <a-select
                    v-model="formData.scene"
                    placeholder="请选择"
                    allow-clear
                    
                  >
                    <a-option :value="0">通用</a-option>
                    <a-option :value="1">停车场</a-option>
                    <a-option :value="2">商城</a-option>
                    <a-option :value="3">充电</a-option>
                    <a-option :value="4">洗车</a-option>
                    <a-option :value="5">加油</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="店铺id"
                  field="shopId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.shopId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="资源id"
                  field="sourceId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.sourceId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
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
  import { addNoticeSetting, updateNoticeSetting } from '@/api/chatApi';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    noticePlatform: '',
    noticeType: '',
    scene: '',
    shopId: '',
    sourceId: '',
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
        const { code } = await updateNoticeSetting(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addNoticeSetting(formData.value);
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
