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
        {{ formData?.id ? '编辑到访记录' : '新增到访记录' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="小区"
                  field="villageId"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.villageId"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.id"
                      v-for="item in wisdomCommunity"
                      :key="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="验证模式"
                  field="authenticationMode"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.authenticationMode"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in recognitionModes"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼栋id"
                  field="buildingId"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.buildingId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="取消预约时间"
                  field="cancelSubscribeTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.cancelSubscribeTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="计费状态"
                  field="countFeeStatus"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.countFeeStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">实时计算</a-option>
                    <a-option :value="1">按已存在的出场时间计算</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="产生该记录的位置"
                  field="createPosition"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.createPosition"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="out">外场</a-option>
                    <a-option value="in">内场</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="赠送的到访时间"
                  field="giveAwayParkTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.giveAwayParkTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="进场大图"
                  field="inBigImage"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.inBigImage"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="入口id"
                  field="inCheckPointId"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.inCheckPointId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="入场序列号"
                  field="inDeviceSerialNo"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.inDeviceSerialNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="入场处理人id"
                  field="inHandleUid"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.inHandleUid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="入场放行方式"
                  field="inReleaseType"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.inReleaseType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">未放行</a-option>
                    <a-option :value="1">自动放行</a-option>
                    <a-option :value="2">人工放行</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="进场小图"
                  field="inSmallImage"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.inSmallImage"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="进场时间"
                  field="inTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.inTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出场大图"
                  field="outBigImage"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.outBigImage"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出口id"
                  field="outCheckPointId"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.outCheckPointId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出场序列号"
                  field="outDeviceSerialNo"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.outDeviceSerialNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出场处理人id"
                  field="outHandleUid"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.outHandleUid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出场放行方式"
                  field="outReleaseType"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.outReleaseType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">未放行</a-option>
                    <a-option :value="1">自动放行</a-option>
                    <a-option :value="2">人工放行</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出场小图"
                  field="outSmallImage"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.outSmallImage"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="出场时间"
                  field="outTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.outTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="支付时间"
                  field="payTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.payTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="设备人脸id"
                  field="personUuid"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.personUuid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="识别结果"
                  field="recognitionResult"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.recognitionResult"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">失败</a-option>
                    <a-option :value="1">成功</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="备注"
                  field="remarks"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.remarks"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="居民状态"
                  field="residentStatus"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.residentStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">过期</a-option>
                    <a-option :value="1">正常</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="预约时间"
                  field="subscribeTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.subscribeTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="用户id"
                  field="uid"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.uid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="到访门牌号"
                  field="visitHouseNumber"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.visitHouseNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="到访单元"
                  field="visitUnit"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.visitUnit"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="居民状态"
                  field="visitorType"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.visitorType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">临时访客</a-option>
                    <a-option :value="1">业主</a-option>
                    <a-option :value="2">租户</a-option>
                    <a-option :value="3">办公</a-option>
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
  import {
    addResidentVisitingRecords,
    updateResidentVisitingRecords,
    wisdomCommunityGet,
  } from '@/api/wisdomCommunity';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    authenticationMode: '',
    buildingId: '',
    cancelSubscribeTime: '',
    countFeeStatus: '',
    createPosition: '',
    createTime: '',
    giveAwayParkTime: '',
    inBigImage: '',
    inCheckPointId: '',
    inDeviceSerialNo: '',
    inHandleUid: '',
    inReleaseType: '',
    inSmallImage: '',
    inTime: '',
    outBigImage: '',
    outCheckPointId: '',
    outDeviceSerialNo: '',
    outHandleUid: '',
    outReleaseType: '',
    outSmallImage: '',
    outTime: '',
    payTime: '',
    personUuid: '',
    recognitionResult: '',
    remarks: '',
    residentStatus: '',
    subscribeTime: '',
    uid: '',
    villageId: '',
    visitHouseNumber: '',
    visitUnit: '',
    visitorType: '',
    id: '',
  });
  const wisdomCommunity = ref([]);
  const recognitionModes = [
    { value: 0, label: '人脸' },
    { value: 1, label: 'IC卡' },
    { value: 2, label: 'IC卡，身份证或人脸' },
    { value: 3, label: '人脸+卡识别，双重认证' },
    { value: 4, label: '身份证+人脸，双重认证(人证)' },
    { value: 5, label: '身份证+人脸+白名单，三重认证' },
    { value: 6, label: '人脸或人证模式' },
  ];

  const handleClick = (e: any = null) => {
    getWisdomCommunityList();
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
  const getWisdomCommunityList = async () => {
    // @ts-ignore
    const { data, code } = await wisdomCommunityGet({
      params: {
        page: 1,
        size: 999,
      },
    });
    if (code === 10002) {
      wisdomCommunity.value = data;
    } else {
      wisdomCommunity.value = [];
    }
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateResidentVisitingRecords(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addResidentVisitingRecords(formData.value);
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
