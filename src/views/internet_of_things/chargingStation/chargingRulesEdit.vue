<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :footer="false"
      @close="resetFields"
      :width="1200"
    >
      <template #title>
        {{ formData?.id ? '编辑收费规则' : '新增收费规则' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="充电站id"
                  field="chargingStationId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.chargingStationId"
                    placeholder="请输入"
                    allow-clear
                    disabled
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="适用充电设备类型"
                  field="chargingDeviceType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.chargingDeviceType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">慢充</a-option>
                    <a-option :value="1">快充</a-option>
                    <a-option :value="2">超级快充</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="开始时间"
                  field="startTimeString"
                  validate-trigger="input"
                  required
                >
                  <a-time-picker v-model="formData.startTimeString" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="结束时间"
                  field="endTimeTimeString"
                  validate-trigger="input"
                  required
                >
                  <a-time-picker v-model="formData.endTimeTimeString" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="实时单价(元)"
                  field="fee"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.fee"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="服务费(元)"
                  field="serviceFee"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.serviceFee"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="状态"
                  field="status"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">弃用</a-option>
                    <a-option :value="1">启用</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="收费类型"
                  field="type"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.type"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="unit_of_time">单位时间</a-option>
                    <a-option value="each">每次</a-option>
                    <a-option value="each_add">每次累加</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="费用上限" field="feeUpperLimit">
                  <a-input
                    v-model="formData.feeUpperLimit"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="分组标识" field="groupFlag">
                  <a-input
                    v-model="formData.groupFlag"
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
  import {
    cfChargingStationRulesAdd,
    cfChargingStationRulesUpdate,
  } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const props = defineProps(['carTypeList']);
  let Hours = Array.from({ length: 24 }, (v, i) => String(i).padStart(2, '0'));
  let Minutes = Array.from({ length: 60 }, (v, i) =>
    String(i).padStart(2, '0')
  );
  let Seconds = Array.from({ length: 60 }, (v, i) =>
    String(i).padStart(2, '0')
  );

  Minutes;
  const formData = ref({
    chargingDeviceType: '',
    chargingStationId: '',
    endTime: '',
    fee: '',
    feeUpperLimit: '',
    groupFlag: '',
    serviceFee: '',
    startTime: '',
    status: '',
    type: '',
    id: '',
    startTimeString: '',
    endTimeTimeString: '',
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      // newInfo.startTime = e.startTime / 3600000;
      // newInfo.endTime = e.endTime / 3600000;
      formData.value = newInfo;
    } else {
      formData.value.chargingDeviceType = e.chargingDeviceType;
      formData.value.chargingStationId = e.chargingStationId;
    }

    visible.value = true;
  };
  const resetFields = () => {
    formData.value = {
      chargingDeviceType: '',
      chargingStationId: '',
      endTime: '',
      fee: '',
      feeUpperLimit: '',
      groupFlag: '',
      serviceFee: '',
      startTime: '',
      status: '',
      type: '',
      id: '',
      startTimeString: '',
      endTimeTimeString: '',
    };
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      console.log(formData.value);
      formData.value.startTime = formData.value.startTimeString;
      formData.value.endTime = formData.value.endTimeTimeString;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfChargingStationRulesUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfChargingStationRulesAdd(formData.value);
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
