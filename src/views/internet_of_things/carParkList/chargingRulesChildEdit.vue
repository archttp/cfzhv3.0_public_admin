<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :footer="false"
      @close="resetFields"
      :width="1200"
    >
      <template #title>
        {{ formData?.id ? '编辑收费规则 -- 子级' : '新增收费规则 -- 子级' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="停车场id"
                  field="carParkId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.carParkId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="适用车辆类型"
                  field="carType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.carType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.flagKey"
                      v-for="item in props.carTypeList"
                      :key="item.id"
                      >{{ item.name }}</a-option
                    >
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
                <a-form-item label="子级数量" field="childrenCounts">
                  <a-input
                    v-model="formData.childrenCounts"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
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
              <a-col :span="8">
                <a-form-item label="父级id" field="pid">
                  <a-input
                    v-model="formData.pid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" field="status">
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
  import { chargingRuleAdd, chargingRuleUpdate } from '@/api/park';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['getChildList']);
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
    carParkId: '',
    carType: '',
    childrenCounts: '',
    endTime: '',
    fee: '',
    feeUpperLimit: '',
    groupFlag: '',
    pid: '',
    startTime: '',
    status: '',
    type: '',
    newStartTime: '',
    newEndTime: '',
    startTimeString: '',
    endTimeTimeString: '',
    id: '',
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      // newInfo.startTime = e.startTime / 3600000;
      // newInfo.endTime = e.endTime / 3600000;
      formData.value = newInfo;
    } else {
      formData.value.carParkId = e.parkingId;
      formData.value.carType = e.flagKey;
      formData.value.pid = e.pid;
    }

    visible.value = true;
  };
  const resetFields = () => {
    formData.value = {
      carParkId: '',
      carType: '',
      childrenCounts: '',
      endTime: '',
      fee: '',
      feeUpperLimit: '',
      groupFlag: '',
      pid: '',
      startTime: '',
      status: '',
      type: '',
      newStartTime: '',
      newEndTime: '',
      startTimeString: '',
      endTimeTimeString: '',
      id: '',
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
        const { code } = await chargingRuleUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('getChildList');
        }
      } else {
        const { code } = await chargingRuleAdd(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('添加成功!');
          emit('getChildList');
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
