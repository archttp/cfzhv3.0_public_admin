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
        {{ formData?.id ? '编辑通道' : '新增通道' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="场地"
                  field="areaId"
                  validate-trigger="input"
                  required
                  disabled
                >
                  <a-input
                    v-model="formData.areaId"
                    placeholder="请输入场地"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="通道名称"
                  field="name"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.name"
                    placeholder="请输入通道名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  label="场景"
                  field="scene"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.scene"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">停车场</a-option>
                    <a-option :value="2">商城</a-option>
                    <a-option :value="3">充电</a-option>
                    <a-option :value="4">洗车</a-option>
                    <a-option :value="5">加油</a-option>
                    <a-option :value="6">智慧社区</a-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="值守模式" field="dutyMode">
                  <a-select
                    v-model="formData.dutyMode"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">无人值守</a-option>
                    <a-option :value="1">人工值守</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="特性"
                  field="features"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.features"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="in">入口</a-option>
                    <a-option value="out">出口</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="所在楼层"
                  field="floor"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.floor"
                    placeholder="请输入所在楼层"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="位置描述"
                  field="positionDescribe"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.positionDescribe"
                    placeholder="请输入位置描述"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="卡点位置经度"
                  field="positionX"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.positionX"
                    placeholder="请输入卡点位置经度"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="卡点位置纬度"
                  field="positionY"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.positionY"
                    placeholder="请输入卡点位置纬度"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="卡点状态" field="status">
                  <a-select
                    v-model="formData.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">正常</a-option>
                    <a-option :value="1">关闭通行</a-option>
                    <a-option :value="2">仅采集数据</a-option>
                  </a-select>
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
  import { cfCheckPointAdd, cfCheckPointUpdate } from '@/api/park';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    areaId: '',
    dutyMode: '',
    features: '',
    floor: '',
    name: '',
    positionDescribe: '',
    positionX: '',
    positionY: '',
    scene: 1,
    status: '',
    id: '',
  });
  const handleClick = (e: any = null) => {
    // @ts-ignore
    formData.value.areaId = localStorage.getItem('parkingId');
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
        const { code } = await cfCheckPointUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfCheckPointAdd(formData.value);
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
